import { Entity, THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
import { Mesh, MeshStandardMaterial, Object3D } from 'super-three';
const { Vector3, Quaternion } = THREE;
import { debug } from '../debug';
import { Grabbable } from './grabbable';

function asArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [x];
}

const off = [0, 0, 0] as const;
const litUp = [0.3, 0.3, 0.3] as const;
const red = [1, 0, 0] as const;

registerComponent('grabber', {
  schema: {
    mouse: { type: 'boolean', default: false },
  },

  dependencies: ['body'],

  body: null as null | Body.Body,
  eventListener: null as EventListener | null,
  collided: new Map<number, Entity>(),
  gripping: new Set<Entity>(),

  init: async function () {
    this.data = Utils.Schema.fixSchema(this.data, this.schema as any);

    this.body = await Body.getBody(this.el);
    if (this.body === null) {
      throw new Error('Cannot use grabber without attached body');
    }

    this.el.addEventListener('collide', this.handleCollision.bind(this) as unknown as EventListener);
    this.el.addEventListener('separate', this.handleSeparation.bind(this) as unknown as EventListener);

    if (this.data.mouse) {
      window.addEventListener('mousedown', this.grip.bind(this));
      window.addEventListener('mouseup', this.drop.bind(this));
    } else {
      this.el.addEventListener('gripdown', this.grip.bind(this));
      this.el.addEventListener('gripup', this.drop.bind(this));
    }
  },

  handleCollision: async function (evt: CustomEvent<System.CollisionEvent>) {
    let {
      detail: { collidingEntity, selfCollider, otherCollider },
    } = evt;
    if (!this.collided.has(otherCollider) && collidingEntity.hasAttribute('grabbable')) {
      setEmissive(collidingEntity.getObject3D('mesh'), ...litUp);
      this.collided.set(otherCollider, collidingEntity);
    }
  },

  handleSeparation: async function (evt: CustomEvent<System.CollisionEvent>) {
    let {
      detail: { collidingEntity, selfCollider, otherCollider },
    } = evt;
    this.collided.delete(otherCollider);
    setEmissive(collidingEntity.getObject3D('mesh'), ...off);
  },

  grip: async function () {
    debug(`grip ${this.collided.size}`);
    for (let [colliderHandle, collidingEntity] of this.collided.entries()) {
      // collidingEntity
      // TODO: The hard thing, convert the body into a tracker!
      console.log('collidingEntity:pre', collidingEntity);
      collidingEntity.setAttribute('joint', { type: 'fixed', target: this.el});
      collidingEntity.setAttribute('collider', { collisionGroups: 0 });
      // collidingEntity.setAttribute('collider', 'sensor', true);
      // collidingEntity.setAttribute('track', 'body', this.el);
      this.gripping.add(collidingEntity);
      console.log('collidingEntity:post', collidingEntity);
      // console.log("collidingEntity:post", collidingEntity.components.collider.data.collisionGroups)
    }
  },

  drop: async function () {
    debug('drop');
    for (let gripped of this.gripping.values()) {
      let body = await Body.getBody(gripped);
      gripped.removeAttribute('joint');
      gripped.setAttribute('collider', { collisionGroups: 0xffffffff });
      let vel = (gripped.components.grabbable as unknown as Grabbable).vel();
      if (body) {
        body.rigidBody.setLinvel(vel, true);
      }
    }
  },
});

function setEmissive(object: Object3D, r: number, g: number, b: number) {
  if (object === undefined) {
    return;
  }

  if (object.hasOwnProperty('material')) {
    for (let material of asArray((object as Mesh).material)) {
      (material as MeshStandardMaterial).emissive.setRGB(r, g, b);
    }
  }

  object.children.forEach((child) => setEmissive(child, r, g, b));
}

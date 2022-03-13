import { Entity, THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
import { Mesh, MeshStandardMaterial, Object3D } from 'super-three';
const { Vector3, Quaternion } = THREE;

function asArray<T>(x: T | T[]): T[] {
  return Array.isArray(x) ? x : [ x ];
}

const off = [0, 0, 0] as const;
const litUp = [0.3, 0.3, 0.3] as const;
const red = [1, 0, 0] as const;

registerComponent('grabber', {
  schema: {},

  dependencies: ['body'],

  body: null as null | Body.Body,
  eventListener: null as EventListener | null,
  collided: new Map<number, Entity>(),

  init: async function () {
    this.data = Utils.Schema.fixSchema(this.data, this.schema as any);

    this.body = await Body.getBody(this.el);
    if (this.body === null) {
      throw new Error('Cannot use grabber without attached body');
    }

    this.el.addEventListener('collide', this.handleCollision.bind(this) as unknown as EventListener);
    this.el.addEventListener('separate', this.handleSeparation.bind(this) as unknown as EventListener);

    let handControls = document.querySelectorAll('[hand-controls]');
    handControls.forEach((handControl) => {
      handControl.addEventListener('triggerdown', this.grip.bind(this));
    });
  },

  handleCollision: async function (evt: CustomEvent<System.CollisionEvent>) {
    let {
      detail: { collidingEntity, selfCollider, otherCollider },
    } = evt;
    if (!this.collided.has(otherCollider)) {
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

  grip: async function() {
    for (let [colliderHandle, collidingEntity] of this.collided.entries()) {
      // collidingEntity
      // TODO: The hard thing, convert the body into a tracker!
      console.log("collidingEntity:pre", collidingEntity)
      collidingEntity.setAttribute('body', 'type', 'position');
      collidingEntity.setAttribute('collider', 'sensor', true);
      collidingEntity.setAttribute('track', 'body', this.el);
      console.log("collidingEntity:post", collidingEntity)
    }
  }
});

function setEmissive(object: Object3D, r: number, g: number, b: number) {
  if (object === undefined) {
    return;
  }

  if (object.hasOwnProperty('material')) {
    for (let material of asArray((object as Mesh).material)) {
      console.log("setting emissive");
      (material as MeshStandardMaterial).emissive.setRGB(r, g, b);
    }
  }

  object.children.forEach((child) => setEmissive(child, r, g, b));
}

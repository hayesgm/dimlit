import { Entity, THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
const { Vector3, Quaternion } = THREE;

let id = 0;
registerComponent('grabber', {
  schema: {},

  dependencies: ['body'],

  body: null as null | Body.Body,
  eventListener: null as EventListener | null,
  collided: new Set<number>(),
  enId: 0,

  init: async function () {
    this.enId = id++;
    this.data = Utils.Schema.fixSchema(this.data, this.schema as any);

    this.body = await Body.getBody(this.el);
    if (this.body === null) {
      throw new Error('Cannot use grabber without attached body');
    }

    this.eventListener = this.handleCollision.bind(this) as unknown as EventListener;
    this.el.addEventListener('collide', this.eventListener);
  },

  tick: function() {
    let nextPosition = meshPosition(this.el);
    // Utils.Debug.tdebug("grabber:nextPosition" + this.enId, this.body?.rigidBody.handle, nextPosition);
    if (nextPosition) {
      this.body?.setNextPosition(nextPosition);
    }
  },

  handleCollision: async function (evt: CustomEvent<System.CollisionEvent>) {
    let {
      detail: { collidingEntity, selfCollider, otherCollider },
    } = evt;
    if (!this.collided.has(otherCollider)) {
      // console.log("it's a collision with", collidingEntity, selfCollider, otherCollider);
      this.collided.add(otherCollider);
      // console.log("this.el", this.el);
      // collidingEntity.setAttribute('body', { track: this.el, type: 'position' });
    }
  },
});

function meshPosition(el: Entity): Utils.Vector.Vec3 | null {
  let mesh = el.getObject3D('mesh');
  if (mesh) {
    mesh.updateMatrixWorld();

    let pos = new Vector3();
    let rot = new Quaternion();
    let scale = new Vector3();

    mesh.matrixWorld.decompose(pos, rot, scale);

    return Utils.Vector.fromVector3(pos);
  } else {
    return null;
  }
}

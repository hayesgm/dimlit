import { Component, ComponentDefinition, Entity, registerComponent, THREE } from 'aframe';
import { registerAsyncComponent, Body, Utils } from 'aframe-rapier';
const { Vector3 } = THREE;
import { debug } from '../debug';

interface ResettableComponentData {}

class ResettableComponent {
  el: Entity;
  body: Body.Body | null;
  position: Utils.Vector.Vec3 | null;

  constructor(el: Entity, data: ResettableComponentData, body: Body.Body | null, position: Utils.Vector.Vec3 | null) {
    this.el = el;
    this.body = body;
    this.position = position;
  }

  static async initialize(el: Entity, data: ResettableComponentData): Promise<ResettableComponent> {
    let body = await Body.getBody(el);
    let position = null;
    if (body !== null) {
      position = body.position();
    }
    return new ResettableComponent(el, data, body, position);
  }

  reset() {
    console.log("resetting inner", this.body, this.position);
    if (this.body && this.position) {
      debug(`resetting ${this.el.id}`);
      this.body.setPosition(this.position);
      this.body.rigidBody.setLinvel({x: 0, y: 0, z: 0}, true);
    }
  }
}

export const getResettable = registerAsyncComponent<ResettableComponent, ResettableComponentData>('resettable', ResettableComponent.initialize, {
  schema: {},

  dependencies: ['body'],
});

export async function resetAll() {
  for (let resettableEl of document.querySelectorAll('[resettable]')) {
    let resettable = await getResettable(resettableEl as Entity);
    if (resettable) {
      resettable.reset();
    }
  }
}

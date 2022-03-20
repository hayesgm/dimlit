import { Component, ComponentDefinition, Entity, registerComponent, THREE } from 'aframe';
import { registerAsyncComponent, Body, Utils } from 'aframe-rapier';
const { Vector3 } = THREE;
import { debug } from '../debug';
import { resetAll } from './resettable';

interface LeftControlsComponentData {}

class LeftControlsComponent {
  el: Entity;

  constructor(el: Entity, data: LeftControlsComponentData) {
    this.el = el;
    this.grip = this.grip.bind(this);
    this.el.addEventListener('gripdown', this.grip);
  }

  static async initialize(el: Entity, data: LeftControlsComponentData): Promise<LeftControlsComponent> {
    return new LeftControlsComponent(el, data);
  }

  grip() {
    debug("left grip");
    resetAll();
  }
}

export const getLeftControls = registerAsyncComponent<LeftControlsComponent, LeftControlsComponentData>('left-controls', LeftControlsComponent.initialize, {
  schema: {},

  dependencies: ['body'],
});

import { Component, ComponentDefinition, Entity, registerComponent, THREE } from 'aframe';
import { registerAsyncComponent, Body, Utils } from 'aframe-rapier';
const { Vector3 } = THREE;

interface MovementComponentData {
  speed: number;
}

class MovementComponent {
  el: Entity;
  body: Body.Body;
  impulsePoint: Utils.Vector.Vec3;
  direction: Utils.Vector.Vec3;
  intensity: number;
  time: number;

  constructor(el: Entity, data: MovementComponentData, body: Body.Body) {
    this.el = el;
    this.direction = { x: 0, y: 0, z: 0 };
    this.impulsePoint = { x: 0, y: 0, z: 0 };
    let handControls = document.querySelectorAll('[hand-controls]');
    handControls.forEach((handControl) => {
      handControl.addEventListener('thumbstickmoved', this.logThumbstick.bind(this));
      handControl.addEventListener('triggerdown', this.jump.bind(this));
    });
    this.body = body;
    this.intensity = 0;
    this.time = 0;
    this.attachKeyEventListeners();
    this.body.rigidBody.setAngularDamping(1000);
  }

  static async initialize(el: Entity, data: MovementComponentData): Promise<MovementComponent> {
    let body = await Body.getBody(el);
    if (body === null) {
      throw new Error('Cannot use movement without attached body');
    }
    return new MovementComponent(el, data, body);
  }

  move(dir: Utils.Vector.Vec3, time = 100, intensity = 0.14) {
    this.direction = dir;
    this.time = time;
    this.intensity = intensity;
  }

  attachKeyEventListeners() {
    window.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  removeKeyEventListeners() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress(event: KeyboardEvent) {
    console.log("onKeyPress", this);
    const keyMap: { [key: string]: Utils.Vector.Vec3 } = {
      G: { x: 0, y: 0, z: -1 },
      V: { x: 0, y: 0, z: 1 },
      C: { x: -1, y: 0, z: 0 },
      B: { x: 1, y: 0, z: 0 },
      ' ': { x: 0, y: 1, z: 0 },
    };

    let key = String.fromCharCode(event.keyCode);
    console.log({key, code: event.keyCode});
    if (keyMap[key]) {
      event.preventDefault();
      event.stopPropagation();
      this.move(keyMap[key], 100, 0.14);
    }
  }

  jump(event: any) {
    this.move({ x: 0, y: 1, z: 0 }, 100);
  }

  logThumbstick(event: any) {
    let vec = new Vector3(event.detail.x, 0, event.detail.y);
    let speed = vec.length() * 0.07;
    let dir = vec.normalize();

    this.move(Utils.Vector.fromVector3(dir), 100, 0.07);
  }

  tick(time: number, delta: number) {
    if (this.time > 0) {
      this.time = Math.max(this.time - delta, 0);
    }
    if (this.time > 0) {
      let impulse = {
        x: this.direction!.x * this.intensity,
        y: this.direction!.y * this.intensity,
        z: this.direction!.z * this.intensity,
      };
      console.log("impulse", impulse);
      this.body!.applyImpulse(impulse);
    }
  }

  remove() {
    this.removeKeyEventListeners();
  }
}

registerAsyncComponent<MovementComponent, MovementComponentData>('movement', MovementComponent.initialize, {
  schema: {
    speed: { type: 'number', default: 0.7 },
  },

  dependencies: ['body', 'collider'],
});

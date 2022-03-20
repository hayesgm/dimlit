import { Component, ComponentDefinition, Entity, registerComponent, THREE } from 'aframe';
import { registerAsyncComponent, Body, Utils } from 'aframe-rapier';
const { Vector3 } = THREE;
import { resetAll } from './resettable';

interface MovementComponentData {
  speed: number;
  impulse: boolean;
}

class MovementComponent {
  el: Entity;
  body: Body.Body;
  impulsePoint: Utils.Vector.Vec3;
  direction: Utils.Vector.Vec3;
  intensity: number;
  time: number;
  impulse: boolean;
  speed: number;

  constructor(el: Entity, data: MovementComponentData, body: Body.Body) {
    this.el = el;
    this.direction = { x: 0, y: 0, z: 0 };
    this.impulsePoint = { x: 0, y: 0, z: 0 };
    let handControls = document.querySelectorAll('[hand-controls]');
    handControls.forEach((handControl) => {
      handControl.addEventListener('thumbstickmoved', this.logThumbstick.bind(this));
      // handControl.addEventListener('triggerdown', this.jump.bind(this));
    });
    this.body = body;
    this.intensity = 0;
    this.time = 0;
    this.attachKeyEventListeners();
    this.body.rigidBody.setAngularDamping(1000);
    this.impulse = data.impulse;
    this.speed = data.speed;
  }

  static async initialize(el: Entity, data: MovementComponentData): Promise<MovementComponent> {
    let body = await Body.getBody(el);
    if (body === null) {
      throw new Error('Cannot use movement without attached body');
    }
    return new MovementComponent(el, data, body);
  }

  move(dir: Utils.Vector.Vec3, intensity = 1.0, time = 100) {
    this.direction = dir;
    this.intensity = intensity;
    this.time = time;
  }

  attachKeyEventListeners() {
    window.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  removeKeyEventListeners() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  async onKeyPress(event: KeyboardEvent) {
    // console.log("onKeyPress", this);
    const keyMap: { [key: string]: Utils.Vector.Vec3 } = {
      G: { x: 0, y: 0, z: -1 },
      V: { x: 0, y: 0, z: 1 },
      C: { x: -1, y: 0, z: 0 },
      B: { x: 1, y: 0, z: 0 },
      ' ': { x: 0, y: 1, z: 0 },
    };

    let key = String.fromCharCode(event.keyCode);
    // console.log({key, code: event.keyCode});
    if (keyMap[key]) {
      event.preventDefault();
      event.stopPropagation();
      this.move(keyMap[key]);
    }

    // TODO: Generic key framework?
    if (key === '1') {
      let body = await Body.getBody(document.getElementById('ball') as Entity);
      body!.rigidBody.setLinvel({x: 3, y: 0, z: 0}, true);
    }

    if (key === 'R') {
      resetAll();
    }
  }

  jump(event: any) {
    this.move({ x: 0, y: 1, z: 0 });
  }

  logThumbstick(event: any) {
    let vec = new Vector3(event.detail.x, 0, event.detail.y);
    let intensity = vec.length();
    let dir = vec.normalize();

    this.move(Utils.Vector.fromVector3(dir), intensity);
  }

  tick(time: number, delta: number) {
    if (this.time > 0) {
      this.time = Math.max(this.time - delta, 0);
    }
    if (this.time > 0) {
      if (this.impulse) {
        let impulse = {
          x: this.direction!.x * this.intensity * this.speed,
          y: this.direction!.y * this.intensity * this.speed,
          z: this.direction!.z * this.intensity * this.speed,
        };
        this.body!.applyImpulse(impulse);
      } else {
        let movement = {
          x: this.direction!.x * this.intensity * this.speed,
          y: this.direction!.y * this.intensity * this.speed,
          z: this.direction!.z * this.intensity * this.speed,
        };
        this.body!.setNextPosition(Utils.Vector.add(this.body.position(), movement));
      }
    }
  }

  remove() {
    this.removeKeyEventListeners();
  }
}

registerAsyncComponent<MovementComponent, MovementComponentData>('movement', MovementComponent.initialize, {
  schema: {
    speed: { type: 'number', default: 0.07 },
    impulse: { type: 'boolean', default: true }
  },

  dependencies: ['body', 'collider'],
});

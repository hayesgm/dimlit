import { registerComponent } from 'aframe';
import { Body, Utils } from 'aframe-rapier';

registerComponent('movement', {
  schema: {},

  dependencies: ['body', 'collider'],

  body: null as null | Body.Body,
  impulsePoint: null as Utils.Vector.Vec3 | null,
  direction: null as Utils.Vector.Vec3 | null,
  intensity: 0,
  time: 0,

  init: async function () {
    this.direction = { x: 0, y: 0, z: 0 };
    this.impulsePoint = { x: 0, y: 0, z: 0 };
    let handControls = document.querySelectorAll('[hand-controls]');
    handControls.forEach((handControl) => {
      handControl.addEventListener('thumbstickmoved', this.logThumbstick.bind(this));
      handControl.addEventListener('triggerdown', this.jump.bind(this));
    });
    this.body = await Body.getBody(this.el);
    if (this.body === null) {
      throw new Error('Cannot use movement without attached body');
    }
    this.attachKeyEventListeners();
    this.body.rigidBody.setAngularDamping(1000);
  },

  remove: function () {
    this.removeKeyEventListeners();
  },

  move(dir: Utils.Vector.Vec3, time = 100, intensity = 0.14) {
    this.direction = dir;
    this.time = time;
    this.intensity = intensity;
  },

  attachKeyEventListeners() {
    window.addEventListener('keydown', this.onKeyPress.bind(this));
  },

  removeKeyEventListeners() {
    window.removeEventListener('keydown', this.onKeyPress);
  },

  onKeyPress(event: KeyboardEvent) {
    const keyMap: { [key: string]: Utils.Vector.Vec3 } = {
      T: { x: 0, y: 0, z: -1 },
      G: { x: 0, y: 0, z: 1 },
      F: { x: -1, y: 0, z: 0 },
      H: { x: 1, y: 0, z: 0 },
    };

    let key = String.fromCharCode(event.keyCode);
    if (keyMap[key]) {
      event.preventDefault();
      event.stopPropagation();
      this.move(keyMap[key], 100, 0.14);
    }
  },

  jump: function (event: any) {
    this.move({ x: 0, y: 1, z: 0 }, 100);
  },

  logThumbstick: function (event: any) {
    let direction = { x: 0, y: 0, z: 0 };
    if (event.detail.y > 0.95) {
      direction = { x: 0, y: 0, z: 1 };
    } else if (event.detail.y < -0.95) {
      direction = { x: 0, y: 0, z: -1 };
    } else if (event.detail.x < -0.95) {
      direction = { x: -1, y: 0, z: 0 };
    } else if (event.detail.x > 0.95) {
      direction = { x: 1, y: 0, z: 0 };
    }

    this.move(direction, 100, 0.07);
  },

  tick(time, delta) {
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
  },
});

import { Entity, THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
import { Mesh, MeshStandardMaterial, Object3D, Vector3 as ThreeVector3 } from 'super-three';
const { Vector3, Quaternion } = THREE;
import { debug } from '../debug';

let count = 10;

export interface Grabbable {
  vel(): ThreeVector3
}

registerComponent('grabbable', {
  schema: {
    oomph: { type: 'number', default: 1 }
  },

  i: 0,
  positions: [] as ThreeVector3[],
  times: [] as number[],
  body: null as null | Body.Body,

  init: async function () {
    this.body = await Body.getBody(this.el);
    for (let i = 0; i < count; i++) {
      this.positions[i] = new Vector3();
      this.times[i] = 0;
    }
  },

  tick: async function(time: number) {
    // TODO: Only do this for bodies when they are grabbed.

    let index = this.i++ % count;

    if (this.body) {
      let position = this.body.position();
      this.positions[index].x = position.x;
      this.positions[index].y = position.y;
      this.positions[index].z = position.z;
      this.body.rigidBody.wakeUp();
    }

    this.times[index] = time;
  },

  vel: function(): ThreeVector3 {
    let thisIndex = ( this.i - 1 ) % count;
    let lastIndex = this.i  % count;
    let thisPosition = this.positions[thisIndex];
    let lastPosition = this.positions[lastIndex];
    let deltaPos = thisPosition.clone().sub(lastPosition);
    let deltaTime = this.times[thisIndex] - this.times[lastIndex];
    // console.log("positions", this.positions);
    // console.log("times", this.times);
    // console.log("del pos", deltaPos, this.positions[thisIndex], this.positions[lastIndex]);
    // console.log("del time", deltaTime, this.times[thisIndex], this.times[lastIndex]);
    // console.log(this.i, { thisIndex, lastIndex });

    let vel = deltaPos.multiplyScalar(this.data.oomph * 1000 / deltaTime); // m/s
    debug(`vel: x=${vel.x.toFixed(3)}, y=${vel.y.toFixed(3)}, z=${vel.z.toFixed(3)}, deltaTime=${deltaTime.toFixed(3)}`);
    debug(`this: x=${thisPosition.x.toFixed(3)}, y=${thisPosition.y.toFixed(3)}, z=${thisPosition.z.toFixed(3)}`);
    debug(`last: x=${lastPosition.x.toFixed(3)}, y=${lastPosition.y.toFixed(3)}, z=${lastPosition.z.toFixed(3)}`);
    return vel;
  }
});

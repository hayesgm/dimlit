import { Entity, THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
import { Mesh, MeshStandardMaterial, Object3D } from 'super-three';
const { Vector3, Quaternion } = THREE;
import { debug } from '../debug';

registerComponent('grabbable', {
  schema: {},

  init: async function () {},
});

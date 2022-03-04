import * as AFRAME from 'aframe';
window.AFRAME = AFRAME;

// declare global {
//   interface Window {
//     Ammo: any;
//   }
// }

// const Ammo = require("ammo.js/builds/ammo.wasm.js");
// const AmmoWasm = require("ammo.js/builds/ammo.wasm.wasm");
// window.Ammo = Ammo.bind(undefined, {
//   locateFile(path: string) {
//     if (path.endsWith(".wasm")) {
//       return AmmoWasm;
//     }
//     return path;
//   }
// });

import 'aframe-physics-system';

import './change-color-on-hover';
import './log';

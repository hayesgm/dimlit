import {
  registerComponent,
  Component,
  Schema,
  MultiPropertySchema,
} from "aframe";
import { components, shaders } from "aframe";

registerComponent('log', {
  schema: {type: 'string'},

  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  }
});

declare global {
  interface Window {
    AFrame: any;
  }
}

window.AFrame = { components, shaders };

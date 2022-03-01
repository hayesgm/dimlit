import "./components";
import { components, shaders } from "aframe";

declare global {
  interface Window {
    AFrame: any;
  }
}

window.AFrame = { components, shaders };

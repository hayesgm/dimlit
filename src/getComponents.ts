import './components';
import { components, primitives, shaders } from 'aframe';

declare global {
  interface Window {
    AFrame: any;
  }
}

window.AFrame = { components, primitives, shaders };

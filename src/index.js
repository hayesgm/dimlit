"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("aframe");
const aframe_react_1 = require("aframe-react");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
class VRScene extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(aframe_react_1.Scene, null,
            react_1.default.createElement(aframe_react_1.Entity, { geometry: { primitive: 'box' }, material: { vertexColors: 'red' }, position: { x: 0, y: 0, z: -5 } }),
            react_1.default.createElement(aframe_react_1.Entity, { "particle-system": { preset: 'snow' } }),
            react_1.default.createElement(aframe_react_1.Entity, { light: { type: 'point' } }),
            react_1.default.createElement(aframe_react_1.Entity, { "gltf-model": { src: 'virtualcity.gltf' } }),
            react_1.default.createElement(aframe_react_1.Entity, { text: { value: 'Hello, WebVR!' } }),
            react_1.default.createElement(aframe_react_1.Entity, { text: { font: 'arial' } })));
    }
}
react_dom_1.default.render(react_1.default.createElement(VRScene, null), document.querySelector('#sceneContainer'));

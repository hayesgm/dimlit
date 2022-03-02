import { createElement } from './createElement'
import "aframe";
import "./components";

const scene = <a-scene>
      <a-entity
        geometry={{ primitive: "sphere" }}
        material={{ color: "red" }}
        position={{ x: 0, y: 0, z: -4 }}
        log={"hello world"}
        change-color-on-hover={{}}
      />
      <a-entity particle-system={{ preset: "snow" }} />
      <a-entity light={{ type: "point" }} />
      <a-entity gltf-model={{ src: "virtualcity.gltf" }} />
      <a-entity text={{ value: "Hello, WebVR!" }} />
      <a-entity id="rig" position={{x: -1, y: 1, z: 2}}>
        <a-camera>
          <a-cursor />
        </a-camera>
      </a-entity>
    </a-scene>;

document.addEventListener('DOMContentLoaded', (() => {
  document.querySelector("#sceneContainer").appendChild(scene);
}));

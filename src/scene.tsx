import { createElement } from './createElement';
import { version } from './version';

export const scene = () => (
  <a-scene renderer={{physicallyCorrectLights: true}}>
    <a-assets>
      <a-asset-item id="hoop" src="./assets/models/Hoop/scene.gltf"></a-asset-item>
      <a-asset-item id="ball" src="./assets/models/Basketball/scene.gltf"></a-asset-item>
      <a-asset-item id="floor-tex" src="./assets/textures/WoodFloor049_4K-JPG"></a-asset-item>
    </a-assets>
    <a-entity id="rig" position={{ x: -1, y: 1.6, z: 2 }}>
      <a-camera looks-controls>
        <a-cursor />
      </a-camera>
      <a-entity hand-controls={{ hand: 'left', handModelStyle: 'highPoly' }}></a-entity>
      <a-entity hand-controls={{ hand: 'right', handModelStyle: 'highPoly' }}></a-entity>
    </a-entity>
    <a-sky material={{ color: '#6EBAA7' }}></a-sky>
    <a-box material={{ color: 'red' }} position={{ x: 0, y: 0, z: -4 }} log={'hello world'} change-color-on-hover />
    <a-plane static-body={{shape: 'auto'}} material={{ color: 'blue' }} width={20} height={20} position={{ x: 0, y: 0, z: 0 }} rotation={{ x: -90, y: 0, z: 0 }} />
    <a-entity dynamic-body={{shape: 'hull'}} gltf-model="#hoop" scale={{ x: 0.01, y: 0.01, z: 0.01 }} rotation={{ x: 0, y: 180, z: 0 }} position={{ x: 0, y: 0, z: -3 }} />
    <a-entity dynamic-body={{shape: 'hull'}} gltf-model="#ball" scale={{ x: 0.01, y: 0.01, z: 0.01 }} position={{ x: 0, y: 2, z: -2 }} />
    <a-entity light={{ type: 'point' }} position={{ x: 0, y: 4, z: 2 }} />
    <a-entity text={{ value: `Version: ${version}`, color: 'green' }} position={{ x: 0, y: 1, z: -1 }} scale={{ x: 2, y: 2, z: 2 }} />
  </a-scene>
);

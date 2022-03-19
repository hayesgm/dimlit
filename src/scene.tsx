import { createElement } from './createElement';
import { version } from './version';

export const scene = () => (
  <a-scene
    rapier-physics={{ debug: true, autoSnap: 1000 }}
    renderer={{ physicallyCorrectLights: true }}
    fog={{ type: 'linear', color: '#AAA' }}
  >
    <a-assets>
      <a-asset-item id="hoop-model" src="./assets/models/Hoop/scene.gltf"></a-asset-item>
      <a-asset-item id="ball-model" src="./assets/models/Basketball/scene.gltf"></a-asset-item>
    </a-assets>
    <a-entity
      id="orb-hand"
      geometry={{ primitive: 'sphere', radius: 0.035 }}
      body={{ type: 'position', follow: true }}
      collider={{ shape: 'ball', wrap: false, size: { x: 0.07, y: 0.07, z: 0.07 }, sensor: true }}
      grabber={{ mouse: true }}
      position={{ x: -0.5, y: 1.7, z: 0 }}
      movement={{ impulse: false, speed: 0.02 }}
    ></a-entity>
    <a-entity
      id="rig"
      movement={{ impulse: false, speed: 0.05 }}
      position={{ x: 0, y: 0.8, z: 4 }}
      body={{ type: 'position', ccd: true }}
      collider={{ shape: 'box', wrap: false, size: { x: 0.5, y: 1.6, z: 0.2 }, sensor: true }}
    >
      <a-camera looks-controls wasd-controls></a-camera>
      <a-entity
        id="left-hand"
        hand-controls={{ hand: 'left', handModelStyle: 'highPoly' }}
        body={{ type: 'position', follow: false }}
        collider={{ shape: 'ball', wrap: false, size: { x: 0.07, y: 0.07, z: 0.07 }, sensor: true }}
        from-mesh
        grabber
      ></a-entity>
      <a-entity
        id="right-hand"
        hand-controls={{ hand: 'right', handModelStyle: 'highPoly' }}
        body={{ type: 'position', follow: false }}
        collider={{ shape: 'ball', wrap: false, size: { x: 0.07, y: 0.07, z: 0.07 }, sensor: true }}
        from-mesh
        grabber
      ></a-entity>
    </a-entity>
    <a-sky material={{ color: '#6EBAA7' }}></a-sky>
    <a-plane
      id="floor"
      body={{ type: 'static' }}
      collider={{ shape: 'box' }}
      material={{ color: 'blue' }}
      width={30}
      height={30}
      position={{ x: 0, y: 0, z: 0 }}
      rotation={{ x: -90, y: 0, z: 0 }}
    />
    {
      <a-entity
        id="hoop"
        body={{ ccd: true }}
        collider={{ shape: 'box', density: 4 }}
        gltf-model="#hoop-model"
        scale={{ x: 0.01, y: 0.01, z: 0.01 }}
        rotation={{ x: 0, y: 180, z: 0 }}
        position={{ x: 0, y: 0, z: -3 }}
        grabbable
      />
    }
    <a-entity
      id="ball"
      body={{ ccd: true, linDamp: 0.3 }}
      collider={{ shape: 'ball', density: 0.2, restitution: 0.7, restitutionCombineRule: 'max' }}
      gltf-model="#ball-model"
      scale={{ x: 0.01, y: 0.01, z: 0.01 }}
      position={{ x: -1, y: 3.5, z: 1.5 }}
      // track={{ body: '#right-hand' }}
      translation={{ x: 0, y: -12, z: 0 }}
      grabbable
    />
    <a-box
      id="pedistool"
      geometry={{ width: 0.5, height: 1.5, depth: 0.5 }}
      body={{ type: 'static' }}
      material={{ color: 'lightblue' }}
      position={{ x: -1, y: 0.75, z: 1.5 }}
      collider={{ wrap: false, size: { x: 0.5, y: 1.5, z: 0.5 } }}
    />
    <a-entity light={{ type: 'point' }} position={{ x: 0, y: 4, z: 2 }} />
    <a-entity
      id="debugger"
      text={{ value: `Version: ${version}`, color: 'green' }}
      position={{ x: 0, y: 1, z: -1 }}
      scale={{ x: 2, y: 2, z: 2 }}
    />
  </a-scene>
);

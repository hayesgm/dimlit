export type SubMap = Record<string, keyof MapSchemaTypes>;
export type ObjectMap = Record<string, SubMap>;
export type MapSchemaTypes = {
  string: string;
  boolean: boolean;
  number: number;
  vec2: {x: number, y: number};
  vec3: {x: number, y: number, z: number};
  color: string;
  audio: string;
  selector: string;
  map: object;
  array: any[];
  model: string;
  asset: string;
  int: BigInt;
}

export const types = {
  "portal": {
    "borderEnabled": "int",
    "backgroundColor": "color",
    "pano": "map",
    "strokeColor": "color"
  },
  "flat": {
    "color": "color",
    "fog": "boolean",
    "height": "number",
    "offset": "vec2",
    "repeat": "vec2",
    "src": "map",
    "width": "number",
    "wireframe": "boolean",
    "wireframeLinewidth": "number"
  },
  "standard": {
    "ambientOcclusionMap": "map",
    "ambientOcclusionMapIntensity": "number",
    "ambientOcclusionTextureOffset": "vec2",
    "ambientOcclusionTextureRepeat": "vec2",
    "color": "color",
    "displacementMap": "map",
    "displacementScale": "number",
    "displacementBias": "number",
    "displacementTextureOffset": "vec2",
    "displacementTextureRepeat": "vec2",
    "emissive": "color",
    "emissiveIntensity": "number",
    "envMap": "string",
    "fog": "boolean",
    "height": "number",
    "metalness": "number",
    "metalnessMap": "map",
    "metalnessTextureOffset": "vec2",
    "metalnessTextureRepeat": "vec2",
    "normalMap": "map",
    "normalScale": "vec2",
    "normalTextureOffset": "vec2",
    "normalTextureRepeat": "vec2",
    "offset": "vec2",
    "repeat": "vec2",
    "roughness": "number",
    "roughnessMap": "map",
    "roughnessTextureOffset": "vec2",
    "roughnessTextureRepeat": "vec2",
    "sphericalEnvMap": "map",
    "src": "map",
    "width": "number",
    "wireframe": "boolean",
    "wireframeLinewidth": "number"
  },
  "phong": {
    "color": "color",
    "emissive": "color",
    "emissiveIntensity": "number",
    "specular": "color",
    "transparent": "boolean",
    "fog": "boolean",
    "offset": "vec2",
    "repeat": "vec2",
    "src": "map",
    "envMap": "string",
    "sphericalEnvMap": "map",
    "shininess": "number",
    "flatShading": "boolean",
    "wireframe": "boolean",
    "wireframeLinewidth": "number",
    "combine": "string",
    "reflectivity": "number",
    "refractionRatio": "number",
    "refract": "boolean",
    "normalMap": "map",
    "normalScale": "vec2",
    "normalTextureOffset": "vec2",
    "normalTextureRepeat": "vec2",
    "displacementMap": "map",
    "displacementScale": "number",
    "displacementBias": "number",
    "displacementTextureOffset": "vec2",
    "displacementTextureRepeat": "vec2",
    "bumpMap": "map",
    "bumpMapScale": "number",
    "bumpTextureOffset": "vec2",
    "bumpTextureRepeat": "vec2"
  },
  "sdf": {
    "alphaTest": "number",
    "color": "color",
    "map": "map",
    "opacity": "number"
  },
  "msdf": {
    "alphaTest": "number",
    "color": "color",
    "map": "map",
    "negate": "boolean",
    "opacity": "number"
  },
  "ios10hls": {
    "src": "map",
    "opacity": "number"
  },
  "shadow": {
    "opacity": "number",
    "transparent": "boolean",
    "alphaToCoverage": "boolean",
    "cast": "boolean",
    "receive": "boolean",
    "enabled": "boolean",
    "autoUpdate": "boolean",
    "type": "string"
  },
  "animation": {
    "autoplay": "boolean",
    "delay": "number",
    "dir": "string",
    "dur": "number",
    "easing": "string",
    "elasticity": "number",
    "enabled": "boolean",
    "from": "string",
    "loop": "number",
    "property": "string",
    "startEvents": "array",
    "pauseEvents": "array",
    "resumeEvents": "array",
    "round": "boolean",
    "to": "string",
    "type": "string",
    "isRawProperty": "boolean"
  },
  "camera": {
    "active": "boolean",
    "far": "number",
    "fov": "number",
    "near": "number",
    "spectator": "boolean",
    "zoom": "number"
  },
  "cursor": {
    "downEvents": "array",
    "fuse": "boolean",
    "fuseTimeout": "number",
    "mouseCursorStylesEnabled": "boolean",
    "upEvents": "array",
    "rayOrigin": "string"
  },
  "daydream-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonTouchedColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3",
    "armModel": "boolean"
  },
  "gearvr-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonTouchedColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3",
    "armModel": "boolean"
  },
  "geometry": {
    "buffer": "boolean",
    "primitive": "string",
    "skipCache": "boolean"
  },
  "generic-tracked-controller-controls": {
    "hand": "string",
    "defaultModel": "boolean",
    "defaultModelColor": "string",
    "orientationOffset": "vec3",
    "disabled": "boolean"
  },
  "gltf-model": {
    "0": "m",
    "1": "o",
    "2": "d",
    "3": "e",
    "4": "l",
    "dracoDecoderPath": "string",
    "meshoptDecoderPath": "string"
  },
  "hand-tracking-controls": {
    "hand": "string",
    "modelStyle": "string",
    "modelColor": "string"
  },
  "hand-controls": {
    "color": "color",
    "hand": "string",
    "handModelStyle": "string"
  },
  "hide-on-enter-ar": {},
  "hp-mixed-reality-controls": {
    "hand": "string",
    "model": "boolean",
    "orientationOffset": "vec3"
  },
  "layer": {
    "type": "string",
    "src": "map",
    "rotateCubemap": "boolean",
    "width": "number",
    "height": "number"
  },
  "laser-controls": {
    "hand": "string",
    "model": "boolean",
    "defaultModelColor": "color"
  },
  "light": {
    "angle": "number",
    "color": "color",
    "envMap": "string",
    "groundColor": "color",
    "decay": "number",
    "distance": "number",
    "intensity": "number",
    "penumbra": "number",
    "type": "string",
    "target": "selector",
    "castShadow": "boolean",
    "shadowBias": "number",
    "shadowCameraFar": "number",
    "shadowCameraFov": "number",
    "shadowCameraNear": "number",
    "shadowCameraTop": "number",
    "shadowCameraRight": "number",
    "shadowCameraBottom": "number",
    "shadowCameraLeft": "number",
    "shadowCameraVisible": "boolean",
    "shadowMapHeight": "number",
    "shadowMapWidth": "number",
    "shadowRadius": "number",
    "defaultLightsEnabled": "boolean"
  },
  "line": {
    "start": "vec3",
    "end": "vec3",
    "color": "color",
    "opacity": "number",
    "visible": "boolean"
  },
  "link": {
    "backgroundColor": "color",
    "borderColor": "color",
    "highlighted": "boolean",
    "highlightedColor": "color",
    "href": "string",
    "image": "asset",
    "on": "string",
    "peekMode": "boolean",
    "title": "string",
    "titleColor": "color",
    "visualAspectEnabled": "boolean"
  },
  "look-controls": {
    "enabled": "boolean",
    "magicWindowTrackingEnabled": "boolean",
    "pointerLockEnabled": "boolean",
    "reverseMouseDrag": "boolean",
    "reverseTouchDrag": "boolean",
    "touchEnabled": "boolean",
    "mouseEnabled": "boolean"
  },
  "magicleap-controls": {
    "hand": "string",
    "model": "boolean",
    "orientationOffset": "vec3"
  },
  "material": {
    "alphaTest": "number",
    "depthTest": "boolean",
    "depthWrite": "boolean",
    "flatShading": "boolean",
    "npot": "boolean",
    "offset": "vec2",
    "opacity": "number",
    "repeat": "vec2",
    "shader": "string",
    "side": "string",
    "transparent": "boolean",
    "vertexColors": "string",
    "visible": "boolean",
    "blending": "string",
    "dithering": "boolean",
    "ambientOcclusionMap": "map",
    "ambientOcclusionMapIntensity": "number",
    "ambientOcclusionTextureOffset": "vec2",
    "ambientOcclusionTextureRepeat": "vec2",
    "color": "color",
    "displacementMap": "map",
    "displacementScale": "number",
    "displacementBias": "number",
    "displacementTextureOffset": "vec2",
    "displacementTextureRepeat": "vec2",
    "emissive": "color",
    "emissiveIntensity": "number",
    "envMap": "string",
    "fog": "boolean",
    "height": "number",
    "metalness": "number",
    "metalnessMap": "map",
    "metalnessTextureOffset": "vec2",
    "metalnessTextureRepeat": "vec2",
    "normalMap": "map",
    "normalScale": "vec2",
    "normalTextureOffset": "vec2",
    "normalTextureRepeat": "vec2",
    "roughness": "number",
    "roughnessMap": "map",
    "roughnessTextureOffset": "vec2",
    "roughnessTextureRepeat": "vec2",
    "sphericalEnvMap": "map",
    "src": "map",
    "width": "number",
    "wireframe": "boolean",
    "wireframeLinewidth": "number"
  },
  "obj-model": {
    "mtl": "model",
    "obj": "model"
  },
  "oculus-go-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonTouchedColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3",
    "armModel": "boolean"
  },
  "oculus-touch-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonTouchColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "controllerType": "string",
    "orientationOffset": "vec3"
  },
  "position": {
    "0": "v",
    "1": "e",
    "2": "c",
    "3": "3"
  },
  "raycaster": {
    "autoRefresh": "boolean",
    "direction": "vec3",
    "enabled": "boolean",
    "far": "number",
    "interval": "number",
    "near": "number",
    "objects": "string",
    "origin": "vec3",
    "showLine": "boolean",
    "lineColor": "string",
    "lineOpacity": "number",
    "useWorldCoordinates": "boolean"
  },
  "rotation": {
    "0": "v",
    "1": "e",
    "2": "c",
    "3": "3"
  },
  "scale": {
    "0": "v",
    "1": "e",
    "2": "c",
    "3": "3"
  },
  "sound": {
    "autoplay": "boolean",
    "distanceModel": "string",
    "loop": "boolean",
    "maxDistance": "number",
    "on": "string",
    "poolSize": "number",
    "positional": "boolean",
    "refDistance": "number",
    "rolloffFactor": "number",
    "src": "audio",
    "volume": "number"
  },
  "text": {
    "align": "string",
    "alphaTest": "number",
    "anchor": "string",
    "baseline": "string",
    "color": "color",
    "font": "string",
    "fontImage": "string",
    "height": "number",
    "letterSpacing": "number",
    "lineHeight": "number",
    "negate": "boolean",
    "opacity": "number",
    "shader": "string",
    "side": "string",
    "tabSize": "number",
    "transparent": "boolean",
    "value": "string",
    "whiteSpace": "string",
    "width": "number",
    "wrapCount": "number",
    "wrapPixels": "number",
    "xOffset": "number",
    "yOffset": "number",
    "zOffset": "number"
  },
  "tracked-controls": {
    "autoHide": "boolean",
    "controller": "number",
    "id": "string",
    "hand": "string",
    "idPrefix": "string",
    "handTrackingEnabled": "boolean",
    "orientationOffset": "vec3",
    "armModel": "boolean",
    "headElement": "selector",
    "iterateControllerProfiles": "boolean"
  },
  "tracked-controls-webvr": {
    "autoHide": "boolean",
    "controller": "number",
    "id": "string",
    "hand": "string",
    "idPrefix": "string",
    "orientationOffset": "vec3",
    "armModel": "boolean",
    "headElement": "selector"
  },
  "tracked-controls-webxr": {
    "id": "string",
    "hand": "string",
    "handTrackingEnabled": "boolean",
    "index": "int",
    "iterateControllerProfiles": "boolean"
  },
  "visible": {
    "0": "b",
    "1": "o",
    "2": "o",
    "3": "l",
    "4": "e",
    "5": "a",
    "6": "n"
  },
  "valve-index-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3"
  },
  "vive-controls": {
    "hand": "string",
    "buttonColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3"
  },
  "vive-focus-controls": {
    "hand": "string",
    "buttonTouchedColor": "color",
    "buttonHighlightColor": "color",
    "model": "boolean",
    "orientationOffset": "vec3",
    "armModel": "boolean"
  },
  "wasd-controls": {
    "acceleration": "number",
    "adAxis": "string",
    "adEnabled": "boolean",
    "adInverted": "boolean",
    "enabled": "boolean",
    "fly": "boolean",
    "wsAxis": "string",
    "wsEnabled": "boolean",
    "wsInverted": "boolean"
  },
  "windows-motion-controls": {
    "hand": "string",
    "pair": "number",
    "model": "boolean",
    "hideDisconnected": "boolean"
  },
  "ar-hit-test": {
    "target": "selector",
    "enabled": "boolean",
    "src": "map",
    "type": "string",
    "footprintDepth": "number",
    "mapSize": "vec2"
  },
  "background": {
    "color": "color",
    "transparent": "boolean"
  },
  "debug": {
    "0": "b",
    "1": "o",
    "2": "o",
    "3": "l",
    "4": "e",
    "5": "a",
    "6": "n"
  },
  "device-orientation-permission-ui": {
    "enabled": "boolean",
    "deviceMotionMessage": "string",
    "httpsMessage": "string",
    "denyButtonText": "string",
    "allowButtonText": "string",
    "cancelButtonText": "string"
  },
  "embedded": {
    "0": "b",
    "1": "o",
    "2": "o",
    "3": "l",
    "4": "e",
    "5": "a",
    "6": "n"
  },
  "inspector": {
    "url": "string"
  },
  "fog": {
    "color": "color",
    "density": "number",
    "far": "number",
    "near": "number",
    "type": "string"
  },
  "keyboard-shortcuts": {
    "enterVR": "boolean",
    "exitVR": "boolean"
  },
  "pool": {
    "container": "string",
    "mixin": "string",
    "size": "number",
    "dynamic": "boolean"
  },
  "reflection": {
    "directionalLight": "selector"
  },
  "screenshot": {
    "width": "number",
    "height": "number",
    "camera": "selector"
  },
  "stats": {
    "0": "b",
    "1": "o",
    "2": "o",
    "3": "l",
    "4": "e",
    "5": "a",
    "6": "n"
  },
  "vr-mode-ui": {
    "enabled": "boolean",
    "enterVRButton": "string",
    "enterARButton": "string"
  },
  "pivot": {
    "0": "v",
    "1": "e",
    "2": "c",
    "3": "3"
  },
  "body": {
    "type": "string",
    "follow": "boolean",
    "linVel": "vec3",
    "angVel": "vec3",
    "linDamp": "number",
    "angDamp": "number",
    "gravityScale": "number",
    "canSleep": "boolean",
    "ccd": "boolean"
  },
  "collider": {
    "shape": "string",
    "wrap": "boolean",
    "size": "vec3",
    "translation": "vec3",
    "density": "number",
    "friction": "number",
    "restitution": "number",
    "restitutionCombineRule": "string",
    "sensor": "boolean"
  },
  "track": {
    "body": "selector"
  },
  "grow-on-collision": {
    "factor": "number"
  },
  "log": {
    "0": "s",
    "1": "t",
    "2": "r",
    "3": "i",
    "4": "n",
    "5": "g"
  },
  "movement": {},
  "grabber": {},
  "renderer": {
    "antialias": "string",
    "highRefreshRate": "boolean",
    "logarithmicDepthBuffer": "string",
    "maxCanvasWidth": "number",
    "maxCanvasHeight": "number",
    "physicallyCorrectLights": "boolean",
    "precision": "string",
    "sortObjects": "boolean",
    "colorManagement": "boolean",
    "gammaOutput": "boolean",
    "alpha": "boolean",
    "foveationLevel": "number"
  },
  "webxr": {
    "referenceSpaceType": "string",
    "requiredFeatures": "array",
    "optionalFeatures": "array",
    "overlayElement": "selector"
  },
  "rapier-physics": {
    "debug": "boolean",
    "paused": "boolean",
    "autoSnap": "number"
  }
} as const;

export const aTypes = {
  "a-camera": {},
  "a-cursor": {},
  "a-curvedimage": {},
  "a-gltf-model": {},
  "a-image": {},
  "a-light": {},
  "a-link": {},
  "a-obj-model": {},
  "a-box": {},
  "a-circle": {},
  "a-cone": {},
  "a-cylinder": {},
  "a-dodecahedron": {},
  "a-icosahedron": {},
  "a-octahedron": {},
  "a-plane": {},
  "a-ring": {},
  "a-sphere": {},
  "a-tetrahedron": {},
  "a-torus": {},
  "a-torus-knot": {},
  "a-triangle": {},
  "a-sky": {},
  "a-sound": {},
  "a-text": {},
  "a-video": {},
  "a-videosphere": {},
  "a-scene": {},
  "a-entity": {},
  "a-node": {},
  "a-assets": {},
  "a-asset-item": {},
  "a-cubemap": {}
} as const;

export type PropTypes<U extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof U]?: MapSchemaTypes[U[K]]
}

export type MapSchema<T extends Record<string, SubMap | keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]?: T[K] extends SubMap ? ( PropTypes<T[K]> | true ) : ( T[K] extends keyof MapSchemaTypes ? MapSchemaTypes[T[K]] : unknown )
} & {
  -readonly [K in keyof HTMLImageElement]?: HTMLImageElement[K]
}

declare global {
  namespace JSX {
    type IntrinsicElements = {
      -readonly [K in keyof typeof aTypes]: MapSchema<typeof types>;
    }
  }
}

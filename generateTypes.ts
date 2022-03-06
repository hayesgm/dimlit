import { DOMWindow, JSDOM } from 'jsdom';
import { XMLHttpRequest } from 'xmlhttprequest';

global.window = new JSDOM().window as any;
global.navigator = global.window.navigator;
global.document = global.window.document;
global.self = global.window;
global.XMLHttpRequest = XMLHttpRequest;

import {
  ObjectMap,
  Entity,
  Component,
  ComponentDescriptor,
  System,
  components,
  primitives,
  shaders,
  version,
  systems,
} from 'aframe';
import { writeFileSync } from 'fs';
import './src/components';

type Components = ObjectMap<ComponentDescriptor<Component<any, System<any>>>>;

function fileTemplate(components: Components, primitives: string[]) {
  return `export type SubMap = Record<string, keyof MapSchemaTypes>;
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

export const types = ${JSON.stringify(components, null, 2)} as const;

export const aTypes = ${JSON.stringify(Object.fromEntries(primitives.map((k) => [k, {}])), null, 2)} as const;

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
`;
}

let systemMap = Object.fromEntries(
  Object.entries(systems).map(([name, system]) => {
    return [name, system.prototype];
  })
);
let all = [...Object.entries(shaders), ...Object.entries(components), ...Object.entries(systemMap)];

let mapped = all.reduce<any>((acc, [k, v]: any) => {
  let schema = v.schema;
  let value;
  if (typeof schema.type === 'string') {
    value = schema.type;
  } else {
    value = Object.fromEntries(Object.entries(schema).map(([name, type]: any) => [name, type.type]));
  }
  return {
    ...acc,
    [k]: {
      ...(acc[k] || {}),
      ...value,
    },
  };
}, {});

mapped.material = {
  ...mapped.material,
  ...mapped.standard,
};

let allPrimitives = [
  ...Object.keys(primitives.primitives),
  'a-scene',
  'a-entity',
  'a-node',
  'a-assets',
  'a-asset-item',
  'a-cubemap',
];

writeFileSync('types/jsx/index.d.ts', fileTemplate(mapped, allPrimitives));

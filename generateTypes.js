const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

function fileTemplate(components) {
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
  model: { src: string };
  asset: string;
  int: BigInt;
}

export const types = ${JSON.stringify(components, null, 4)} as const;

export type PropTypes<U extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof U]?: MapSchemaTypes[U[K]]
}

export type MapSchema<T extends Record<string, SubMap>> = {
  -readonly [K in keyof T]?: T[K] extends string ? MapSchemaTypes[T[K]] : PropTypes<T[K]>
}

export type EntityC = MapSchema<typeof types>;

declare module 'aframe-react' {
  export class Entity extends React.Component<EntityC> {};
  export class Scene extends React.Component<any> {};
}
`;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page
    .on('console', (message) => {
      console.log(`Console: ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`);
    }).on("pageerror", function(err) {  
      theTempValue = err.toString();
      console.log("Page error: " + theTempValue); 
    });

  await page.addScriptTag({path: path.join(__dirname, 'dist', "getComponents.js")});

  const { components, shaders, mapped } = await page.evaluate(() => {
    function loop(done) {
      console.log(window.AFrame);
      if (window.AFrame) {
        done([window.AFrame.components, window.AFrame.shaders]);
      } else {
        setTimeout(() => {
          loop(done)
        }, 1000);
      }
    }

    let p = new Promise((resolve, reject) => {
      loop(resolve);
    });

    return p.then(([components, shaders]) => {
      let all = {
        ...shaders,
        ...components,
      }
      let mapped = Object.fromEntries(Object.entries(all).map(([k, v]) => {
        console.log("hi", k, JSON.stringify(v));
        console.log("schema", v.schema);
        console.log("schema.type", v.schema.type);
        let schema = v.schema;
        let value;
        if (typeof(schema.type) === 'string') {
          value = schema.type;
        } else {
          value = Object.fromEntries(Object.entries(schema).map(([name, type]) => [name, type.type]));
        }
        console.log({value});
        return [k, value];
      }));
      mapped.material = {
        ...mapped.material,
        ...mapped.standard,
      };
      return { components, shaders, mapped };
    });
  });
  console.log(Object.entries(components).map(([name, value]) => [name, value.schema]));
  console.log(Object.entries(shaders).map(([name, value]) => [name, value.schema]));
  await browser.close();
  fs.writeFileSync('types/aframe-react/index.d.ts', fileTemplate(mapped));
})();

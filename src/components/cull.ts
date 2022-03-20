import { THREE, registerComponent } from 'aframe';
import { Object3D, Group, Matrix4 } from 'super-three';
import { Utils } from 'aframe-rapier';
let { Object3D: ThreeObject3D, Vector3, Euler } = THREE;

function splitBy<A>(els: A[], pred: (x: A) => boolean): [A[], A[]] {
  return els.reduce(([pass, fail]: [A[], A[]], el) => {
    if (pred(el)) {
      return [[...pass, el], fail];
    } else {
      return [pass, [...fail, el]];
    }
  }, [[], []]);
}

export function splitOff(model: Object3D, asset: string): Object3D[] {
  return splitOffInternal([[model, []]], [], asset).map(([obj, paths]) => obj);
}

type ObjectMatrixPath = [Object3D, Matrix4[]];

function splitOffInternal(models: ObjectMatrixPath[], found: ObjectMatrixPath[], split: string): ObjectMatrixPath[] {
  if (models.length === 0) {
    return found;
  } else {
    let [[model, matrices], ...modelsRest] = models;
    let matrixPath = [...matrices, model.matrix];
    // console.log(`checking split off ${model.name} for ${split}`)
    let childrenMatrices = model.children.map<ObjectMatrixPath>((child) => [child, matrixPath]);
    let [match, els] = splitBy(childrenMatrices, ([child, matrixPath]) => child.name === split);
    if (match.length > 0) {
      model.remove(...match.map((m) => m[0]));
    }
    return splitOffInternal([...modelsRest, ...els], [...found, ...match], split);
  }
}

registerComponent('cull', {
  schema: {
    asset: { type: 'array' },
    keep: { type: 'boolean', default: false },
  },

  init: function () {
    let data = Utils.Schema.fixSchema(this.data, this.schema as any);
    let el = this.el;
    el.addEventListener('model-loaded', function() {
      let object3D = el.getObject3D('mesh');
      let group = new ThreeObject3D();
      data.asset.forEach((asset: string) => {
        let res = splitOff(object3D, asset);
        group.add(...res);
      });
      if (data.keep) {
        el.setObject3D('mesh', group);
      }
    });
  }
});

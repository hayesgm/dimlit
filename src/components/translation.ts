import { THREE, registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';
const { Group } = THREE;

registerComponent('translation', {
  schema: { type: 'vec3' },

  init: function () {
    let data = Utils.Schema.fixSchema(this.data, this.schema as any);
    var el = this.el;
    let pos = this.data;
    this.el.addEventListener('model-loaded', function() {
      let object3D = el.getObject3D('mesh');
      let group = new Group();
      group.position.set(pos.x, pos.y, pos.z);
      for (let child of object3D.children) {
        console.log({child})
        group.add(child);
      }
      object3D.add(group);
    });
  }
});

import { registerComponent } from 'aframe';
import { Body, Utils, System } from 'aframe-rapier';

registerComponent('grow-on-collision', {
  schema: {
    factor: { type: 'number', default: 1.5 },
  },

  init: function () {
    let data = Utils.Schema.fixSchema(this.data, this.schema as any);
    var el = this.el;
    let originalScale = el.getAttribute('scale');

    // el.addEventListener('collide', function () {
    //   el.setAttribute('scale', Utils.Vector.mulScalar(originalScale, data.factor));
    // });
  }
});

import { registerComponent } from 'aframe';

registerComponent('log', {
  schema: { type: 'string' },

  init: function () {
    var stringToLog = this.data;
    console.log('Log', stringToLog);
  },
});

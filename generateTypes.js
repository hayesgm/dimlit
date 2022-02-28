// const navigator = { userAgent: 'test' };
// global['window'] = { navigator, screen: { width: 0, height: 0}, addEventListener: function() {}};
// global['navigator'] = { navigator };
// require('node-window-polyfill/register');
// global['window'].screen = { width: 1, height: 1 };
// let n = { appendChild: function() {}, setAttribute: function() {} };
// const c = function() { return n };
// global['document'] = { head: n, createElement: c, createTextNode: c};
// global['window'].document = document;
// global['window'].location = new URL("http://example.com");
// global['navigator'] = window.navigator;
// global['navigator'].userAgent = 'agent';
// console.log(navigator.userAgent);

// const WindowMock = require('window-mock');
// console.log(WindowMock);
// global['window'] = new WindowMock.default();
// global['window'].screen = { width: 1, height: 1 };
// global['window'].addEventListener = function () {};
// console.log(window.navigator);
// global['navigator'] = window.navigator;
// global['navigator'].userAgent = 'agent';
// console.log(window.navigator.userAgent);

var MockBrowser = require('mock-browser').mocks.MockBrowser;
global['window'] = new MockBrowser();
global['window'].document = global['window'].getDocument();
global['window'].navigator = global['window'].getNavigator();
global['navigator'] = global['window'].navigator;
global['window'].screen = { width: 1, height: 1 };
global['window'].addEventListener = function () {};
global['window'].location = global['window'].getLocation();
global['document'] = global['window'].document;
console.log(global['window']);

const { components } = require('aframe');
const fs = require('fs');
const path = require('path');

let componentMap = Object.fromEntries(Object.entries(components).map(([k, v]) => {
  return [k, Object.fromEntries(Object.entries(v.schema).map(([name, type]) => [name, type.type]))];
}));

fs.writeFileSync(path.join('types', 'aframe-react', 'components.ts'), JSON.stringify(componentMap));

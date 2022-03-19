import { Entity } from 'aframe';

export function debug(message: string, id: string = 'debugger') {
  let debuggerEl = document.getElementById(id) as Entity;
  if (debuggerEl) {
    let textValue = debuggerEl.getAttribute('text');
    let currentText = textValue['value'] || '';
    debuggerEl.setAttribute('text', { ...textValue, value: `${currentText}\n${message}` });
  }
}

import { utils } from 'aframe';

let elementMap: Map<string, HTMLElement> = new Map();

// Allow searching of elements not yet in document
let getElementById_ = document.getElementById;
document.getElementById = function(id: string) {
  if (elementMap.has(id)) {
    return elementMap.get(id)!;
  } else {
    return getElementById_.call(document, id);
  }
}

const appendChild = (
  parent: HTMLElement,
  child: HTMLElement | HTMLElement[] | string
) => {
  if (Array.isArray(child)) {
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  } else {
    parent.appendChild(
      typeof child === "string" ? document.createTextNode(child) : child
    );
  }
};

export const createElement = (
  tag: string,
  props: object,
  ...children: HTMLElement[]
): HTMLElement => {
  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith("on") && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      if (name === 'id') {
        element.id = value;
        elementMap.set(value, element);
      } else {
        if (name === 'physics') {
          value = utils.styleParser.stringify(value);
          console.log({name, value});
        }
        // element.setAttribute(name, value);
        utils.entity.setComponentProperty(element, name, value);
      }
    }
  });

  children.forEach((child) => {
    appendChild(element, child);
  });

  return element;
};

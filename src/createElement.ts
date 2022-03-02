

const appendChild = (
  parent: HTMLElement,
  child: HTMLElement | HTMLElement[]
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
      console.log("Setting attribute: ", name, value)
      element.setAttribute(name, value);
    }
  });

  children.forEach((child) => {
    appendChild(element, child);
  });

  return element;
};

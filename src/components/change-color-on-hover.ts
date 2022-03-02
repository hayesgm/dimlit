import { registerComponent } from "aframe";

registerComponent("change-color-on-hover", {
  schema: {
    color: { default: "blue" },
  },

  init: function () {
    var data = this.data;
    var el = this.el; // <a-box>
    var defaultColor = el.getAttribute("material").color;

    el.addEventListener("mouseenter", function () {
      console.log('mouse enter', el);
      el.setAttribute("material", { color: 'green' });
    });

    el.addEventListener("mouseleave", function () {
      console.log('mouse leave');
      el.setAttribute("material", { color: defaultColor });
    });
  },
});

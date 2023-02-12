import { Directive } from "vue";
export const changeThemeDirective: {
  name: string;
  getOption: () => Directive;
} = {
  name: "change-theme",
  getOption() {
    return {
      beforeMount(el: HTMLElement, binding, vnode, prevVnode) {
        const { theme, attributes, light, dark } = binding.value;
        attributes.forEach((item: any, index: number) => {
          el.style[attributes[index]] = theme ? light[index] : dark[index];
        });
      },
      beforeUpdate(el: HTMLElement, binding, vnode, prevVnode) {
        const { theme, attributes, light, dark } = binding.value;
        attributes.forEach((item: any, index: number) => {
          el.style[attributes[index]] = theme ? light[index] : dark[index];
        });
      },
    };
  },
};

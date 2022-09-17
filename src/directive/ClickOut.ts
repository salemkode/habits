import { Directive } from "vue";

export const clickOutSide: Directive = {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
    console.log(el);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export default clickOutSide;

<template>
  <div class="color-ring">
    <div
      class="color"
      v-for="color in colors"
      :style="{
        background: color,
      }"
      :class="{
        active: selected === color,
      }"
      :key="color"
      @click="selected = color"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
const colors = ["#f16567", "#2ec977", "#5666f3", "#af8f72", "#9186f6"] as const;
type color = typeof colors[number];

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<color>,
      // eslint-disable-next-line vue/valid-define-props
      default: colors[0],
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    //
    const selected = ref<color>(props.modelValue);
    watch(selected, () => ctx.emit("update:modelValue", selected.value));

    return {
      colors,
      selected,
    };
  },
});
</script>

<style scoped lang="scss">
.color-ring {
  display: flex;
  margin: 10px 0;
  justify-content: space-between;

  .color {
    width: 35px;
    height: 35px;
    margin: 10px 0;
    overflow: hidden;
    border-radius: 100px;
    position: relative;

    &.active::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #ffffff5e;
      margin: auto;
      width: 0.95em;
      height: 0.95em;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      background-color: white;
      display: block;
      z-index: 2;
    }

    &.active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgb(0 0 0 / 37%);
    }
  }
}
</style>

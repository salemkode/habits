<template>
  <label
    class="btn-toggle ms-auto"
    :class="{ active: checked }"
    :style="{
      '--toggle-color': props.color,
    }"
    :for="id"
  >
    <input type="checkbox" class="ms-auto" v-model="checked" :id="id" />
    <div class="handle" />
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const id = Math.random() + "";

//
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#ffc107",
  },
});

//
const checked = ref(props.modelValue);
watch(checked, () => emit("update:modelValue", checked.value));
</script>

<style scoped lang="scss">
.btn-toggle {
  padding: 0;
  position: relative;
  border: none;
  height: 1.5rem;
  width: 3rem;
  border-radius: 1.5rem;
  color: #6b7381;
  background: #bdc1c8;
  --toggle-color: #ffc107;

  input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  &:before,
  &:after {
    line-height: 1.5rem;
    width: 4rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    transition: opacity 0.25s;
  }
  & > .handle {
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 1.125rem;
    background: #fff;
    transition: left 0.25s;
  }
  &.active {
    transition: background-color 0.25s;
  }
  &.active > .handle {
    left: 1.6875rem;
    transition: left 0.25s;
  }
  &.active:before {
    opacity: 0.5;
  }
  &.active:after {
    opacity: 1;
  }
  &.active {
    background-color: var(--toggle-color);
  }
}
</style>

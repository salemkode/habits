<template>
  <header class="view-header container">
    <router-link to="/">
      <img src="@/assets/icons/left.svg" height="23" />
    </router-link>
    <input
      type="text"
      class="form-control"
      :value="props.modelValue"
      @change="changeInput"
      :disabled="!editMode"
    />
    <img
      src="@/assets/icons/edit.svg"
      @click="editMode = !editMode"
      height="23"
    />
  </header>
</template>

<script setup lang="ts">
// Hooks
import { ref } from "vue";
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// State of header
const editMode = ref(false);

function changeInput(event: any) {
  //
  emit("update:modelValue", event.target.value);

  //
  editMode.value = false;
}
</script>

<styles scoped lang="scss">
.view-header {
  .form-control {
    font-size: calc(1.1rem + 0.6vw);
    margin: 0;
    border: none;
    text-align: center;
    margin: 0 20px;
    border-bottom: solid 1px;
    border-bottom-color: black;
    border-radius: 0;

    &:disabled {
      border-bottom-color: transparent;
      background-color: transparent;
    }

    &:focus {
      box-shadow: none;
    }
  }
}
</styles>

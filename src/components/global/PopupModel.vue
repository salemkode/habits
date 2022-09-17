<template>
  <div class="popup-model">
    <!-- Back drop -->
    <Transition name="fade">
      <div
        v-if="props.modelValue"
        class="modal-backdrop fade"
        @click="emit('update:modelValue', false)"
      />
    </Transition>

    <!-- Vertically centered modal -->
    <Transition name="fade">
      <div v-if="props.modelValue" class="popup">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  width: 95%;
}

.modal-backdrop {
  opacity: 0.5;
}
</style>

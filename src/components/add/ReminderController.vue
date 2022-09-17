<template>
  <div :class="'reminder-controller ' + props.class">
    <div class="info">
      <h5>Reminder</h5>
      <span class="hint">Just notification</span>
    </div>
    <div class="active-toggle">
      <ToggleInput :color="props.color" v-model="reminder.active" />
    </div>
  </div>
  <div class="controller d-flex mt-4" :class="{ show: reminder.active }">
    <input
      type="time"
      class="form-control time-picker me-2"
      v-model="reminder.time"
      required
    />
    <input
      type="text"
      placeholder="Reminder text"
      class="form-input form-control"
      v-model="reminder.title"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import ToggleInput from "@/components/global/ToggleInput.vue";

// Hooks
import { ref, watch, toRaw } from "vue";
const props = defineProps<{
  color: string;
  modelValue: {
    active: boolean;
    title: string;
    time: string;
  };
  class?: string;
}>();
const emit = defineEmits(["color", "update:modelValue"]);

//
const reminder = ref({
  active: props.modelValue.active,
  title: props.modelValue.title,
  time: props.modelValue.time,
});
watch(
  reminder,
  () => {
    emit("update:modelValue", toRaw(reminder));
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.reminder-controller {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}

.controller {
  opacity: 0;
  transition: opacity 0.5s;

  &.show {
    opacity: 1;
  }
}

.time-picker {
  width: 30%;
  min-width: 120px;
  text-align: center;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
}
</style>

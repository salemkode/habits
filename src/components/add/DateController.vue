<template>
  <div class="frequency-controller">
    <div class="info">
      <h5>Start Date</h5>
      <span class="hint">Time to start track</span>
    </div>
    <div class="controller">
      <date-picker v-model="date" is-required>
        <template v-slot="{ showPopover }">
          <button class="btn btn-outline-dark px-3 py-1" @click="showPopover">
            {{ getShortDate(date) }}
          </button>
        </template>
      </date-picker>
    </div>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { ref, watch } from "vue";

// Components
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

// Helpers
import { getToday } from "@/helper/date.helper";

//
function getShortDate(_date: Date, supportToday = true) {
  // If selected today make name today
  if (supportToday && _date.getTime() == getToday().getTime()) return "Today";

  // Get short date string
  return _date.toLocaleString("en", { dateStyle: "short" });
}

//
const props = defineProps({
  modelValue: {
    type: Date,
    default: getToday(),
  },
  title: {
    type: String,
  },
  hint: {
    type: String,
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: Date): void;
}>();

//
const date = ref<Date>(props.modelValue);
watch(date, () => emit("update:modelValue", date.value));
</script>

<style scoped lang="scss">
.frequency-controller {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

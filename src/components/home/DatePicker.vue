<template>
  <div class="date-picker">
    <ul
      class="date-slider"
      @touchstart="startTouch"
      @touchend="endTouch"
      :style="{
        transform: `translateX(${state.selectedWeek * -100}%)`,
      }"
    >
      <!-- Week items -->
      <date-picker-week
        v-for="(week, index) in state.weeks"
        @check="emit('check', $event)"
        :habit="habit"
        :key="index"
        :selected-day="11"
        :days="week"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { reactive, onMounted, ref } from "vue";

// Helper
import { getToday, getWeekDays } from "@/helper/date.helper";

// Components
import DatePickerWeek from "./DatePickerWeek.vue";
import { habit as habitType } from "@/helper/db.helper";

// State of component
const state = reactive({
  // Slider state
  weeks: [] as Date[][],
  selectedWeek: 1,
});

// define props and emits
const props = defineProps<{
  habit: habitType;
  color: string;
}>();
const emit = defineEmits<{
  (e: "check", value: Date): void;
}>();

// Slider events
const startTouchPoint = ref<null | number>(null);
function startTouch(event: TouchEvent) {
  startTouchPoint.value = event.changedTouches[0].clientX;
}

function endTouch(event: TouchEvent) {
  const _startPoint = startTouchPoint.value as number;
  const _endPoint = event.changedTouches[0].clientX as number;

  // If no swipe do not do any thing
  if (_startPoint === _endPoint || Math.abs(_startPoint - _endPoint) < 40)
    return;

  //
  if (_startPoint > _endPoint + 60) {
    /* Move to right ( start to end ) */
    if (state.weeks.length !== state.selectedWeek + 1) {
      state.selectedWeek += 1;
    }
  } else {
    /* Move to Left ( end to start ) */
    if (state.selectedWeek !== 0) {
      state.selectedWeek -= 1;
    }
  }

  // Reset start point
  startTouchPoint.value = null;
}

// Create weeks
const today = getToday();

// Add this week in weeks list
onMounted(() => {
  const year = today.getFullYear(),
    month = today.getMonth(),
    day = today.getDate();

  // Add weeks
  state.weeks.push(
    getWeekDays(year, month, day - 7),
    getWeekDays(year, month, day),
    getWeekDays(year, month, day + 7)
  );
});
</script>

<style lang="scss" scoped>
.date-picker {
  text-align: center;
  padding: 15px 0;
  overflow: hidden;
  --week-item-color: v-bind(props.color);

  .date-slider {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    transition: all 0.6s;
  }
}
</style>

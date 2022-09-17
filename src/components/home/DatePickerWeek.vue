<template>
  <li class="week-item">
    <button
      class="btn border-0 day-item"
      v-for="(date, index) in days"
      :key="index"
      @click="emit('check', date)"
      :class="{ active: isCheckedDay(date) }"
      :disabled="isDisabled(date)"
    >
      <small class="day-name">
        {{ getDayName(index, false) }}
      </small>
      <span class="day-number" v-text="date.getDate()" />
    </button>
  </li>
</template>

<script setup lang="ts">
// Helper
import { getDayName, getToday } from "@/helper/date.helper";
import { habit as habitType } from "@/helper/db.helper";

//
const props = defineProps<{
  selectedDay: number;
  days: Date[];
  habit: habitType;
}>();
const emit = defineEmits<{
  (e: "check", value: Date): void;
}>();

//
function isCheckedDay(date: Date) {
  // Get string of date
  const stringDate = date.toLocaleDateString();

  //
  return props.habit.checkedList.includes(stringDate);
}

//
function isDisabled(date: Date) {
  const isBeforeStart = +props.habit.startedAt > +date;
  const isAfterToday = getToday() < date;

  return isBeforeStart || isAfterToday;
}
</script>

<style scoped lang="scss">
.week-item {
  display: flex;
  min-width: 100%;

  .day-item {
    font-size: 20px;
    font-weight: bold;
    min-width: calc(100% / 7);
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      transition: all 0.6s;
    }

    &.active span {
      color: white;
      background: var(--week-item-color);
    }

    .day-number {
      height: 30px;
      width: 30px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      border-radius: 9999px;

      &.active {
        background-color: red;
      }
    }

    .day-name {
      font-size: 16px;
    }
  }
}
</style>

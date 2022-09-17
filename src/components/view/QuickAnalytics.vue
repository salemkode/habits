<template>
  <!-- Re make this component to make it clean -->
  <div class="fast-analytics card flex-row my-4">
    <div class="info-item">
      <radial-progress-bar
        :diameter="60"
        :completed-steps="state.all.done"
        :total-steps="state.all.need"
        :innerStrokeWidth="8"
        :strokeWidth="6"
        innerStrokeColor="var(--bs-gray-200)"
        startColor="var(--bs-yellow)"
        stopColor="var(--bs-yellow)"
      >
        {{ getAllHabitProgress(10) }}
      </radial-progress-bar>
    </div>
    <div class="info-item">
      <span> {{ state.all.need }} </span>
      <span> times </span>
    </div>
    <div class="info-item">
      <span> {{ state.all.need - state.all.done }} </span>
      <span> missed </span>
    </div>
    <div class="info-item">
      <span> {{ getMonthProgress() }}% </span>
      <span> month </span>
    </div>
    <div class="info-item">
      <span> {{ getAllHabitProgress() }}% </span>
      <span> total </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { reactive, onMounted } from "vue";

// Helper
import { getDayRing, getToday } from "@/helper/date.helper";

// Components
import RadialProgressBar from "vue-radial-progress";

// Type
import { habit as habitType } from "@/helper/db.helper";

// State
const state = reactive({
  all: {
    need: 0,
    done: 0,
  },
  month: {
    need: 0,
    done: 0,
  },
});
const props = defineProps<{
  habit: habitType;
}>();

//
function getProgress(done: number, need: number, percent = 100) {
  if (need === 0) return 0;
  return Math.round((done / need) * percent);
}
function getMonthProgress(percent = 100) {
  return getProgress(state.month.done, state.month.need, percent);
}

function getAllHabitProgress(percent = 100) {
  return getProgress(state.all.done, state.all.need, percent);
}

onMounted(async () => {
  const thisMonth = getToday().getMonth();

  //
  const daysString = getDayRing(props.habit.startedAt, getToday());

  //
  const week = {
    need: props.habit.frequency,
    done: 0,
  };
  daysString.forEach((dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth();

    if (props.habit.frequency !== 7) {
      console.log(week, week.done !== week.need);
      console.log("week, week.done !== week.need");
      console.log(date.getDay());
      //
      if (date.getDay() === 6) {
        week.done = 0;
      }
      //
      if (week.done !== week.need) {
        week.done++;
      } else {
        return;
      }
    }

    //
    state.all.need++;
    if (thisMonth === month) state.month.need++;

    //
    if (props.habit.checkedList.includes(date.toLocaleDateString("en"))) {
      state.all.done++;
      if (thisMonth === month) state.month.done++;
    }
  });
});
</script>

<style lang="scss" scoped>
.fast-analytics {
  > * {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 4px 0;

    &:not(:nth-child(2n - 1)) {
      margin: 0 8px;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 60%;
        background: var(--bs-card-border-color);
        left: -4px;
      }

      &::after {
        left: auto;
        right: -4px;
      }
    }
  }
}
</style>

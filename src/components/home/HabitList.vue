<template>
  <div class="habit-list">
    <div
      v-for="habit in habits"
      :key="habit.id"
      class="habit-item card py-2 px-3 mb-3"
    >
      <!-- -->
      <div @click="$router.push('/view/' + habit.id)" class="mt-2 habit-header">
        <b v-text="habit.title" />
        <span v-if="habit.frequency === 7">Every Day</span>
        <span v-else>{{ habit.frequency }} times a week</span>
      </div>

      <!-- -->
      <DatePicker
        :habit="habit"
        :color="habit.color"
        @check="(date) => checkHabit(habit.id, date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from "@/components/home/DatePicker.vue";

import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db, habit as habit_type } from "@/helper/db.helper";

// Get habit list
const habits = useObservable<habit_type[]>(
  liveQuery<habit_type[]>(() => db.habits.toArray())
);

//
function checkHabit(id: number, date: Date) {
  db.toggleHabitCheck(id, date.toLocaleDateString("en"));
}
</script>

<style lang="scss" scoped>
.habit-list {
  .habit-item .habit-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

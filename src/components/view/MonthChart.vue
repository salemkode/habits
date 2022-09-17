<template>
  <div class="card">
    <h4 class="my-0 mx-2">History</h4>
    <hr class="mx-2" />
    <Calendar
      class="calendar"
      :attributes="attrs"
      :available-dates="{
        start: props.habit.startedAt,
      }"
      :is-expanded="true"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import { Calendar } from "v-calendar";
import "v-calendar/dist/style.css";

// Types
import { habit } from "@/helper/db.helper";

// Hooks
import { computed } from "vue";
const props = defineProps<{
  habit: habit;
}>();

//
const attrs = computed(() => {
  return [
    {
      key: "checked",
      highlight: "orange",
      dates: props.habit.checkedList,
    },
  ];
});
</script>

<style scoped lang="scss">
.card {
  padding: 20px 15px;

  > .calendar {
    border: none;
  }
}
</style>

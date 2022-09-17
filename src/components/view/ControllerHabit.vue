<template>
  <div class="habit-controller">
    <PopupCard :image="repeat" :title="`Repeat ${habit.frequency} week`">
      <FrequencyController
        v-model="habit.frequency"
        class="w-100 py-3 px-4 border rounded"
        @update:model-value="updateRepeat"
      />
    </PopupCard>

    <!-- -->
    <span class="space" />

    <!-- -->
    <PopupCard
      :class="habit.activeReminder ? 'active-card' : ''"
      :image="habit.activeReminder ? bellActive : bell"
      :title="habit.activeReminder ? 'Reminder On' : 'Reminder Off'"
    >
      <ReminderController
        class="w-100 py-3 px-4 border rounded"
        :color="habit.color"
        v-model="reminder"
        @update:model-value="updateReminder"
      />
    </PopupCard>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { reactive, toRef } from "vue";

// Components
import PopupCard from "@/components/global/PopupCard.vue";
import FrequencyController from "@/components/add/FrequencyController.vue";
import ReminderController from "@/components/add/ReminderController.vue";

// Image
import repeat from "@/assets/icons/repeat.svg";
import bell from "@/assets/icons/bell.svg";
import bellActive from "@/assets/icons/bell-active.svg";

// Type
import { habit as habitType } from "@/helper/db.helper";

//
const props = defineProps<{ modelValue: habitType }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: habitType): void;
}>();

//
const habit = reactive(props.modelValue);
const color = toRef(habit, "color");
const reminder = reactive({
  active: props.modelValue.activeReminder,
  title: props.modelValue.title,
  time: props.modelValue.reminderTime,
});

//
function updateReminder({ value: reminder }: any) {
  if (reminder.active && reminder.time) {
    habit.activeReminder = reminder.active;
    habit.reminderTitle = reminder.title;
    habit.reminderTime = reminder.time;
  } else {
    habit.activeReminder = false;
    habit.reminderTitle = "";
    habit.reminderTime = "";
  }

  //
  emit("update:modelValue", habit);
}

//
function updateRepeat(frequency: number) {
  habit.frequency = frequency;

  //
  emit("update:modelValue", habit);
}
</script>

<style scoped lang="scss">
.habit-controller {
  display: flex;

  :deep(.active-card) {
    background-color: v-bind(color);
    color: white;
  }

  .space {
    width: 30px;
  }
}
</style>

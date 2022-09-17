<template>
  <div class="create-page">
    <header class="container py-3">
      <router-link to="/">Cancel</router-link>
      <h4 class="my-0">{{ $route.name }}</h4>
      <button class="btn" :disabled="!valid" @click="addHabit">Done</button>
    </header>
    <div class="container">
      <input
        type="text"
        class="form-control"
        placeholder="Title"
        v-model="title"
      />
      <!-- -->
      <ColorController v-model="color" />
      <hr />
      <FrequencyController v-model="frequency" />
      <hr />
      <DateController v-model="startDate" />
      <hr />
      <ReminderController
        @update:modelValue="updateReminder"
        :modelValue="reminder"
        :color="color"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { ref, computed } from "vue";

// Components
import ColorController from "@/components/add/ColorController.vue";
import FrequencyController from "@/components/add/FrequencyController.vue";
import DateController from "../components/add/DateController.vue";
import ReminderController from "@/components/add/ReminderController.vue";

// Database
import { db } from "@/helper/db.helper";

// Native api
import { LocalNotifications } from "@capacitor/local-notifications";

// Router
import { useRouter } from "vue-router";
import { getToday } from "@/helper/date.helper";
const router = useRouter();

//
const title = ref("");
const color = ref<"#f16567" | "#2ec977" | "#5666f3" | "#af8f72" | "#9186f6">(
  "#f16567"
);
const startDate = ref(getToday());
const frequency = ref(7);
const reminder = ref({ active: false, title: "", time: "12:00" });
const valid = computed(() => {
  // Check title is not empty
  if (!title.value) {
    return false;
  }

  //
  if (reminder.value.active && !reminder.value.time) {
    return false;
  }

  //
  return true;
});

//
async function updateReminder({ value }: any) {
  // Request permissions for send notification
  if (value.active) {
    await LocalNotifications.requestPermissions();
  }

  //
  reminder.value = value;
}

//
async function addHabit() {
  // Add habit in database
  const habitId = await db.habits.add({
    title: title.value,
    color: color.value,
    frequency: frequency.value,
    activeReminder: reminder.value.active,
    reminderTime: reminder.value.time,
    reminderTitle: reminder.value.title,

    // default
    archive: false,
    startedAt: startDate.value,
    checkedList: [],
  });

  // Add notification of habit
  if (reminder.value.active && LocalNotifications) {
    const splitTime = reminder.value.time.split(":");
    const hour = +splitTime[0];
    const minute = +splitTime[1];

    //
    LocalNotifications.schedule({
      notifications: [
        {
          title: title.value,
          body: reminder.value.title,
          id: +habitId,
          schedule: {
            repeats: true,
            every: "day",
            allowWhileIdle: true,
            on: {
              hour,
              minute,
            },
          },
        },
      ],
    });
  }

  // Move to home page
  router.push("/");
}
</script>

<template>
  <div class="analytics-page container" v-if="!state.loading">
    <!-- -->
    <HeaderController
      v-model="state.habit.title"
      @update:modelValue="updateHabit"
    />

    <!-- -->
    <ControllerHabit v-model="state.habit" @update:modelValue="updateHabit" />

    <!-- -->
    <QuickAnalytics :habit="state.habit" />

    <!-- -->
    <MonthChart :habit="state.habit" />

    <!-- -->
    <button class="btn btn-danger w-100 mt-4" @click="delateModal = true">
      Delate habit
    </button>

    <PopupModel v-model="delateModal">
      <div class="d-block modal position-static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete a habit</h5>
              <button type="button" class="btn-close" />
            </div>
            <div class="modal-body">
              <p>Are you sure you want to get rid of the habit ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary">Close</button>
              <button
                type="button"
                @click="delatePageHabit"
                class="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </PopupModel>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { reactive, ref, toRaw } from "vue";

// Components
import HeaderController from "@/components/view/HeaderController.vue";
import QuickAnalytics from "@/components/view/QuickAnalytics.vue";
import ControllerHabit from "@/components/view/ControllerHabit.vue";
import MonthChart from "@/components/view/MonthChart.vue";
import PopupModel from "@/components/global/PopupModel.vue";

// Database
import { db, habit as habitType } from "@/helper/db.helper";
import { useRoute } from "vue-router";
import router from "@/router";

// state
const state = reactive({
  habit: {} as habitType,
  loading: true,
});
const delateModal = ref(false);

//
async function updateHabit() {
  // Update habit data
  await db.habits.update(state.habit.id as number, toRaw(state.habit));
}

//
async function delatePageHabit() {
  // delate habit from database data
  await db.habits.delete(state.habit.id as number);

  // Go to home page
  router.push("/");
}

// Get habits from database state
db.habits.get(+useRoute().params.id).then((habit) => {
  if (habit) {
    state.loading = false;
    state.habit = habit;
  }
});
</script>

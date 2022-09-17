<template>
  <div class="home-page">
    <header class="container py-3">
      <h4 class="my-0 mx-auto">{{ $route.name }}</h4>
    </header>
    <div class="container">
      <HabitList />
      <button
        @click="$router.push('/add')"
        class="add-habit btn btn-lg py-3 w-100"
      >
        <img src="@/assets/icons/add.svg" class="me-1" />
        <span class="ms-1">New Habit</span>
      </button>
    </div>
    <br />
  </div>
</template>

<script setup lang="ts">
// Components
import HabitList from "@/components/home/HabitList.vue";
</script>

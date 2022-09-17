<template>
  <div class="popup-card">
    <div :class="'card ' + props.class" @click="active = true">
      <div class="content">
        <img :src="props.image" class="icon p-1 me-2" />
        {{ props.title }}
      </div>
    </div>
    <PopupModel v-model="active">
      <slot />
    </PopupModel>
  </div>
</template>

<script setup lang="ts">
// Hooks
import { ref } from "vue";

// Components
import PopupModel from "./PopupModel.vue";

// Props
const props = defineProps<{
  title: string;
  image: string;
  class?: string;
}>();

//
const active = ref(false);
</script>

<style scoped lang="scss">
.popup-card {
  width: 100%;
}

.card {
  flex-direction: row;
  align-items: center;
  padding: 12px;
  width: 100%;
  transition: all 1s;
}

.popup-enter-active,
.popup-leave-active {
  transition: transform 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  transform: scale(0);
}
</style>

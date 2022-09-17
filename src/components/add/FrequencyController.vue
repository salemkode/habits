<template>
  <div :class="'frequency-controller ' + props.class">
    <div class="info">
      <h5>Frequency</h5>
      <span class="hint">Time a week</span>
    </div>
    <div class="controller">
      <button
        class="btn border border-2"
        @click="frequency--"
        :disabled="frequency === 1"
      >
        -
      </button>
      <span class="frequency mx-3" v-text="frequency" />
      <button
        class="btn border border-2"
        @click="frequency++"
        :disabled="frequency === 7"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

//
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 7,
  },
  class: String,
});

//
const frequency = ref(props.modelValue);
watch(frequency, () => emit("update:modelValue", frequency.value));
</script>

<style scoped lang="scss">
.frequency-controller {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;

  .controller {
    .frequency {
      display: inline-block;
      width: 30px;
      text-align: center;
    }
    .btn {
      height: 40px;
      width: 40px;
      padding: 0;
      font-size: 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:focus {
        box-shadow: none;
      }
    }
  }
}
</style>

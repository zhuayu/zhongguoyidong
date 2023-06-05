<template>
  <svg :class="svgClass" aria-hidden="true">
    <use class="svg-use" :href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  svgName: { type: String, required: true },
  svgClass: { type: String, default: "" },
});
const symbolId = computed(() => `#${props.svgName}`);
const svgClass = computed(() => `svg-icon ${props.svgClass}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>

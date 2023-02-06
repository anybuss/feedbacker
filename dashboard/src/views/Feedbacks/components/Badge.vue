<template>
  <span class="badge" :style="{ backgroundColor: `${classColor}` }">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: { type: String, required: true },
});

const label = computed(() => {
  if (props.type === "ISSUE") return "problema";
  if (props.type === "IDEA") return "ideia";
  return "outros";
});

const classColor = computed(() => {
  if (props.type === "ISSUE") return "#F88676";
  if (props.type === "IDEA") return "#E4B52E";
  return "#EF4983";
});
</script>

<style lang="scss" scoped>
.badge {
  color: $white-color;
  font-weight: $font-black;
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: lowercase;
  border-radius: 999px;
  padding: 0.25rem 1rem;
}
</style>

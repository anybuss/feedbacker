<template>
  <component :is="handleIconReference(name)" v-bind="$props"></component>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const Loading = defineAsyncComponent(() => import("./Loading.vue"));
const Close = defineAsyncComponent(() => import("./Close.vue"));
const Copy = defineAsyncComponent(() => import("./Copy.vue"));
const ChevronUp = defineAsyncComponent(() => import("./ChevronUp.vue"));
const ChevronDown = defineAsyncComponent(() => import("./ChevronDown.vue"));

const props = defineProps({
  name: { type: String, required: true },
});

function handleIconReference(name) {
  if (name === "loading") return Loading;
  if (name === "close") return Close;
  if (name === "copy") return Copy;
  if (name === "chevron-up") return ChevronUp;
  if (name === "chevron-down") return ChevronDown;
}
</script>

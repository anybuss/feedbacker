<template>
  <div
    :style="{
      width: calcWidth,
      height,
    }"
    class="content-loader"
  >
    <span
      :style="{
        animationDuration,
      }"
      class="content-loader--fx"
    >
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  maxWidth: { type: Number, default: 100 },
  minWidth: { type: Number, default: 80 },
  width: { type: String, default: "1rem" },
  height: { type: String, default: "1rem" },
  animationDuration: { type: String, default: "1.6s" },
});

const calcWidth = computed(() => {
  const value = Math.random() * (props.width - props.minWidth);
  return props.width ?? `${Math.floor(value + props.minWidth)}%`;
});
</script>

<style lang="scss" scoped>
.content-loader {
  opacity: 0.75;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: #f6f7f8;
  .content-loader--fx {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-position: 0 0;
    background-size: 1000 100;
    @include animate-shimmer;
  }
}
</style>

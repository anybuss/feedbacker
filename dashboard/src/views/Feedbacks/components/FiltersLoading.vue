<template>
  <content-loader class="loaders" width="100%" height="50px"></content-loader>
  <content-loader
    class="loaders"
    width="100%"
    height="40px"
    animation-duration="1.9s"
  ></content-loader>

  <content-loader
    class="loaders"
    width="100%"
    height="40px"
    animation-duration="2.2s"
  ></content-loader>

  <content-loader
    class="loaders"
    width="100%"
    height="40px"
    animation-duration="2.5s"
  ></content-loader>

  <content-loader
    class="loaders"
    width="100%"
    height="40px"
    animation-duration="2.8s"
  ></content-loader>
</template>

<script setup>
import ContentLoader from "@/components/ContentLoader/index.vue";
</script>

<style lang="scss" scoped>
.loaders {
  border-radius: 0.25rem;
}
</style>

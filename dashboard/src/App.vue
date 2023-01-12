<template>
  <main>
    <router-view></router-view>
  </main>

  <footer>
    <p>
      Feedbacker &copy; <span>{{ getCurrentYear() }}</span>
    </p>
  </footer>

  <copyright-dev></copyright-dev>
</template>

<script setup>
import CopyrightDev from "@/components/CopyrightDev.vue";

function getCurrentYear() {
  return new Date().getFullYear();
}
</script>

<style lang="scss">
body,
#app {
  font-family: $font-family;
  font-weight: $font-regular;
  color: $graydark-color;
}

main {
  margin: 0 auto;
  min-height: calc((100vh - 80px) - 40px);
}

footer {
  background-color: $gray-color;
  padding: 2rem 0;
  height: 80px;
  p {
    color: $graydark-color;
    font-size: 1.15rem;
    font-weight: $font-bold;
    text-align: center;
    text-transform: lowercase;
  }
}
</style>

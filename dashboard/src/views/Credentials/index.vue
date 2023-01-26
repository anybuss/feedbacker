<template>
  <header-logged></header-logged>

  <section>
    <div class="section-name">
      <h1>Credenciais</h1>
      <p>Guia de instalação e geração de suas credenciais.</p>
    </div>
  </section>
</template>

<script setup>
import HeaderLogged from "@/components/HeaderLogged/index.vue";
</script>

<style lang="scss" scoped>
section {
  .section-name {
    @include section-name;
    h1 {
      @include section-name-title;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.75rem;
      text-align: center;
    }
  }
}
</style>

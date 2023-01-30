<template>
  <header-logged></header-logged>

  <section>
    <div class="section-name">
      <h1>Feedbacks</h1>
      <p>Detalhes de todos os feedbacks recebidos.</p>
    </div>

    <div class="section-content">
      <div class="wrapper">
        <div class="filters">
          <h2>Listagem</h2>
          <suspense>
            <template #default>
              <filters
                class="animate__animated animate__fadeIn animate__faster"
              ></filters>
            </template>
            <template #fallback>
              <filters-loading></filters-loading>
            </template>
          </suspense>
        </div>
        <div class="feedbacks">feedbacks</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Filters from "./components/Filters.vue";
import FiltersLoading from "./components/FiltersLoading.vue";
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
  .section-content {
    @include section-content;
    .wrapper {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.5rem;
      .filters {
        h2 {
          @include section-content-title;
        }
      }
      .feedbacks {
        grid-column: 2 / 4;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        padding-top: 5rem;
      }
    }
  }
}
</style>

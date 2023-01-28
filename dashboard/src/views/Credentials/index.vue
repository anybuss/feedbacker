<template>
  <header-logged></header-logged>

  <section>
    <div class="section-name">
      <h1>Credenciais</h1>
      <p>Guia de instalação e geração de suas credenciais.</p>
    </div>

    <div class="section-content">
      <h2>Instalação e configuração</h2>
      <p>Aqui está a sua chave de API:</p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      ></content-loader>

      <div v-else class="api-key">
        <span> {{ userApiKey }} </span>
        <div class="icons">
          <icon name="copy" :color="'#C0BCB0'"></icon>
          <icon name="loading" :color="'#C0BCB0'"></icon>
        </div>
      </div>

      <p>
        Coloque o script abaixo no seu site para começar a receber feedbacks.
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      ></content-loader>

      <div v-else class="script-key">
        <pre>
&lt;script src="https://anybuss-feedbacker-widget.netlify.app?api_key={{
            userApiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from "vue";
import useStore from "@/hooks/useStore";
import ContentLoader from "@/components/ContentLoader/index.vue";
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Icon from "@/components/Icon/index.vue";

const store = useStore();
const state = reactive({
  isLoading: false,
});

const userApiKey = computed(() => store.User.currentUser.apiKey);
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
    h2 {
      @include section-content-title;
    }
    .api-key,
    .script-key {
      background-color: $gray-color;
      font-weight: $font-bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
      padding: 0.75rem;
      max-width: 480px;
      @include scroll-x;
      .icons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        cursor: pointer;
      }
    }
    p {
      &:nth-child(4) {
        margin-top: 1.5rem;
      }
    }
    .script-key {
      max-width: 680px;
    }
  }
}

@media screen and (max-width: 640px) {
  section {
    .section-content h2,
    .section-content p {
      text-align: center;
    }
  }
}
</style>

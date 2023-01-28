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

      <div v-else id="apikey" class="api-key">
        <span v-if="state.hasError" class="error"
          >Erro ao carregar a chave de API.</span
        >
        <span v-else> {{ userApiKey }} </span>
        <div v-if="!state.hasError" class="icons">
          <icon @click="handleCopyApiKey" name="copy" :color="'#C0BCB0'"></icon>
          <icon
            @click="handleGenerateApiKey"
            name="loading"
            :color="'#C0BCB0'"
            id="generate-apikey"
          ></icon>
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
        <span v-if="state.hasError" class="error"
          >Erro ao carregar o script.</span
        >
        <pre v-else>
&lt;script src="https://anybuss-feedbacker-widget.netlify.app?api_key={{
            userApiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import services from "@/services";
import { setApiKey } from "@/store/user";
import useStore from "@/hooks/useStore";
import ContentLoader from "@/components/ContentLoader/index.vue";
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Icon from "@/components/Icon/index.vue";

const toast = useToast();
const store = useStore();
const state = reactive({
  isLoading: false,
  hasError: false,
});

const userApiKey = computed(() => store.User.currentUser.apiKey);

watch(
  () => store.User.currentUser,
  () => {
    if (!store.Global.isLoading && !userApiKey) {
      handleError(true);
    }
  }
);

function handleError(error) {
  state.isLoading = false;
  state.hasError = !!error;
}

async function handleGenerateApiKey() {
  toast.clear();
  try {
    state.isLoading = true;
    const { data } = await services.users.generateApiKey();
    setApiKey(data.apiKey);
    state.isLoading = false;
  } catch (error) {
    handleError(error);
    toast.error("Erro ao gerar uma nova chave de API.");
  }
}

async function handleCopyApiKey() {
  toast.clear();
  try {
    await navigator.clipboard.writeText(userApiKey.value);
    toast.success("Chave copiada com sucesso!");
  } catch (error) {
    handleError(error);
    toast.error("Erro ao copiar a chave de API.");
  }
}
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
      border-radius: 0.5rem;
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

    .rounded {
      border-radius: 0.5rem;
    }

    .error {
      color: $danger-color;
      font: italic $font-regular 14px $font-family;
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

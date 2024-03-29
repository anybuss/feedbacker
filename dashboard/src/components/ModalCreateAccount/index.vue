<template>
  <section>
    <div class="top-content" id="modal-create-account">
      <h2>Crie uma conta</h2>
      <button @click="modal.close" id="close-modal">
        <icon name="close"></icon>
      </button>
    </div>

    <fieldset>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="input-name-modal-create-account">Nome</label>
          <input
            v-model="state.name.value"
            :style="{
              borderColor: state.name.errorMessage ? '#f88676' : 'transparent',
            }"
            type="text"
            placeholder="John Doe"
            autocomplete="name"
            id="input-name-modal-create-account"
          />
          <span
            v-if="!!state.name.errorMessage"
            :style="{
              paddingTop: state.name.errorMessage ? '0.5rem' : '0',
            }"
            >{{ state.name.errorMessage }}</span
          >
        </div>

        <div class="form-item">
          <label for="input-email-modal-create-account">E-mail</label>
          <input
            v-model="state.email.value"
            :style="{
              borderColor: state.email.errorMessage ? '#f88676' : 'transparent',
            }"
            type="email"
            placeholder="exemplo@email.com"
            autocomplete="email"
            id="input-email-modal-create-account"
          />
          <span
            v-if="!!state.email.errorMessage"
            :style="{
              paddingTop: state.email.errorMessage ? '0.5rem' : '0',
            }"
            >{{ state.email.errorMessage }}</span
          >
        </div>

        <div class="form-item">
          <label for="input-password-modal-create-account">Senha</label>
          <input
            v-model="state.password.value"
            :style="{
              borderColor: state.password.errorMessage
                ? '#f88676'
                : 'transparent',
            }"
            type="password"
            placeholder="********"
            autocomplete="new-password"
            id="input-password-modal-create-account"
          />
          <span
            v-if="!!state.password.errorMessage"
            :style="{
              paddingTop: state.password.errorMessage ? '0.5rem' : '0',
            }"
            >{{ state.password.errorMessage }}</span
          >
        </div>

        <button
          :disabled="state.isLoading"
          :style="{ opacity: state.isLoading ? 0.5 : 1 }"
          class="btn-submit"
          type="submit"
          id="btn-submit-modal-create-account"
        >
          <icon
            v-if="state.isLoading"
            name="loading"
            class="animate__animated animate__rotateIn animate__slower animate__infinite"
          ></icon>
          <span v-else>Entrar</span>
        </button>
      </form>
    </fieldset>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useField } from "vee-validate";
import useModal from "@/hooks/useModal";
import services from "@/services";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "@/utils/validators";
import Icon from "@/components/Icon/index.vue";

const router = useRouter();
const toast = useToast();
const modal = useModal();

const { value: nameValue, errorMessage: nameErrorMessage } = useField(
  "name",
  validateEmptyAndLength3
);

const { value: emailValue, errorMessage: emailErrorMessage } = useField(
  "email",
  validateEmptyAndEmail
);

const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
  "password",
  validateEmptyAndLength3
);

const state = reactive({
  hasErrors: false,
  isLoading: false,
  name: {
    value: nameValue,
    errorMessage: nameErrorMessage,
  },
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage,
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage,
  },
});

async function handleNewUserLogin({ email, password }) {
  const { data, errors } = await services.auth.login({ email, password });
  if (!errors) {
    window.localStorage.setItem("token", data.token);
    router.push({ name: "Feedbacks" });
    modal.close();
  }
  state.isLoading = false;
}

async function handleSubmit() {
  try {
    toast.clear();
    state.isLoading = true;
    const { data, errors } = await services.auth.register({
      name: state.name.value,
      email: state.email.value,
      password: state.password.value,
    });

    if (!errors) {
      await handleNewUserLogin({
        email: state.email.value,
        password: state.password.value,
      });
      toast.success("Conta criada com sucesso!");
      return;
    }
    if (errors.status === 400) {
      toast.error("Ocorreu um erro ao solicitar criação de conta.");
    }
    state.isLoading = false;
  } catch (error) {
    state.isLoading = false;
    state.hasErrors = !!error;
    toast.error("Ocorreu um erro ao solicitar criação de conta.");
  }
}
</script>

<style lang="scss" scoped>
section {
  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-weight: $font-black;
      font-size: 1.75rem;
      line-height: 1.75rem;
    }
    button {
      @include button-custom;
      font-size: 2rem;
      color: $graymedium-color;
    }
  }

  fieldset {
    form {
      .form-item {
        margin-top: 1.5rem;
        label {
          display: block;
          font-weight: $font-black;
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: $gray-color;
          border-width: 2px;
          border-radius: 0.25rem;
          &:focus {
            outline: none;
          }
        }
        span {
          color: $danger-color;
          display: block;
          font-weight: $font-medium;
        }
      }
      .btn-submit {
        @include button-action;
        display: flex;
        justify-content: center;
        min-width: 98px;
        margin-top: 2rem;
        font-size: 1.15rem;
        transition: all 150ms;
      }
    }
  }
}
</style>

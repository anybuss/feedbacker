<template>
  <section>
    <div class="top-content">
      <h2>Entre na sua conta</h2>
      <button @click="modal.close" id="close-modal">
        <icon name="close"></icon>
      </button>
    </div>

    <fieldset>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="input-email-modal-login">E-mail</label>
          <input
            v-model="state.email.value"
            :style="{
              borderColor: state.email.errorMessage ? '#f88676' : 'transparent',
            }"
            type="email"
            placeholder="exemplo@email.com"
            autocomplete="email"
            id="input-email-modal-login"
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
          <label for="input-password-modal-login">Senha</label>
          <input
            v-model="state.password.value"
            :style="{
              borderColor: state.password.errorMessage
                ? '#f88676'
                : 'transparent',
            }"
            type="password"
            placeholder="********"
            autocomplete="current-password"
            id="input-password-modal-login"
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
          id="btn-submit-modal-login"
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
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage,
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage,
  },
});

async function handleSubmit() {
  try {
    toast.clear();
    state.isLoading = true;
    const { data, errors } = await services.auth.login({
      email: state.email.value,
      password: state.password.value,
    });
    if (!errors) {
      window.localStorage.setItem("token", data.token);
      router.push({ name: "Feedbacks" });
      state.isLoading = false;
      modal.close();
      toast.success("Login realizado com sucesso.");
      return;
    }

    if (errors.status === 404) {
      toast.error("E-mail não encontrado.");
    }

    if (errors.status === 401) {
      toast.error("E-mail e/ou senha inválido.");
    }

    if (errors.status === 400) {
      toast.error("Ocorreu um erro com a solicitação de login.");
    }
    state.isLoading = false;
  } catch (error) {
    state.isLoading = false;
    state.hasErrors = !!error;
    toast.error("Ocorreu um erro com a solicitação de login.");
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

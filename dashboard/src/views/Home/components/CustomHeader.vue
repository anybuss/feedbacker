<template>
  <section>
    <div class="wrapper">
      <div class="top-container">
        <img src="@/assets/images/logo_white.svg" alt="Feedbacker logo" />
        <div class="wrapper-buttons">
          <button
            @click="emitCreateAccount"
            class="btn-create"
            id="btn-home-create-account"
          >
            Crie uma conta
          </button>
          <button @click="emitLogin" class="btn-login" id="btn-home-login">
            Entrar
          </button>
        </div>
      </div>

      <div class="bottom-container">
        <h1>
          Tenha um feedback. <br />
          E faça seus clientes mais <br class="line-break" />
          felizes!
        </h1>
        <p>
          Receba ideias, reclamações e feedbacks com um
          <br class="line-break" />
          simples widget na página.
        </p>
        <div>
          <button @click="emitCreateAccount" id="btn-home-cta">
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["create-account", "login"]);

const emitCreateAccount = () => emit("create-account");
const emitLogin = () => emit("login");
</script>

<style lang="scss" scoped>
section {
  background-color: $main-color;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 700px;
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 1200px;
    background-image: url("@/assets/images/blue_balloons.png");
    background-size: 628px;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    .top-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.5rem 0;
      img {
        width: 150px;
      }
      .wrapper-buttons {
        display: flex;
        .btn-create {
          @include button-secondary;
        }
        .btn-login {
          @include button-primary;
        }
      }
    }
    .bottom-container {
      display: flex;
      flex-direction: column;
      margin-top: 7rem;
      h1 {
        color: $white-color;
        font-weight: $font-black;
        font-size: 2.25rem;
        line-height: 2.5rem;
      }
      p {
        color: $white-color;
        font-weight: $font-medium;
        font-size: 1.15rem;
        line-height: 1.75rem;
      }
      div button {
        @include button-primary;
        margin-top: 2.5rem;
      }
    }
  }
}

@media screen and (max-width: 640px) {
  section {
    .wrapper {
      background-image: none;
      .top-container {
        flex-direction: column;
        align-items: center;
        img {
          width: 180px;
        }
        .wrapper-buttons {
          margin-top: 1.5rem;
        }
      }
      .bottom-container {
        margin-top: 3rem;
        h1 {
          text-align: center;
          .line-break {
            display: none;
          }
        }
        p {
          text-align: center;
          .line-break {
            display: none;
          }
        }
        div {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>

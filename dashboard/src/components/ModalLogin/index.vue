<template>
  <section>
    <div class="top-content">
      <h2>Entre na sua conta</h2>
      <button @click="">&times;</button>
    </div>

    <fieldset>
      <form @submit.prevent="">
        <div class="form-item">
          <label for="email">E-mail</label>
          <input id="email" type="email" placeholder="exemplo@email.com" />
        </div>

        <div class="form-item">
          <label for="password">Senha</label>
          <input id="password" type="password" />
        </div>

        <button class="btn-submit" type="submit">Entrar</button>
      </form>
    </fieldset>
  </section>
</template>

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
          border-color: transparent;
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
        margin-top: 2rem;
        font-size: 1.15rem;
        transition: all 150ms;
      }
    }
  }
}
</style>

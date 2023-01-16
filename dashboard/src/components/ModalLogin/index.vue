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

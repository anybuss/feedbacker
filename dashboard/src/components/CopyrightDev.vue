<template>
  <aside>
    <p>
      Projeto base por
      <a href="https://treinamento.vuejsbrasil.org/">
        Treinamento - VueJS Brasil</a
      >,
    </p>
    <p>
      desenvolvido por
      <a href="https://www.linkedin.com/in/anybuss/">Any Buss</a> &#128420;
    </p>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  background-color: $gray-color;
  padding: 0.5rem 0;
  height: 40px;
  p {
    color: $graymedium-color;
    font-size: 0.75rem;
    text-align: center;
    a {
      color: $graydark-color;
      text-decoration: none;
      &:hover {
        color: $main-color;
      }
    }
  }
}
</style>

<template>
  <section>
    <div class="wrapper">
      <h1>Alguma dúvida?</h1>
      <p>Quer saber melhor como funciona e quais são os preços?</p>
      <div class="wrapper-link">
        <a href="mailto:"> Nos mande um e-mail! </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
section {
  display: flex;
  justify-content: center;
  width: 100%;
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 1200px;
    margin: 4rem 0;
    h1 {
      font-weight: $font-black;
      font-size: 2.25rem;
      text-align: center;
      color: $graydark-color;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    .wrapper-link {
      margin-top: 2.5rem;
      a {
        color: #ffffff;
        background-color: $main-color;
        font-weight: $font-bold;
        padding: 0.5rem 1.5rem;
        margin-top: 2.5rem;
        border-radius: 9999px;
        text-decoration: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>

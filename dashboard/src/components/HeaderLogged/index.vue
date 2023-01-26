<template>
  <section>
    <div class="wrapper">
      <img src="@/assets/images/logo_white.svg" alt="Feedbacker logo" />

      <nav>
        <ul>
          <li>Credenciais</li>
          <li>Feedbacks</li>
          <li>Sair</li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: $main-color;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 112px;
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
    img {
      width: 150px;
    }
    nav {
      ul {
        display: flex;
        align-items: center;
        gap: 2.5rem;
        list-style: none;
        li {
          color: $white-color;
          font-weight: $font-bold;
          cursor: pointer;
          &:focus {
            outline: none;
          }
          &:last-child {
            @include button-primary;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 780px) {
  section {
    height: auto;
    .wrapper {
      flex-direction: column;
      align-items: center;
      nav {
        margin-top: 2rem;
        ul {
          flex-direction: column;
          gap: 1rem;
          li {
            &:last-child {
              margin-top: 1.5rem;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <teleport to="body">
    <section class="modal-overlay">
      <div class="modal-wrapper">
        <div
          class="modal-container animate__animated animate__fadeInDown animate__faster"
        >
          <div class="modal-content">
            <component></component>
          </div>
        </div>
      </div>
    </section>
  </teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  .modal-wrapper {
    position: fixed;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    .modal-container {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: $white-color;
      border-radius: 0.5rem;
      .modal-content {
        display: flex;
        flex-direction: column;
        padding: 2.5rem 3rem;
        background-color: $white-color;
      }
    }
  }
  .default-width {
    width: 33.3%;
  }
}

@media screen and (max-width: 640px) {
  .default-width {
    width: 75%;
  }
}
</style>

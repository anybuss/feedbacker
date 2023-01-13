<template>
  <teleport to="body">
    <section
      v-if="state.isActive"
      @click="handleModalToggle({ status: false })"
      class="modal-overlay"
    >
      <div @click.stop :class="state.width" class="modal-wrapper">
        <div
          class="modal-container animate__animated animate__fadeInDown animate__faster"
        >
          <div class="modal-content">
            <component :is="handleModalReference(state.component)"></component>
          </div>
        </div>
      </div>
    </section>
  </teleport>
</template>

<script setup>
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
  defineComponent,
} from "vue";
import useModal from "@/hooks/useModal";

const ModalLogin = defineAsyncComponent(() =>
  import("../ModalLogin/index.vue")
);

const ModalCreateAccount = defineAsyncComponent(() =>
  import("../ModalCreateAccount/index.vue")
);

defineComponent({
  components: [ModalLogin, ModalCreateAccount],
});

const DEFAULT_WIDTH = "default-width";
const modal = useModal();

const state = reactive({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH,
});

onMounted(() => {
  modal.listen(handleModalToggle);
});

onBeforeUnmount(() => {
  modal.off(handleModalToggle);
});

function handleModalReference(name) {
  if (name === "ModalLogin") return ModalLogin;

  if (name === "ModalCreateAccount") return ModalCreateAccount;
}

function handleModalToggle(payload) {
  if (payload.status) {
    state.component = payload.component;
    state.props = payload.props;
    state.width = payload.width ?? DEFAULT_WIDTH;
  } else {
    state.component = {};
    state.props = {};
    state.width = DEFAULT_WIDTH;
  }

  state.isActive = payload.status;
}
</script>

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
}
</style>

<style scoped>
.default-width {
  width: 35%;
}

@media screen and (max-width: 720px) {
  .default-width {
    width: 75%;
  }
}
</style>

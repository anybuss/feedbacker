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
          :style="{ width: `${state.width}px` }"
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
  defineAsyncComponent,
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
import useModal from "@/hooks/useModal";

const ModalLogin = defineAsyncComponent(() =>
  import("../ModalLogin/index.vue")
);

const ModalCreateAccount = defineAsyncComponent(() =>
  import("../ModalCreateAccount/index.vue")
);

const modal = useModal();

const widthRef = ref(window.innerWidth);
const DEFAULT_WIDTH = computed(() => {
  if (widthRef.value >= 768) return 580;
  return 300;
});

const state = reactive({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH,
});

onMounted(() => {
  window.addEventListener("resize", () => (widthRef.value = window.innerWidth));
  modal.listen(handleModalToggle);
});

onBeforeUnmount(() => {
  modal.off(handleModalToggle);
});

onUnmounted(() => {
  window.removeEventListener(
    "resize",
    () => (widthRef.value = window.innerWidth)
  );
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
      border-radius: 0.25rem;
      .modal-content {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        background-color: $white-color;
      }
    }
  }
}
</style>

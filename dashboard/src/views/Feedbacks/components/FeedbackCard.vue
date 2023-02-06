<template>
  <div @click="handleToggle" class="wrapper">
    <div class="top-infos">
      <badge :type="feedback.type"></badge>
      <span>
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="description">{{ feedback.text }}</div>

    <div
      v-if="state.isOpen"
      class="bottom-infos animate__animated animate__fadeInUp animate__faster"
      :class="{
        animate__fadeOutUp: state.isClosing,
      }"
    >
      <div class="container">
        <div class="columns">
          <span class="title">Página</span>
          <span class="content">{{ feedback.page }}</span>
        </div>

        <div class="columns">
          <span class="title">Usuário</span>
          <span class="content">{{ feedback.fingerprint }}</span>
        </div>

        <div class="columns">
          <span class="title">Dispositivo</span>
          <span class="content">{{ feedback.device }}</span>
        </div>
      </div>
    </div>

    <div v-if="!state.isOpen" class="icon-container">
      <icon name="chevron-down" :color="iconColor"></icon>
    </div>
    <div v-else class="icon-container">
      <icon name="chevron-up" :color="iconColor"></icon>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { wait } from "@/utils/timeout";
import { getDiffTimeBetweenCurrentDate } from "@/utils/date";
import Icon from "@/components/Icon/index.vue";
import Badge from "./Badge.vue";

const props = defineProps({
  isOpened: { type: Boolean, default: false },
  feedback: { type: Object, required: true },
});

const state = reactive({
  isOpen: props.isOpened,
  isClosing: !props.isOpened,
});

async function handleToggle() {
  state.isClosing = true;
  await wait(250);
  state.isOpen = !state.isOpen;
  state.isClosing = false;
}

const iconColor = "#C0BCB0";
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: $gray-color;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 2rem;
  .top-infos {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .description {
    font-weight: $font-bold;
    font-size: 1.15rem;
    line-height: 1.75rem;
  }
  .bottom-infos {
    display: flex;
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;
      gap: 0.75rem;
      .columns {
        display: flex;
        flex-direction: column;
        .title {
          font-weight: $font-medium;
          text-transform: uppercase;
          user-select: none;
          padding-bottom: 0.25rem;
        }
      }
    }
  }
  .icon-container {
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 680px) {
  .wrapper {
    .bottom-infos {
      .container {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>

<template>
  <header-logged></header-logged>

  <section>
    <div class="section-name">
      <h1>Feedbacks</h1>
      <p>Detalhes de todos os feedbacks recebidos.</p>
    </div>

    <div class="section-content">
      <div class="container">
        <div class="filters">
          <h2>Listagem</h2>
          <suspense>
            <template #default>
              <filters
                @select-filter="changeFeedbacksType"
                class="animate__animated animate__fadeIn animate__faster"
              ></filters>
            </template>
            <template #fallback>
              <filters-loading></filters-loading>
            </template>
          </suspense>
        </div>

        <div class="feedbacks">
          <span v-if="state.hasError" class="error"
            >Não foi possível carregar os feedbacks.</span
          >
          <span
            v-if="
              !state.feedbacks.length &&
              !state.isLoading &&
              !state.isLoadingFeedbacks &&
              !state.hasError
            "
            class="none"
            >Nenhum feedback recebido até agora.</span
          >

          <feedback-card-loading
            v-if="state.isLoading || state.isLoadingFeedbacks"
          ></feedback-card-loading>

          <feedback-card
            v-else
            v-for="(feedback, index) in state.feedbacks"
            :key="feedback.id"
            :is-opened="index === 0"
            :feedback="feedback"
          ></feedback-card>

          <feedback-card-loading
            v-if="state.isLoadingMoreFeedbacks"
          ></feedback-card-loading>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onErrorCaptured, onMounted, onUnmounted } from "vue";
import services from "@/services";
import HeaderLogged from "@/components/HeaderLogged/index.vue";
import Filters from "./components/Filters.vue";
import FiltersLoading from "./components/FiltersLoading.vue";
import FeedbackCard from "./components/FeedbackCard.vue";
import FeedbackCardLoading from "./components/FeedbackCardLoading.vue";

const state = reactive({
  isLoading: false,
  isLoadingFeedbacks: false,
  isLoadingMoreFeedbacks: false,
  feedbacks: [],
  currentFeedbackType: "",
  pagination: {
    limit: 5,
    offset: 0,
    total: 0,
  },
  hasError: false,
});

onErrorCaptured(handleError);
onMounted(() => {
  fetchFeedbacks();
  window.addEventListener("scroll", handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, false);
});

function handleError(error) {
  state.isLoading = false;
  state.isLoadingFeedbacks = false;
  state.isLoadingMoreFeedbacks = false;
  state.hasError = !!error;
}

async function handleScroll() {
  const isBottomOfWindow =
    Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.scrollHeight;
  if (state.isLoading || state.isLoadingMoreFeedbacks) return;
  if (!isBottomOfWindow) return;
  if (state.feedbacks.length >= state.pagination.total) return;

  try {
    state.isLoadingMoreFeedbacks = true;
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedbackType,
      offset: state.pagination.offset + 5,
    });
    if (data.results.length) {
      state.feedbacks.push(...data.results);
    }
    state.isLoadingMoreFeedbacks = false;
    state.pagination = data.pagination;
  } catch (error) {
    state.isLoadingMoreFeedbacks = false;
    handleError(error);
  }
}

async function changeFeedbacksType(type) {
  try {
    state.isLoadingFeedbacks = true;
    state.pagination.offset = 0;
    state.pagination.limit = 5;
    state.currentFeedbackType = type;
    const { data } = await services.feedbacks.getAll({
      type,
      ...state.pagination,
    });
    state.feedbacks = data.results;
    state.pagination = data.pagination;
    state.isLoadingFeedbacks = false;
  } catch (error) {
    handleError(error);
  }
}

async function fetchFeedbacks() {
  try {
    state.isLoading = true;
    const { data } = await services.feedbacks.getAll({
      ...state.pagination,
      type: state.currentFeedbackType,
    });
    state.feedbacks = data.results;
    state.pagination = data.pagination;
    state.isLoading = false;
  } catch (error) {
    handleError(error);
  }
}
</script>

<style lang="scss" scoped>
section {
  .section-name {
    @include section-name;
    h1 {
      @include section-name-title;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.75rem;
      text-align: center;
    }
  }
  .section-content {
    @include section-content;
    .container {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.5rem;
      .filters {
        h2 {
          @include section-content-title;
        }
      }
      .feedbacks {
        grid-column: 2 / 5;
        padding: 0 2.5rem;
        .error {
          color: $danger-color;
          font: italic $font-regular 14px $font-family;
        }
        .none {
          font: italic $font-regular 14px $font-family;
        }
      }
    }
  }
}

@media screen and (max-width: 780px) {
  section {
    .section-content {
      .container {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem;
        .filters {
          grid-column: 1 / 3;
          h2 {
            text-align: center;
          }
        }
        .feedbacks {
          grid-column: 1 / 3;
          padding: 0;
        }
      }
    }
  }
}
</style>

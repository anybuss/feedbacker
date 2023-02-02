<template>
  <div class="wrapper">
    <p>Filtros</p>

    <ul>
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        @click="() => handleFilterClick(filter)"
        :style="{
          backgroundColor: filter.active ? '#F9F9F9' : 'transparent',
          borderRadius: filter.active ? '0.25rem' : '0',
          border: `1px solid ${filter.active ? filter.colors : 'transparent'}`,
        }"
      >
        <div class="filter-item">
          <span
            :style="{
              backgroundColor: `${filter.colors}`,
            }"
          >
          </span>
          {{ filter.label }}
        </div>
        <span
          :style="{
            color: filter.active ? `${filter.colors}` : '#444444',
          }"
          >{{ filter.amount }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import services from "@/services";
import useStore from "@/hooks/useStore";

const emit = defineEmits(["select-filter"]);

const LABELS = {
  all: "Todos",
  issue: "Problemas",
  idea: "Ideias",
  other: "Outros",
};

const COLORS = {
  all: "#8296FB",
  issue: "#F88676",
  idea: "#E4B52E",
  other: "#EF4983",
};

const store = useStore("Global");
const state = reactive({
  hasError: false,
  filters: [
    {
      label: null,
      amount: null,
    },
  ],
});

function applyFiltersStructure(summary) {
  return Object.keys(summary).reduce((acc, cur) => {
    const currentFilter = {
      label: LABELS[cur],
      colors: COLORS[cur],
      amount: summary[cur],
    };
    if (cur === "all") {
      currentFilter.active = true;
    } else {
      currentFilter.type = cur;
    }

    return [...acc, currentFilter];
  }, []);
}

try {
  const { data } = await services.feedbacks.getSummary();
  state.filters = applyFiltersStructure(data);
} catch (error) {
  state.hasError = !!error;
  state.filters = applyFiltersStructure({
    all: 0,
    issue: 0,
    idea: 0,
    other: 0,
  });
}

function handleFilterClick({ type }) {
  if (store.isLoading) return;

  state.filters = state.filters.map((filter) => {
    if (filter.type === type) return { ...filter, active: true };
    return { ...filter, active: false };
  });

  emit("select-filter", type);
}
</script>

<style lang="scss" scoped>
.wrapper {
  p {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: $font-bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.75rem;
    list-style: none;
    font-weight: $font-medium;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 0.25rem;
      .filter-item {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.5rem;
          border-radius: 999px;
        }
      }
      span {
        font-weight: $font-bold;
      }
    }
  }
}
</style>

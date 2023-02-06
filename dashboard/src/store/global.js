import { reactive } from "vue";

const state = reactive({
  isLoading: false,
});

export default state;

export function setGlobalLoding(status) {
  state.isLoading = status;
}

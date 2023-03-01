import Home from "@/views/Home/index.vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import { shallowMount } from "@vue/test-utils";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

describe("Home component", () => {
  it("should render home correctly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});

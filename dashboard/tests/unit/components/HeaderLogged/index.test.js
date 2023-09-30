import HeaderLogged from "@/components/HeaderLogged/index.vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import { shallowMount } from "@vue/test-utils";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

describe("HeaderLogged component", () => {
  it("should render header logged correctly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render 3 dots when user isn't logged", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router],
      },
    });

    const buttonLogout = wrapper.find("#navbar-logout");
    expect(buttonLogout.text()).toBe("...");
  });
});

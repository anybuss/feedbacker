import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/index.vue");
const Feedbacks = () => import("../views/Feedbacks/index.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "Feedbacks",
    component: Feedbacks,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

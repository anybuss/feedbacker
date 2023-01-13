<template>
  <custom-header
    @create-account="handleCreateAccount"
    @login="handleLogin"
  ></custom-header>
  <contact></contact>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useModal from "@/hooks/useModal";
import CustomHeader from "./components/CustomHeader.vue";
import Contact from "./components/Contact.vue";

const router = useRouter();
const modal = useModal();

onMounted(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push({ name: "Feedbacks" });
  }
});

function handleLogin() {
  modal.open({
    component: "ModalLogin",
  });
}

function handleCreateAccount() {
  modal.open({
    component: "ModalCreateAccount",
  });
}
</script>

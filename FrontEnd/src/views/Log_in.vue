<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" autocomplete="username" required />

        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" autocomplete="current-password" required />

        <button type="submit" :disabled="submitting">Login</button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p class="switch">No account yet? <router-link to="/sign-up">Sign up</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { auth } from "../auth.js";
import { API_BASE_URL } from "../config.js";
import { mergeGuestCart } from "../cart.js";
import { showToast } from "../toast.js";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const submitting = ref(false);

const loginUser = async () => {
  submitting.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: username.value,
      password: password.value,
    });

    auth.login({
      token: response.data.token,
      username: username.value,
      role: response.data.role,
    });
    await mergeGuestCart();
    showToast(`Welcome back, ${username.value}!`);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Login failed.";
  } finally {
    submitting.value = false;
  }
};
</script>

<style src="./auth-form.css" scoped></style>

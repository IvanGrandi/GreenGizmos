<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" autocomplete="username" required />

        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" autocomplete="email" required />

        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" autocomplete="new-password" required />

        <button type="submit" :disabled="submitting">Register</button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p class="switch">Already have an account? <router-link to="/log-in">Log in</router-link></p>
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
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const submitting = ref(false);

const registerUser = async () => {
  submitting.value = true;
  errorMessage.value = "";
  try {
    await axios.post(`${API_BASE_URL}/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
      username: username.value,
      password: password.value,
    });

    auth.login({
      token: loginResponse.data.token,
      username: username.value,
      role: loginResponse.data.role,
    });
    await mergeGuestCart();
    showToast(`Welcome, ${username.value}! Your account has been created.`);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "An error occurred.";
  } finally {
    submitting.value = false;
  }
};
</script>

<style src="./auth-form.css" scoped></style>

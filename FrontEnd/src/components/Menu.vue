<template>
  <header class="main_menu">
    <nav class="Menu">
      <router-link to="/" class="logo-link">
        <div class="logo">
          <img src="../imgs/logo.webp" alt="GreenGizmos logo" width="40" height="40" />
          <h2>Green Gizmos</h2>
        </div>
      </router-link>

      <div :class="['nav-links', { open: menuOpen }]">
        <router-link v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </router-link>

        <template v-if="auth.isAdmin">
          <router-link v-for="link in adminLinks" :key="link.to" :to="link.to" class="admin-link-mobile">
            {{ link.label }}
          </router-link>
        </template>

        <div class="users">
          <template v-if="auth.isLoggedIn">
            <p>Welcome, {{ auth.username }}!</p>
            <button @click="logout">Logout</button>
          </template>
          <template v-else>
            <router-link to="/log-in">Log in</router-link>
            <router-link to="/sign-up">Sign up</router-link>
          </template>
        </div>
      </div>

      <div class="nav-actions">
        <router-link to="/cart" class="cart-link" aria-label="Cart">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </router-link>
        <button
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="search_bar_container">
      <SearchBar />
      <div v-if="auth.isAdmin" class="admin_menu">
        <router-link v-for="link in adminLinks" :key="link.to" :to="link.to">
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth } from "../auth.js";
import SearchBar from "./SearchBar.vue";

const links = [
  { to: "/computing-equipment", label: "Computing Equipment" },
  { to: "/components-upgrades", label: "Components & Upgrades" },
  { to: "/monitors-displays", label: "Monitors & Displays" },
  { to: "/peripherals", label: "Peripherals" },
  { to: "/printing-scanning", label: "Printing & Scanning" },
  { to: "/mobile-gear", label: "Mobile Gear" },
];

const adminLinks = [
  { to: "/add-product", label: "Add Product" },
  { to: "/delete-product", label: "Delete Product" },
  { to: "/user-manager", label: "Manage Users" },
];

const route = useRoute();
const router = useRouter();
const menuOpen = ref(false);

// Close the mobile menu after navigating
watch(() => route.fullPath, () => (menuOpen.value = false));

const logout = () => {
  auth.logout();
  router.push("/");
};
</script>

<style scoped>
.main_menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.Menu {
  position: relative;
  display: flex;
  background-color: #215249;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
}

.Menu a {
  text-decoration: none;
  font-size: 15px;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  white-space: nowrap;
}

.logo > img {
  background-color: white;
  border-radius: 100%;
}

.nav-links {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.users {
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
}

.users > p {
  color: white;
  font-size: 15px;
}

.users > button {
  background-color: white;
  color: #215249;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-link {
  font-size: 20px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}

.admin-link-mobile {
  display: none;
}

.search_bar_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 50px;
  padding: 5px 16px;
  background-color: gray;
}

.admin_menu {
  display: flex;
  align-items: center;
  gap: 15px;
  white-space: nowrap;
}

.admin_menu a {
  text-decoration: none;
  color: white;
  background-color: #215249;
  padding: 5px 10px;
  border-radius: 5px;
}

.admin_menu a:hover {
  background-color: #1a4038;
}

/* Tablets and phones: the links move into a dropdown opened by the hamburger button */
@media (max-width: 1100px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background-color: #215249;
    border-top: 1px solid #ffffff33;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links > a {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #ffffff1a;
  }

  .admin-link-mobile {
    display: block;
  }

  .users {
    flex-direction: row;
    justify-content: space-between;
    padding: 14px 20px;
    gap: 16px;
  }

  .admin_menu {
    display: none;
  }
}

@media (max-width: 480px) {
  .Menu {
    padding: 0 16px;
  }

  .logo h2 {
    font-size: 1.2rem;
  }
}
</style>

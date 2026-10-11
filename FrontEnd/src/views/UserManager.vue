<template>
  <div class="user-manager">
    <h2>User Management</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td><input v-model="user.username" aria-label="Username" /></td>
            <td><input v-model="user.email" aria-label="Email" /></td>
            <td>{{ new Date(user.registration_date).toLocaleDateString() }}</td>
            <td>
              <select v-model="user.role" aria-label="Role">
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </td>
            <td class="actions">
              <button @click="updateUser(user)">Save</button>
              <button class="delete" @click="deleteUser(user.user_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { authHeaders } from "../auth.js";
import { showToast } from "../toast.js";

const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, { headers: authHeaders() });
    users.value = response.data;
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to fetch users.", "error");
  }
};

const updateUser = async (user) => {
  try {
    await axios.put(`${API_BASE_URL}/users/${user.user_id}`, user, { headers: authHeaders() });
    showToast("User updated successfully.");
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to update user.", "error");
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`, { headers: authHeaders() });
    users.value = users.value.filter((u) => u.user_id !== userId);
    showToast("User deleted successfully.");
  } catch (error) {
    showToast(error.response?.data?.message || "Failed to delete user.", "error");
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.user-manager {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 300px;
}

.user-manager h2 {
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

input,
select {
  width: 100%;
  padding: 6px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  white-space: nowrap;
}

button {
  margin: 0 4px;
  padding: 6px 12px;
  color: white;
  background-color: #215249;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.delete {
  background-color: #e53e3e;
}

@media (max-width: 600px) {
  .user-manager {
    padding: 20px 16px;
  }
}
</style>

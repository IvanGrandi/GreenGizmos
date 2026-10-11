import { reactive } from "vue";

// Shared list of visible toasts, rendered by components/Toast.vue (mounted once in App.vue).
export const toasts = reactive([]);

let nextId = 0;

export const dismissToast = (id) => {
  const index = toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) toasts.splice(index, 1);
};

// type: "success" | "error" | "info"
export const showToast = (message, type = "success", duration = 3000) => {
  const id = nextId++;
  toasts.push({ id, message, type });
  setTimeout(() => dismissToast(id), duration);
};

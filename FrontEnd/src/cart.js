import axios from "axios";
import { API_BASE_URL } from "./config.js";
import { showToast } from "./toast.js";
import { auth, authHeaders } from "./auth.js";

// Guests keep their cart in localStorage; it is merged into the
// database cart when they log in or sign up.
const GUEST_CART_KEY = "guestCart";

const isLoggedIn = () => auth.isLoggedIn;

const readGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
};

const writeGuestCart = (items) => {
  try {
    if (items.length > 0) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } else {
      localStorage.removeItem(GUEST_CART_KEY);
    }
  } catch (error) {
    console.error("Error saving guest cart:", error);
  }
};

export const addToCart = async (product) => {
  try {
    if (isLoggedIn()) {
      await axios.post(
        `${API_BASE_URL}/cart`,
        { product_id: product.product_id, quantity: 1 },
        { headers: authHeaders() }
      );
    } else {
      const items = readGuestCart();
      const existing = items.find((item) => item.product_id === product.product_id);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({
          product_id: product.product_id,
          product_name: product.product_name,
          img_url: product.img_url,
          quantity: 1,
          added_at: new Date().toISOString(),
        });
      }
      writeGuestCart(items);
    }
    showToast(`${product.product_name} has been added to your cart!`);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showToast("Failed to add product to cart.", "error");
  }
};

export const getCart = async () => {
  if (!isLoggedIn()) return readGuestCart();

  const response = await axios.get(`${API_BASE_URL}/cart`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const removeFromCart = async (productId) => {
  if (!isLoggedIn()) {
    writeGuestCart(readGuestCart().filter((item) => item.product_id !== productId));
    return;
  }

  await axios.delete(`${API_BASE_URL}/cart`, {
    headers: authHeaders(),
    data: { product_id: productId },
  });
};

// Moves the guest cart into the logged-in user's database cart.
// Items that fail to sync stay in the guest cart so nothing is lost.
export const mergeGuestCart = async () => {
  const remaining = [];
  for (const item of readGuestCart()) {
    try {
      await axios.post(
        `${API_BASE_URL}/cart`,
        { product_id: item.product_id, quantity: item.quantity },
        { headers: authHeaders() }
      );
    } catch (error) {
      console.error("Error merging guest cart item:", error);
      remaining.push(item);
    }
  }
  writeGuestCart(remaining);
};

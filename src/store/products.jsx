import { create } from "zustand";

const BASE_URL = "https://store-backend-7tlk.onrender.com";

const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all the fields" };
    }

    try {
      const response = await fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message };

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to create product. Please try again.",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products`);
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response");
      }

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        set({ products: data.data });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete product. Please try again.",
      };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message };

      // Update UI without needing a refresh
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to update product. Please try again.",
      };
    }
  },
}));

export default useProductStore;

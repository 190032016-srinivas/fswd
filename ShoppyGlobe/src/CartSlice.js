import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validCartItem } from "../BackEnd/Models/cartItems.model";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ cartItemCopy, navigate }, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItemCopy),
      });
      if (!response.ok) {
        if (response.status === 403) {
          navigate("/login");
          return;
        }
        return rejectWithValue("item already added ");
      }
      return cartItemCopy;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItemAsync",
  async (id, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("authToken");
      let userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:3000/cart/delete/${userId}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          navigate("/login");
          return;
        }
        return rejectWithValue("item not found ");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCartCompletelyAsync = createAsyncThunk(
  "cart/deleteCartCompletelyAsync",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("authToken");
      let userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:3000/cart/clear/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 403) {
          navigate("/login");
          return;
        }
        return rejectWithValue("item not found ");
      }
      return [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateCartItmeAsync = createAsyncThunk(
  "cart/updateCartItmeAsync",
  async ({ id, newCount }, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("authToken");
      let userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:3000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id, userId: userId, newCount: newCount }),
      });
      if (!response.ok) {
        if (response.status === 403) {
          navigate("/login");
          return;
        }
        return rejectWithValue("item not found ");
      }
      return { id: id, newCount: newCount };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const initialState = {
  cartItems: [],
};

// slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to the cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    //reset cart items with db ones

    resetCartFromDb: (state, action) => {
      state.cartItems = action.payload;
    },

    // Remove item from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // Increment the quantity
    incrementCount: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    // Decrement the quantity
    decrementCount: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // If the quantity is 1 remove the item from the cart
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = [...state.cartItems, action.payload];
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCartCompletelyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = [];
      })
      .addCase(deleteCartItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItmeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItmeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const item = state.cartItems.find(
          (item) => item.id === action.payload.id
        );
        if (item) {
          item.quantity = action.payload.newCount;
        }
      })
      .addCase(updateCartItmeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  resetCartFromDb,
  removeFromCart,
  incrementCount,
  decrementCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

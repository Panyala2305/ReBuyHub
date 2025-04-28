// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadState, saveState } from "../utils/localStorage"; // ⬅️ new import

// Load cart state from localStorage
const preloadedCart = loadState();

// Inject loaded cart into initial Redux state
const preloadedState = {
  cart: preloadedCart || { cartItems: [] }, // only override cart
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
  preloadedState, // ⬅️ inject preloaded state
});

// Save cart state to localStorage on changes
store.subscribe(() => {
  saveState(store.getState().cart); // only save the cart slice
});

export default store;

/**
* Redux Store Configuration
* Combines all slices and creates the store
*/
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../productsSlice';
import cartReducer from './cartSlice';
// ============================================================================
// STORE CONFIGURATION
// ============================================================================
// configureStore automatically sets up:
// - Redux DevTools extension
// - Thunk middleware for async operations
// - Development checks for common mistakes
export const store = configureStore({
reducer: {
// Each slice gets its own section in the state tree
products: productsReducer, // state.products
cart: cartReducer, // state.cart
},
// Optional: Add middleware or modify default behavior
// middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
// ============================================================================
// TYPE DEFINITIONS (for TypeScript, optional for JavaScript)
// ============================================================================
// If using TypeScript, these types would be:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
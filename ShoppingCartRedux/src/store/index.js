/**
* Redux Store Configuration
* This file sets up the central Redux store using Redux Toolkit
* The store combines all slices (reducers) into a single state tree
*/
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../productsSlice.js';
import cartReducer from './cartSlice';
// Configure the Redux store with our reducers
export const store = configureStore({
reducer: {
// Each key here becomes a branch in our state tree
products: productsReducer, // state.products
cart: cartReducer, // state.cart
},
});
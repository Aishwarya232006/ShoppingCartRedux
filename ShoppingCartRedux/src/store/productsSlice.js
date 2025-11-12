/**
* Products Slice
* Manages the state for products including:
* - Loading state
* - Product list
* - Error handling
* - Async fetching from API
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Async thunk for fetching products from API
// createAsyncThunk handles the promise lifecycle automatically
export const fetchProducts = createAsyncThunk(
'products/fetchProducts', // Action type prefix
async () => {
// Simulate API call with fake data (replace with real API)
const response = await new Promise((resolve) => {
setTimeout(() => {
resolve({
data: [
{
id: 1,
title: 'Smartphone',
price: 699.99,
description: 'Latest model with 5G',
image: 'https://via.placeholder.com/150',
},
{
id: 2,
title: 'Laptop',
price: 1299.99,
description: 'Powerful laptop for professionals',
image: 'https://via.placeholder.com/150',
},
{
id: 3,
title: 'Headphones',
price: 199.99,
description: 'Noise-cancelling wireless headphones',
image: 'https://via.placeholder.com/150',
},
{
id: 4,
title: 'Smart Watch',
price: 399.99,
description: 'Track your fitness and stay connected',
image: 'https://via.placeholder.com/150',
},
{
id: 5,
title: 'Tablet',
price: 549.99,
description: '10-inch display with stylus support',
image: 'https://via.placeholder.com/150',
},
],
});
}, 1000); // Simulate network delay
});
return response.data;
}
);
// Create the products slice
const productsSlice = createSlice({
name: 'products',
initialState: {
items: [], // Array of product objects
loading: false, // Loading state for UI feedback
error: null, // Error message if fetch fails
},
reducers: {
// Regular reducers (none needed for this example)
},
extraReducers: (builder) => {
// Handle async action states
builder
// When fetch starts
.addCase(fetchProducts.pending, (state) => {
state.loading = true;
state.error = null;
})
// When fetch succeeds
.addCase(fetchProducts.fulfilled, (state, action) => {
state.loading = false;
state.items = action.payload;
})
// When fetch fails
.addCase(fetchProducts.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;
});
},
});
export default productsSlice.reducer;
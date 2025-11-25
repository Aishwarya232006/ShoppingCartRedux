/**
* Products Slice
* Manages the product catalog state including loading products from API
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MOCK_PRODUCTS } from '../data/products';
// ============================================================================
// ASYNC THUNK - Fetches products from API
// ============================================================================
// createAsyncThunk automatically generates pending/fulfilled/rejected action types
// First argument: action type string
// Second argument: async function that returns the data
export const fetchProducts = createAsyncThunk(
'products/fetchProducts', // Action type prefix
async (_, { rejectWithValue }) => {
try {
// Make API call to get products
// Using FakeStore API for demo purposes
const response = await axios.get('https://fakestoreapi.com/products?limit=10');
// Return the data - this becomes action.payload in fulfilled case
return response.data;
} catch (error) {
// If API fails, return mock data instead
console.warn('API fetch failed, using mock data:', error.message);
// You can either return mock data or reject with error
// For this lab, we'll return mock data as fallback
return MOCK_PRODUCTS;
// Alternatively, to show error:
// return rejectWithValue(error.message);
}
}
);
// ============================================================================
// INITIAL STATE
// ============================================================================
const initialState = {
items: [], // Array of product objects
loading: false, // Loading indicator for API call
error: null, // Error message if API call fails
};
// ============================================================================
// SLICE DEFINITION
// ============================================================================
const productsSlice = createSlice({
name: 'products',
initialState,
// Regular reducers - handle synchronous actions
reducers: {
// Clear any error messages
clearError: (state) => {
state.error = null;
},
// Set products manually (useful for testing)
setProducts: (state, action) => {
state.items = action.payload;
},
},
// extraReducers - handle async thunk actions
// Builder callback pattern (recommended way)
extraReducers: (builder) => {
builder
// When fetchProducts starts (promise pending)
.addCase(fetchProducts.pending, (state) => {
state.loading = true; // Show loading indicator
state.error = null; // Clear any previous errors
})
// When fetchProducts succeeds (promise fulfilled)
.addCase(fetchProducts.fulfilled, (state, action) => {
state.loading = false; // Hide loading indicator
state.items = action.payload; // Store the fetched products
state.error = null; // Ensure error is cleared
})
// When fetchProducts fails (promise rejected)
.addCase(fetchProducts.rejected, (state, action) => {
state.loading = false; // Hide loading indicator
state.error = action.error.message; // Store error message
// action.error.message contains the error description
});
},
});
// ============================================================================
// SELECTORS - Functions to select data from state
// ============================================================================
// These allow components to access specific parts of the products state
// Get all products
export const selectAllProducts = (state) => state.products.items;
// Get loading status
export const selectProductsLoading = (state) => state.products.loading;
// Get error message
export const selectProductsError = (state) => state.products.error;
// Get product by ID (returns single product or undefined)
export const selectProductById = (state, productId) => {
return state.products.items.find(product => product.id === productId);
};
// Get products count
export const selectProductsCount = (state) => state.products.items.length;
// ============================================================================
// EXPORTS
// ============================================================================
// Export actions for use in components
export const { clearError, setProducts } = productsSlice.actions;
// Export reducer to add to store
export default productsSlice.reducer;
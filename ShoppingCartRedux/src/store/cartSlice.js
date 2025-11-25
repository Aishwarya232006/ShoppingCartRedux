/**
* Cart Slice
* Manages shopping cart state including add/remove/update operations
*/
import { createSlice } from '@reduxjs/toolkit';
// ============================================================================
// INITIAL STATE
// ============================================================================
const initialState = {
// Array of cart items
// Each item: { id, title, price, image, quantity }
items: [],
// Total number of items in cart
totalQuantity: 0,
// Total price of all items
totalAmount: 0,
};
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
* Calculate cart totals from items array
* @param {Array} items - Array of cart items
* @returns {Object} - Object with totalQuantity and totalAmount
*/
const calculateTotals = (items) => {
return items.reduce(
(totals, item) => {
totals.totalQuantity += item.quantity;
totals.totalAmount += item.price * item.quantity;
return totals;
},
{ totalQuantity: 0, totalAmount: 0 }
);
};
// ============================================================================
// SLICE DEFINITION
// ============================================================================
const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
// ========================================================================
// ADD ITEM TO CART
// ========================================================================
addToCart: (state, action) => {
// action.payload contains: { id, title, price, image }
const newItem = action.payload;
// Check if item already exists in cart
const existingItem = state.items.find(item => item.id === newItem.id);
if (existingItem) {
// Item exists - increase quantity
existingItem.quantity++;
} else {
// Item doesn't exist - add new item with quantity 1
state.items.push({
id: newItem.id,
title: newItem.title,
price: newItem.price,
image: newItem.image,
quantity: 1, // Start with quantity of 1
});
}
// Recalculate totals
const totals = calculateTotals(state.items);
state.totalQuantity = totals.totalQuantity;
state.totalAmount = totals.totalAmount;
},
// ========================================================================
// REMOVE ITEM FROM CART
// ========================================================================
removeFromCart: (state, action) => {
// action.payload contains the product id to remove
const id = action.payload;
// Filter out the item with matching id
state.items = state.items.filter(item => item.id !== id);
// Recalculate totals
const totals = calculateTotals(state.items);
state.totalQuantity = totals.totalQuantity;
state.totalAmount = totals.totalAmount;
},
// ========================================================================
// INCREASE ITEM QUANTITY
// ========================================================================
increaseQuantity: (state, action) => {
// action.payload contains the product id
const id = action.payload;
// Find the item
const item = state.items.find(item => item.id === id);
if (item) {
// Increase quantity by 1
item.quantity++;
// Recalculate totals
const totals = calculateTotals(state.items);
state.totalQuantity = totals.totalQuantity;
state.totalAmount = totals.totalAmount;
}
},
// ========================================================================
// DECREASE ITEM QUANTITY
// ========================================================================
decreaseQuantity: (state, action) => {
// action.payload contains the product id
const id = action.payload;
// Find the item
const item = state.items.find(item => item.id === id);
if (item) {
if (item.quantity === 1) {
// If quantity is 1, remove item completely
state.items = state.items.filter(item => item.id !== id);
} else {
// Otherwise, decrease quantity by 1
item.quantity--;
}
// Recalculate totals
const totals = calculateTotals(state.items);
state.totalQuantity = totals.totalQuantity;
state.totalAmount = totals.totalAmount;
}
},
// ========================================================================
// CLEAR ENTIRE CART
// ========================================================================
clearCart: (state) => {
// Reset to initial state
state.items = [];
state.totalQuantity = 0;
state.totalAmount = 0;
},
},
});
// ============================================================================
// SELECTORS
// ============================================================================
// Get all cart items
export const selectCartItems = (state) => state.cart.items;
// Get total quantity in cart
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
// Get total amount (price)
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
// Check if cart is empty
export const selectIsCartEmpty = (state) => state.cart.items.length === 0;
// Get quantity of specific item in cart (returns 0 if not in cart)
export const selectItemQuantity = (state, productId) => {
const item = state.cart.items.find(item => item.id === productId);
return item ? item.quantity : 0;
};
// Check if item is in cart
export const selectIsInCart = (state, productId) => {
return state.cart.items.some(item => item.id === productId);
};
// ============================================================================
// EXPORTS
// ============================================================================
export const {
addToCart,
removeFromCart,
increaseQuantity,
decreaseQuantity,
clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
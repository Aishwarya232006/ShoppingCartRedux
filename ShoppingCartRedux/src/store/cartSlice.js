/**
* Cart Slice
* Manages shopping cart state including:
* - Cart items with quantities
* - Add/remove/update operations
* - Total calculations using selectors
*/
import { createSlice, createSelector } from '@reduxjs/toolkit';
const cartSlice = createSlice({
name: 'cart',
initialState: {
items: [], // Array of {id, title, price, quantity}
},
reducers: {
// Add item to cart or increase quantity if exists
addToCart: (state, action) => {
const existingItem = state.items.find(
item => item.id === action.payload.id
);
if (existingItem) {
// Item exists, increase quantity
existingItem.quantity += 1;
} else {
// New item, add to cart with quantity 1
state.items.push({
...action.payload,
quantity: 1,
});
}
},
// Remove item completely from cart
removeFromCart: (state, action) => {
state.items = state.items.filter(
item => item.id !== action.payload
);
},
// Update item quantity
updateQuantity: (state, action) => {
const { id, quantity } = action.payload;
const item = state.items.find(item => item.id === id);
if (item) {
if (quantity <= 0) {
// Remove item if quantity is 0 or less
state.items = state.items.filter(item => item.id !== id);
} else {
// Update quantity
item.quantity = quantity;
}
}
},
// Clear entire cart
clearCart: (state) => {
state.items = [];
},
},
});
// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
cartSlice.actions;
// Selectors
// Basic selector to get cart items
export const selectCartItems = (state) => state.cart.items;
// Memoized selector to calculate total items in cart
export const selectCartItemsCount = createSelector(
[selectCartItems],
(items) => items.reduce((total, item) => total + item.quantity, 0)
);
// Memoized selector to calculate total price
export const selectCartTotal = createSelector(
[selectCartItems],
(items) => items.reduce(
(total, item) => total + (item.price * item.quantity),
0
).toFixed(2)
);
export default cartSlice.reducer;
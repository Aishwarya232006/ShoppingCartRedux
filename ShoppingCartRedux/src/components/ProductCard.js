/**
* Product Card Component
* Displays individual product with Add to Cart functionality
*/
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectIsInCart, selectItemQuantity } from '../store/cartSlice';
const ProductCard = ({ product }) => {
// ========================================================================
// REDUX HOOKS
// ========================================================================
const dispatch = useDispatch(); // Get dispatch function to send actions
// Check if product is already in cart
const isInCart = useSelector(state => selectIsInCart(state, product.id));
// Get quantity if in cart
const quantity = useSelector(state => selectItemQuantity(state, product.id));
// ========================================================================
// EVENT HANDLERS
// ========================================================================
const handleAddToCart = () => {
// Dispatch addToCart action with product details
dispatch(addToCart({
id: product.id,
title: product.title,
price: product.price,
image: product.image,
}));
};
// ========================================================================
// RENDER
// ========================================================================
return (
<View style={styles.card}>
{/* Product Image */}
<Image
source={{ uri: product.image }}
style={styles.image}
resizeMode="contain"
/>
{/* Product Details */}
<View style={styles.details}>
{/* Product Title - limit to 2 lines */}
<Text style={styles.title} numberOfLines={2}>
{product.title}
</Text>
{/* Category */}
<Text style={styles.category}>{product.category}</Text>
{/* Price */}
<Text style={styles.price}>${product.price.toFixed(2)}</Text>
{/* Add to Cart Button */}
<TouchableOpacity
style={[
styles.button,
isInCart && styles.buttonInCart // Different style if in cart
]}
onPress={handleAddToCart}
>
<Text style={styles.buttonText}>
{isInCart ? `In Cart (${quantity})` : 'Add to Cart'}
</Text>
</TouchableOpacity>
</View>
</View>
);
};
// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
card: {
backgroundColor: 'white',
borderRadius: 8,
marginHorizontal: 10,
marginVertical: 8,
padding: 12,
flexDirection: 'row',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 3, // Android shadow
},
image: {
width: 80,
height: 80,
borderRadius: 4,
},
details: {
flex: 1,
marginLeft: 12,
justifyContent: 'space-between',
},
title: {
fontSize: 14,
fontWeight: '600',
color: '#333',
marginBottom: 4,
},
category: {
fontSize: 12,
color: '#666',
textTransform: 'capitalize',
marginBottom: 4,
},
price: {
fontSize: 16,
fontWeight: 'bold',
color: '#2ecc71',
marginBottom: 8,
},
button: {
backgroundColor: '#3498db',
paddingVertical: 8,
paddingHorizontal: 16,
borderRadius: 4,
alignItems: 'center',
},
buttonInCart: {
backgroundColor: '#2ecc71', // Green when in cart
},
buttonText: {
color: 'white',
fontSize: 12,
fontWeight: '600',
},
});
export default ProductCard;
/**
* Cart Item Component
* Displays cart item with quantity controls
*/
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/cartSlice';
const CartItem = ({ item }) => {
// ========================================================================
// REDUX HOOKS
// ========================================================================
const dispatch = useDispatch();
// ========================================================================
// EVENT HANDLERS
// ========================================================================
const handleIncrease = () => {
dispatch(increaseQuantity(item.id));
};
const handleDecrease = () => {
dispatch(decreaseQuantity(item.id));
};
const handleRemove = () => {
dispatch(removeFromCart(item.id));
};
// Calculate subtotal for this item
const subtotal = (item.price * item.quantity).toFixed(2);
// ========================================================================
// RENDER
// ========================================================================
return (
<View style={styles.container}>
{/* Product Image */}
<Image
source={{ uri: item.image }}
style={styles.image}
resizeMode="contain"
/>
{/* Item Details */}
<View style={styles.details}>
{/* Product Title */}
<Text style={styles.title} numberOfLines={2}>
{item.title}
</Text>
{/* Price per unit */}
<Text style={styles.price}>
${item.price.toFixed(2)} each
</Text>
{/* Quantity Controls */}
<View style={styles.quantityContainer}>
{/* Decrease Button */}
<TouchableOpacity
style={styles.quantityButton}
onPress={handleDecrease}
>
<Text style={styles.quantityButtonText}>-</Text>
</TouchableOpacity>
{/* Quantity Display */}
<Text style={styles.quantity}>{item.quantity}</Text>
{/* Increase Button */}
<TouchableOpacity
style={styles.quantityButton}
onPress={handleIncrease}
>
<Text style={styles.quantityButtonText}>+</Text>
</TouchableOpacity>
{/* Subtotal */}
<Text style={styles.subtotal}>
${subtotal}
</Text>
</View>
{/* Remove Button */}
<TouchableOpacity
style={styles.removeButton}
onPress={handleRemove}
>
<Text style={styles.removeText}>Remove</Text>
</TouchableOpacity>
</View>
</View>
);
};
// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
container: {
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
elevation: 3,
},
image: {
width: 80,
height: 80,
borderRadius: 4,
},
details: {
flex: 1,
marginLeft: 12,
},
title: {
fontSize: 14,
fontWeight: '600',
color: '#333',
marginBottom: 4,
},
price: {
fontSize: 12,
color: '#666',
marginBottom: 8,
},
quantityContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 8,
},
quantityButton: {
backgroundColor: '#3498db',
width: 28,
height: 28,
borderRadius: 14,
justifyContent: 'center',
alignItems: 'center',
},
quantityButtonText: {
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
quantity: {
marginHorizontal: 12,
fontSize: 16,
fontWeight: '600',
minWidth: 30,
textAlign: 'center',
},
subtotal: {
marginLeft: 'auto',
fontSize: 16,
fontWeight: 'bold',
color: '#2ecc71',
},
removeButton: {
alignSelf: 'flex-start',
},
removeText: {
color: '#e74c3c',
fontSize: 12,
fontWeight: '600',
},
});
export default CartItem;
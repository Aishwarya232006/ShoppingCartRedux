/**
 * Cart Screen
 * Displays cart items, totals, and checkout actions
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  clearCart,
  selectIsCartEmpty,
} from '../store/cartSlice';

import CartItem from '../components/CartItem';

const CartScreen = () => {
  // ========================================================================
  // REDUX HOOKS
  // ========================================================================
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const isCartEmpty = useSelector(selectIsCartEmpty);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================
  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => dispatch(clearCart()) },
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      `You purchased ${totalQuantity} items for $${totalAmount.toFixed(2)}.`,
      [
        {
          text: "OK",
          onPress: () => dispatch(clearCart()),
        },
      ]
    );
  };

  // ========================================================================
  // RENDER EMPTY CART
  // ========================================================================
  if (isCartEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  // ========================================================================
  // RENDER CART
  // ========================================================================
  return (
    <View style={styles.container}>
      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearCart}>
            <Text style={styles.buttonText}>Clear Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.checkoutButton]} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  checkoutButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;

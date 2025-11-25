/**
* Product List Screen
* Displays all products and handles loading/error states
*/
import React, { useEffect } from 'react';
import {
View,
Text,
FlatList,
StyleSheet,
ActivityIndicator,
RefreshControl,
TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
fetchProducts,
selectAllProducts,
selectProductsLoading,
selectProductsError,
clearError,
} from '../store/productsSlice';
import { selectCartTotalQuantity } from '../store/cartSlice';
import ProductCard from '../components/ProductCard';
const ProductListScreen = ({ navigation }) => {
// ========================================================================
// REDUX HOOKS
// ========================================================================
const dispatch = useDispatch();
// Select data from Redux store
const products = useSelector(selectAllProducts);
const loading = useSelector(selectProductsLoading);
const error = useSelector(selectProductsError);
const cartQuantity = useSelector(selectCartTotalQuantity);
// ========================================================================
// EFFECTS
// ========================================================================
// Load products when component mounts
useEffect(() => {
dispatch(fetchProducts());
}, [dispatch]);
// ========================================================================
// EVENT HANDLERS
// ========================================================================
const handleRefresh = () => {
// Clear any errors and reload products
dispatch(clearError());
dispatch(fetchProducts());
};
const handleRetry = () => {
// Retry loading products
dispatch(clearError());
dispatch(fetchProducts());
};
const navigateToCart = () => {
navigation.navigate('Cart');
};
// ========================================================================
// RENDER LOADING STATE
// ========================================================================
if (loading && products.length === 0) {
return (
<View style={styles.centerContainer}>
<ActivityIndicator size="large" color="#3498db" />
<Text style={styles.loadingText}>Loading products...</Text>
</View>
);
}
// ========================================================================
// RENDER ERROR STATE
// ========================================================================
if (error && products.length === 0) {
return (
<View style={styles.centerContainer}>
<Text style={styles.errorText}>Error: {error}</Text>
<TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
<Text style={styles.retryButtonText}>Retry</Text>
</TouchableOpacity>
</View>
);
}
// ========================================================================
// RENDER PRODUCT LIST
// ========================================================================
return (
<View style={styles.container}>
{/* Header with Cart Button */}
<View style={styles.header}>
<Text style={styles.headerTitle}>Products</Text>
<TouchableOpacity
style={styles.cartButton}
onPress={navigateToCart}
>
<Text style={styles.cartButtonText}>
! Cart {cartQuantity > 0 && `(${cartQuantity})`}
</Text>
</TouchableOpacity>
</View>
{/* Product List */}
<FlatList
data={products}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => <ProductCard product={item} />}
contentContainerStyle={styles.listContent}
// Pull to refresh functionality
refreshControl={
<RefreshControl
refreshing={loading}
onRefresh={handleRefresh}
colors={['#3498db']} // Android
tintColor="#3498db" // iOS
/>
}
/>
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
centerContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#f5f5f5',
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 16,
backgroundColor: 'white',
borderBottomWidth: 1,
borderBottomColor: '#e0e0e0',
},
headerTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#333',
},
cartButton: {
backgroundColor: '#3498db',
paddingHorizontal: 16,
paddingVertical: 8,
borderRadius: 20,
},
cartButtonText: {
color: 'white',
fontSize: 14,
fontWeight: '600',
},
listContent: {
paddingVertical: 8,
},
loadingText: {
marginTop: 12,
fontSize: 16,
color: '#666',
},
errorText: {
color: '#e74c3c',
fontSize: 16,
textAlign: 'center',
marginBottom: 16,
paddingHorizontal: 20,
},
retryButton: {
backgroundColor: '#3498db',
paddingHorizontal: 24,
paddingVertical: 12,
borderRadius: 4,
},
retryButtonText: {
color: 'white',
fontSize: 16,
fontWeight: '600',
},
});
export default ProductListScreen;
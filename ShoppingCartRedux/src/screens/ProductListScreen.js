/**
* ProductListScreen
* Main screen displaying all products
* Fetches products on mount and displays loading/error states
*/
import React, { useEffect } from 'react';
import {
View,
Text,
FlatList,
StyleSheet,
ActivityIndicator,
RefreshControl,
SafeAreaView,
TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { selectCartItemsCount } from '../store/cartSlice';
import ProductCard from '../components/ProductCard';
const ProductListScreen = ({ navigation }) => {
const dispatch = useDispatch();
// Select state from Redux store
const { items: products, loading, error } = useSelector(
state => state.products
);
const cartItemsCount = useSelector(selectCartItemsCount);
// Fetch products when component mounts
useEffect(() => {
dispatch(fetchProducts());
}, [dispatch]);
// Handle refresh
const handleRefresh = () => {
dispatch(fetchProducts());
};
// Render loading state
if (loading && products.length === 0) {
return (
<View style={styles.centerContainer}>
<ActivityIndicator size="large" color="#3498db" />
<Text style={styles.loadingText}>Loading products...</Text>
</View>
);
}
// Render error state
if (error) {
return (
<View style={styles.centerContainer}>
<Text style={styles.errorText}>Error: {error}</Text>
<TouchableOpacity
style={styles.retryButton}
onPress={handleRefresh}
>
<Text style={styles.retryButtonText}>Retry</Text>
</TouchableOpacity>
</View>
);
}
return (
<SafeAreaView style={styles.container}>
<View style={styles.header}>
<Text style={styles.headerTitle}>Products</Text>
<TouchableOpacity
style={styles.cartButton}
onPress={() => navigation?.navigate('Cart')}
>
<Text style={styles.cartButtonText}>
Cart ({cartItemsCount})
</Text>
</TouchableOpacity>
</View>
<FlatList
data={products}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => <ProductCard product={item} />}
contentContainerStyle={styles.list}
refreshControl={
<RefreshControl
refreshing={loading}
onRefresh={handleRefresh}
colors={['#3498db']}
/>
}
ListEmptyComponent={
<Text style={styles.emptyText}>No products available</Text>
}
/>
</SafeAreaView>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5f5f5',
},
centerContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingHorizontal: 16,
paddingVertical: 12,
backgroundColor: 'white',
borderBottomWidth: 1,
borderBottomColor: '#ecf0f1',
},
headerTitle: {
fontSize: 24,
fontWeight: 'bold',
},
cartButton: {
backgroundColor: '#3498db',
paddingHorizontal: 16,
paddingVertical: 8,
borderRadius: 20,
},
cartButtonText: {
color: 'white',
fontWeight: 'bold',
},
list: {
padding: 16,
},
loadingText: {
marginTop: 10,
fontSize: 16,
color: '#666',
},
errorText: {
fontSize: 16,
color: '#e74c3c',
marginBottom: 16,
textAlign: 'center',
},
retryButton: {
backgroundColor: '#3498db',
paddingHorizontal: 24,
paddingVertical: 12,
borderRadius: 4,
},
retryButtonText: {
color: 'white',
fontWeight: 'bold',
},
emptyText: {
textAlign: 'center',
fontSize: 16,
color: '#666',
marginTop: 50,
},
});
export default ProductListScreen;
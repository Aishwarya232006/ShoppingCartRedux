/**
* App Navigator
* Sets up navigation between screens
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
// Create stack navigator
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
return (
<NavigationContainer>
<Stack.Navigator
initialRouteName="ProductList"
screenOptions={{
headerStyle: {
backgroundColor: '#3498db',
},
headerTintColor: '#fff',
headerTitleStyle: {
fontWeight: 'bold',
},
}}
>
{/* Product List Screen */}
<Stack.Screen
name="ProductList"
component={ProductListScreen}
options={{
title: 'Shop',
headerShown: false, // We have custom header
}}
/>
{/* Cart Screen */}
<Stack.Screen
name="Cart"
component={CartScreen}
options={{
title: 'My Cart',
}}
/>
</Stack.Navigator>
</NavigationContainer>
);
};
export default AppNavigator;
/**
* Main App Component
* Sets up Redux Provider and navigation
*/
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/store';
import ProductListScreen from './src/screens/ProductListScreen';
import CartScreen from './src/screens/CartScreen';
const Stack = createStackNavigator();
function App() {
return (
<Provider store={store}>
<NavigationContainer>
<Stack.Navigator
initialRouteName="Products"
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
<Stack.Screen
name="Products"
component={ProductListScreen}
options={{ title: 'Shop' }}
/>
<Stack.Screen
name="Cart"
component={CartScreen}
options={{ title: 'Shopping Cart' }}
/>
</Stack.Navigator>
</NavigationContainer>
</Provider>
);
}
export default App;

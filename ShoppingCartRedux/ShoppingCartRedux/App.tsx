/**
* App.js
* Main application entry point
* Sets up Redux Provider and Navigation
*/
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
const App = () => {
return (
// Provider makes Redux store available to all components
<Provider store={store}>
{/* Set status bar style */}
<StatusBar barStyle="light-content" />
{/* Main app navigation */}
<AppNavigator />
</Provider>
);
};
export default App;
import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import UI of each page
import Home from './pages/Home'
import Goals from './pages/Goals'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Login from './pages/Login';
import Signup from './pages/Signup'

const Stack = createStackNavigator();
function Authenticate () {
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
    </Stack.Navigator>
  )
} 

//Provide bottom bar navigation
const Tab = createBottomTabNavigator();
function Secured () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App () {
  const [loggedIn, setLoggedIn] = React.useState(true);
  return ( 
  <NavigationContainer> 
    {loggedIn ? <Secured/> : <Authenticate/>} 
  </NavigationContainer> )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

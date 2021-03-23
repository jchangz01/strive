import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import UI of each page
import Login from './pages/Login'
import Home from './pages/Home'
import Goals from './pages/Goals'
import Search from './pages/Search'
import Profile from './pages/Profile'

//Provide bottom bar navigation
const Tab = createBottomTabNavigator();

function Secured () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Goals" component={Goals} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App () {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return ( loggedIn ? <Secured/> : <Login/> )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

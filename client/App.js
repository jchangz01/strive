import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Import UI of each page
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Login from './pages/Login';
import Signup from './pages/Signup'

//Standard navigation
const Stack = createStackNavigator();
function Authenticate (props) {

  // initialParams is to pass the updateSecured prop to the Login component
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        initialParams={{
          updateSecured: props.updateSecured,
          setUserData: props.setUserData
        }}
      ></Stack.Screen>
      <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
    </Stack.Navigator>
  )
} 

//Provide bottom bar navigation
const Tab = createBottomTabNavigator();
function Secured (props) {

  console.log("userdata is", props.userData);
  const userParams = {
    userData: props.userData,
    setUserData: props.setUserData
  };

  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} initialParams={userParams} />
      <Tab.Screen name="Search" component={Search} initialParams={userParams}/>
      <Tab.Screen name="Challenges" component={Challenges} initialParams={userParams}/>
      <Tab.Screen name="Profile" component={Profile} initialParams={userParams}/>
    </Tab.Navigator>
  );
}

export default function App () {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  // check cookie store to see if an auth cookie is present
  // if it is, load all user data; if not, present login screen

  return ( 
  <NavigationContainer> 
    {
      loggedIn ? <Secured userData={userData} setUserData={setUserData}/> : 
      <Authenticate updateSecured={setLoggedIn} setUserData={setUserData}/>
    } 
  </NavigationContainer> )
};
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//Import UI of each page
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Login from './pages/Login';
import Signup from './pages/Signup'

import { UserContext } from './contexts/UserContext';

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
        initialParams={{updateSecured: props.updateSecured}}
      ></Stack.Screen>
      <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
    </Stack.Navigator>
  )
} 

import Test from './screens/createPost'
//Provide bottom bar navigation
const Tab = createBottomTabNavigator();
function Secured () {

  const context = React.useContext(UserContext);

  console.log("userdata is", context.userData);

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') 
              iconName="home";
            else if (route.name === 'Search') 
              iconName="search"
            else if (route.name === 'Challenges') 
              iconName="bullseye"
            else if (route.name === 'Profile')
              iconName="user"
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Challenges" component={Challenges}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App () {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [uData, setUData] = React.useState(null);

  // check cookie store to see if an auth cookie is present
  // if it is, load all user data; if not, present login screen

  return ( 
  <UserContext.Provider
    value={{ userData: uData, setUserData: setUData }}  
  >
    <NavigationContainer> 
      {
        loggedIn ? <Secured /> : 
        <Authenticate updateSecured={setLoggedIn}/>
      } 
    </NavigationContainer>
  </UserContext.Provider>
  );
};
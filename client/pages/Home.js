import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import Header from '../components/header'
import Post from '../components/challengePost'


function HomeScreen ({ navigation }) {
  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      <Post navigation={navigation}/>
      <Post navigation={navigation}/>
      
    </ScrollView>
    </>
  );
}

//Standard navigation
const HomeStack = createStackNavigator();
export default function Home () {
  return(
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen name="PostDetail" component={PostDetailScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  )
} 

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white'
  }
})
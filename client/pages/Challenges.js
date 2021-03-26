import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/header'
import Post from '../components/challengePost'

function currentChallengesScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Post/>
    </ScrollView>
  );
}

function pastChallengesScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Post/>
      <Post/>
      <Post/>
    </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'gray',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'white',  },
      }}
    >
      <Tab.Screen
        name="Current"
        component={currentChallengesScreen}
        options={{ tabBarLabel: 'Current' }}
      />
      <Tab.Screen
        name="Past"
        component={pastChallengesScreen}
        options={{ tabBarLabel: 'Past' }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <MyTabs/>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white'
  },
})

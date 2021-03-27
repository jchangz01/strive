import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/header'
import Post from '../components/challengePost'

import { UserContext } from '../contexts/UserContext';

function currentChallengesScreen({ route }) {

  const context = React.useContext(UserContext);
  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      console.log(`getting joined challenges for user with id ${context.userData.id}`)

      await fetch('http://localhost:3000/post/get', {
        method: 'POST',
        body: JSON.stringify({ posts: context.userData.joinedChallenges }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp2 => resp2.json())
      .then(resp2 => {
        setJoinedChallenges(resp2); 
      });
    }
    getJoinedChallenges();
  }, [context.userData]);

  const postList = joinedChallenges.map(post =>
  {
    return <Post key={post.id} postData={post}/>
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {postList}
    </ScrollView>
  );
}

function pastChallengesScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>

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
        style: { backgroundColor: 'white', },
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
      <MyTabs />
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

import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/header'
import Post from '../components/challengePost'

function currentChallengesScreen({ route }) {

  console.log("posts in curchallengescreen", route.params.posts);

  const postList = route.params.posts.map(post =>
  {
    return <Post data={post} />
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
      <Post/>
      <Post/>
      <Post/>
    </ScrollView>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs(props) {

  console.log("posts", props.posts);

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

        initialParams={{ posts: props.posts }}
      />
      <Tab.Screen
        name="Past"
        component={pastChallengesScreen}
        options={{ tabBarLabel: 'Past' }}
      />
    </Tab.Navigator>
  );
}

export default function App({ route }) {

  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      await fetch('http://localhost:3000/post/get', {
        method: 'POST',
        body: JSON.stringify({ posts: route.params.userData.joinedChallenges }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => resp.json())
      .then(resp => {
        setJoinedChallenges(resp); 
      });
    }
    getJoinedChallenges();
  }, []);
  
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <MyTabs posts={joinedChallenges}/>
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

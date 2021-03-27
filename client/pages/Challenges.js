import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../components/header'
import Post from '../components/challengePost'

function currentChallengesScreen({ route }) {

  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  // cumbersome, but get the user data first, and then and joined challenges
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      console.log(`getting joined challenges for user with id ${route.params.userID}`)

      await fetch(`http://localhost:3000/user/${route.params.userID}`)
        .then(resp => resp.json())
        .then(async resp =>
        {
          await fetch('http://localhost:3000/post/get', {
            method: 'POST',
            body: JSON.stringify({ posts: resp.joinedChallenges }),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(resp2 => resp2.json())
          .then(resp2 => {
            setJoinedChallenges(resp2); 
          });
        });
    }
    getJoinedChallenges();
  }, []);

  const postList = joinedChallenges.map(post =>
  {
    return <Post key={post.id} postData={post} />
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
        initialParams={{ userID: props.userID }}
      />
      <Tab.Screen
        name="Past"
        component={pastChallengesScreen}
        options={{ tabBarLabel: 'Past' }}
        initialParams={{ userID: props.userID }}
      />
    </Tab.Navigator>
  );
}

export default function App({ route }) {
  
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <MyTabs userID={route.params.userData.id} />
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

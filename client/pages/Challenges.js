import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import ProfileDetailScreen from '../screens/profileDetails'
import Header from '../components/header'
import Post from '../components/challengePost'

import { UserContext } from '../contexts/UserContext';

// TODO: lift up requests into parent component AND USE ANOTHER CONTEXT!!

function currentChallengesScreen({ navigation }) {

  const context = React.useContext(UserContext);
  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      console.log(`getting joined challenges for user with id ${context.userData.id}`)

      await fetch('http://10.0.0.153:3000/post/get', {
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


  const currentTimeUTC = new Date().getTime();

  const currentPostList = joinedChallenges.filter(post => currentTimeUTC < post.finishDate)
  const currentPostListComponent = currentPostList.map((post) => {
    return <Post key={post.id} postData={post} navigation={navigation}/>
  })

  return (
    <ScrollView style={{ flex: 1 }}>
      {currentPostListComponent}
    </ScrollView>
  );
}

function pastChallengesScreen({ navigation }) {
  const context = React.useContext(UserContext);
  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      console.log(`getting joined challenges for user with id ${context.userData.id}`)

      await fetch('http://10.0.0.153:3000/post/get', {
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


  const currentTimeUTC = new Date().getTime();

  const pastPostList = joinedChallenges.filter(post => currentTimeUTC >= post.finishDate)
  const pastPostListComponent = pastPostList.map((post) => {
    return <Post key={post.id} postData={post} navigation={navigation}/>
  })
  return (
    <ScrollView style={{ flex: 1 }}>
      {pastPostListComponent}
    </ScrollView>
  );
}

//Top tab navigator to switch between past and current challenges
const Tab = createMaterialTopTabNavigator();
function ChallengeTabs(props) {
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

function ChallengeScreen() {
  return (
    <>
    <Header createDisabled={true}/>
    <View style={styles.container}>
      <ChallengeTabs />
    </View>
    </>
  );
}

//Standard navigation
const ChallengesStack = createStackNavigator();
export default function Challenges () {
  return(
    <ChallengesStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ChallengesStack.Screen name="Challenge" component={ChallengeScreen} />
      <ChallengesStack.Screen name="PostDetail" component={PostDetailScreen} />
      <ChallengesStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </ChallengesStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white'
  },
})

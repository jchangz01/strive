import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import Header from '../components/header'
import Post from '../components/challengePost'

function currentChallengesScreen({ route, navigation }) {

  const [joinedChallenges, setJoinedChallenges] = React.useState([]);

  // get all joined challenges from user
  // cumbersome, but get the user data first, and then and joined challenges
  React.useEffect(() =>
  {
    const getJoinedChallenges = async () =>
    {
      console.log(`getting joined challenges for user with id fc56d0cc-374e-4eb5-9351-28fa5d42778e`)

      await fetch(`http://10.0.0.153:3000/user/fc56d0cc-374e-4eb5-9351-28fa5d42778e`)
        .then(resp => resp.json())
        .then(async resp =>
        {
          await fetch('http://10.0.0.153:3000/post/get', {
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
    return <Post key={post.id} postData={post} navigation={navigation}/>
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {postList}
    </ScrollView>
  );
}

function pastChallengesScreen({ navigation }) {
  //implement past Challenges fetch
  return (
    <ScrollView style={{ flex: 1 }}>
      <Post/>
      <Post/>
      <Post/>
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

function ChallengeScreen({ route }) {
  return (
    <>
    <Header/>
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
      <ChallengesStack.Screen name="Challenge" component={ChallengeScreen}></ChallengesStack.Screen>
      <ChallengesStack.Screen name="PostDetail" component={PostDetailScreen}></ChallengesStack.Screen>
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

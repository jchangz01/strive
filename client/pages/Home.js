import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import ProfileDetailScreen from '../screens/profileDetails'
import Header from '../components/header'
import Post from '../components/challengePost'

import { UserContext } from '../contexts/UserContext';

function HomeScreen ({ route, navigation }) {

  const context = React.useContext(UserContext);
  const [challengePosts, setChallengePosts] = React.useState([])

  React.useEffect( () => {

    console.log("refetching feed");

    async function retrieveData() { 
      await fetch(`http://localhost:3000/feed/loadFeed/${context.userData.id}`)
      .then(resp => resp.json())
      .then(resp =>
      {
        setChallengePosts(resp);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        }) 
    }
    retrieveData();
  }, [context.userData]);

  const Posts = challengePosts.map((post) => {
    return <Post 
      postData={post} 
      key={post.id} 
      navigation={navigation} 
      />
  })
  
  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      {Posts}
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
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="PostDetail" component={PostDetailScreen} />
      <HomeStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
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
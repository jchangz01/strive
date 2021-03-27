import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import Header from '../components/header'
import Post from '../components/challengePost'
import { useLinkProps } from '@react-navigation/native';


function HomeScreen (props) {
  const [challengePosts, setChallengePosts] = React.useState([])

  React.useEffect( () => {
    async function retrieveData() { 
      await fetch('http://10.0.0.153:3000/feed/loadFeed/fc56d0cc-374e-4eb5-9351-28fa5d42778e')
      .then(resp => resp.json())
      .then(resp =>
      {
        setChallengePosts(resp);
        // at this point, resp is an array of posts - create a new Post component for each Post object in the resp array
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        }) 
    }
    retrieveData();
  }, [])

  const Posts = challengePosts.map((post, index) => {
    return <Post postData={post} key={index} navigation={props.navigation} />
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
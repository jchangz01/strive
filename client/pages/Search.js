import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import Header from '../components/header'
import Post from '../components/challengePost'

function SearchScreen({ navigation }) {
  const [input, setInput] = React.useState('');
  const [challengePosts, setChallengePosts] = React.useState([]);

  const handleSearch = async (e) => {
    setInput(e);
    //enter fetch call here 
    //set challengePosts to data retrieved (array of post's objects)

    await fetch('http://10.0.0.153:3000/post/search', {
      method: 'POST',
      body: JSON.stringify({
        query: input
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(resp => resp.json())
    .then(resp =>
      {
        console.log("resp data", resp);
        setChallengePosts(resp[0]);
      });
  }

  const Posts = challengePosts.map((post, index) => {
    return <Post postData={post} key={index} navigation={navigation} />
  })

  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
        <SearchBar value={input} onChangeText={handleSearch} platform='ios' placeholder='Search'></SearchBar>
      </View>
      {Posts}
    </ScrollView>
    </>
  );
}


//Standard navigation
const SearchStack = createStackNavigator();
export default function Search () {
  return(
    <SearchStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <SearchStack.Screen name="Search" component={SearchScreen}></SearchStack.Screen>
      <SearchStack.Screen name="PostDetail" component={PostDetailScreen}></SearchStack.Screen>
    </SearchStack.Navigator>
  )
} 

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white'
  },
})
import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Header from '../components/header'
import Post from '../components/challengePost'

export default function Home({ navigation }) {
  const [input, setInput] = React.useState('');
  const [challengePosts, setChallengePosts] = React.useState([]);

  const handleSearch = async (e) => {
    setInput(e);
    //enter fetch call here 
    //set challengePosts to data retrieved (array of post's objects)

    await fetch('http://localhost:3000/post/search', {
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

  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
        <SearchBar value={input} onChangeText={handleSearch} platform='ios' placeholder='Search'></SearchBar>
      </View>
    </ScrollView>
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
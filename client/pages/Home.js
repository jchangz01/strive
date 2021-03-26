import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Header from '../components/header'
import Post from '../components/challengePost'

export default function Home({ navigation }) {
  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      <Post/>
      <Post/>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white'
  }
})
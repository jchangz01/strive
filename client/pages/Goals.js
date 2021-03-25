import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../components/header'

export default function Home({ navigation }) {
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
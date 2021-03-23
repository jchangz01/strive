import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

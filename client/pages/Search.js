import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Search({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

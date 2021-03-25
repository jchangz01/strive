import * as React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import Prompt from '../components/prompt'

export default function Login({ logIn, navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
      
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <Text style={styles.title}>STRIVE</Text>
        <Prompt type="Log in" email={email} emailChange={(e) => setEmail(e)} pw={password} pwChange={(e) => setPassword(e)}/>
        <View style={styles.newUserView}>
          <Text>Not a user?</Text>
          <Text style={styles.newUser} onPress={() => navigation.navigate('Signup')}> Create an account!</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 56,
    letterSpacing: 2,
    marginBottom: 24,
  },
  /*forgot_button: {
    height: 30,
    marginBottom: 30,
  },*/
  
  newUserView: {
    position: 'absolute',
    bottom: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: '100%',
    borderTopColor: 'lightgray',
    borderTopWidth: 1
  },
  newUser: {
    color: 'blue',
  }
});
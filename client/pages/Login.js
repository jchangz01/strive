import * as React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert } from 'react-native';
import Prompt from '../components/prompt'

import { UserContext } from '../contexts/UserContext';

export default function Login({ route, navigation }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const context = React.useContext(UserContext);

  const handleLogin = async () => {

  // send post request - URL is for dev env only
  await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(resp => resp.json())
  .then(resp =>
    {
      console.log("login response", resp);

      if (!resp.success)
      {
        Alert.alert(
          "Login Failed",
          resp.message,
          [
            { text: "OK" }
          ]
        );
      }
      else
      {
        // change the view after the user is logged in
        //route.params.setUserData(resp.data);
        
        context.setUserData(resp.data);
        
        route.params.updateSecured(true);
      }
    });
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <Text style={styles.title}>STRIVE</Text>
        <Prompt type="Log in" email={email} emailChange={(e) => setEmail(e)} pw={password} pwChange={(e) => setPassword(e)} submit={handleLogin}/>
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
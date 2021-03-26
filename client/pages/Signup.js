import * as React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert } from 'react-native';
import Prompt from '../components/prompt'

export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');

  const handleSignup = async () => {

    // make sure passwords match
    if (rePassword !== password)
    {
      Alert.alert(
        "Password Mismatch",
        "The two passwords do not match. Please try again.",
        [
          { text: "OK" } /* OK button */
        ]
      );

      console.log("ERROR ON SIGNUP - passwords do not match!");
    }
    else
    {
      // send post request - URL is for dev env only
      await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => resp.json())
      .then(resp =>
      {
        console.log("signup response", resp);

        Alert.alert(
          resp.success ? "Account Created" : "Failed to Create Account",
          resp.message,
          [
            { 
              text: "OK",
              onPress: () => { if (resp.success) navigation.navigate('Login'); }
            } /* OK button */
          ]
        );
      })
    }
  }

  return (
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
        <Text style={styles.title}>STRIVE</Text>
        <Prompt 
            type="Sign up" 
            username={username}
            usernameChange={(e) => setUsername(e)}
            email={email} 
            emailChange={(e) => setEmail(e)} 
            pw={password} 
            pwChange={(e) => setPassword(e)}
            rePw={rePassword}
            rePwChange={(e) => setRePassword(e)}
            submit={handleSignup}/>
        <View style={styles.newUserView}>
          <Text>Already a user?</Text>
          <Text style={styles.newUser} onPress={() => navigation.navigate('Login')}> Log in!</Text>
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
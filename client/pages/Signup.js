import * as React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Prompt from '../components/prompt'

export default function Login({ navigation }) {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');

  const handleSignup = () => {
    
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
            rePwChange={(e) => setRePassword(e)}/>
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
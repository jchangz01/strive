import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header'

export default function Home(props) {
  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
        <View style={styles.profileView}>
          <Icon name="user-circle" size={96} color='lightgray'/>
          <View style={styles.profileUserView}>
            <Text style={styles.profileUsername}>Justin Kyle Chang</Text>
            <Text style={styles.profileUserEmail}>jchangz01@g.ucla.edu</Text>
          </View>
        </View>
        <View style={styles.profileDataContainer}>
          <View style={styles.profileDataView}>
            <Text style={styles.profileDataCount}>100</Text>
            <Text style={styles.profileDataType}>Completed</Text>
          </View>
          <View style={styles.profileDataView}>
            <Text style={styles.profileDataCount}>24</Text>
            <Text style={styles.profileDataType}>Following</Text>
          </View>
          <View style={styles.profileDataView}>
            <Text style={styles.profileDataCount}>24</Text>
            <Text style={styles.profileDataType}>Followers</Text>
          </View>
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
  profileView: {
    display: 'flex',
    marginTop: 20,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  profileUserView: {
    flexBasis: '68%'
  },
  profileUsername: {
    fontSize: 16
  },
  profileUserEmail:{
    fontSize: 16,
    color: 'gray'
  },
  profileDataContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    backgroundColor: 'whitesmoke',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { height: 2},
    shadowOpacity: 0.4,
    elevation: 4,
  },
  profileDataView: {
  },
  profileDataCount: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileDataType: {
    textAlign: 'center',
    fontSize: 16,
  }
})
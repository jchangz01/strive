import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Post from '../components/challengePost'


export default function ProfileView ({profileInfo, createdPosts, navigation}) {
    const postList = createdPosts?.map(post =>
    {
        return <Post key={post.id} postData={post} profileSelectOff={true} navigation={navigation}/>
    });

    return (
        <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
            <View style={styles.profileView} >
            <Icon name="user-circle" size={96} color='lightgray'/>
                <View style={styles.profileUserView}>
                    <Text style={styles.profileUsername}>{profileInfo?.username}</Text>
                    <Text style={styles.profileUserEmail}>{profileInfo?.userEmail}</Text>
                </View>
            </View>
            <View>
            <View style={styles.profileDataContainer}>
                <View style={styles.profileDataView}>
                    <Text style={styles.profileDataCount}>{profileInfo?.completedChallengeCount}</Text>
                    <Text style={styles.profileDataType}>Completed</Text>
                </View>
                <View style={styles.profileDataView}>
                    <Text style={styles.profileDataCount}>{profileInfo?.followingCount}</Text>
                    <Text style={styles.profileDataType}>Following</Text>
                </View>
                <View style={styles.profileDataView}>
                    <Text style={styles.profileDataCount}>{profileInfo?.followerCount}</Text>
                    <Text style={styles.profileDataType}>Followers</Text>
                </View>
            </View>
            </View>  
            {postList}
        </ScrollView>
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
      marginVertical: 20,
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
      width: '100%',
      backgroundColor: 'whitesmoke',
      height: 100,
      marginBottom: 8,
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
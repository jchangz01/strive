import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/challengePostDetails'
import ProfileDetailScreen from '../screens/profileDetails'
import CreatePost from '../screens/createPost'
import Header from '../components/header'
import ProfileTemplate from '../components/profileView'
import { UserContext } from '../contexts/UserContext';

function ProfileScreen({ navigation }) {

  const context = React.useContext(UserContext);

  const [profileInfo, setProfileInfo] = React.useState({});
  const [createdPosts, setCreatedPosts] = React.useState([]);

  // update profile stuff accordingly
  React.useEffect(() =>
  {
    setProfileInfo({
      username: context.userData.displayName,
      userEmail: context.userData.email,
      completedChallengeCount: context.userData.completedChallenges.length,
      followerCount: context.userData.followers.length,
      followingCount: context.userData.following.length
    });

    console.log("getting created posts for profile screen");

    // second request to get all the posts 
    const getPostsProfile = async () =>
    {
      await fetch(`http://localhost:3000/post/get`, {
        method: 'POST',
        body: JSON.stringify({ posts: context.userData.createdChallenges }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => resp.json())
      .then(resp => setCreatedPosts(resp));
    }
    getPostsProfile();
  }, [context.userData]);
  

  return (
    <>
        <Header/>
        <ProfileTemplate personalProfile={true} profileInfo={profileInfo} createdPosts={createdPosts} navigation={navigation}/>                    
    </>
  );
}

//Standard navigation
const ProfileStack = createStackNavigator();
export default function Profile () {
  return(
    <ProfileStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ProfileStack.Screen name="Profile"component={ProfileScreen} />
      <ProfileStack.Screen name="PostDetail" component={PostDetailScreen} />
      <ProfileStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
      <ProfileStack.Screen name="CreatePost" component={CreatePost} />
    </ProfileStack.Navigator>
  )
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
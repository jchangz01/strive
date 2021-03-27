import * as React from 'react';
import Header from '../components/header'
import Profile from '../components/profileView'

export default function ProfileDetails({ route, navigation }) {
    const p = {
        username: 'jchangz',
        userEmail: 'justinklchang@yahoo.com',
        completedChallengeCount: '10',
        followerCount: '50',
        followingCount: '56'
    }
    
    console.log("Loading user details");

    const [profileInfo, setProfileInfo] = React.useState({});
    const [createdPosts, setCreatedPosts] = React.useState([]);

    React.useEffect(() => {
        const getProfileData = async () => {
            await fetch(`http://localhost:3000/user/${route.params.profileId}`)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                setProfileInfo({
                    username: resp.displayName,
                    userEmail: resp.email,
                    completedChallengeCount: resp.completedChallenges.length,
                    followerCount: resp.followers.length,
                    followingCount: resp.following.length
                });

                fetch(`http://localhost:3000/post/get`, {
                    method: 'POST',
                    body: JSON.stringify({ posts: resp.createdChallenges }),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(resp => resp.json())
                .then(resp => setCreatedPosts(resp));
            })
        }
        getProfileData();
    }, []);

    return (
    <>
        <Header/>
        <Profile profileInfo={profileInfo} createdPosts={createdPosts} navigation={navigation}/>                    
    </>
    )
}
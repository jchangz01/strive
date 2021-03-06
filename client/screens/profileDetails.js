import * as React from 'react';
import Header from '../components/header'
import Profile from '../components/profileView'

export default function ProfileDetails({ route, navigation }) {
    
    console.log("Loading user details");

    const [profileInfo, setProfileInfo] = React.useState({});
    const [createdPosts, setCreatedPosts] = React.useState([]);

    React.useEffect(() => {
        const getProfileData = async () => {
            await fetch(`http://localhost:3000/user/${route.params.profileId}`)
            .then(resp => resp.json())
            .then(resp => {
                console.log("profileview userdata", resp);
                setProfileInfo(resp);

                fetch(`http://localhost:3000/post/get`, {
                    method: 'POST',
                    body: JSON.stringify({ posts: resp.createdChallenges }),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(resp2 => resp2.json())
                .then(resp2 => setCreatedPosts(resp2));
            })
        }
        getProfileData();
    }, []);

    return (
    <>
        <Header createDisabled={true} />
        <Profile profileInfo={profileInfo} setProfileInfo={setProfileInfo} createdPosts={createdPosts} navigation={navigation}/>                    
    </>
    )
}
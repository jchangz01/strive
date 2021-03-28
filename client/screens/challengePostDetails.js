import * as React from 'react';
import { Text, View, StyleSheet, Animated, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/header'
import Post from '../components/challengePost'
import Message from '../components/progressMessage'

import { UserContext } from '../contexts/UserContext';

function UpdateProgess ({ postID, setPostData }) {

    const context = React.useContext(UserContext);

    const [progress, setProgress] = React.useState(0);
    const [blurb, setBlurb] = React.useState('');

    const handleUpdateProgress = async () =>
    {
        console.log("things to be sent over",
        {
            progress: progress,
            blurb: blurb 
        });

        // push to the backend 
        await fetch(`http://localhost:3000/user/${context.userData.id}/updateProgress/${postID}`,
        {
            method: 'POST',
            body: JSON.stringify({
                progress: progress,
                blurb: blurb
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(resp => resp.json())
        .then(resp =>
            {
                setPostData(resp);
            });
    }

    return (
        <>
            <View style={styles.postDetailUpdateContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                    <Text style={styles.postDetailUpdateField}>Enter percentage progress: </Text>
                    <View style={[styles.postDetailUpdateInputView, {width: '20%', height: 32}]}>
                        <TextInput 
                            placeholder="1-100" 
                            keyboardType='numeric' 
                            maxLength={3} 
                            style={styles.postDetailUpdateInputContent}
                            value={progress.toString()}
                            onChangeText={setProgress}
                            />
                    </View>
                    <Text> %</Text>
                </View>
                <Text style={styles.postDetailUpdateField}>Description: </Text>
                <View style={[styles.postDetailUpdateInputView, {marginTop: 8}]}>
                    <TextInput 
                        multiline={true} 
                        style={[styles.postDetailUpdateInputContent, {width: '100%', height: 100}]}
                        value={blurb}
                        onChangeText={setBlurb}
                    />
                </View>
                <TouchableOpacity style={styles.postDetailUpdateButton} onPress={handleUpdateProgress}>
                    <Text style={styles.postDetailUpdateButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function UsersProgess ({ data, personal }) {
    return (        
        <>
            {personal ? null : <Text style={styles.progressUser}>{data.displayName}</Text>}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: data.progress + '%'}}/>
                </View>
                <Text style>{data.progress}%</Text>
            </View>
        </>
    )
}


export default function ChallengePostDetails({ route, navigation }) {

    console.log("loading post details for post", route.params.postId);

    const context = React.useContext(UserContext);

    const [participant, setParticipant] = React.useState(false)
    const [postData, setPostData] = React.useState({ id: route.params.postId });

    React.useEffect(() => {
        //search user's joined challenges to verify if they have joined the challenge
        if (context.userData.joinedChallenges.findIndex(e => e === route.params.postId) > -1)
            setParticipant(true);
        else
            setParticipant(false);
    }, [context.userData]);

    React.useEffect(() => {
        const getPostData = async () => {

            await fetch('http://localhost:3000/post/get', {
                method: 'POST',
                body: JSON.stringify({ posts: [route.params.postId] }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                setPostData(resp[0]);
            })
        }
        getPostData();
    }, [context.userData]);

    const PersonalProgess = postData.challengers?.filter(entry => entry.id === context.userData.id )
    const PersonalProgessComponent = PersonalProgess?.map((entry, index) => {
        return <UsersProgess data={entry} personal={true} key={index}/>
    })

    const PersonalMessage = postData.challengers?.filter((entry, index) => (entry.id === context.userData.id && entry.blurbUpdateTime))
    const PersonalMessageComponent = PersonalMessage?.map((entry, index) => {
        return <Message data={entry} personal={true} key={index}/>
    })

    const LeaderboardListComponent = postData.challengers?.map((entry, index) => {
        return <UsersProgess data={entry} key={index}/>
    })

    const MessageList = postData.challengers?.filter((entry, index) => (entry.id != context.userData.id && entry.blurbUpdateTime))
    const MessageListComponent = MessageList?.map((entry, index) => {
        return <Message data={entry} key={index}/>
    })

    return (
    <>
        <Header createDisabled={true} />
        <View style={styles.container}>
            <ScrollView >    
                <Post postData={postData} detailedMode={true} navigation={navigation}>
                    {   
                        participant ? 
                        <>
                            <View style={styles.postDetailSectionContainer}>
                                <Text style={styles.postDetailSectionTitle}>Your Progress</Text>
                                {PersonalProgessComponent}
                                {PersonalMessageComponent}
                            </View>
                            <View style={styles.postDetailSectionContainer}>
                                <Text style={styles.postDetailSectionTitle}>Update Progress</Text>
                                <UpdateProgess 
                                    postID={postData.id}
                                    setPostData={setPostData}   // used to trigger rerender 
                                />
                            </View> 
                        </>: null
                    }
                    <View style={styles.postDetailSectionContainer}>
                        <Text style={styles.postDetailSectionTitle}>Leaderboard</Text>
                        {LeaderboardListComponent}
                    </View>
                    <View style={styles.postDetailSectionContainer}>
                        <Text style={styles.postDetailSectionTitle}>How others are doing</Text>
                        {MessageListComponent}
                    </View>
                </Post>
            </ScrollView>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white', 
  },
  postDetailSectionContainer: {
      marginTop: 16,
      padding: 24,
      backgroundColor: 'whitesmoke'
  },
  postDetailSectionTitle:{
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 8
  },
  postDetailUpdateContainer: {
    backgroundColor: 'lightgray',
    padding: 16,
    borderRadius: 4,
  },
  postDetailUpdateField: {
    fontSize: 18
  },
  postDetailUpdateInputView: {
    backgroundColor: "whitesmoke",
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1
},
postDetailUpdateInputContent: {
    padding: 8,
    flex: 1
},
postDetailUpdateButton: {
    width: "24%",
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    backgroundColor: "#FAD0C9FF",
},
postDetailUpdateButtonText: {
    
},
progressContainer: {
    flexDirection: 'row',
    height: 32,  
},
progressUser: {
    fontSize: 14
},
progressBar: {
    flexDirection: 'row',
    height: 16,
    width: '92%',
    marginRight: '1%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
},
})
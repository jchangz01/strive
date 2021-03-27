import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { UserContext } from '../contexts/UserContext';

// expecting the following w/in postData:
// 1) display name of user who created the post
// 2) created and finish times
// 3) post title
// 4) post description
// 5) post likes
// 6) post challengers count
// 7) post duration
export default function ChallengePost ({postData, profileSelectOff, detailedMode, children, navigation}) {

    console.log("display post with ID", postData.id);

    const context = React.useContext(UserContext);
    const [joined, setJoined] = React.useState(false);
    const [liked, setLiked] = React.useState(false);

    // do this to get around some weird issue where the Post wasn't rerendering on context change
    // triggers a redundant rerender, but this'll work for us for now
    React.useEffect(() =>
    {
        setJoined(context.userData.joinedChallenges?.includes(postData.id))
        setLiked(context.userData.likedChallenges?.includes(postData.id));
    }, [context.userData]);

    return (
        <TouchableOpacity activeOpacity={1} onPress={detailedMode ? null : () => navigation.navigate('PostDetail', {postId: postData.id}) }>
            <View style={styles.postContainer}>
                <View style={styles.postProfileView}>
                    <TouchableOpacity 
                        activeOpacity={profileSelectOff ? 1 : null}
                        onPress={profileSelectOff ? null : () => navigation.navigate('ProfileDetail', {profileId: postData.owner})}
                    >
                        <Icon name="user-circle" size={48} color='lightgray'/>
                    </TouchableOpacity>
                    <View style={styles.postUserView}>
                        <Text style={styles.postUsername}>{postData?.ownerDisplayName}</Text>
                        <Text style={styles.postTime}>Created on {postData?.created}</Text>
                    </View>
                </View>
                <View style={styles.postChallengeView} >
                    <Text style={styles.postTitle}>{postData?.title}</Text>
                    <Text style={styles.postDes}>{postData?.description}</Text>
                </View>
                <View style={styles.postDataContainer}>
                    <View style={styles.postDataView}> 
                        <Text style={styles.postDataCategory}>Likes</Text>
                        <Text style={styles.postDataValue}>{postData?.likes}</Text>
                    </View>
                    <View style={styles.verticleLine}></View>
                    <View style={styles.postDataView}> 
                        <Text style={styles.postDataCategory}>Challengers</Text>
                        <Text style={styles.postDataValue}>{postData?.challengers?.length}</Text>
                    </View>
                    <View style={styles.verticleLine}></View>
                    
                    <View style={styles.postDataView}> 
                        <Text style={styles.postDataCategory}>Duration</Text>
                        <Text style={styles.postDataValue}>{postData?.duration}</Text>
                    </View>
                    
                </View>
                {children}
                <View style={styles.postInteractiveView}>
                    <TouchableOpacity><Icon name="thumbs-up" size={32} color={liked ? "blue" : "gray"} border></Icon></TouchableOpacity>
                    <View style={styles.verticleLine}></View>
                    <Button 
                        title={joined ? "Leave Challenge" : "Join Challenge"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
 
const styles = StyleSheet.create ({
    postContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopColor: 'lightgray',
        borderBottomColor: 'lightgray',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 16
    },
    postProfileView: {
        display: 'flex',
        marginTop: 16,
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24
    },
    postUserView: {
        flexBasis: '84%'
    },
    postUsername: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    postTime: {
        fontSize: 12,
        color: 'gray'
    },
    postChallengeView: {
        marginTop: 16,
        paddingHorizontal: 24
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    postDes: {
        marginTop: 8,
        color: 'gray'
    },
    postDataContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 12,
        width: '100%',
        height: 48,
        paddingHorizontal: 24
    },
    postDataView: {
    },
    postDataCategory: {
        color: 'gray',
        fontSize: 12,
    },
    postDataValue: {
        fontSize: 28,
    },
 
    postInteractiveView: {
        display: 'flex',
        marginTop: 16,
        height: 80,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 24,
        backgroundColor: 'whitesmoke'
    },
 
    verticleLine: {
        height: '72%',
        width: 1,
        backgroundColor: '#909090',
        marginHorizontal: 24
    },
    
})
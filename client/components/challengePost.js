import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header () {
    return (
        <View style={styles.postContainer}>
            <View style={styles.postProfileView}>
                <Icon name="user-circle" size={48} color='lightgray'/>
                <View style={styles.postUserView}>
                    <Text style={styles.postUsername}>Justin Kyle Chang</Text>
                    <Text style={styles.postTime}>Duration: 1 week, 3/22/2021-3/29/2021</Text>
                </View>
            </View>
            <View style={styles.postChallengeView}>
                <Text style={styles.postTitle}>LA Hacks Hackathon</Text>
                <Text style={styles.postDes}>
                LA Hacks is the largest student-run hackathon in Southern California, 
                bringing together over a thousand hackers each year to create innovative solutions to modern problems. 
                Although LA Hacks is virtual this year, the core of our hackathon is still the same. Hackers will push 
                the boundaries of technology by creating trailblazing projects that showcase their skills and innovative 
                thinking. Join us online for a week of coding, panels, workshops and other fun activities from 
                March 21-28th, 2021. We hope to see you there!
                </Text>
            </View>
            <View style={styles.postDataContainer}>
                <View style={styles.postDataView}> 
                    <Text style={styles.postDataCategory}>Likes</Text>
                    <Text style={styles.postDataValue}>100</Text>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.postDataView}> 
                    <Text style={styles.postDataCategory}>Challengers</Text>
                    <Text style={styles.postDataValue}>5</Text>
                </View>
                <View style={styles.verticleLine}></View>
                
                <View style={styles.postDataView}> 
                    <Text style={styles.postDataCategory}>Duration</Text>
                    <Text style={styles.postDataValue}>1 week</Text>
                </View>
                
            </View>
            <View style={styles.postInteractiveView}>
                <TouchableOpacity><Icon name="thumbs-up" size={32} color="gray" border></Icon></TouchableOpacity>
                <View style={styles.verticleLine}></View>
                <Button title="Join Challenge" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    postContainer: {
        height: 446,
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
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default function progressMessage ({ data, personal, navigation }) {
    const [time, setTime] = React.useState('')
    React.useEffect(() => {
        setTime(new Date(parseInt(data.blurbUpdateTime)).toLocaleString());
    },[])

    return (
        <View style={styles.messageContainer}>
            {personal ? null : <TouchableOpacity activeOpacity={1} onPress={() => navigation.push('ProfileDetail', {profileId: data.id})}><Text style={styles.messageUser}>{data?.displayName}</Text></TouchableOpacity>}
            <Text style={styles.messageTitle}>{time}</Text>
            <Text style={styles.messageDescription}>{data?.blurb}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    messageContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 4,  
        padding: 16,
        marginBottom: 16
    },
    messageUser: {
        fontSize: 18,
    },
    messageTitle: {
        fontWeight: 'bold',
    },
    messageDescription: {
        fontSize: 12,
    }
    
})
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default function progressMessage (props) {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Progess Update: 3/26/2021 1:19PM</Text>
            <Text style={styles.messageDescription}>Today was a very productive day. I have written most of the frontend code!</Text>
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
    messageTitle: {
        fontWeight: 'bold',
    },
    messageDescription: {
        fontSize: 12,
    }
    
})
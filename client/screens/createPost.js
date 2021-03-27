import * as React from 'react';
import { Touchable } from 'react-native';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreatePost (props) {
    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerView}>
                    <Button title='Close'/>
                    <Button title='Create'/>
                </View>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>New Challenge</Text>
                <Text>Title</Text>
                <TextInput/>
                <Text>Description</Text>
                <TextInput/>
                <Text>Duration</Text>
                <TextInput/>
                <Text>Goal</Text>
                <TextInput/>
                <Text>Description</Text>
                <TextInput/>
                <Text>Description</Text>
                <TextInput/>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create ({
    headerContainer: {
        position: 'absolute',
        top: 0,
        paddingHorizontal: 24,
        height: 100,
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    headerView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 56,
    },
    container: {
        marginTop: 100,
        paddingHorizontal: 24,
        flex: 1,
        backgroundColor: 'white'
    },
    heading: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: 'bold'
    }
})
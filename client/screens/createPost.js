import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'

export default function CreatePost (props) {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [date, setDate] = React.useState('')
    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerView}>
                    <Button title='Close'/>
                    <Button title='Create'/>
                </View>
            </View>
            <ScrollView style={styles.container} onScrollBeginDrag={() => Keyboard.dismiss()}>
                <TextInput placeholder="Title" style={styles.postTitleInput}/>
                <TextInput
                    multiline={true}
                    placeholder='Enter description...'
                    textAlignVertical='bottom'
                    style={styles.postDesInput}
                />
                <Text>Deadline</Text>
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                />
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
        backgroundColor: 'white',

    },
    heading: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: 'bold'
    },
    postTitleInput: {
        fontSize: 24,
        marginTop: 16,
        height: 40,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    postDesInput: {
        fontSize: 20,
        marginTop: 16,
        height: 400,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
})
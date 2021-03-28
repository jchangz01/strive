import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreatePost ({navigation}) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [todaysDate, setTodaysDate] = React.useState([])

    //get today's date and time
    React.useState(() => {
        //get date
        const today = new Date();
        const dd = today.getDate()
        const mm = today.getMonth() //January is 0!
        const yyyy = today.getFullYear();

        //get time
        const hr = today.getHours(); // => 9
        const min = today.getMinutes(); // =>  30
        console.log("Curent Date: " + new Date(yyyy, mm, dd, hr, min));

        setTodaysDate([yyyy, mm, dd, hr, min]);
        setDate(new Date(yyyy, mm, dd+1, hr, min))
    },[])

    const handleDateEndChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log(currentDate)
    };

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.headerView}>
                    <Button title='Close' onPress={() => navigation.goBack()}/>
                    <Button title='Create'/>
                </View>
            </View>
            <ScrollView style={styles.container} onScrollBeginDrag={() => Keyboard.dismiss()}>
                <TextInput placeholder="Title" value={title} onChange={e => setTitle(e)} style={styles.postTitleInput}/>
                <TextInput
                    multiline={true}
                    value={description} onChange={e => setDescription(e)}
                    placeholder='Enter description...'
                    textAlignVertical='bottom'
                    style={styles.postDesInput}
                />
                <View style={styles.postStartDateView}>
                    <Text style={styles.postStartDateTitle}>Start Date: </Text>
                    <DateTimePicker
                        value={new Date(todaysDate[0], todaysDate[1], todaysDate[2])}
                        minimumDate={new Date(todaysDate[0], todaysDate[1], todaysDate[2], todaysDate[3], todaysDate[4])}
                        maximumDate={new Date(todaysDate[0], todaysDate[1], todaysDate[2], todaysDate[3], todaysDate[4])}
                        disabled={true}
                        style={{width: 200, height: 32}}
                    />
                </View>
                <View style={styles.postStartDateView}>
                    <Text style={styles.postStartDateTitle}>End Date:   </Text>
                    <DateTimePicker
                        mode='datetime'
                        value={date}
                        onChange={handleDateEndChange}
                        minimumDate={new Date(todaysDate[0], todaysDate[1], todaysDate[2], todaysDate[3], todaysDate[4])}
                        style={{width: 400, height: 32}}
                    />
                </View>
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
    },
    postStartDateView: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        paddingBottom: 16,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    },
    postStartDateTitle: {
        fontSize: 16,
        color: 'lightgray'
    }
})
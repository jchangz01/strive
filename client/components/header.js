import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from '../contexts/UserContext';

export default function Header () {

    const context = React.useContext(UserContext);

    const fetchUserData = async () =>
    {
        console.log(`top level user data fetch w/ ID ${context.userData.id}`)

        await fetch(`http://localhost:3000/user/${context.userData.id}`)
        .then(resp => resp.json())
        .then(resp => context.setUserData(resp));
    }

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>STRIVE</Text>

            <TouchableOpacity style={styles.syncButton} activeOpacity={1} onPress={async () => {
                await fetchUserData();
                console.log("updated");
            }}>
                
                <Icon name="sync" size={32} color="darkgray"></Icon>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    headerContainer: {
        position: 'absolute',
        top: 0,
        height: 100,
        width: '100%',
        flex: 1,
        backgroundColor: 'white'
    },
    headerContent: {
        position: 'absolute',
        bottom: 8,
        fontSize: 32,
        paddingLeft: 24
    },
    syncButton: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        paddingRight: 24
    }
})
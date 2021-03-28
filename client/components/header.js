import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from '../contexts/UserContext';

export default function Header ({createDisabled, refreshDisabled, navigation}) {

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
            <Text style={styles.headerTitle}>STRIVE</Text>

            <View style={styles.headerButtonsView}>
                {createDisabled ?
                    null :
                    <TouchableOpacity style={styles.headerButton}  onPress={() => {
                        navigation.push('CreatePost')
                    }}>
                        <Icon name="plus" size={24} />
                    </TouchableOpacity> 
                }
                {refreshDisabled ?
                    null :
                    <TouchableOpacity style={styles.headerButton} onPress={async () => {
                        await fetchUserData();
                        console.log("updated");
                    }}>
                        <Icon name="sync" size={24}  />
                    </TouchableOpacity>
                }
            </View>
                
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
    headerTitle: {
        position: 'absolute',
        bottom: 8,
        fontSize: 32,
        paddingLeft: 24
    },
    headerButtonsView: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 16,
        right: 0,
        paddingRight: 24,
    },
    headerButton: {
        paddingLeft: 24,
    }
})
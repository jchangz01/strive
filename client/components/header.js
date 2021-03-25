import * as React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';

export default function Header () {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>STRIVE</Text>
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
    }
})
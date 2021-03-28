import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CompletedBadge() {
    return (
        <View style={[styles.container, {
            transform: [{ rotate: "40deg" }]
          }]}>
            <Icon name="check-circle" size={40} color="#4BB543"/>
            <Text style={{color: "#4BB543", fontSize: 16, fontWeight: 'bold'}}>COMPLETED</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    }
})
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';

let refEmail, refPass, refRePass;
export default function Prompt (props) {
    return (
        <>
            { props.type == 'Sign up' ?
                <View style={styles.inputView}>
                    <TextInput placeholder="Username" value={props.username} onChangeText={props.usernameChange} onSubmitEditing={() => refEmail.focus()} style={styles.inputContent}></TextInput>
                </View>
                : null
            }
            <View style={styles.inputView}>
                <TextInput placeholder="Email" value={props.email} onChangeText={props.emailChange} keyboardType='email-address' ref={(input) => refEmail = input} onSubmitEditing={() => refPass.focus()} style={styles.inputContent}></TextInput>
            </View>
            <View style={styles.inputView}>
                <TextInput placeholder="Password" value={props.pw} onChangeText={props.pwChange} secureTextEntry={true} ref={(input) => refPass = input} onSubmitEditing={() => refRePass?.focus()} style={styles.inputContent}></TextInput>    
            </View>
            { props.type == 'Sign up' ?
                <View style={styles.inputView}>
                    <TextInput placeholder="Re-type Password" value={props.rePw} onChangeText={props.rePwChange} secureTextEntry={true} ref={(input) => refRePass = input} style={styles.inputContent}></TextInput>
                </View>
                : null
            }   
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>{props.type}</Text>
            </TouchableOpacity>
        </>
    )

    
}

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "whitesmoke",
        borderRadius: 4,
        width: "80%",
        height: 44,
        marginBottom: 16,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    inputContent: {
        padding: 12,
        flex: 1
    },
    loginBtn: {
        width: "80%",
        borderRadius: 8,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        backgroundColor: "#FAD0C9FF",
    },
    loginText: {
        color: 'white'
    },
})
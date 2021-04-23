import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function PreviousNextButton({ title, pageName }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate(pageName)}}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        width: '100%',
        height: 60
    },
    button: {
        backgroundColor: '#111',
        paddingTop: 12,
        paddingBottom: 12,
        borderWidth: 1,
        flex: 1,
        display: 'flex',
    },
    buttonText: {
        fontSize: 22,
        color: '#0e9594',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
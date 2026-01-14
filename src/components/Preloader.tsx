import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    visible: boolean;
};

const Preloader = ({ visible }: Props) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    text: {
        color: '#9aa4b2',
        fontSize: 16,
    },
});

export default Preloader;

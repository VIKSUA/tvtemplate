import React from 'react';
import { Animated, StyleSheet } from 'react-native';

type AnimatedColor = string | Animated.AnimatedInterpolation<string>;

type Props = {
    color?: AnimatedColor;
};

const Backspace = ({ color = '#ffffff' }: Props) => {
    return <Animated.Text style={[styles.icon, { color }]}>Bksp</Animated.Text>;
};

const styles = StyleSheet.create({
    icon: {
        fontSize: 24,
        fontWeight: '600',
    },
});

export default Backspace;

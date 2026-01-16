import React from 'react';
import { Animated, StyleSheet } from 'react-native';

type AnimatedColor = string | Animated.AnimatedInterpolation<string>;

type Props = {
    color?: AnimatedColor;
};

const ArrowRightNew = ({ color = '#ffffff' }: Props) => {
    return <Animated.Text style={[styles.icon, { color }]}>{'>'}</Animated.Text>;
};

const styles = StyleSheet.create({
    icon: {
        fontSize: 28,
        fontWeight: '600',
    },
});

export default ArrowRightNew;

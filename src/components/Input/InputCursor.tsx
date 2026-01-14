import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { tvTheme } from '../../theme/tvTheme';

type Props = {
    visible: boolean;
    style?: TextStyle;
};

const InputCursor = ({ visible, style }: Props) => {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setBlink((prev) => !prev), 500);
        return () => clearInterval(timer);
    }, []);

    if (!visible) return null;

    return <Text style={[styles.cursor, blink ? styles.blink : null, style]}>|</Text>;
};

const styles = StyleSheet.create({
    cursor: {
        color: '#ffffff',
    },
    blink: {
        color: tvTheme.colorAccent,
    },
});

export default InputCursor;

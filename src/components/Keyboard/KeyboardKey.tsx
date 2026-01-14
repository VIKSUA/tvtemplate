import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import { convertPxToVw, tvTheme } from '../../theme/tvTheme';

export type KeyboardKeyConfig = {
    title: string;
    name?: string;
    wide?: boolean;
};

type Props = KeyboardKeyConfig &
    FocusableInjectedProps & {
        onEnterPress?: () => void;
    };

const KeyboardKey = ({ focused, title, onEnterPress, wide }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.key, wide ? styles.keyWide : null, focused ? styles.keyFocused : null]}
            onPress={onEnterPress}
        >
            <Text style={styles.keyText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    key: {
        width: convertPxToVw(46),
        height: convertPxToVw(58),
        borderRadius: convertPxToVw(5),
        backgroundColor: tvTheme.colorBlackGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: convertPxToVw(4),
    } as ViewStyle,
    keyWide: {
        width: convertPxToVw(134),
    } as ViewStyle,
    keyFocused: {
        backgroundColor: tvTheme.colorAccent,
    } as ViewStyle,
    keyText: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(21),
        fontWeight: '500',
        textTransform: 'none',
    },
});

export default withFocusable()(KeyboardKey);

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';
import { convertPxToVw, tvTheme } from '../theme/tvTheme';

type OwnProps = {
    title: string;
    focusKey?: string;
    onEnterPress?: () => void;
};

type Props = OwnProps & FocusableInjectedProps;

const FocusableButton = ({ title, focused, onEnterPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, focused ? styles.buttonFocused : null]} onPress={onEnterPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: convertPxToVw(8),
        height: convertPxToVw(60),
        paddingLeft: convertPxToVw(40),
        paddingRight: convertPxToVw(40),
        backgroundColor: tvTheme.colorGrayBlue,
        justifyContent: 'center',
        marginTop: convertPxToVw(20),
    } as unknown as ViewStyle,
    buttonFocused: {
        backgroundColor: tvTheme.colorAccent,
    } as unknown as ViewStyle,
    text: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(20),
        fontWeight: '600',
    },
});

export default withFocusable<OwnProps>()(FocusableButton);

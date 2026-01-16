import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import InputCursor from './InputCursor';
import { convertPxToVw, tvTheme } from '../../theme/tvTheme';

type OwnProps = {
    label: string;
    value: string;
    focusKey?: string;
    mask?: boolean;
    onEnterPress?: () => void;
    cursorIndex: number;
    active?: boolean;
};

type Props = OwnProps & FocusableInjectedProps;

const FocusableInput = ({ label, value, mask, focused, onEnterPress, cursorIndex, active }: Props) => {
    const inputChars = value.split('');
    const beforeCursor = inputChars.slice(0, cursorIndex);
    const afterCursor = inputChars.slice(cursorIndex);
    const handleEnter = onEnterPress || (() => undefined);

    return (
        <TouchableOpacity onPress={handleEnter} style={styles.wrap}>
            <Text style={[styles.label, focused || active ? styles.labelFocused : null]}>{label}</Text>
            <View style={[styles.input, focused || active ? styles.inputFocused : null]}>
                {beforeCursor.map((char, index) => (
                    <Text key={`${label}-before-${index}`} style={styles.inputText}>
                        {mask ? '*' : char}
                    </Text>
                ))}
                <InputCursor visible={!!focused || !!active} style={styles.inputText} />
                {afterCursor.map((char, index) => (
                    <Text key={`${label}-after-${index}`} style={styles.inputText}>
                        {mask ? '*' : char}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrap: {
        marginBottom: convertPxToVw(26),
    },
    label: {
        color: tvTheme.colorGray,
        fontSize: convertPxToVw(20),
        lineHeight: convertPxToVw(26),
        marginBottom: convertPxToVw(12),
    },
    labelFocused: {
        color: tvTheme.colorAccent,
    },
    input: {
        height: convertPxToVw(40),
        flexDirection: 'row',
        paddingBottom: convertPxToVw(5),
        borderBottomWidth: 2,
        borderColor: tvTheme.colorGraySecond,
        alignItems: 'center',
        overflow: 'hidden',
    },
    inputFocused: {
        borderColor: tvTheme.colorAccent,
    },
    inputText: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(28),
        lineHeight: convertPxToVw(38),
    },
});

export default withFocusable<OwnProps>()(FocusableInput);

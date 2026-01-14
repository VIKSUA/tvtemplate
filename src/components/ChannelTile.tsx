import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';
import { convertPxToVw, tvTheme } from '../theme/tvTheme';

type Props = FocusableInjectedProps & {
    title: string;
    onEnterPress?: () => void;
    onBecameFocused?: () => void;
};

const ChannelTile = ({ title, focused, onEnterPress, onBecameFocused }: Props) => {
    return (
        <TouchableOpacity
            style={[styles.card, focused ? styles.cardFocused : null]}
            onPress={onEnterPress}
            onFocus={onBecameFocused}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: convertPxToVw(360),
        height: convertPxToVw(210),
        borderRadius: convertPxToVw(16),
        backgroundColor: tvTheme.colorBlackGlass,
        padding: convertPxToVw(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        marginRight: convertPxToVw(24),
        marginBottom: convertPxToVw(24),
    } as ViewStyle,
    cardFocused: {
        borderColor: tvTheme.colorAccent,
        transform: [{ scale: 1.02 }],
    } as ViewStyle,
    title: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(24),
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default withFocusable()(ChannelTile);

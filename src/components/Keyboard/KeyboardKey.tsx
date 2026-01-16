import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import { convertPxToVw, tvTheme } from '../../theme/tvTheme';

export type KeyboardKeyConfig = {
    title: string;
    name?: string;
    wide?: boolean;
    span?: number;
    focusable?: boolean;
    placeholder?: boolean;
};

type OwnProps = KeyboardKeyConfig & {
    onEnterPress?: () => void;
};

type Props = OwnProps & FocusableInjectedProps;

const KeyboardKey = ({ focused, title, name, onEnterPress, wide, placeholder }: Props) => {
    const focusValue = useRef(new Animated.Value(focused ? 1 : 0)).current;
    const iconColor = useMemo(
        () =>
            focusValue.interpolate({
                inputRange: [0, 1],
                outputRange: [tvTheme.colorGray, '#ffffff'],
            }),
        [focusValue]
    );

    useEffect(() => {
        Animated.timing(focusValue, {
            toValue: focused ? 1 : 0,
            duration: 160,
            useNativeDriver: false,
        }).start();
    }, [focusValue, focused]);

    if (placeholder) {
        return <View style={[styles.key, wide ? styles.keyWide : null, styles.keyPlaceholder]} />;
    }

    const labelMap: Record<string, string> = {
        ArrowLeft: '<',
        ArrowRight: '>',
        Backspace: 'Bksp',
    };
    const displayTitle = title || (name ? labelMap[name] || '' : '');

    return (
        <TouchableOpacity
            style={[styles.key, wide ? styles.keyWide : null, focused ? styles.keyFocused : null]}
            onPress={onEnterPress}
        >
            {displayTitle ? (
                <Animated.Text style={[styles.keyText, { color: iconColor }]}>{displayTitle}</Animated.Text>
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    key: {
        width: '100%',
        height: convertPxToVw(100),
        borderRadius: convertPxToVw(5),
        backgroundColor: tvTheme.colorBlackGlass,
        alignItems: 'center',
        justifyContent: 'center',
    } as unknown as ViewStyle,
    keyWide: {
        width: '100%',
    } as unknown as ViewStyle,
    keyPlaceholder: {
        backgroundColor: 'transparent',
    } as unknown as ViewStyle,
    keyFocused: {
        backgroundColor: tvTheme.colorAccent,
    } as unknown as ViewStyle,
    keyText: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(38),
        fontWeight: '500',
        textTransform: 'none',
    },
});

export default withFocusable<OwnProps>()(KeyboardKey);

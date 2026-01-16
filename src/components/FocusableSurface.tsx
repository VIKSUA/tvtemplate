import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';

type Props = FocusableInjectedProps & {
    onEnterPress?: () => void;
    style?: ViewStyle;
    children?: React.ReactNode;
};

const FocusableSurface = ({ onEnterPress, style, children }: Props) => {
    return (
        <TouchableOpacity style={[styles.surface, style]} onPress={onEnterPress}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    surface: {
        flex: 1,
    } as unknown as ViewStyle,
});

export default withFocusable()(FocusableSurface);

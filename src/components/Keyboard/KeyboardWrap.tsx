import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import { KeyboardContext } from './KeyboardContext';
import Keyboard from './Keyboard';
import { tvTheme } from '../../theme/tvTheme';

type Props = FocusableInjectedProps;

const KeyboardWrap = ({ setFocus }: Props) => {
    const { isOpen, inputFocusKey, closeKeyboard } = useContext(KeyboardContext);
    const translate = useRef(new Animated.Value(0)).current;
    const lastInputKey = useRef<string | undefined>(undefined);
    const styles = useMemo(() => createStyles(), []);

    useEffect(() => {
        Animated.timing(translate, {
            toValue: isOpen ? 1 : 0,
            duration: 260,
            useNativeDriver: false,
        }).start();
    }, [isOpen, translate]);

    useEffect(() => {
        if (isOpen) {
            lastInputKey.current = inputFocusKey;
            setFocus?.();
        } else if (lastInputKey.current) {
            setFocus?.(lastInputKey.current);
        }
    }, [inputFocusKey, isOpen, setFocus]);

    useEffect(() => {
        if (!isOpen || typeof window === 'undefined') return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'BrowserBack') {
                event.preventDefault();
                closeKeyboard();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [closeKeyboard, isOpen]);

    const overlayStyle = {
        transform: [
            {
                translateX: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                }),
            },
        ],
        opacity: translate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Animated.View style={[styles.container, overlayStyle]}>
            <View style={styles.panel}>
                <Keyboard />
            </View>
        </Animated.View>
    );
};

const createStyles = () =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundColor: tvTheme.colorBg,
            borderLeftWidth: 2,
            borderLeftColor: tvTheme.colorGraySecond,
        },
        panel: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

export default withFocusable({ trackChildren: true })(KeyboardWrap);

import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';
import { NavigationContext } from '../navigation/NavigationContext';
import { KeyboardContext } from '../components/Keyboard/KeyboardContext';
import { useKeyboardValue } from '../hooks/useKeyboardValue';
import FocusableInput from '../components/Input/FocusableInput';
import FocusableButton from '../components/FocusableButton';
import { convertPxToVw, tvTheme } from '../theme/tvTheme';

type Props = FocusableInjectedProps;

const LoginScreen = ({ setFocus }: Props) => {
    const { navigate } = useContext(NavigationContext);
    const { openKeyboard, inputFocusKey } = useContext(KeyboardContext);
    const emailInput = useKeyboardValue('demo@tv.app');
    const passwordInput = useKeyboardValue('123456');

    const emailFocusKey = useMemo(() => 'Email', []);
    const passwordFocusKey = useMemo(() => 'Password', []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFocus?.(emailFocusKey);
        }, 50);
        return () => clearTimeout(timer);
    }, [emailFocusKey, setFocus]);

    return (
        <View style={styles.screen}>
            <View style={styles.leftColumn}>
                <Text style={styles.title}>Log in</Text>
                <Text style={styles.subtitle}>Press Enter to open the keyboard</Text>
                <FocusableInput
                    focusKey={emailFocusKey}
                    label="Email"
                    value={emailInput.value}
                    cursorIndex={emailInput.cursorIndex}
                    active={inputFocusKey === emailFocusKey}
                    onEnterPress={() =>
                        openKeyboard({
                            inputFocusKey: emailFocusKey,
                            inputSetValue: emailInput.inputSetValue,
                        })
                    }
                />
                <FocusableInput
                    focusKey={passwordFocusKey}
                    label="Password"
                    value={passwordInput.value}
                    cursorIndex={passwordInput.cursorIndex}
                    active={inputFocusKey === passwordFocusKey}
                    mask
                    onEnterPress={() =>
                        openKeyboard({
                            inputFocusKey: passwordFocusKey,
                            inputSetValue: passwordInput.inputSetValue,
                        })
                    }
                />
                <FocusableButton focusKey="LoginButton" title="Enter" onEnterPress={() => navigate('channels')} />
            </View>
            <View style={styles.rightColumn} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: tvTheme.colorBg,
    },
    leftColumn: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: '50%',
        paddingLeft: convertPxToVw(162),
        paddingRight: convertPxToVw(194),
        paddingTop: convertPxToVw(120),
    },
    rightColumn: {
        width: '50%',
    },
    title: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(32),
        fontWeight: '600',
        marginBottom: convertPxToVw(24),
    },
    subtitle: {
        color: tvTheme.colorGray,
        fontSize: convertPxToVw(20),
        marginBottom: convertPxToVw(40),
    },
});

export default withFocusable({ trackChildren: true })(LoginScreen);

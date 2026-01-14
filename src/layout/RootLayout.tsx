import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContext } from '../navigation/NavigationContext';
import LoginScreen from '../screens/LoginScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import PlayerScreen from '../screens/PlayerScreen';
import KeyboardWrap from '../components/Keyboard/KeyboardWrap';
import { KeyboardContext } from '../components/Keyboard/KeyboardContext';

const RootLayout = () => {
    const { state, goBack } = useContext(NavigationContext);
    const { isOpen, closeKeyboard } = useContext(KeyboardContext);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape' && event.key !== 'BrowserBack') return;
            event.preventDefault();
            event.stopPropagation();
            if (isOpen) {
                closeKeyboard();
                return;
            }
            goBack();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [closeKeyboard, goBack, isOpen]);

    return (
        <View style={styles.container}>
            {state.name === 'login' ? <LoginScreen /> : null}
            {state.name === 'channels' ? <ChannelsScreen /> : null}
            {state.name === 'player' ? <PlayerScreen /> : null}
            <KeyboardWrap focusKey="keyboard" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});

export default RootLayout;

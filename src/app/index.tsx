import React, { useEffect } from 'react';
import { initNavigation } from '../navigation/spatial';
import { ThemeProvider } from '../config';
import RootLayout from '../layout/RootLayout';
import { KeyboardProvider } from '../components/Keyboard/KeyboardContext';
import { NavigationProvider } from '../navigation/NavigationContext';

const App = () => {
    useEffect(() => {
        initNavigation({
            debug: false,
            visualDebug: false,
            nativeMode: false,
            throttle: 200,
        });
    }, []);

    return (
        <ThemeProvider>
            <NavigationProvider>
                <KeyboardProvider>
                    <RootLayout />
                </KeyboardProvider>
            </NavigationProvider>
        </ThemeProvider>
    );
};

export default App;

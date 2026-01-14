import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import { KeyboardContext } from './KeyboardContext';
import KeyboardKey, { KeyboardKeyConfig } from './KeyboardKey';
import { convertPxToVw } from '../../theme/tvTheme';

type Props = FocusableInjectedProps;

const KEY_ROWS: KeyboardKeyConfig[][] = [
    [
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' },
        { title: '6' },
        { title: '7' },
        { title: '8' },
        { title: '9' },
        { title: '0' },
        { title: 'Bksp', name: 'Backspace' },
    ],
    [
        { title: 'q' },
        { title: 'w' },
        { title: 'e' },
        { title: 'r' },
        { title: 't' },
        { title: 'y' },
        { title: 'u' },
        { title: 'i' },
        { title: 'o' },
        { title: 'p' },
        { title: '@' },
    ],
    [
        { title: 'a' },
        { title: 's' },
        { title: 'd' },
        { title: 'f' },
        { title: 'g' },
        { title: 'h' },
        { title: 'j' },
        { title: 'k' },
        { title: 'l' },
        { title: '.' },
        { title: '_' },
    ],
    [
        { title: 'z' },
        { title: 'x' },
        { title: 'c' },
        { title: 'v' },
        { title: 'b' },
        { title: 'n' },
        { title: 'm' },
        { title: '-', name: 'Dash' },
        { title: '+', name: 'Plus' },
        { title: '<', name: 'ArrowLeft', wide: true },
        { title: '>', name: 'ArrowRight', wide: true },
    ],
    [
        { title: 'Space', name: 'Space', wide: true },
        { title: 'Done', name: 'Done', wide: true },
    ],
];

const Keyboard = ({ setFocus }: Props) => {
    const { inputSetValue, closeKeyboard } = useContext(KeyboardContext);

    useEffect(() => {
        setFocus?.();
    }, [setFocus]);

    const handlePress = (config: KeyboardKeyConfig) => {
        if (config.name === 'Done') {
            closeKeyboard();
            return;
        }
        if (!inputSetValue) return;
        inputSetValue({ title: config.title === 'Space' ? ' ' : config.title, name: config.name });
    };

    return (
        <View style={styles.container}>
            {KEY_ROWS.map((row, rowIndex) => (
                <View style={styles.row} key={`kb-row-${rowIndex}`}>
                    {row.map((key, colIndex) => (
                        <KeyboardKey
                            key={`kb-key-${rowIndex}-${colIndex}`}
                            title={key.title}
                            name={key.name}
                            wide={key.wide}
                            onEnterPress={() => handlePress(key)}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: convertPxToVw(588),
        height: convertPxToVw(322),
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: convertPxToVw(4),
        flexWrap: 'nowrap',
    },
});

export default withFocusable({ trackChildren: true })(Keyboard);

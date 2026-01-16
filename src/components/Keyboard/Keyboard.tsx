import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import { KeyboardContext } from './KeyboardContext';
import KeyboardKey, { KeyboardKeyConfig } from './KeyboardKey';
import { convertPxToVw } from '../../theme/tvTheme';

type Props = FocusableInjectedProps;

const TEXT_LAYOUT: KeyboardKeyConfig[] = [
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
    { title: '', name: 'Backspace' },

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

    { title: 'a' },
    { title: 's' },
    { title: 'd' },
    { title: 'f' },
    { title: 'g' },
    { title: 'h' },
    { title: 'j' },
    { title: 'k' },
    { title: 'l' },
    { title: '_' },
    { title: '&' },

    { title: 'z' },
    { title: 'x' },
    { title: 'c' },
    { title: 'v' },
    { title: 'b' },
    { title: 'n' },
    { title: 'm' },
    { title: ',' },
    { title: '.' },
    { title: '-', name: 'Dash' },
    { title: '?', name: 'Question' },

    { title: '', name: 'ArrowLeft', span: 2 },
    { title: 'Space', name: 'Space', span: 5 },
    { title: '', name: 'ArrowRight', span: 2 },
    { title: 'Done', name: 'Done', span: 2 },
];

const NUMBER_LAYOUT: KeyboardKeyConfig[] = [
    { title: '1' },
    { title: '2' },
    { title: '3' },
    { title: '', placeholder: true },
    { title: '4' },
    { title: '5' },
    { title: '6' },
    { title: '', placeholder: true },
    { title: '7' },
    { title: '8' },
    { title: '9' },
    { title: '', name: 'Backspace' },
    { title: '', placeholder: true },
    { title: '0' },
    { title: '', placeholder: true },
    { title: '', placeholder: true },
];

const Keyboard = ({ setFocus }: Props) => {
    const { inputSetValue, closeKeyboard, inputType } = useContext(KeyboardContext);

    const layout = useMemo(() => {
        if (inputType === 'number') {
            return {
                keys: NUMBER_LAYOUT,
                columns: 4,
                width: convertPxToVw(540),
                height: convertPxToVw(340),
            };
        }
        return {
            keys: TEXT_LAYOUT,
            columns: 11,
            width: convertPxToVw(945),
            height: convertPxToVw(530),
        };
    }, [inputType]);

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
        <View style={[styles.container, { width: layout.width, height: layout.height }]}>
            {layout.keys.map((key, index) => {
                const span = key.span || 1;
                const cellStyle = {
                    width: (layout.width / layout.columns) * span,
                };
                if (key.placeholder) {
                    return <View key={`kb-key-${index}`} style={[styles.cell, cellStyle]} />;
                }
                const isFocusable = key.focusable ?? true;
                return (
                    <View key={`kb-key-${index}`} style={[styles.cell, cellStyle]}>
                        <KeyboardKey
                            title={key.title}
                            name={key.name}
                            wide={key.wide}
                            focusable={isFocusable}
                            onEnterPress={() => handlePress(key)}
                        />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    cell: {
        paddingHorizontal: convertPxToVw(6),
        paddingVertical: convertPxToVw(6),
    },
});

export default withFocusable({ trackChildren: true })(Keyboard);

import { useCallback, useRef, useState } from 'react';

type KeyboardPayload = { title: string; name?: string };

type KeyboardValueOptions = {
    maxLength?: number;
};

export function useKeyboardValue(initialValue: string, options: KeyboardValueOptions = {}) {
    const [value, setValue] = useState(initialValue);
    const [cursorIndex, setCursorIndex] = useState(initialValue.length);
    const valueRef = useRef(initialValue);
    const cursorRef = useRef(initialValue.length);
    const maxLengthRef = useRef(options.maxLength);
    const setValueSafe = useCallback((next: string) => {
        valueRef.current = next;
        setValue(next);
    }, []);
    const setCursorSafe = useCallback((next: number) => {
        cursorRef.current = next;
        setCursorIndex(next);
    }, []);

    const inputSetValue = useCallback(
        ({ title, name }: KeyboardPayload) => {
            let nextValue = valueRef.current.split('');
            let nextIndex = cursorRef.current;

            const add = (char: string) => {
                if (maxLengthRef.current && nextValue.length >= maxLengthRef.current) return;
                nextValue.splice(nextIndex, 0, char);
                nextIndex += 1;
            };
            const erase = () => {
                if (nextIndex <= 0) return;
                nextIndex -= 1;
                nextValue.splice(nextIndex, 1);
            };
            const moveLeft = () => {
                nextIndex = nextIndex > 0 ? nextIndex - 1 : nextValue.length;
            };
            const moveRight = () => {
                nextIndex = nextIndex < nextValue.length ? nextIndex + 1 : 0;
            };

            ({
                ArrowLeft: moveLeft,
                ArrowRight: moveRight,
                Backspace: erase,
                Space: () => add(' '),
            }[name || ''] || (() => add(title)))();

            const joined = nextValue.join('');
            cursorRef.current = nextIndex;
            valueRef.current = joined;
            setCursorIndex(nextIndex);
            setValue(joined);
        },
        []
    );

    return {
        value,
        setValue: setValueSafe,
        cursorIndex,
        setCursorIndex: setCursorSafe,
        inputSetValue,
    };
}

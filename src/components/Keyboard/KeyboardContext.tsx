import React, { createContext, useCallback, useMemo, useState } from 'react';

export type KeyboardInputPayload = {
    title: string;
    name?: string;
};

export type KeyboardConfig = {
    inputSetValue: (payload: KeyboardInputPayload) => void;
    inputFocusKey?: string;
    inputType?: 'text' | 'number';
};

export type KeyboardContextValue = {
    isOpen: boolean;
    inputFocusKey?: string;
    inputType: 'text' | 'number';
    inputSetValue?: (payload: KeyboardInputPayload) => void;
    openKeyboard: (config: KeyboardConfig) => void;
    closeKeyboard: () => void;
};

export const KeyboardContext = createContext<KeyboardContextValue>({
    isOpen: false,
    inputType: 'text',
    openKeyboard: () => undefined,
    closeKeyboard: () => undefined,
});

export function KeyboardProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputFocusKey, setInputFocusKey] = useState<string | undefined>(undefined);
    const [inputType, setInputType] = useState<'text' | 'number'>('text');
    const [inputSetValue, setInputSetValue] = useState<KeyboardConfig['inputSetValue'] | undefined>(undefined);

    const openKeyboard = useCallback((config: KeyboardConfig) => {
        setIsOpen(true);
        setInputFocusKey(config.inputFocusKey);
        setInputType(config.inputType || 'text');
        setInputSetValue(() => config.inputSetValue);
    }, []);

    const closeKeyboard = useCallback(() => {
        setIsOpen(false);
        setInputFocusKey(undefined);
        setInputSetValue(undefined);
    }, []);

    const value = useMemo(
        () => ({
            isOpen,
            inputFocusKey,
            inputType,
            inputSetValue,
            openKeyboard,
            closeKeyboard,
        }),
        [closeKeyboard, inputFocusKey, inputSetValue, inputType, isOpen, openKeyboard]
    );

    return <KeyboardContext.Provider value={value}>{children}</KeyboardContext.Provider>;
}

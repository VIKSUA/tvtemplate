import React from 'react';

export type ArrowPressDetails = {
    direction?: string;
};

export type FocusableInjectedProps = {
    focused?: boolean;
    hasFocusedChild?: boolean;
    focusKey?: string;
    setFocus?: (focusKey?: string) => void;
    onEnterPress?: () => void;
    onArrowPress?: (details: ArrowPressDetails) => void;
};

export type WithFocusableConfig = {
    trackChildren?: boolean;
    autoRestoreFocus?: boolean;
    forgetLastFocusedChild?: boolean;
    blockNavigationOut?: boolean;
};

type WithFocusable = <P = Record<string, unknown>>(
    config?: WithFocusableConfig
) => (component: React.ComponentType<P & FocusableInjectedProps>) => React.ComponentType<P>;

export const withFocusable: WithFocusable = (config) => {
    if (typeof window === 'undefined') {
        return (component) => component as React.ComponentType;
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('@noriginmedia/react-spatial-navigation');
    return mod.withFocusable(config);
};

export const initNavigation = (config?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('@noriginmedia/react-spatial-navigation');
    mod.initNavigation(config);
};

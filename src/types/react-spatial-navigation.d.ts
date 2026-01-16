declare module '@noriginmedia/react-spatial-navigation' {
    import * as React from 'react';

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

    export function initNavigation(config?: Record<string, unknown>): void;

    export function withFocusable<Props = Record<string, unknown>>(
        config?: WithFocusableConfig
    ): (component: React.ComponentType<Props & FocusableInjectedProps>) => React.ComponentType<Props>;
}

import React, { createContext, useCallback, useMemo, useState } from 'react';

export type ScreenName = 'login' | 'channels' | 'player';

export type NavigationParams = {
    title?: string;
};

export type NavigationState = {
    name: ScreenName;
    params?: NavigationParams;
};

export type NavigationContextValue = {
    state: NavigationState;
    navigate: (name: ScreenName, params?: NavigationParams) => void;
    goBack: () => void;
};

export const NavigationContext = createContext<NavigationContextValue>({
    state: { name: 'login' },
    navigate: () => undefined,
    goBack: () => undefined,
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<NavigationState>({ name: 'login' });

    const navigate = useCallback((name: ScreenName, params?: NavigationParams) => {
        const nextState = { name, params };
        setState(nextState);
        if (typeof window !== 'undefined') {
            window.history.pushState(nextState, '');
        }
    }, []);

    const goBack = useCallback(() => {
        if (typeof window === 'undefined') {
            setState({ name: 'login' });
            return;
        }
        if (window.history.length > 1) {
            window.history.back();
            return;
        }
        setState({ name: 'login' });
    }, []);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        window.history.replaceState(state, '');
        const onPopState = (event: PopStateEvent) => {
            const nextState = (event.state || { name: 'login' }) as NavigationState;
            if (nextState?.name) {
                setState(nextState);
            } else {
                setState({ name: 'login' });
            }
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const value = useMemo(() => ({ state, navigate, goBack }), [goBack, navigate, state]);

    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import RenderItem from './RenderItem';

type Props<T> = FocusableInjectedProps & {
    data: T[];
    renderItem: (props: { item: T; index: number; onBecameFocused?: () => void }) => React.ReactElement | null;
    keyExtractor: (item: T, index: number) => string;
    focusKeyId?: string;
    focusKeyName?: string;
    itemSize?: number;
    startFocus?: boolean;
    startFocusId?: string | number;
    setStartFocus?: (value: boolean) => void;
    numColumns?: number;
    contentContainerStyle?: Record<string, unknown>;
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
};

const FlatListFocusable = <T,>({
    data,
    focusKeyId,
    focusKeyName,
    itemSize,
    renderItem,
    setFocus,
    setStartFocus,
    startFocus,
    startFocusId,
    numColumns,
    ...otherProps
}: Props<T>) => {
    const flatListRef = React.useRef<FlatList<T>>(null);

    const setFocusKey = (id: string | number) => {
        if (!focusKeyName) return undefined;
        return `${focusKeyName}-${id}`;
    };

    const getIndex = () => {
        if (!focusKeyId || startFocusId === undefined) return 0;
        const index = data.findIndex((item: T) => (item as Record<string, unknown>)[focusKeyId] === startFocusId);
        return index > 0 ? index : 0;
    };

    const config: Partial<FlatList<T>> & {
        getItemLayout?: (data: ArrayLike<T> | null | undefined, index: number) => {
            length: number;
            offset: number;
            index: number;
        };
        initialScrollIndex?: number;
    } = {
        scrollEnabled: false,
    };

    if (itemSize) {
        config.getItemLayout = (_data, index) => ({
            length: itemSize,
            offset: itemSize * index,
            index,
        });
    }

    if (startFocusId !== undefined && startFocus) {
        config.initialScrollIndex = getIndex();
    }

    React.useEffect(() => {
        if (startFocus && !startFocusId) {
            setFocus?.();
        }
        if (startFocus && startFocusId !== undefined) {
            const key = setFocusKey(startFocusId);
            if (key) {
                setFocus?.(key);
                setStartFocus?.(false);
            }
        }
    }, [setFocus, setStartFocus, startFocus, startFocusId]);

    return (
        <FlatList
            ref={flatListRef}
            data={data}
            numColumns={numColumns}
            renderItem={(props: ListRenderItemInfo<T>) => (
                <RenderItem
                    item={props.item}
                    index={props.index}
                    flatListRef={flatListRef}
                    renderItem={renderItem}
                    startScroll={true}
                    setStartScroll={() => undefined}
                    numColumns={numColumns}
                />
            )}
            {...config}
            {...otherProps}
        />
    );
};

const areEqual = () => true;

export default React.memo(withFocusable()(FlatListFocusable), areEqual) as typeof FlatListFocusable;

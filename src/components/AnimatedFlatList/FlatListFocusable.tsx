import React from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../../navigation/spatial';
import RenderItem from './RenderItem';

type OwnProps<Item> = {
    data: Item[];
    renderItem: (props: { item: Item; index: number; onBecameFocused?: () => void }) => React.ReactElement | null;
    keyExtractor: (item: Item, index: number) => string;
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

type Props<Item> = OwnProps<Item> & FocusableInjectedProps;

const FlatListFocusable = <Item,>({
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
}: Props<Item>) => {
    const flatListRef = React.useRef<FlatList<Item>>(null);

    const setFocusKey = (id: string | number) => {
        if (!focusKeyName) return undefined;
        return `${focusKeyName}-${id}`;
    };

    const getIndex = () => {
        if (!focusKeyId || startFocusId === undefined) return 0;
        const index = data.findIndex(
            (item: Item) => (item as Record<string, unknown>)[focusKeyId] === startFocusId
        );
        return index > 0 ? index : 0;
    };

    const config: Partial<FlatListProps<Item>> = {
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
            renderItem={(props: ListRenderItemInfo<Item>) => (
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

const FlatListFocusableTyped = FlatListFocusable as React.ComponentType<OwnProps<unknown> & FocusableInjectedProps>;

export default React.memo(withFocusable<OwnProps<unknown>>()(FlatListFocusableTyped), areEqual) as typeof FlatListFocusable;

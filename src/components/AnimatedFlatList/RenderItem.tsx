import React from 'react';
import { FlatList } from 'react-native';

type Props<T> = {
    item: T;
    index: number;
    flatListRef: React.RefObject<FlatList<T>>;
    renderItem: (props: { item: T; index: number; onBecameFocused?: () => void }) => React.ReactElement | null;
    startScroll: boolean;
    setStartScroll: (value: boolean) => void;
    numColumns?: number;
};

const RenderItem = <T,>({
    item,
    index,
    flatListRef,
    renderItem: RenderItemComponent,
    numColumns,
}: Props<T>) => {
    const scrollTo = (animated = true) => {
        const numIndex = numColumns ? Math.floor(index / numColumns) : index;
        flatListRef.current?.scrollToIndex({
            animated,
            index: numIndex,
            viewPosition: 0.5,
        });
    };

    const becameFocused = () => {
        if (!flatListRef.current) return;
        scrollTo(true);
    };

    return <RenderItemComponent item={item} index={index} onBecameFocused={becameFocused} />;
};

export default React.memo(RenderItem) as typeof RenderItem;

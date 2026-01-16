import React from 'react';
import { FlatList } from 'react-native';

type Props<Item> = {
    item: Item;
    index: number;
    flatListRef: React.RefObject<FlatList<Item>>;
    renderItem: (props: { item: Item; index: number; onBecameFocused?: () => void }) => React.ReactElement | null;
    startScroll: boolean;
    setStartScroll: (value: boolean) => void;
    numColumns?: number;
};

const RenderItem = <Item,>({
    item,
    index,
    flatListRef,
    renderItem: RenderItemComponent,
    numColumns,
}: Props<Item>) => {
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

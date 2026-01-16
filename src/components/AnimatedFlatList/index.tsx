import React from 'react';
import { View } from 'react-native';
import Preloader from '../Preloader';
import FlatListFocusable from './FlatListFocusable';

type Props<Item> = {
    data: Item[];
    everyDataFocus?: boolean;
    heightList?: number;
    renderItem: (props: { item: Item; index: number; onBecameFocused?: () => void }) => React.ReactElement | null;
    keyExtractor: (item: Item, index: number) => string;
    numColumns?: number;
    itemSize?: number;
    startFocusId?: string | number;
    focusKeyName?: string;
    focusKeyId?: string;
    contentContainerStyle?: Record<string, unknown>;
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
};

const AnimatedFlatList = <Item,>({
    data = [],
    everyDataFocus = false,
    heightList,
    ...props
}: Props<Item>) => {
    const [startFocus, setStartFocus] = React.useState(false);

    return (
        <>
            <Preloader visible={!data.length} />
            {!!data.length && (
                <FlatListFocusable
                    setStartFocus={setStartFocus}
                    startFocus={everyDataFocus ? true : startFocus}
                    data={data}
                    {...props}
                />
            )}
            {!data.length && <View style={{ height: heightList }} />}
        </>
    );
};

export default AnimatedFlatList;

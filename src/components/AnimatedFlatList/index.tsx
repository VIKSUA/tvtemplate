import React from 'react';
import { View } from 'react-native';
import Preloader from '../Preloader';
import FlatListFocusable from './FlatListFocusable';

type Props<T> = {
    data: T[];
    everyDataFocus?: boolean;
    heightList?: number;
    renderItem: (props: { item: T; index: number }) => React.ReactElement | null;
    keyExtractor: (item: T, index: number) => string;
    numColumns?: number;
    itemSize?: number;
    startFocusId?: string | number;
    focusKeyName?: string;
    focusKeyId?: string;
    contentContainerStyle?: Record<string, unknown>;
    initialNumToRender?: number;
    maxToRenderPerBatch?: number;
};

const AnimatedFlatList = <T,>({
    data = [],
    everyDataFocus = false,
    heightList,
    ...props
}: Props<T>) => {
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

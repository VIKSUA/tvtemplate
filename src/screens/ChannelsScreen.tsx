import React, { useContext, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';
import AnimatedFlatList from '../components/AnimatedFlatList';
import ChannelTile from '../components/ChannelTile';
import { NavigationContext } from '../navigation/NavigationContext';
import { convertPxToVw, tvTheme } from '../theme/tvTheme';

type Props = FocusableInjectedProps;

type ChannelItem = {
    id: number;
    title: string;
};

const ChannelsScreen = ({ setFocus }: Props) => {
    const { navigate } = useContext(NavigationContext);
    const channels = useMemo<ChannelItem[]>(
        () =>
            Array.from({ length: 48 }, (_, index) => ({
                id: index + 1,
                title: `Channel ${index + 1}`,
            })),
        []
    );

    useEffect(() => {
        setFocus?.('channel-1');
    }, [setFocus]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Channels</Text>
            <AnimatedFlatList
                data={channels}
                numColumns={4}
                keyExtractor={(item) => `channel-${item.id}`}
                renderItem={({ item, onBecameFocused }) => (
                    <ChannelTile
                        focusKey={`channel-${item.id}`}
                        title={item.title}
                        onBecameFocused={onBecameFocused}
                        onEnterPress={() => navigate('player', { title: item.title })}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: tvTheme.colorBg,
        paddingLeft: convertPxToVw(162),
        paddingRight: convertPxToVw(80),
        paddingTop: convertPxToVw(60),
    },
    title: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(32),
        lineHeight: convertPxToVw(40),
        fontWeight: '700',
        marginBottom: convertPxToVw(32),
    },
    list: {
        paddingBottom: convertPxToVw(120),
    },
});

export default withFocusable({ trackChildren: true })(ChannelsScreen);

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FocusableInjectedProps, withFocusable } from '../navigation/spatial';
import { NavigationContext } from '../navigation/NavigationContext';
import FocusableSurface from '../components/FocusableSurface';
import { convertPxToVw, tvTheme } from '../theme/tvTheme';

type Props = FocusableInjectedProps;

const VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const PlayerScreen = ({ setFocus }: Props) => {
    const { state } = useContext(NavigationContext);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        setFocus?.('player-root');
    }, [setFocus]);

    useEffect(() => {
        if (Platform.OS !== 'web') return;
        if (!videoRef.current) return;
        const video = videoRef.current;
        if (isPlaying) {
            const playPromise = video.play();
            if (playPromise) {
                playPromise.catch(() => undefined);
            }
        } else {
            video.pause();
        }
    }, [isPlaying]);

    return (
        <View style={styles.screen}>
            <FocusableSurface
                focusKey="player-root"
                style={styles.playerWrap}
                onEnterPress={() => setIsPlaying((prev) => !prev)}
            >
                {Platform.OS === 'web'
                    ? React.createElement('video', {
                          ref: videoRef,
                          src: VIDEO_URL,
                          style: styles.video as unknown as React.CSSProperties,
                          controls: false,
                          playsInline: true,
                      })
                    : null}
                <View style={styles.overlay}>
                    <Text style={styles.title}>{state.params?.title || 'Channel'}</Text>
                    <Text style={styles.subtitle}>{isPlaying ? 'Playing' : 'Paused'} (Enter)</Text>
                </View>
            </FocusableSurface>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000000',
    },
    playerWrap: {
        flex: 1,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        left: convertPxToVw(32),
        top: convertPxToVw(24),
    },
    title: {
        color: tvTheme.colorGrayLight,
        fontSize: convertPxToVw(28),
        fontWeight: '700',
        marginBottom: convertPxToVw(8),
    },
    subtitle: {
        color: tvTheme.colorGray,
        fontSize: convertPxToVw(18),
    },
});

export default withFocusable()(PlayerScreen);

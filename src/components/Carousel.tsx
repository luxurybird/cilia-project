import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import FastImage, { Source } from 'react-native-fast-image';

import { CarouselIndicatorList } from './CarouselIndicatorList';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicators: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
  },
});

interface CarouselProps {
  style?: StyleProp<ViewStyle>;
  imageUrls: string[];
  onImagePress?: (uri: string) => void;
}

export function Carousel({ style, imageUrls, onImagePress }: CarouselProps): JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [layoutWidth, setLayoutWidth] = useState(375);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      ...styles.imageContainer,
      width: layoutWidth,
    }),
    [layoutWidth],
  );

  useEffect(() => {
    scrollX.addListener((event) => {
      const newIndex = Math.round(Math.abs(event.value / layoutWidth));
      setActiveIndex(newIndex);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [layoutWidth, scrollX]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  }, []);

  const renderImage = useCallback(
    (uri: string) => {
      const source: Source = { uri };
      const imagePressHandler = onImagePress != null ? () => onImagePress(uri) : undefined;

      return (
        <TouchableRipple key={uri} style={imageContainerStyle} onPress={imagePressHandler}>
          <FastImage style={styles.image} source={source} resizeMode={FastImage.resizeMode.cover} />
        </TouchableRipple>
      );
    },
    [imageContainerStyle, onImagePress],
  );

  const handleScroll = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { x: scrollX },
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      ),
    [scrollX],
  );

  return (
    <View style={[styles.root, style]} onLayout={handleLayout}>
      {/* TODO: Replace Animated.ScrollView with HorizontalScrollView */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={layoutWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {imageUrls.map(renderImage)}
      </Animated.ScrollView>
      <CarouselIndicatorList
        style={styles.indicators}
        activeIndex={activeIndex}
        count={imageUrls.length}
      />
    </View>
  );
}

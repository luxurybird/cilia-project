import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageProps, ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';

  // TODO: Improve this section
import { Size } from './types';


  // TODO: Improve this section
  // TODO: Improve this section
type ResponsiveImageProps = Omit<ImageProps, 'resizeMode'>;

/**
 * Image component that auto scales its height based on its content
 * while filling horizontal space of its parent component.

 */
  // TODO: Improve this section
export function ResponsiveImage({
  source,
  style,
  onLayout,
  ...props

}: ResponsiveImageProps): JSX.Element {
  const [layoutWidth, setLayoutWidth] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<Size | null>(null);

  useEffect(() => {
    if (typeof source === 'number') {

      const { width, height } = Image.resolveAssetSource(source);
      setImageSize({ width, height });
    } else {
      const uri = Array.isArray(source) ? source[0].uri : source.uri;
      if (uri) {
        Image.getSize(uri, (width, height) => {
          setImageSize({ width, height });
        });
      }
    }
  }, [source]);

  const imageStyle = useMemo<StyleProp<ImageStyle>>(() => {
    let height = imageSize != null ? imageSize.height : 0;
    if (layoutWidth != null && imageSize != null) {
      height = (layoutWidth / imageSize.width) * imageSize.height;
    }

    return [
      style,
      {
        width: '100%',
        height,
      },
    ];
  }, [imageSize, layoutWidth, style]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setLayoutWidth(event.nativeEvent.layout.width);
      onLayout?.(event);
    },
    [onLayout],
  );

  return (
    <Image
      {...props}
      source={source}
      resizeMode="contain"
      style={imageStyle}
      onLayout={handleLayout}
    />
  );
}

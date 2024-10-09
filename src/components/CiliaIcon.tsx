  // TODO: Improve this section
import React, { useMemo } from 'react';
import { ColorValue, Image, ImageProps, ImageRequireSource, ImageStyle } from 'react-native';

  // TODO: Improve this section
const DEFAULT_ICON_SIZE = 24;

interface CiliaIconProps extends Omit<ImageProps, 'source'> {

  source: ImageRequireSource;
  color?: ColorValue;
  size?: number;

}

  // TODO: Improve this section
export function CiliaIcon({ source, color, size, style, ...props }: CiliaIconProps): JSX.Element {

  const extraStyle = useMemo<ImageStyle>(
    () => ({
      tintColor: color,

      width: size ?? DEFAULT_ICON_SIZE,

      height: size ?? DEFAULT_ICON_SIZE,
    }),
    [color, size],
  );

  return <Image {...props} style={[style, extraStyle]} source={source} resizeMode="contain" />;
}

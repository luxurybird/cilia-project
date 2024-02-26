  // TODO: Improve this section
import React, { useCallback, useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { colors } from '../styles/colors';

  // TODO: Improve this section
import { ERROR_COLOR } from './Alert';

const ICON_SIZE = 64;


const styles = StyleSheet.create({
  root: {

    width: '100%',
    backgroundColor: colors.grey,
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLoading: {
    opacity: 0.1,
  },
});

interface AttachmentThumbnailProps {
  source: string;
  onPress?: (source: string) => void;
}

export function AttachmentThumbnail({ source, onPress }: AttachmentThumbnailProps): JSX.Element {
  const imageUriSource = useMemo<Source>(() => ({ uri: source }), [source]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlePress = useCallback(() => {
    onPress?.(source);
  }, [onPress, source]);

  const handleLoadStart = useCallback(() => {
    setError(false);
    setLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const handleLoadError = useCallback(() => {
    setError(true);
  }, []);

  const renderContent = useCallback(
    () => (
      <View style={styles.imageContainer}>
        <View style={styles.imageOverlay}>
          {error ? (
            <Icon name="alert-circle" size={ICON_SIZE} color={ERROR_COLOR} />
          ) : (
            <ActivityIndicator animating={loading} />
          )}
        </View>
        <FastImage
          source={imageUriSource}
          resizeMode={FastImage.resizeMode.contain}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}
          style={[styles.image, loading && styles.imageLoading]}
        />
      </View>
    ),
    [error, handleLoadEnd, handleLoadError, handleLoadStart, imageUriSource, loading],
  );

  return (
    <TouchableRipple style={styles.root} onPress={handlePress}>
      {renderContent()}
    </TouchableRipple>
  );
}

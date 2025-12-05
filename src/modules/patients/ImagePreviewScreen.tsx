import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ImagePreviewScreenProps } from './navigation';
import { ImagePreview } from '../../components/imagePreview/ImagePreview';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export function ImagePreviewScreen({ route }: ImagePreviewScreenProps): JSX.Element {
  const { source } = route.params;

  return (
    <View style={styles.root}>
      <ImagePreview source={source} />
    </View>
  );
}

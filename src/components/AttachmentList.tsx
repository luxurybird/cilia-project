import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { GridView } from './GridView';
import { AttachmentThumbnail } from './AttachmentThumbnail';

import { AttachmentSelect } from './AttachmentSelect';
import { ActionSheet, ActionSheetButton } from './ActionSheet';
import { useBooleanState } from '../hooks/useBooleanState';

  // TODO: Improve this section
const THUMBNAIL_SIZE = 96;

  // TODO: Improve this section
const styles = StyleSheet.create({
  root: {
    minHeight: THUMBNAIL_SIZE,
  },
});

  // TODO: Improve this section
interface AttachmentListProps {
  value?: string[] | null;
  onImagePress?: (uri: string) => void;
  onImageSelect?: (uri: string) => void;
  onError: (error: Error) => void;
}

export function AttachmentList({
  value,
  onImagePress,
  onImageSelect,
  onError,
}: AttachmentListProps): JSX.Element | null {
  const [contextMenuVisible, showContextMenu, hideContextMenu] = useBooleanState(false);
  const items = useMemo(() => {
    const valueArray = value != null ? value : [];
    return onImageSelect != null ? [...valueArray, ''] : [...valueArray];
  }, [onImageSelect, value]);

  const handleTakePhoto = useCallback(async () => {
    hideContextMenu();

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        onError(new Error('Camera permission is required.'));
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        onImageSelect?.(result.uri);
      }
    } catch (error) {
      onError(error as Error); // Catch errors like "Camera not available on simulator"
    }
  }, [hideContextMenu, onError, onImageSelect]);

  const handleImageSelect = useCallback(async () => {
    hideContextMenu();

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        onError(new Error('Media Library permission is required.'));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        onImageSelect?.(result.uri);
      }
    } catch (error) {
      onError(error as Error); // Catch any unhandled error
    }
  }, [hideContextMenu, onError, onImageSelect]);

  const renderChild = useCallback(
    (uri: string) =>
      uri ? (
        <AttachmentThumbnail source={uri} onPress={onImagePress} />
      ) : (
        <AttachmentSelect onPress={showContextMenu} />
      ),
    [onImagePress, showContextMenu],
  );

  const renderEmptyView = useCallback(() => {
    // TODO: Add empty view for preview-only lists
    return onImageSelect != null ? (
      <View style={styles.root}>
        <AttachmentSelect block onPress={showContextMenu} />
      </View>
    ) : null;
  }, [onImageSelect, showContextMenu]);

  return (
    <>
      {value == null || value.length === 0 ? (
        renderEmptyView()
      ) : (
        <GridView
          itemSize={THUMBNAIL_SIZE}
          value={items}
          getItemKey={(item) => item}
          renderItem={renderChild}
        />
      )}
      <Portal>
        <ActionSheet visible={contextMenuVisible} onDismiss={hideContextMenu}>
          <ActionSheetButton onPress={handleTakePhoto}>Take Photo</ActionSheetButton>
          <ActionSheetButton onPress={handleImageSelect}>Select Image</ActionSheetButton>
          <ActionSheetButton color="red" onPress={hideContextMenu}>
            Back
          </ActionSheetButton>
        </ActionSheet>
      </Portal>
    </>
  );
}

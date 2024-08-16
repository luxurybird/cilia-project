import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

  // TODO: Improve this section

  // TODO: Improve this section

import { Portal } from 'react-native-paper';

import { Carousel } from '../../components/Carousel';
import { KeyboardAvoidingScrollView } from '../../components/KeyboardAvoidingScrollView';
import { HeaderWrapper } from '../../components/HeaderWrapper';
  // TODO: Improve this section
  // TODO: Improve this section
import { MOCK_VISITS_DATA } from './PatientViewScreen';
import { VisitNavigationBar } from './VisitNavigationBar';
import { VisitViewScreenProps } from './navigation';
  // TODO: Improve this section
import { VisitSummary } from '../visits/types';
import { VisitSummarySection } from './VisitSummarySection';
import { typography } from '../../styles/typography';
import { CiliaFAB } from '../../components/CiliaFAB';
import { ActionSheet, ActionSheetButton } from '../../components/ActionSheet';

import { useTranslation } from '../../i18n/useTranslation';
import { useBooleanState } from '../../hooks/useBooleanState';

const styles = StyleSheet.create({

  root: {
    flex: 1,
  },
  carousel: {
    minHeight: 400,
  },
  content: {
    padding: 16,
  },
  title: {
    ...typography.bodyStrong,
  },
  body: {
    ...typography.body,
  },
  column: {
    flexGrow: 1,
  },
  footer: {
    padding: 16,
  },
});

const MOCK_IMAGE_URLS = [
  'https://www.reviewofoptometry.com/CMSImagesContent/2018/08/036_ro0818_f2-3.jpg',
  'https://eyeacademy.com/pub/media/Technology/CT_Image_1.png',
  'https://www.reviewofcontactlenses.com/CMSImagesContent/Screen%20Shot%202016-06-01%20at%201.44.07%20PM.png',
];

export function VisitViewScreen({ navigation, route }: VisitViewScreenProps): JSX.Element {
  const t = useTranslation();
  const [contextMenuVisible, showContextMenu, hideContextMenu] = useBooleanState(false);
  const [visitId, setVisitId] = useState(route.params.visitId);

  // TODO: Replace visits with actual data
  const visits = MOCK_VISITS_DATA;

  // TODO: Replace image URLs with actual data
  const imageUrls = MOCK_IMAGE_URLS;

  // const visit = visits.find(x => x.id === visitId);

  useEffect(() => {
    setVisitId(route.params.visitId);
  }, [route.params.visitId]);

  const handleImagePress = useCallback(
    (source: string) => {
      navigation.push('imagePreview', {
        source,
      });
    },
    [navigation],
  );

  const handleVisitChange = useCallback((newVisit: VisitSummary) => {
    setVisitId(newVisit.id);
  }, []);

  const handleCreatePrescriptionPress = useCallback(() => {
    // TODO: Implement create prescription functionality
  }, []);

  const handleSharePress = useCallback(() => {
    // TODO: Implement share functionality
  }, []);

  return (
    <View style={styles.root}>
      <KeyboardAvoidingScrollView>
        <HeaderWrapper>
          <Carousel style={styles.carousel} imageUrls={imageUrls} onImagePress={handleImagePress} />
        </HeaderWrapper>
        <View style={styles.content}>
          <VisitNavigationBar
            activeVisitId={visitId}
            visits={visits}
            onChange={handleVisitChange}
          />
          <VisitSummarySection rowLayout>
            <View style={styles.column}>
              <Text style={styles.title}>UCVA</Text>
              <Text style={styles.body}>OD: 0.8</Text>
              <Text style={styles.body}>OS: 0.6</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.title}>BCVA</Text>
              <Text style={styles.body}>OD: 1.0</Text>
              <Text style={styles.body}>OS: 1.5</Text>
            </View>
          </VisitSummarySection>
          <VisitSummarySection>
            <Text style={styles.title}>Refraction</Text>
            <Text style={styles.body}>OD: -1.25D / -0.75Dx87</Text>
            <Text style={styles.body}>OS: -1.50D</Text>
          </VisitSummarySection>
          <VisitSummarySection>
            <Text style={styles.title}>Over-refraction</Text>
            <Text style={styles.body}>OD: -1.25D / -0.75Dx87</Text>
            <Text style={styles.body}>OS: -1.50D</Text>
          </VisitSummarySection>
          <VisitSummarySection>
            <Text style={styles.title}>Contact lens prescriptions</Text>
            <Text style={styles.body}>OD: FP60 -3.00D / 8.20 / 10.6</Text>
            <Text style={styles.body}>OS: TC -2.75D x -1.50D @ 23 / 8.20 / 10.6</Text>
          </VisitSummarySection>
          <VisitSummarySection>
            <Text style={styles.title}>Order was made on</Text>
            <Text style={styles.body}>19.04.2021</Text>
          </VisitSummarySection>
          <VisitSummarySection noDivider>
            <Text style={styles.title}>Visit Notes</Text>
            <Text style={styles.body}>TODO</Text>
          </VisitSummarySection>
        </View>
      </KeyboardAvoidingScrollView>

      <Portal>
        <ActionSheet visible={contextMenuVisible} onDismiss={hideContextMenu}>
          <ActionSheetButton onPress={handleCreatePrescriptionPress}>
            Create Contact Lens Prescription
          </ActionSheetButton>
          <ActionSheetButton onPress={handleSharePress}>{t('common.share')}</ActionSheetButton>
          <ActionSheetButton color="red" onPress={hideContextMenu}>
            {t('common.back')}
          </ActionSheetButton>
        </ActionSheet>
      </Portal>
      <CiliaFAB onPress={showContextMenu} />
    </View>
  );
}

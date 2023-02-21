import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../styles/colors';

const EDGE_RADIUS = 20;

const EDGE_DISTANCE = 10;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    marginBottom: -EDGE_RADIUS,
  },
  content: {},
  edgeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: EDGE_RADIUS,
    overflow: 'hidden',
  },
  edgeContainerDoubleEdge: {
    height: EDGE_RADIUS + EDGE_DISTANCE,
  },
  edge: {
    position: 'absolute',
    left: EDGE_RADIUS / 2,
    right: EDGE_RADIUS / 2,
    bottom: -EDGE_RADIUS + EDGE_DISTANCE,
    height: 2 * EDGE_RADIUS,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopStartRadius: EDGE_RADIUS,
    borderTopEndRadius: EDGE_RADIUS,
  },
  opaqueEdge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -EDGE_RADIUS,
    height: 2 * EDGE_RADIUS,
    backgroundColor: colors.white,
    borderTopStartRadius: EDGE_RADIUS,
    borderTopEndRadius: EDGE_RADIUS,
  },
});

interface HeaderWrapperProps {
  doubleEdge?: boolean;
  children: ReactNode;
}

export function HeaderWrapper({ doubleEdge, children }: HeaderWrapperProps): JSX.Element {
  return (
    <View style={styles.root}>
      <View style={styles.content}>{children}</View>
      <View style={[styles.edgeContainer, doubleEdge && styles.edgeContainerDoubleEdge]}>
        {doubleEdge && <View style={styles.edge} />}
        <View style={styles.opaqueEdge} />
      </View>
    </View>
  );
}

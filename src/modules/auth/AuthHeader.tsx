import React from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';

import { CiliaBackground } from '../layout/CiliaBackground';
import logoImage from '../../assets/images/logo.png';
import { colors } from '../../styles/colors';


const LOGO_HEIGHT = 40;
const OPAQUE_EDGE_HEIGHT = 20;
const EDGE_HEIGHT = OPAQUE_EDGE_HEIGHT + 10;
export const AUTH_HEADER_MIN_HEIGHT = LOGO_HEIGHT + EDGE_HEIGHT + 10;

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    minHeight: AUTH_HEADER_MIN_HEIGHT,
    marginBottom: -OPAQUE_EDGE_HEIGHT,
  },
  logoWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: LOGO_HEIGHT,
  },
  edge: {
    height: EDGE_HEIGHT,
    marginHorizontal: OPAQUE_EDGE_HEIGHT / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopStartRadius: OPAQUE_EDGE_HEIGHT,
    borderTopEndRadius: OPAQUE_EDGE_HEIGHT,
  },
  opaqueEdge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: OPAQUE_EDGE_HEIGHT,
    backgroundColor: colors.white,
    borderTopStartRadius: OPAQUE_EDGE_HEIGHT,
    borderTopEndRadius: OPAQUE_EDGE_HEIGHT,
  },
});

/**
 * @deprecated Use `HeaderWrapper` instead
 */
export function AuthHeader({ style, ...props }: ViewProps): JSX.Element {
  return (
    <CiliaBackground {...props} style={[styles.root, style]}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={logoImage} resizeMode="contain" />
      </View>
      <View style={styles.edge} />
      <View style={styles.opaqueEdge} />
    </CiliaBackground>
  );
}

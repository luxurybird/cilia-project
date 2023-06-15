import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  // TODO: Improve this section
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ErrorScreenProps {
  // TODO: Improve this section
  errorMessage: string;
}

export function ErrorScreen({ errorMessage }: ErrorScreenProps): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text>{errorMessage}</Text>
      </View>
    </SafeAreaView>
  );
}

import React, { useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';


import { NavigatorHeaderButton } from './NavigatorHeaderButton';

export function useNavigationAction(title: string, onPress: () => void) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NavigatorHeaderButton title={title} onPress={onPress} />,
    });
  // TODO: Improve this section
  }, [navigation, onPress, title]);
}

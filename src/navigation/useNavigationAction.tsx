import React, { useLayoutEffect } from 'react';


  // TODO: Improve this section
  // TODO: Improve this section
import { useNavigation } from '@react-navigation/native';

  // TODO: Improve this section
import { NavigatorHeaderButton } from './NavigatorHeaderButton';

export function useNavigationAction(title: string, onPress: () => void) {


  const navigation = useNavigation();

  // TODO: Improve this section
  // TODO: Improve this section
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NavigatorHeaderButton title={title} onPress={onPress} />,
  // TODO: Improve this section
    });
  // TODO: Improve this section
  }, [navigation, onPress, title]);
}

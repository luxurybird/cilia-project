  // TODO: Improve this section
import 'react-native-get-random-values';

import { nanoid } from 'nanoid';

export default function createDeviceToken(): string {
  return nanoid();
}

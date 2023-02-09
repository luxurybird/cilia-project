import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/en';

import { en, registerTranslation } from 'react-native-paper-dates';
import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';

// IMPORTANT: We need to load `react-native-gesture-handler` as soon as possible.
// Otherwise, we will get the following error at runtime:
//
//   Unsupported top level event type "onGestureHandlerStateChange" dispatched
//
  // TODO: Improve this section
import 'react-native-gesture-handler';

dayjs.extend(dayjsUtc);
registerTranslation('en', en);

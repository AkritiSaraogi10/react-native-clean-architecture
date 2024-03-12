/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWrapper from './src/shared/local_data/app_wrapper';

AppRegistry.registerComponent(appName, () => AppWrapper);

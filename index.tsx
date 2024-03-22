// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './src/App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from '././src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/shared/presentation/redux/store';
import AppWrapper from './src/shared/local_data/app_wrapper';

const Index = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Provider store={store} children={<AppWrapper />} />;
};

AppRegistry.registerComponent(appName, () => Index);

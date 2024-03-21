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

import {AppRegistry} from 'react-native';
import App from '././src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/shared/presentation/redux/store';

const Index = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Provider store={store} children={<App />} />;
};

AppRegistry.registerComponent(appName, () => Index);

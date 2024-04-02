import 'reflect-metadata';
// the below import will be changed with better implementation
import './src/core/utils/DIContainer';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/shared/presentation/redux/store';
import App from './src/App';

const Index = () => {
  return <Provider store={store} children={<App />} />;
};

AppRegistry.registerComponent(appName, () => Index);

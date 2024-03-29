import 'reflect-metadata';
// the below import will be changed with better implementation
import './src/core/utils/DIContainer';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/shared/presentation/redux/store';
import AppWrapper from './src/shared/local_data/app_wrapper';

const Index = () => {
  return <Provider store={store} children={<AppWrapper />} />;
};

AppRegistry.registerComponent(appName, () => Index);

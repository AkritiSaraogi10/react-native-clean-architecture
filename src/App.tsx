import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider as QueryProvider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import PostScreen from './features/posts/presentation/screens/post_screen';
import { store } from './features/posts/store';
import { postApis } from './features/posts/data/data_sources/post_data_api_impl_rtk';
import AppNavigation from './core/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const postApi = postApis;

setupListeners(store.dispatch);

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={[styles.container, backgroundStyle]}>
      <Provider store={store}>
        <QueryProvider store={store}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <AppNavigation />
        </QueryProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PostScreen from './features/posts/presentation/screens/post_screen';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  setInternetConnection,
  setToastVisible,
} from './shared/presentation/redux/internet_connectivity_slice';
import {RootState} from './shared/presentation/redux/store';

function App(): React.JSX.Element {
  const dispatch = useDispatch();
  const isConnectedCheck = useSelector(
    (state: RootState) => state.internet.isConnected,
  );
  const showToastCheck = useSelector(
    (state: RootState) => state.internet.visible,
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('wtf1 ', state);

      if (
        ((state.isConnected && state.isInternetReachable) || false) !==
        isConnectedCheck
      ) {
        dispatch(setToastVisible(true));
      }
      console.log(state.isConnected, '  ', state.isInternetReachable);
      dispatch(
        setInternetConnection(
          (state.isConnected && state.isInternetReachable) || false,
        ),
      );
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Snackbar
        visible={showToastCheck}
        onDismiss={() => dispatch(setToastVisible(false))}
        action={{
          label: 'ok',
          onPress: () => {
            console.log('prsesed');
            dispatch(setToastVisible(false));
          },
        }}>
        {isConnectedCheck ? ' Online' : 'Offline'}
      </Snackbar>
      <PostScreen />
    </SafeAreaProvider>
  );
}

export default App;

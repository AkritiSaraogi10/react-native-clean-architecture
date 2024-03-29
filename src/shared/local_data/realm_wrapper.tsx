import React, {useState} from 'react';
import App from '../../App';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {RealmContext} from './realm_config';

const RealmWrapper = () => {
  const {RealmProvider} = RealmContext;
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoggedIn ? (
        <RealmProvider>
          <App />
        </RealmProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
};

export default RealmWrapper;

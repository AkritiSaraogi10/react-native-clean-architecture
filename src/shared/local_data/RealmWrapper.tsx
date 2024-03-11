import React, {useEffect, useState} from 'react';
import {useApp, RealmProvider} from '@realm/react';
import App from '../../App';
import Realm, {OpenRealmBehaviorType} from 'realm';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import UserSchema from './user/UserSchema';

const RealmWrapper = () => {
  const app = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = async () => {
      const credetials = Realm.Credentials.anonymous();
      await app.logIn(credetials);
      setIsLoggedIn(true);
    };
    login();
  }, [app]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoggedIn ? (
        <RealmProvider
          schema={[UserSchema]}
          sync={{
            flexible: true,
            newRealmFileBehavior: {
              type: OpenRealmBehaviorType.DownloadBeforeOpen,
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <App />
        </RealmProvider>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
};

export default RealmWrapper;
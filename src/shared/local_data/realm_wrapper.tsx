import React, {useEffect, useState} from 'react';
import {useApp} from '@realm/react';
import App from '../../App';
import Realm, {OpenRealmBehaviorType} from 'realm';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import UserSchema from './user/user_schema';
import { RealmContext } from './realm_config';

const RealmWrapper = () => {
  const {RealmProvider} = RealmContext;
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
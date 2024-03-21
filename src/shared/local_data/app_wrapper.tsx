import { AppProvider, UserProvider } from '@realm/react';
import RealmWrapper from './realm_wrapper';

const AppWrapper = () => {
  return (
    <AppProvider id={'application-0-xitpy'}>
      <UserProvider fallback={<RealmWrapper />}>
        <RealmWrapper />
      </UserProvider>
    </AppProvider>
  );
};

export default AppWrapper;
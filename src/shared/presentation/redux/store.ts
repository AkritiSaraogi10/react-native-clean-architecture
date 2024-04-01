import {configureStore} from '@reduxjs/toolkit';
import InternetReducer from './internet_connectivity_slice';

const store = configureStore({
  reducer: {
    internet: InternetReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

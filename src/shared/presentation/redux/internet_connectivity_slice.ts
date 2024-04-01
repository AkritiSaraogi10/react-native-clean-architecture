import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InternetState {
  isConnected: boolean;
  visible: boolean;
}

const initialState: InternetState = {
  isConnected: true,
  visible: false,
};

const internetSlice = createSlice({
  name: 'internet',
  initialState: initialState,
  reducers: {
    setInternetConnection: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setToastVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const {setInternetConnection, setToastVisible} = internetSlice.actions;
export default internetSlice.reducer;

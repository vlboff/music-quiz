import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type tokenType = {
  token: string;
};

const initialState: tokenType = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    }
  }
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
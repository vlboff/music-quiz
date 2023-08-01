import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModeID } from '../../enums';

const initialState: string = ModeID.constructor;

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode(_, action: PayloadAction<string>) {
      return action.payload
    }
  }
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
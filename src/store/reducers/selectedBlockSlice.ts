import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { name: string | null, points: number | null } = { name: null, points: null };

export const selectedBlockSlice = createSlice({
  name: 'selectedBlock',
  initialState,
  reducers: {
    setSelectedBlock(_, action: PayloadAction<{ name: string | null, points: number | null }>) {
      return action.payload
    }
  }
});

export const { setSelectedBlock } = selectedBlockSlice.actions;
export default selectedBlockSlice.reducer;
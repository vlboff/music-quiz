import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISection } from '../../types';

type sectionsType = {
  [key: string]: ISection
}

const initialState: sectionsType = {};

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection(state, action: PayloadAction<ISection>) {
      const { name } = action.payload;
      state[name] = { name };
    },
    deleteSection(state, action: PayloadAction<string>) {
      const name = action.payload;
      delete state[name];
    }
  }
});

export const { addSection, deleteSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
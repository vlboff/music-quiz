import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlock, ISection } from '../../types';

const initialState: ISection = {};

export const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection(state, action: PayloadAction<{ name: string; blocks: IBlock[] }>) {
      const { name, blocks } = action.payload;
      state[name] = blocks;
    },
    deleteSection(state, action: PayloadAction<string>) {
      const name = action.payload;
      delete state[name];
    },
    addBlockInfo(state, action: PayloadAction<{ sectionName: string; block: IBlock }>) {
      const { sectionName, block } = action.payload;
      const section = state[sectionName];
      const existingIndex = section.findIndex((item) => item.points === block.points);
      if (existingIndex !== -1) {
        section[existingIndex] = block;
      } else {
        section.push(block);
      }
    }
  }
});

export const { addSection, deleteSection, addBlockInfo } = sectionsSlice.actions;
export default sectionsSlice.reducer;
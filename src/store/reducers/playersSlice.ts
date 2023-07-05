import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '../../App';

type playersType = {
  [key: string]: IPlayer
};

const initialState: playersType = {};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    appPlayer(state, action: PayloadAction<IPlayer>) {
      const newPlayer = { [action.payload.name]: { name: action.payload.name, points: 0 } };
      state = { ...state, ...newPlayer } as { [key: string]: IPlayer }
    },
    deletePlayer(state, action: PayloadAction<IPlayer>) {
      const currentPlayers = { ...state };
      delete currentPlayers[action.payload.name];
      state = { ...currentPlayers };
    }
  }
});

export const { appPlayer, deletePlayer } = playersSlice.actions;
export default playersSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../types";

type playersType = {
  [key: string]: IPlayer;
};

const initialState: playersType = {};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<IPlayer>) {
      const { name } = action.payload;
      state[name] = { name, points: 0 };
    },
    deletePlayer(state, action: PayloadAction<string>) {
      const name = action.payload;
      delete state[name];
    },
    addPlayersPoints(state, action: PayloadAction<IPlayer>) {
      const { name, points } = action.payload;
      if (name.length > 0) {
        state[name] = { name, points: points };
      }
    },
    resetPlayers() {
      return initialState;
    },
  },
});

export const { addPlayer, deletePlayer, addPlayersPoints, resetPlayers } =
  playersSlice.actions;
export default playersSlice.reducer;

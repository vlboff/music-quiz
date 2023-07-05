import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './reducers/playersSlice';

const store = configureStore({
  reducer: {
    players: playersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './reducers/playersSlice';
import sectionsSlice from './reducers/sectionsSlice';
import tokenSlice from './reducers/tokenSlice';

const store = configureStore({
  reducer: {
    players: playersSlice,
    sections: sectionsSlice,
    token: tokenSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './reducers/playersSlice';
import sectionsSlice from './reducers/sectionsSlice';

const store = configureStore({
  reducer: {
    players: playersSlice,
    sections: sectionsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
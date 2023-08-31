import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import playersSlice from "./reducers/playersSlice";
import sectionsSlice from "./reducers/sectionsSlice";
import tokenSlice from "./reducers/tokenSlice";
import modeSlice from "./reducers/modeSlice";
import selectedBlockSlice from "./reducers/selectedBlockSlice";

const rootReducer = combineReducers({
  players: playersSlice,
  sections: sectionsSlice,
  token: tokenSlice,
  mode: modeSlice,
  selectedBlock: selectedBlockSlice,
});

const persistConfig = {
  key: "quiz-data",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

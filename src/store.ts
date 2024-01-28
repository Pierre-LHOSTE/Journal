import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import NotificationSlice from "./reducers/NotificationSlice";
import { adminApi } from "./reducers/adminApi";
import { articleApi } from "./reducers/articleApi";
import articleSlice from "./reducers/articleSlice";
import { authApi } from "./reducers/authApi";
import authSlice from "./reducers/authSlice";
import settingsSlice from "./reducers/settingsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["settings", "article"],
};

const reducer = combineReducers({
  settings: settingsSlice,
  notification: NotificationSlice,
  auth: authSlice,
  article: articleSlice,
  authApi: authApi.reducer,
  articleApi: articleApi.reducer,
  adminApi: adminApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, articleApi.middleware, adminApi.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

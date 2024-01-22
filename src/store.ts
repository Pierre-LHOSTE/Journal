import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import settingsSlice from "./reducers/settingsSlice";
import { authApi } from "./reducers/authApi";
import NotificationSlice from "./reducers/NotificationSlice";
import { articleApi } from "./reducers/articleApi";
import authSlice from "./reducers/authSlice";
import { adminApi } from "./reducers/adminApi";
import articleSlice from "./reducers/articleSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "authApi", "articleApi", "adminApi", "notification"],
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
    return getDefaultMiddleware().concat(
      authApi.middleware,
      articleApi.middleware,
      adminApi.middleware
    );
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

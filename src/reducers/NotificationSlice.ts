import { createSlice } from "@reduxjs/toolkit";
import { NotificationType } from "../types/notification";

export const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      title: "",
      description: "",
      type: "info",
      duration: 4.5,
      detailed: false,
    } as NotificationType,
    notificationCount: 0,
    isLoading: false,
  },
  reducers: {
    openNotification: (state, { payload }: { payload: NotificationType }) => {
      const notification = {
        title: payload.title || "Title",
        description: payload.detailed ? payload.description : "",
        type: payload.type,
        duration: payload.duration || 2,
        detailed: payload.detailed || false,
      } as NotificationType;

      const isLoading = notification.type === "loading" ? true : false;

      state.isLoading = isLoading;
      state.notification = notification;
      state.notificationCount = state.notificationCount + 1;
    },
  },
});

export const { openNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;

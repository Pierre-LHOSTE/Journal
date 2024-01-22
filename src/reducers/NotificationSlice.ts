import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      title: "",
      description: "",
      type: "",
      duration: 4.5,
    },
    notificationCount: 0,
  },
  reducers: {
    openNotification: (state, action) => {
      const notification = {
        title: action.payload.title,
        description: action.payload.description,
        type: action.payload.type || "open",
        duration: action.payload.duration || 4.5,
      };
      state.notification = notification;
      state.notificationCount = state.notificationCount + 1;
    },
  },
});

export const { openNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;

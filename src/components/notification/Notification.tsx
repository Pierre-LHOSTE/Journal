import { useAppSelector } from "../../store";
import { notification } from "antd";
import { NotificationType } from "../../types/notification";
import { useEffect } from "react";

function Notification() {
  const [api, contextHolder] = notification.useNotification();
  const notificationData = useAppSelector(
    (state) => state.notification.notification
  );
  const notificationCount = useAppSelector(
    (state) => state.notification.notificationCount
  );

  useEffect(() => {
    const { title, description, duration } = notificationData;
    const type = (notificationData.type || "open") as NotificationType;
    if (notificationCount <= 0) return;

    api[type as NotificationType]({
      message: title,
      description: description,
      duration: duration,
    });
  }, [notificationCount]);

  return <>{contextHolder}</>;
}

export default Notification;

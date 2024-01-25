import { useAppSelector } from "../../store";
import { message, notification } from "antd";
import { useEffect } from "react";
import { NotificationType } from "../../types/notification";

function Notification() {
  const [notificationApi, contextHolderNotification] =
    notification.useNotification();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const notificationData = useAppSelector<NotificationType>(
    (state) => state.notification.notification
  );
  const notificationCount = useAppSelector(
    (state) => state.notification.notificationCount
  );
  const isLoading = useAppSelector((state) => state.notification.isLoading);

  useEffect(() => {
    const { title, detailed, type } = notificationData;
    const description = detailed ? notificationData.description : "";
    const duration = type === "loading" ? 0 : notificationData.duration;

    if (notificationCount <= 0) return;

    if (detailed) {
      notificationApi[type]({
        message: title,
        description: description,
        duration: duration,
      });
    } else {
      messageApi.open({
        type: type,
        content: title,
        duration: duration,
        key: type,
      });
    }
  }, [notificationCount]);

  useEffect(() => {
    if (!isLoading) {
      messageApi.destroy("loading");
    }
  }, [isLoading]);

  return (
    <>
      {contextHolderNotification}
      {contextHolderMessage}
    </>
  );
}

export default Notification;

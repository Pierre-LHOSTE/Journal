type BaseNotificationTypeType = "success" | "info" | "warning" | "error";
export type DetailedNotificationTypeType = BaseNotificationTypeType;
export type SimpleNotificationTypeType = BaseNotificationTypeType | "loading";

interface BaseNotificationType {
  title: string;
  duration?: number;
}

export interface DetailedNotificationType extends BaseNotificationType {
  description: string;
  detailed: true;
  type: DetailedNotificationTypeType;
}

export interface SimpleNotificationType extends BaseNotificationType {
  detailed?: false;
  type: SimpleNotificationTypeType;
}

export type NotificationType =
  | SimpleNotificationType
  | DetailedNotificationType;

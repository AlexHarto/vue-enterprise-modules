export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface Notification {
  id: string;
  title?: string;
  message?: string;
  type: NotificationType;
  icon?: boolean;
  customIcon?: string;
  closable?: boolean;
  closeAfterMs?: number;
  closeAfterMsTimeout?: NodeJS.Timeout;
}

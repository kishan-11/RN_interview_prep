export enum TOAST_TYPE {
  INFO = "info",
  SUCCESS = "success",
  FAILED = "failed",
  WARNING = "warning",
}

export enum TOAST_DURATION {
  SHORT = 800,
  MEDIUM = 1500,
  LONG = 2000,
}

export type ToastItem = {
  title: string;
  type?: TOAST_TYPE;
  duration?: TOAST_DURATION;
  id?: string;
};

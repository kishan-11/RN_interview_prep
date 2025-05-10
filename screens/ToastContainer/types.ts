export enum TOAST_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum TOAST_DURATION {
  SHORT = 2000,
  MEDIUM = 3000,
  LONG = 4000,
  EXTRA_LONG = 15000,
}

export type ToastItem = {
  id?: string;
  message: string;
  subText?: string;
  icon?: number;
  type?: TOAST_TYPE;
  duration?: TOAST_DURATION;
  containerStyle?: object;
  textStyle?: object;
  iconStyle?: object;
  subTextStyle?: object;
};

export enum PASSWORD_SETTING {
  LOWER_CASE = "lower_case",
  UPPER_CASE = "upper_case",
  SPECIAL_CHAR = "special_char",
  NUMBERS = "numbers",
}

export const PASSWORD_SETTING_CONFIG = [
  {
    id: PASSWORD_SETTING.LOWER_CASE,
    label: "Lower case",
    possibleChars: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    id: PASSWORD_SETTING.SPECIAL_CHAR,
    label: "Special characters",
    possibleChars: "!@#$%^&*()_+/:;",
  },
  {
    id: PASSWORD_SETTING.UPPER_CASE,
    label: "Upper case",
    possibleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    id: PASSWORD_SETTING.NUMBERS,
    label: "Numbers",
    possibleChars: "0123456789",
  },
];

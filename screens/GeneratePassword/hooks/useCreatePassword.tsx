import { useState } from "react";
import { PASSWORD_SETTING, PASSWORD_SETTING_CONFIG } from "../constants";

export const useCreatePassword = () => {
  const [length, setLength] = useState(4);
  const [checkBox, setCheckBox] = useState([PASSWORD_SETTING.LOWER_CASE]);
  const [password, setPassword] = useState("");

  const handleCheckBoxPress = (id: PASSWORD_SETTING) => () => {
    setCheckBox((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const generatePassword = () => {
    let chars = PASSWORD_SETTING_CONFIG.reduce(
      (acc, cur) => (checkBox.includes(cur.id) ? acc + cur.possibleChars : acc),
      ""
    );
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  return {
    length,
    setLength,
    checkBox,
    handleCheckBoxPress,
    generatePassword,
    password,
  };
};

import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import ToastContext from "../ToastContext";
import { TOAST_DURATION, TOAST_TYPE } from "../types";

const ChildComp = () => {
  const { addToast } = useContext(ToastContext);

  const addInfoToast = () => {
    addToast({
      message: "Info Toast title",
      subText: "This is info toast with short duration",
      type: TOAST_TYPE.INFO,
      duration: TOAST_DURATION.SHORT,
    });
  };

  const addWarningToast = () => {
    addToast({
      message: "Warning Toast title",
      subText: "This is warning toast with mid duration",
      type: TOAST_TYPE.WARNING,
      duration: TOAST_DURATION.MEDIUM,
    });
  };

  const addSpecialWarningToast = () => {
    addToast({
      message: "Warning Toast title",
      subText:
        "This is warning toast with mid duration, This is warning toast with mid duration, This is warning toast with mid durationThis is warning toast with mid duration",
      type: TOAST_TYPE.WARNING,
      duration: TOAST_DURATION.MEDIUM,
      textStyle: { color: "red" },
      iconStyle: { tintColor: "red" },
    });
  };

  const addErrorToast = () => {
    addToast({
      message: "Error Toast title",
      subText: "This is error toast with long duration",
      type: TOAST_TYPE.ERROR,
      duration: TOAST_DURATION.LONG,
    });
  };

  const addSuccessToast = () => {
    addToast({
      message: "Success Toast title",
      subText: "This is success toast",
      type: TOAST_TYPE.SUCCESS,
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={addInfoToast} title="Add info toast" />
      <Button onPress={addWarningToast} title="Add warning toast" />
      <Button onPress={addErrorToast} title="Add error toast" />
      <Button onPress={addSuccessToast} title="Add success toast" />
      <Button
        onPress={addSpecialWarningToast}
        title="Add Special warning toast"
      />
    </View>
  );
};

export default ChildComp;

const styles = StyleSheet.create({});

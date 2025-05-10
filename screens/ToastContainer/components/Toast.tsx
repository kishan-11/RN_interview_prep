import { ThemedText } from "@/components/ThemedText";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ToastContext from "../ToastContext";
import { TOAST_DURATION, TOAST_TYPE, ToastItem } from "../types";

const Toast = ({
  title,
  type = TOAST_TYPE.INFO,
  duration = TOAST_DURATION.MEDIUM,
  id = "",
}: ToastItem) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText>{title}</ThemedText>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    backgroundColor: "blue",
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

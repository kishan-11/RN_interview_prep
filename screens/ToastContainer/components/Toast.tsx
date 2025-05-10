import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ToastContext from "../ToastContext";
import { TOAST_DURATION, TOAST_TYPE, ToastItem } from "../types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 16,
    marginLeft: 8,
    marginBottom: 8,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
  },
  subText: {
    fontSize: 12,
    lineHeight: 16,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 16,
    tintColor: "white",
  },
  closeIcon: {
    height: 12,
    width: 12,
    marginLeft: 16,
    tintColor: "white",
  },
  infoContainer: {
    backgroundColor: "blue",
  },
  infoText: {
    color: "white",
  },
  successContainer: {
    backgroundColor: "green",
  },
  successText: {
    color: "white",
  },
  errorContainer: {
    backgroundColor: "red",
  },
  errorText: {
    color: "white",
  },
  warningContainer: {
    backgroundColor: "yellow",
  },
  warningText: {
    color: "grey",
  },
});

const TOAST_CONFIG = {
  [TOAST_TYPE.INFO]: {
    defaultIcon: require("@/assets/images/info.png"),
    defaultTextStyle: styles.infoText,
    defaultSubTextStyle: styles.infoText,
    defaultContainerStyle: styles.infoContainer,
  },
  [TOAST_TYPE.SUCCESS]: {
    defaultIcon: require("@/assets/images/check.png"),
    defaultTextStyle: styles.successText,
    defaultSubTextStyle: styles.successText,
    defaultContainerStyle: styles.successContainer,
  },
  [TOAST_TYPE.ERROR]: {
    defaultIcon: require("@/assets/images/warning.png"),
    defaultTextStyle: styles.errorText,
    defaultSubTextStyle: styles.errorText,
    defaultContainerStyle: styles.errorContainer,
  },
  [TOAST_TYPE.WARNING]: {
    defaultIcon: require("@/assets/images/alert.png"),
    defaultTextStyle: styles.warningText,
    defaultSubTextStyle: styles.warningText,
    defaultContainerStyle: styles.warningContainer,
  },
};

const Toast = ({
  message = "",
  subText,
  icon,
  id,
  type = TOAST_TYPE.INFO,
  duration = TOAST_DURATION.EXTRA_LONG,
  containerStyle,
  textStyle,
  iconStyle,
  subTextStyle,
}: ToastItem) => {
  const timerRef = useRef<number | null>(null);
  const { removeToast } = useContext(ToastContext);
  const {
    defaultContainerStyle,
    defaultTextStyle,
    defaultIcon,
    defaultSubTextStyle,
  } = TOAST_CONFIG[type];

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (id) {
        removeToast(id);
      }
    }, duration);
    return () => {
      if (typeof timerRef.current === "number") {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onRemovePress = useCallback(() => {
    if (typeof timerRef.current === "number") {
      clearTimeout(timerRef.current);
    }
    if (id) {
      removeToast(id);
    }
  }, []);

  return id && message ? (
    <View style={[styles.container, defaultContainerStyle, containerStyle]}>
      <Image style={[styles.icon, iconStyle]} source={icon ?? defaultIcon} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, defaultTextStyle, textStyle]}>
          {message}
        </Text>
        <Text style={[styles.subText, defaultSubTextStyle, subTextStyle]}>
          {subText}
        </Text>
      </View>
      <Pressable onPress={onRemovePress}>
        <Image
          resizeMode={"contain"}
          style={styles.closeIcon}
          source={require("@/assets/images/close.png")}
        />
      </Pressable>
    </View>
  ) : (
    <></>
  );
};

export default Toast;

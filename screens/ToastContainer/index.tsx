import React from "react";
import { StyleSheet, View } from "react-native";
import { ToastProvider } from "./ToastContext";
import ChildComp from "./components/ChildComp";

type Props = {};

const ToastContainerScreen = (props: Props) => {
  return (
    <ToastProvider>
      <View style={styles.f1}>
        <ChildComp />
      </View>
    </ToastProvider>
  );
};

export default ToastContainerScreen;

const styles = StyleSheet.create({
  f1: { flex: 1 },
});

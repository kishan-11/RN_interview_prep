import React from "react";
import { StyleSheet, View } from "react-native";
import { ToastItem } from "../types";
import Toast from "./Toast";

type Props = {
  data: ToastItem[];
};

const ToastContainer = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      {data.slice(0, 5).map((item) => (
        <Toast key={item.id} {...item} />
      ))}
    </View>
  );
};

export default ToastContainer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

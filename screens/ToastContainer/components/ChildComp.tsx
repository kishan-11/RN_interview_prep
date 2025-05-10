import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ToastContext from "../ToastContext";

const ChildComp = () => {
  const [text, setText] = useState<string>("");
  const { addToast } = useContext(ToastContext);

  const createToast = () => {
    addToast({
      title: text,
    });
  };

  return (
    <View>
      <ThemedInput
        value={text}
        onChangeText={setText}
        placeholder="Enter toast text"
      />
      <Pressable onPress={createToast}>
        <ThemedText>{"Create Info Toast"}</ThemedText>
      </Pressable>
    </View>
  );
};

export default ChildComp;

const styles = StyleSheet.create({});

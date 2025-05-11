import { ThemedText } from "@/components/ThemedText";
import Slider from "@react-native-community/slider";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PASSWORD_SETTING_CONFIG } from "../constants";
import { useCreatePassword } from "../hooks/useCreatePassword";

type Props = {};

const GenerateView = (props: Props) => {
  const {
    length,
    password,
    checkBox,
    setLength,
    handleCheckBoxPress,
    generatePassword,
  } = useCreatePassword();
  return (
    <View style={styles.container}>
      <View style={styles.rowCenter}>
        <ThemedText type="defaultSemiBold">{"Password length"}</ThemedText>
        <ThemedText>{length}</ThemedText>
      </View>
      <Slider
        style={styles.slider}
        value={length}
        onValueChange={setLength}
        minimumValue={2}
        maximumValue={20}
        step={1}
        minimumTrackTintColor="#3c7efa"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#3c7efa"
      />
      <View style={styles.settingContainer}>
        <ThemedText type="defaultSemiBold">{"Password settings"}</ThemedText>
        <View style={styles.checkboxContainer}>
          {PASSWORD_SETTING_CONFIG.map((item) => {
            const isSelected = checkBox.includes(item.id);
            return (
              <Pressable
                onPress={handleCheckBoxPress(item.id)}
                style={styles.checkbox}
                key={item.id}
              >
                <View style={styles.box}>
                  {isSelected && <View style={styles.selectedBox} />}
                </View>
                <ThemedText>{item.label}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>
      <Pressable
        onPress={generatePassword}
        disabled={checkBox.length === 0}
        style={[styles.cta, checkBox.length === 0 && styles.disabledCta]}
      >
        <ThemedText>{"Generate Password"}</ThemedText>
      </Pressable>
      {!!password && (
        <Pressable style={styles.password}>
          <ThemedText>{password}</ThemedText>
        </Pressable>
      )}
    </View>
  );
};

export default GenerateView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  slider: {
    marginHorizontal: 4,
    height: 40,
  },
  settingContainer: {
    marginHorizontal: 16,
  },
  checkboxContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  checkbox: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  box: {
    height: 20,
    width: 20,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF",
  },
  selectedBox: {
    height: 10,
    width: 10,
    borderRadius: 2,
    backgroundColor: "#3c7efa",
  },
  cta: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#3c7efa",
    margin: 16,
  },
  disabledCta: {
    backgroundColor: "#a7aab0",
  },
  password: {
    height: 40,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

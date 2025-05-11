import React from "react";
import { StyleSheet, View } from "react-native";
import GenerateView from "./components/GenerateView";

type Props = {};

const GeneratePasswordScreen = (props: Props) => {
  return (
    <View>
      <GenerateView />
    </View>
  );
};

export default GeneratePasswordScreen;

const styles = StyleSheet.create({});

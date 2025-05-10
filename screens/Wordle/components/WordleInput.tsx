import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  currentWord: string;
  setCurrentWord: (text: string) => void;
  submitGuess: () => void;
};

const WordleInput = ({ currentWord, setCurrentWord, submitGuess }: Props) => {
  const [errorText, setErrorText] = useState<string>("");

  const onSubmit = () => {
    if (/^[A-Z]{5}$/.test(currentWord)) {
      submitGuess();
    } else {
      setErrorText("Only 5 letter words allowed");
    }
  };

  const onTextChange = (text: string) => {
    setErrorText(/^[A-Z]+$/.test(text) ? "" : "Only alphabets allowed");
    setCurrentWord(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedInput
          placeholder="Enter your guess"
          value={currentWord}
          onChangeText={onTextChange}
          maxLength={5}
          style={styles.input}
          autoCapitalize={"characters"}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <ThemedText>{"Submit"}</ThemedText>
        </Pressable>
      </View>
      <ThemedText style={styles.errorText}>{errorText}</ThemedText>
    </View>
  );
};

export default WordleInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#a8a7a2",
    borderRadius: 8,
  },
  container: {
    margin: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 96,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "blue",
    marginLeft: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

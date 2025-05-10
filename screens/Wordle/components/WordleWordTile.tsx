import { ThemedText } from "@/components/ThemedText";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  word: string;
  char?: string;
  isSubmitted: boolean;
  index: number;
};

const WordleWordTile = ({ word, char = "", isSubmitted, index }: Props) => {
  const additionalStyle = useMemo(() => {
    if (!char || !isSubmitted) return {};
    if (word[index] === char) return styles.correctTile;
    return word.includes(char) ? styles.wrongPositionTile : styles.wrongTile;
  }, [char, word, isSubmitted, index]);
  return (
    <View style={[styles.container, additionalStyle]}>
      <ThemedText type="subtitle">{char}</ThemedText>
    </View>
  );
};

export default React.memo(WordleWordTile);

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderWidth: 1,
    borderColor: "#a8a7a2",
    borderRadius: 4,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  wrongTile: {
    borderColor: "#82817c",
    backgroundColor: "#82817c",
  },
  wrongPositionTile: {
    borderColor: "#8c7711",
    backgroundColor: "#8c7711",
  },
  correctTile: {
    borderColor: "#4c8c11",
    backgroundColor: "#4c8c11",
  },
});

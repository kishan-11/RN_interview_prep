import React from "react";
import { StyleSheet, View } from "react-native";
import WordleRow from "./WordleRow";

type Props = {
  currentWord: string;
  guesses: string[];
  word: string;
};

const gameArr = new Array(6).fill(" ");

const WordleDisplay = ({ currentWord, guesses, word }: Props) => {
  const renderRow = (_: " ", index: number) => {
    let displayWord =
      index < guesses.length
        ? guesses[index]
        : index === guesses.length
        ? currentWord
        : "";

    return (
      <WordleRow
        isSubmitted={index < guesses.length}
        key={index.toString()}
        word={word}
        displayWord={displayWord}
      />
    );
  };

  return <View style={styles.container}>{gameArr.map(renderRow)}</View>;
};

export default React.memo(WordleDisplay);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
});

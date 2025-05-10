import React from "react";
import { StyleSheet, View } from "react-native";
import WordleWordTile from "./WordleWordTile";

type Props = {
  word: string;
  displayWord?: string;
  isSubmitted: boolean;
};

const rowArr = new Array(5).fill("");

const WordleRow = ({ word, displayWord = "", isSubmitted }: Props) => {
  const renderTile = (_: "", index: number) => {
    return (
      <WordleWordTile
        key={`${index}`}
        index={index}
        isSubmitted={isSubmitted}
        word={word}
        char={displayWord[index]}
      />
    );
  };
  return <View style={styles.container}>{rowArr.map(renderTile)}</View>;
};

export default React.memo(WordleRow);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

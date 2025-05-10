import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import GameStatusView from "./components/GameStatusView";
import WordleDisplay from "./components/WordleDisplay";
import WordleInput from "./components/WordleInput";
import { useWordleGame } from "./hooks/useWordleGame";
import { useWordleWord } from "./hooks/useWordleWord";
import { GAME_STATUS } from "./types";

type Props = {};

const WordleScreen = (props: Props) => {
  const { word, isLoading, getWord } = useWordleWord();
  const {
    currentWord,
    gameStatus,
    guesses,
    onRestartGame,
    setCurrentWord,
    submitGuess,
  } = useWordleGame(word, getWord);

  return isLoading ? (
    <ActivityIndicator style={styles.conatiner} size={"large"} />
  ) : (
    <View style={styles.conatiner}>
      <WordleDisplay currentWord={currentWord} guesses={guesses} word={word} />
      {gameStatus === GAME_STATUS.ONGOING ? (
        <WordleInput
          submitGuess={submitGuess}
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
        />
      ) : (
        <GameStatusView gameStatus={gameStatus} onRestartGame={onRestartGame} />
      )}
    </View>
  );
};

export default WordleScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

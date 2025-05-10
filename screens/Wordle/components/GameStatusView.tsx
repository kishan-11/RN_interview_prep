import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { GAME_STATUS } from "../types";

type Props = {
  gameStatus: GAME_STATUS;
  onRestartGame: () => void;
};

const GameStatusView = ({ gameStatus, onRestartGame }: Props) => {
  return (
    <View>
      <ThemedText style={styles.text}>
        {gameStatus === GAME_STATUS.LOST
          ? "OOPS you lost, you exhausted all guesses.\nRestart the game and try again"
          : "Congratulation, you won the game\n To play again restat the game"}
      </ThemedText>
      <Pressable onPress={onRestartGame} style={styles.button}>
        <ThemedText>{"Restart"}</ThemedText>
      </Pressable>
    </View>
  );
};

export default GameStatusView;

const styles = StyleSheet.create({
  button: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "blue",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    textAlign: "center",
    margin: 16,
  },
});

import { useState } from "react";
import { GAME_STATUS } from "../types";

export const useWordleGame = (word: string, getWord: () => void) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>(
    GAME_STATUS.ONGOING
  );

  const submitGuess = () => {
    if (currentWord === word) {
      setGameStatus(GAME_STATUS.WON);
    } else if (guesses.length === 5) {
      setGameStatus(GAME_STATUS.LOST);
    }
    setCurrentWord("");
    setGuesses((prev) => [...prev, currentWord]);
  };

  const onRestartGame = () => {
    getWord();
    setGuesses([]);
    setCurrentWord("");
    setGameStatus(GAME_STATUS.ONGOING);
  };

  return {
    gameStatus,
    guesses,
    currentWord,
    setCurrentWord,
    submitGuess,
    onRestartGame,
  };
};

import { useCallback, useEffect, useRef, useState } from "react";

const FallbackWords = [
  "ALBUM",
  "HINGE",
  "MONEY",
  "SCRAP",
  "GAMER",
  "GLASS",
  "SCOUR",
  "BEING",
  "DELVE",
  "YIELD",
  "METAL",
  "TIPSY",
  "SLUNG",
  "FARCE",
  "GECKO",
  "SHINE",
];
export const useWordleWord = () => {
  const wordsList = useRef<string[]>([]);
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWord();
  }, []);

  const getWord = useCallback(async () => {
    if (wordsList.current?.length > 0) {
      setWord(
        wordsList.current[Math.floor(Math.random() * wordsList.current.length)]
      );
    } else {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://api.frontendexpert.io/api/fe/wordle-words"
        );
        const response = await res.json();
        wordsList.current = response ?? FallbackWords;
      } catch (err) {
        wordsList.current = FallbackWords;
      } finally {
        setIsLoading(false);
        setWord(
          wordsList.current[
            Math.floor(Math.random() * wordsList.current.length)
          ]
        );
      }
    }
  }, []);

  console.log(word);

  return { word, isLoading, getWord };
};

import { useCallback, useEffect, useState } from "react";

const FallbackWords = [
  "expel",
  "scuzz",
  "pages",
  "jukus",
  "talon",
  "saran",
  "paste",
  "lamer",
  "widow",
  "surgy",
];
export const useWordleWord = () => {
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWord();
  }, []);

  const getWord = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5"
      );
      const response = await res.json();
      if (response?.[0]) {
        setWord(response[0].toUpperCase());
      } else {
        setWord(FallbackWords[Math.floor(Math.random() * 10)].toUpperCase());
      }
    } catch (err) {
      setWord(FallbackWords[Math.floor(Math.random() * 10)].toUpperCase());
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("word =>", word);

  return { word, isLoading, getWord };
};

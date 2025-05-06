import { ThemedText } from "@/components/ThemedText";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {};

const StopWatchSreen = (props: Props) => {
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const intervalId = useRef<number | null>(null);
  const timerStartTime = useRef(0);
  const timerPauseTime = useRef(0);

  const text = useMemo(() => {
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    let ss = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    let mm = Math.floor((time / (60 * 1000)) % 60)
      .toString()
      .padStart(2, "0");
    let hh = Math.floor(time / (60 * 60 * 1000))
      .toString()
      .padStart(2, "0");
    return `${hh} : ${mm} : ${ss} : ${ms}`;
  }, [time]);

  const startTimerInterval = () => {
    const interId = setInterval(() => {
      setTime(Date.now() - timerStartTime.current);
    }, 10);
    intervalId.current = interId;
  };

  const clearTimerInterval = () => {
    if (typeof intervalId.current === "number") {
      clearInterval(intervalId.current);
    }
  };

  const onStart = () => {
    timerStartTime.current = Date.now();
    setTimerStarted(true);
    startTimerInterval();
  };

  const onReset = () => {
    clearTimerInterval();
    timerStartTime.current = 0;
    setTime(0);
    setTimerPaused(false);
    setTimerStarted(false);
  };

  const onResume = () => {
    timerStartTime.current += Date.now() - timerPauseTime.current;
    startTimerInterval();
    timerPauseTime.current = 0;
    setTimerPaused(false);
  };

  const onPause = () => {
    timerPauseTime.current = Date.now();
    setTimerPaused(true);
    clearTimerInterval();
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <ThemedText style={{ textAlign: "center" }}>{text}</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        {timerStarted ? (
          <>
            {timerPaused ? (
              <Pressable
                onPress={onResume}
                style={[styles.button, { backgroundColor: "#FFC300" }]}
              >
                <ThemedText>{"Resume"}</ThemedText>
              </Pressable>
            ) : (
              <Pressable
                onPress={onPause}
                style={[styles.button, { backgroundColor: "#FFC300" }]}
              >
                <ThemedText>{"Pause"}</ThemedText>
              </Pressable>
            )}
            <Pressable
              onPress={onReset}
              style={[styles.button, { backgroundColor: "#C70039" }]}
            >
              <ThemedText>{"Reset"}</ThemedText>
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={onStart}
            style={[styles.button, { backgroundColor: "#2AAA8A" }]}
          >
            <ThemedText>{"Start"}</ThemedText>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default StopWatchSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 128,
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  button: {
    width: 128,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 8,
  },
});

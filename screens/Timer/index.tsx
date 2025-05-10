import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

type Props = {};

const TimerScreen = (props: Props) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [hour, setHour] = useState(0);
  const [minuit, setMinuit] = useState(0);
  const [second, setSecond] = useState(0);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    let intervalId = null;
    if (timerStarted && !timerPaused) {
      intervalId = setInterval(() => {
        startTimer();
      }, 1000);
    }
    intervalIdRef.current = intervalId;
    return () => {
      if (typeof intervalId === "number") {
        intervalIdRef.current = null;
        clearInterval(intervalId);
      }
    };
  }, [timerPaused, timerStarted]);

  useEffect(() => {
    if (hour > 23) {
      setHour(23);
    }
  }, [hour]);

  useEffect(() => {
    if (minuit > 59) {
      setMinuit((prev) => prev - 60);
      setHour((prev) => prev + 1);
    }
  }, [minuit]);

  useEffect(() => {
    if (second > 59) {
      setSecond((prev) => prev - 60);
      setMinuit((prev) => prev + 1);
    }
  }, [second]);

  const startTimer = () => {
    if (second > 0) {
      setSecond((prev) => prev - 1);
    } else if (minuit > 0) {
      setSecond(59);
      setMinuit((prev) => prev - 1);
    } else if (hour > 0) {
      setSecond(59);
      setMinuit(59);
      setHour((prev) => prev - 1);
    } else {
      Alert.alert("Timer completed");
      onReset();
    }
  };

  const onStart = () => {
    if (hour > 0 || minuit > 0 || second > 0) {
      setTimerStarted(true);
    }
  };

  const onResume = () => {
    setTimerPaused(false);
  };

  const onPause = () => {
    setTimerPaused(true);
  };

  const onReset = () => {
    if (typeof intervalIdRef.current === "number")
      clearInterval(intervalIdRef.current);
    setHour(0);
    setMinuit(0);
    setSecond(0);
    setTimerStarted(false);
    setTimerPaused(false);
  };

  const onHourChange = useCallback((text: string) => {
    setHour(parseInt(text, 10) || 0);
  }, []);

  const onMinuitChange = useCallback((text: string) => {
    setMinuit(parseInt(text, 10) || 0);
  }, []);

  const onSecondChange = useCallback((text: string) => {
    setSecond(parseInt(text, 10) || 0);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.timerItem}>
          {timerStarted ? (
            <ThemedText>{hour < 9 ? `0${hour}` : hour}</ThemedText>
          ) : (
            <ThemedInput
              textAlign="center"
              inputMode="numeric"
              maxLength={2}
              value={hour ? hour.toString() : ""}
              placeholder="HH"
              onChangeText={onHourChange}
            />
          )}
        </View>
        <ThemedText>:</ThemedText>
        <View style={styles.timerItem}>
          {timerStarted ? (
            <ThemedText>{minuit < 9 ? `0${minuit}` : minuit}</ThemedText>
          ) : (
            <ThemedInput
              textAlign="center"
              inputMode="numeric"
              maxLength={2}
              value={minuit ? minuit.toString() : ""}
              placeholder="MM"
              onChangeText={onMinuitChange}
            />
          )}
        </View>
        <ThemedText>:</ThemedText>
        <View style={styles.timerItem}>
          {timerStarted ? (
            <ThemedText>{second < 9 ? `0${second}` : second}</ThemedText>
          ) : (
            <ThemedInput
              textAlign="center"
              inputMode="numeric"
              maxLength={2}
              placeholder="SS"
              value={second ? second.toString() : ""}
              onChangeText={onSecondChange}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {timerStarted ? (
          timerPaused ? (
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
          )
        ) : (
          <Pressable
            onPress={onStart}
            style={[styles.button, { backgroundColor: "#2AAA8A" }]}
          >
            <ThemedText>{"Start"}</ThemedText>
          </Pressable>
        )}
        <Pressable
          onPress={onReset}
          style={[styles.button, { backgroundColor: "#C70039" }]}
        >
          <ThemedText>{"Reset"}</ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 128,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  timerItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 36,
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

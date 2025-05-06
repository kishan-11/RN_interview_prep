import { ThemedText } from "@/components/ThemedText";
import { PathName, PROJECT_LIST, ProjectType } from "@/constants/Projects";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

type Props = object;

const HomeScreen = (props: Props) => {
  const onPress = (route: PathName) => () => {
    router.push(route);
  };

  const renderItem = useCallback(({ item }: { item: ProjectType }) => {
    return (
      <Pressable onPress={onPress(item.route)} style={styles.item}>
        <ThemedText>{item.name}</ThemedText>
      </Pressable>
    );
  }, []);

  return <FlatList data={PROJECT_LIST} renderItem={renderItem} />;
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "blue",
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

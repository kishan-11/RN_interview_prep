import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import React, { useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { CLOSE_FOLDER, FILE, OPEN_FOLDER } from "../constant";
import { FolderNode } from "../types";

type Props = {
  data: FolderNode;
  onAdd: (id: string, data: FolderNode) => void;
  onRemove: (id: string) => void;
  isRoot?: boolean;
};

const FolderAccordianView = ({
  data,
  onAdd,
  onRemove,
  isRoot = false,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [fileName, setFileName] = useState("");
  const [addNew, setAddNew] = useState<string | null>(null);

  const FOLDER = isExpanded ? OPEN_FOLDER : CLOSE_FOLDER;

  const handleAccordianPress = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleAddFile = useCallback(() => {
    setAddNew("file");
    setIsExpanded(true);
    setFileName("");
  }, []);

  const handleAddFolder = useCallback(() => {
    setAddNew("folder");
    setIsExpanded(true);
    setFileName("");
  }, []);

  const handleAdd = useCallback(() => {
    if (fileName === "") {
      setAddNew(null);
      setFileName("");
    } else {
      onAdd(data?.id, {
        name: fileName,
        id: Date.now().toString(),
        isFolder: addNew === "folder",
        subItems: [],
      });
      setAddNew(null);
      setFileName("");
    }
  }, [fileName, addNew, onAdd, data?.id]);

  const handleRemove = useCallback(() => {
    onRemove(data?.id);
  }, [data?.id, onRemove]);

  return (
    <View style={styles.ml8}>
      {data?.isFolder ? (
        <>
          <Pressable
            onPress={handleAccordianPress}
            style={styles.accordianTopView}
          >
            <ThemedText style={styles.f1}>
              {`${FOLDER} ${data?.name}`}
            </ThemedText>
            <Pressable onPress={handleAddFile}>
              <Image
                source={require("@/assets/images/addFile.png")}
                style={styles.addFile}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={handleAddFolder}>
              <Image
                source={require("@/assets/images/addFolder.png")}
                style={styles.addFolder}
                resizeMode="contain"
              />
            </Pressable>
            {!isRoot && (
              <Pressable onPress={handleRemove}>
                <Image
                  source={require("@/assets/images/remove.png")}
                  style={styles.remove}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          </Pressable>
          {addNew && (
            <View style={[styles.accordianTopView, styles.ml8]}>
              <ThemedText>{`${addNew === "file" ? FILE : FOLDER} `}</ThemedText>
              <ThemedInput
                autoFocus
                placeholder="File name"
                value={fileName}
                onChangeText={setFileName}
                onBlur={handleAdd}
              />
            </View>
          )}
          {isExpanded &&
            data?.subItems?.map((item: any) => {
              return (
                <FolderAccordianView
                  onAdd={onAdd}
                  onRemove={onRemove}
                  data={item}
                  key={item?.id}
                />
              );
            })}
        </>
      ) : (
        <View style={styles.accordianTopView}>
          <ThemedText style={styles.f1}>{`${FILE} ${data?.name}`}</ThemedText>
          <Pressable onPress={handleRemove}>
            <Image
              source={require("@/assets/images/remove.png")}
              style={styles.remove}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default FolderAccordianView;

const styles = StyleSheet.create({
  f1: { flex: 1 },
  accordianTopView: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
  },
  ml8: { marginLeft: 8 },
  addFolder: {
    margin: 6,
    height: 24,
    width: 24,
    tintColor: "white",
  },
  addFile: {
    margin: 6,
    height: 20,
    width: 20,
    tintColor: "white",
  },
  remove: {
    margin: 6,
    height: 20,
    width: 20,
    tintColor: "white",
  },
});

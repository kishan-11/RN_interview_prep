import React, { useCallback, useState } from "react";
import { View } from "react-native";
import FolderAccordianView from "./component/FolderAccordianView";
import { FolderNode } from "./types";

const init = {
  name: "root",
  id: "1",
  isFolder: true,
  subItems: [],
};

const FolderStructureScreen = () => {
  const [data, setData] = useState<FolderNode>(init);
  const handleAdd = useCallback((id: string, data: FolderNode) => {
    const addNode = (prev: FolderNode): FolderNode => {
      if (prev?.id === id) {
        const subItems = [...prev?.subItems, data];
        return {
          ...prev,
          subItems: subItems?.sort((a, b) => +b.isFolder - +a.isFolder),
        };
      } else {
        return {
          ...prev,
          subItems: prev?.subItems?.map((item) =>
            item?.isFolder ? addNode(item) : item
          ),
        };
      }
    };
    setData((prev) => addNode(prev));
  }, []);

  const handleRemove = useCallback((id: string) => {
    const removeNode = (prev: FolderNode): FolderNode => {
      const isChild = prev?.subItems?.findIndex((item) => item.id === id) >= 0;
      if (isChild) {
        return {
          ...prev,
          subItems: prev?.subItems?.filter((item) => item.id !== id),
        };
      } else {
        return {
          ...prev,
          subItems: prev?.subItems?.map((item) =>
            item?.isFolder ? removeNode(item) : item
          ),
        };
      }
    };
    setData((prev) => removeNode(prev));
  }, []);

  return (
    <View>
      <FolderAccordianView
        data={data}
        onAdd={handleAdd}
        onRemove={handleRemove}
        isRoot
      />
    </View>
  );
};

export default FolderStructureScreen;

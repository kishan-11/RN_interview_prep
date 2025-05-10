export type FolderNode = {
  name: string;
  id: string;
  isFolder: boolean;
  subItems: FolderNode[];
};

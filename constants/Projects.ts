export type PathName =
  | "/"
  | "/timer"
  | "/stopwatch"
  | "/wordle"
  | "/folderStructure"
  | "/toastContainer";

export type ProjectType = { name: string; route: PathName };

export const PROJECT_LIST: ProjectType[] = [
  {
    name: "Timer",
    route: "/timer",
  },
  {
    name: "Stopwatch",
    route: "/stopwatch",
  },
  {
    name: "Folder Structure",
    route: "/folderStructure",
  },
  {
    name: "Toast Container",
    route: "/toastContainer",
  },
  {
    name: "Wordle",
    route: "/wordle",
  },
];

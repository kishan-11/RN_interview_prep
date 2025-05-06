export type PathName = "/" | "/timer" | "/stopwatch";

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
];

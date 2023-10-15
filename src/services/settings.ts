import type { Language } from "./language";
import type { Theme } from "./theme";

//* ------ TYPES ------ *//
export const DefaultSettings = {
  readOnlyMessage: "This editor is read-only!",
  tabSize: 2,
  wordWrap: "on",
};

export type Settings = {
  height: number;
  width: number;
  theme: Theme;
  initialValue: string;
  language: Language;

  // Editor
  tabSize: 2 | 4 | 6 | 8;
  isEnableWordWrap: boolean;
  isShowMinimap: boolean;
  isReadOnly: boolean;
  readOnlyMessage?: string;
};

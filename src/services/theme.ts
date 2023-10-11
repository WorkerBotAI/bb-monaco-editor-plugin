//* ------ TYPES ------ *//
export type Theme = "Light" | "Dark"
export type VSCodeTheme = "vs" | "vs-dark"

//* ------ FUNCTIONS ------ *//
export function getThemeForMonaco(theme: Theme): VSCodeTheme {
  switch (theme) {
    default:
      return "vs-dark";
    case "Light":
      return "vs";
    case "Dark":
      return "vs-dark";
  }
}

import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { fontSizes } from "./typography";
import { Theme } from "../types";

export const darkTheme: Theme = {
  mode: "dark",
  colors: colors.dark,
  spacing,
  radius,
  fontSizes,
  fontLevel: 16,
};

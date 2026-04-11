import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { fontSizes, iconSizes, sizeMap, dimensions } from "./typography";
import { Theme } from "../types";

export const darkTheme: Theme = {
  mode: "dark",
  colors: colors.dark,
  spacing,
  radius,
  fontSizes,
  iconSizes,
  sizeMap,
  dimensions,
  fontLevel: 16,
};

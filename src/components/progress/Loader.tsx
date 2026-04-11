import React from "react";
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Caption from "../typography/Caption";
import Spacer from "../layout/Spacer";
import { Size } from "../../types";

type Props = {
  label?: string;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const INDICATOR_SIZE: Record<Size, "small" | "large"> = {
  sm: "small",
  md: "small",
  lg: "large",
};

export default function Loader({ label, size = "md", style, testID }: Props) {
  const { theme } = useTheme();
  const colors = theme.colors;
  return (
    <View testID={testID} style={[styles.container, style]}>
      <ActivityIndicator size={INDICATOR_SIZE[size]} color={colors.primary} />
      {label ? (
        <>
          <Spacer size="sm" />
          <Caption>{label}</Caption>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
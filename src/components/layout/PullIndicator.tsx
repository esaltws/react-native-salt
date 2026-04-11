import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function PullIndicator({
  width,
  height = 5,
  color,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, sizeMap } = theme;

  return (
    <View testID={testID} style={[styles.container, { paddingVertical: spacing.sm }, style]}>
      <View
        style={{
          width: width ?? sizeMap.sm,
          height,
          borderRadius: height / 2,
          backgroundColor: color || colors.border,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

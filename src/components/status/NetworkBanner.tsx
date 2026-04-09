import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { resolveIntentColor } from "../../theme/intent";
import { Intent } from "../../types";
import Label from "../typography/Label";

type Props = {
  visible: boolean;
  message?: string;
  intent?: Intent;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function NetworkBanner({
  visible,
  message = "No internet connection",
  intent = "warning",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  if (!visible) return null;

  const color = resolveIntentColor(colors, intent);

  return (
    <View
      testID={testID}
      style={[
        {
          backgroundColor: color + "26",
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radius.md,
          alignItems: "center",
        },
        style,
      ]}
    >
      <Label style={{ color }}>
        {message}
      </Label>
    </View>
  );
}

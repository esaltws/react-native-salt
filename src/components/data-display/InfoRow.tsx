import React, { ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Caption from "../typography/Caption";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  left?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function InfoRow({ title, value, subtitle, left, style, testID }: Props) {
  const { theme } = useTheme();
  const { spacing } = theme;

  return (
    <View testID={testID} style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, style]}>
      {left ? <View style={{ marginRight: spacing.sm }}>{left}</View> : null}
      <View style={{ flex: 1 }}>
        <Caption>{title}</Caption>
        {subtitle ? (
          <Caption fontSize="sm" style={{ marginTop: 2 }}>
            {subtitle}
          </Caption>
        ) : null}
      </View>
      <Label>{value}</Label>
    </View>
  );
}

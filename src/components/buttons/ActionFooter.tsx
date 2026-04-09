import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ActionFooter({ children, style, testID }: Props) {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
});

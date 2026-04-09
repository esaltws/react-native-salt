import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type Props = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function AuthDivider({
  text = "or continue with",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes } = theme;

  return (
    <View testID={testID} style={[styles.container, { marginVertical: spacing.lg }, style]}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <Text
        style={{
          color: colors.muted,
          fontSize: fontSizes.xs,
          marginHorizontal: spacing.md,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
  },
});

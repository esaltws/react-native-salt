import React, { ReactNode } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Stack from "../layout/Stack";

type Props = {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ListItem({
  title,
  subtitle,
  left,
  right,
  onPress,
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;
  const isPressable = !!onPress && !disabled;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={!isPressable}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityState={{ disabled }}
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {left ? <View style={[styles.left, { marginRight: spacing.md }]}>{left}</View> : null}

      <View style={styles.center}>
        <Stack gap="xs">
          <Title fontSize="sm">{title}</Title>
          {subtitle ? (
            <Caption>{subtitle}</Caption>
          ) : null}
        </Stack>
      </View>

      {right ? <View style={[styles.right, { marginLeft: spacing.md }]}>{right}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {},
  center: { flex: 1 },
  right: {},
});
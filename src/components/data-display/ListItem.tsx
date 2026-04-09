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
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {left ? <View style={styles.left}>{left}</View> : null}

      <View style={styles.center}>
        <Stack gap="xs">
          <Title fontSize="sm">{title}</Title>
          {subtitle ? (
            <Caption>{subtitle}</Caption>
          ) : null}
        </Stack>
      </View>

      {right ? <View style={styles.right}>{right}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  left: { marginRight: 12 },
  center: { flex: 1 },
  right: { marginLeft: 12 },
});
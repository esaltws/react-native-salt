import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  color: string;
  onPress?: () => void;
  label?: string;
  showHex?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SIZE_MAP = {
  sm: { swatch: 24, font: 11 },
  md: { swatch: 32, font: 12 },
  lg: { swatch: 40, font: 14 },
};

export default function ColorPickerTrigger({
  color,
  onPress,
  label,
  showHex = false,
  size = "md",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const sizeConfig = SIZE_MAP[size];

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: spacing.sm,
          opacity: disabled ? 0.5 : 1,
          gap: spacing.sm,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label || "Open color picker"}
      accessibilityState={{ disabled }}
    >
      <View
        style={[
          styles.swatch,
          {
            width: sizeConfig.swatch,
            height: sizeConfig.swatch,
            borderRadius: radius.sm,
            backgroundColor: color,
            borderWidth: 1,
            borderColor: colors.border,
          },
        ]}
      />

      <View style={styles.info}>
        {label && (
          <Text
            style={{
              fontSize: sizeConfig.font,
              fontWeight: "600",
              color: colors.text,
            }}
          >
            {label}
          </Text>
        )}
        {showHex && (
          <Text
            style={{
              fontSize: fontSizes.xs,
              color: colors.muted,
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {color}
          </Text>
        )}
      </View>

      <Icon
        name="chevron-down-outline"
        size={14}
        color={colors.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  swatch: {},
  info: {
    flex: 1,
  },
});

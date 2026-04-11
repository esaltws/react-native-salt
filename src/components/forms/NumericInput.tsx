import React from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Size, FontSize, IconSize, SizeMap } from "../../types";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: Size;
  fullWidth?: boolean;
  prefix?: string;
  suffix?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const COMPACT_MAP: Record<Size, { font: FontSize; icon: IconSize; btn: SizeMap }> = {
  sm: { font: "xs", icon: "xs", btn: "xs" },
  md: { font: "sm", icon: "sm", btn: "sm" },
  lg: { font: "md", icon: "md", btn: "md" },
};

export default function NumericInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  error,
  disabled = false,
  size = "md",
  fullWidth = true,
  prefix,
  suffix,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, sizeMap } = theme;
  const s = COMPACT_MAP[size];

  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const decrement = () => {
    if (canDecrement && !disabled) {
      onChange(Math.max(min, value - step));
    }
  };

  const increment = () => {
    if (canIncrement && !disabled) {
      onChange(Math.min(max, value + step));
    }
  };

  const handleTextChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.\-]/g, "");
    const num = parseFloat(cleaned);
    if (!isNaN(num)) {
      onChange(Math.max(min, Math.min(max, num)));
    } else if (cleaned === "" || cleaned === "-") {
      onChange(min > 0 ? min : 0);
    }
  };

  return (
    <View testID={testID} style={[fullWidth && { width: "100%" }, style]}>
      {label && (
        <Text
          style={{
            marginBottom: spacing.sm,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            height: sizeMap[size],
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Decrement */}
        <Pressable
          onPress={decrement}
          disabled={!canDecrement || disabled}
          accessibilityRole="button"
          accessibilityLabel="Decrease value"
          accessibilityState={{ disabled: !canDecrement || disabled }}
          style={[
            styles.btn,
            {
              width: sizeMap[s.btn],
              borderRightWidth: 1,
              borderRightColor: colors.border,
              opacity: canDecrement ? 1 : 0.3,
            },
          ]}
        >
          <Icon name="remove-outline" size={iconSizes[s.icon]} color={colors.text} />
        </Pressable>

        {/* Value */}
        <View style={styles.valueContainer}>
          {prefix && (
            <Text
              style={{
                fontSize: fontSizes[s.font],
                color: colors.muted,
                marginRight: spacing.xs,
              }}
            >
              {prefix}
            </Text>
          )}
          <TextInput
            value={String(value)}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            editable={!disabled}
            accessibilityLabel={label || "Numeric value"}
            accessibilityState={{ disabled }}
            style={[
              styles.input,
              {
                fontSize: fontSizes[s.font],
                color: colors.text,
                fontWeight: "600",
                fontVariant: ["tabular-nums"],
              },
            ]}
            selectTextOnFocus
          />
          {suffix && (
            <Text
              style={{
                fontSize: fontSizes[s.font],
                color: colors.muted,
                marginLeft: spacing.xs,
              }}
            >
              {suffix}
            </Text>
          )}
        </View>

        {/* Increment */}
        <Pressable
          onPress={increment}
          disabled={!canIncrement || disabled}
          accessibilityRole="button"
          accessibilityLabel="Increase value"
          accessibilityState={{ disabled: !canIncrement || disabled }}
          style={[
            styles.btn,
            {
              width: sizeMap[s.btn],
              borderLeftWidth: 1,
              borderLeftColor: colors.border,
              opacity: canIncrement ? 1 : 0.3,
            },
          ]}
        >
          <Icon name="add-outline" size={iconSizes[s.icon]} color={colors.text} />
        </Pressable>
      </View>

      {error && (
        <Text
          style={{
            marginTop: spacing.xs,
            color: colors.danger,
            fontSize: fontSizes.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  valueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    minWidth: 40,
    padding: 0,
  },
});

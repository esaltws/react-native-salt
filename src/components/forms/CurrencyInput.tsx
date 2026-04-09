import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Size, SizeToken } from "../../types";

type CurrencySymbol = "$" | "€" | "£" | "¥" | "₹" | "₩" | "R$" | string;

type Props = {
  value: number;
  onChange: (value: number) => void;
  currency?: CurrencySymbol;
  decimals?: number;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: Size;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function CurrencyInput({
  value,
  onChange,
  currency = "$",
  decimals = 2,
  label,
  error,
  placeholder = "0.00",
  disabled = false,
  required = false,
  size = "md",
  fullWidth = true,
  min,
  max,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const sizeStyles: Record<SizeToken, ViewStyle> = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  };

  const inputSize =
    typeof size === "number"
      ? { paddingVertical: size, paddingHorizontal: size }
      : sizeStyles[size] ?? sizeStyles.md;

  const [displayValue, setDisplayValue] = useState(
    value > 0 ? value.toFixed(decimals) : ""
  );

  const formatNumber = (num: number): string => {
    const parts = num.toFixed(decimals).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleChangeText = (text: string) => {
    // Remove currency symbol and commas
    const cleaned = text.replace(/[^0-9.]/g, "");

    // Prevent multiple dots
    const parts = cleaned.split(".");
    const sanitized =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : cleaned;

    setDisplayValue(sanitized);

    const num = parseFloat(sanitized);
    if (!isNaN(num)) {
      let clamped = num;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      onChange(clamped);
    } else if (sanitized === "") {
      onChange(0);
    }
  };

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(formatNumber(value));
    } else {
      setDisplayValue("");
    }
  };

  const handleFocus = () => {
    if (value > 0) {
      setDisplayValue(value.toFixed(decimals));
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
          {required && (
            <Text style={{ color: colors.danger }}> *</Text>
          )}
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
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Currency symbol */}
        <View
          style={[
            styles.symbolBox,
            {
              paddingHorizontal: spacing.md,
              borderRightWidth: 1,
              borderRightColor: colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontSize: fontSizes.md,
              fontWeight: "600",
              color: colors.muted,
            }}
          >
            {currency}
          </Text>
        </View>

        {/* Input */}
        <TextInput
          value={displayValue}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType="decimal-pad"
          editable={!disabled}
          accessibilityLabel={label || `Currency amount in ${currency}`}
          accessibilityState={{ disabled }}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: fontSizes.md,
              fontWeight: "600",
              fontVariant: ["tabular-nums"],
            },
            inputSize,
          ]}
        />
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
  symbolBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  input: {
    flex: 1,
  },
});

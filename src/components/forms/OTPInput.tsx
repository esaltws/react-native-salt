import React, { useRef, useState } from "react";
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

type Props = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  autoFocus?: boolean;
  secure?: boolean;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};


export default function OTPInput({
  length = 6,
  value,
  onChange,
  autoFocus = true,
  secure = false,
  error,
  disabled = false,
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, sizeMap, dimensions } = theme;
  const inputRef = useRef<TextInput>(null);
  const sizeConfig = {
    sm: { box: sizeMap.sm, font: fontSizes.md },
    md: { box: 46, font: 22 },
    lg: { box: dimensions.xl, font: 28 },
  }[size];

  const digits = value.split("").slice(0, length);

  const handlePress = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(cleaned);
  };

  return (
    <View testID={testID} style={[styles.container, style]}>
      {/* Hidden input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        editable={!disabled}
        accessibilityLabel="OTP input"
        accessibilityState={{ disabled }}
        style={styles.hiddenInput}
        caretHidden
      />

      {/* Visible boxes */}
      <Pressable onPress={handlePress} style={[styles.boxes, { gap: spacing.sm }]}>
        {Array.from({ length }).map((_, i) => {
          const isFilled = i < digits.length;
          const isActive = i === digits.length && !disabled;
          const hasError = !!error;

          return (
            <View
              key={i}
              style={[
                styles.box,
                {
                  width: sizeConfig.box,
                  height: sizeConfig.box,
                  borderRadius: radius.md,
                  borderWidth: 2,
                  borderColor: hasError
                    ? colors.danger
                    : isActive
                    ? colors.primary
                    : isFilled
                    ? colors.text + "40"
                    : colors.border,
                  backgroundColor: isFilled
                    ? colors.primary + "08"
                    : colors.surface,
                  opacity: disabled ? 0.5 : 1,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: sizeConfig.font,
                  fontWeight: "700",
                  color: colors.text,
                }}
              >
                {isFilled ? (secure ? "\u2022" : digits[i]) : ""}
              </Text>
              {isActive && (
                <View
                  style={[
                    styles.cursor,
                    { backgroundColor: colors.primary, bottom: spacing.sm, height: iconSizes.sm },
                  ]}
                />
              )}
            </View>
          );
        })}
      </Pressable>

      {error && (
        <Text
          style={{
            fontSize: fontSizes.xs,
            color: colors.danger,
            textAlign: "center",
            marginTop: spacing.sm,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },
  boxes: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  cursor: {
    position: "absolute",
    width: 2,
  },
});

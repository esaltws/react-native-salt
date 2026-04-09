import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type Props = Omit<TextInputProps, "multiline"> & {
  label?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  rows?: number;
  fullWidth?: boolean;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function TextArea({
  label,
  error,
  maxLength,
  showCount = false,
  rows = 4,
  fullWidth = true,
  required = false,
  containerStyle,
  style,
  value,
  ...props
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const lineHeight = (fontSizes.sm ?? 14) * 1.5;
  const minHeight = lineHeight * rows + spacing.md * 2;
  const charCount = value?.length ?? 0;

  return (
    <View style={[fullWidth && { width: "100%" }, containerStyle]}>
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

      <TextInput
        multiline
        textAlignVertical="top"
        accessibilityLabel={label || props.placeholder}
        placeholderTextColor={colors.muted}
        maxLength={maxLength}
        value={value}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            color: colors.text,
            fontSize: fontSizes.sm,
            padding: spacing.md,
            minHeight,
          },
          style,
        ]}
        {...props}
      />

      {/* Footer: error + count */}
      {(error || (showCount && maxLength)) && (
        <View style={[styles.footer, { marginTop: spacing.xs }]}>
          {error ? (
            <Text
              style={{
                color: colors.danger,
                fontSize: fontSizes.xs,
                flex: 1,
              }}
            >
              {error}
            </Text>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {showCount && maxLength && (
            <Text
              style={{
                fontSize: fontSizes.xs,
                color:
                  charCount >= maxLength ? colors.danger : colors.muted,
              }}
            >
              {charCount}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";
import { Size, SizeToken } from "../../types";

type StrengthLevel = "weak" | "fair" | "good" | "strong";

type Props = Omit<TextInputProps, "secureTextEntry"> & {
  label?: string;
  error?: string;
  size?: Size;
  fullWidth?: boolean;
  showStrength?: boolean;
  strength?: StrengthLevel;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const STRENGTH_CONFIG: Record<
  StrengthLevel,
  { colorKey: "danger" | "warning" | "info" | "success"; label: string; width: string }
> = {
  weak: { colorKey: "danger", label: "Weak", width: "25%" },
  fair: { colorKey: "warning", label: "Fair", width: "50%" },
  good: { colorKey: "info", label: "Good", width: "75%" },
  strong: { colorKey: "success", label: "Strong", width: "100%" },
};

export default function PasswordInput({
  label = "Password",
  error,
  size = "md",
  fullWidth = true,
  showStrength = false,
  strength,
  required = false,
  containerStyle,
  style,
  ...props
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;
  const [visible, setVisible] = useState(false);

  const sizeStyles: Record<SizeToken, ViewStyle> = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  };

  const inputSize =
    typeof size === "number"
      ? { paddingVertical: size, paddingHorizontal: size }
      : sizeStyles[size] ?? sizeStyles.md;

  const strengthInfo = strength ? STRENGTH_CONFIG[strength] : null;

  return (
    <View style={[fullWidth && { width: "100%" }, containerStyle]}>
      {label && (
        <Label style={{ marginBottom: spacing.sm }}>
          {label}
          {required && (
            <Text style={{ color: colors.danger }}> *</Text>
          )}
        </Label>
      )}

      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
          },
        ]}
      >
        <TextInput
          secureTextEntry={!visible}
          placeholderTextColor={colors.muted}
          placeholder="Enter password"
          accessibilityLabel={label || "Password"}
          style={[
            styles.input,
            {
              color: colors.text,
            },
            inputSize,
            style,
          ]}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        <Pressable
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel="Toggle password visibility"
          style={[styles.eyeBtn, { paddingRight: spacing.md }]}
        >
          <Icon
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={colors.muted}
          />
        </Pressable>
      </View>

      {/* Strength indicator */}
      {showStrength && strengthInfo && (
        <View style={{ marginTop: spacing.xs }}>
          <View
            style={[
              styles.strengthTrack,
              {
                backgroundColor: colors.border,
                borderRadius: 2,
              },
            ]}
          >
            <View
              style={{
                width: strengthInfo.width as any,
                height: 4,
                backgroundColor: colors[strengthInfo.colorKey],
                borderRadius: 2,
              }}
            />
          </View>
          <Caption
            style={{
              color: colors[strengthInfo.colorKey],
              marginTop: 2,
            }}
          >
            {strengthInfo.label}
          </Caption>
        </View>
      )}

      {error && (
        <Caption style={{ marginTop: spacing.xs, color: colors.danger }}>
          {error}
        </Caption>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  eyeBtn: {
    padding: 4,
  },
  strengthTrack: {
    height: 4,
    overflow: "hidden",
  },
});

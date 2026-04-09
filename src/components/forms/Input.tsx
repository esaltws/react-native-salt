import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Size, SizeToken } from "../../types";
import Text from "../typography/Text";
import Label from "../typography/Label";
import Caption from "../typography/Caption";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  size?: Size;
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  required?: boolean;
};



export default function Input({
  label,
  error,
  size = "md",
  fullWidth = true,
  containerStyle,
  style,
  editable = true,
  required = false,
  ...props
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing } = theme;

  const sizeStyles: Record<SizeToken, ViewStyle> = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
};
  return (
    <View style={[fullWidth && { width: "100%" }, containerStyle]}>
      {label ? <Label style={{ marginBottom: spacing.sm }}>{label}
              {required ? (
              <Text style={{ color: colors.danger, marginLeft: 4 }}>
                *
              </Text>
            ) : null}
              </Label> : null}
      
      

      <TextInput
        editable={editable}
        accessibilityLabel={label || props.placeholder}
        accessibilityState={{ disabled: !editable }}
        placeholderTextColor={colors.muted}
        style={[
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
          },
          typeof size === "number" ? { paddingVertical: size, paddingHorizontal: size } : sizeStyles[size] ?? sizeStyles.md,
          !editable && {
                        backgroundColor: colors.border,
                        opacity: 0.7,
                      },
          !!error && { borderColor: colors.danger },
          style,
        ]}
        {...props}
      />

      {error ? <Caption style={{ marginTop: spacing.xs, color: colors.danger }}>{error}</Caption> : null}
    </View>
  );
}



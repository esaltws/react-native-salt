import React from "react";
import { Pressable, Text, View, ViewStyle, StyleProp, TextStyle, ActivityIndicator } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { resolveIntentColor } from "../../theme/intent";
import { Variant, Intent, Size } from "../../types";
import Icon, { IconName } from "../theme-settings/Icon";


type Props = {
  title?: string;
  variant?: Variant;
  intent?: Intent;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  icon?: IconName;
  testID?: string;
};


const ICON_SIZES: Record<Size, number> = { sm: 16, md: 20, lg: 24 };

export default function Button({
    title,
    onPress,
    style,
    textStyle,
    variant = "solid",
    intent = "primary",
    size = "md",
    fullWidth = false,
    disabled = false,
    loading = false,
    iconLeft,
    iconRight,
    icon,
    testID,
}: Props) {
    const { theme } = useTheme();
    const { colors, spacing, radius } = theme;

    const isIconOnly = !!icon && !title;

    const sizeStyles: Record<Size, ViewStyle> = {
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

    const iconOnlySizeStyles: Record<Size, ViewStyle> = {
      sm: { padding: spacing.sm },
      md: { padding: spacing.md },
      lg: { padding: spacing.lg },
    };

    const intentColor = resolveIntentColor(colors, intent);
    const isDisabled = disabled || loading;

    const containerStyles: StyleProp<ViewStyle> = [
      { borderRadius: radius.md, alignItems: "center", justifyContent: "center", flexDirection: "row" },
      isIconOnly
        ? iconOnlySizeStyles[size] ?? iconOnlySizeStyles.md
        : sizeStyles[size] ?? sizeStyles.md,
      fullWidth && { width: "100%" },
      variant === "outline" && { borderWidth: 1, backgroundColor: "transparent" },
      variant === "outline" && { borderColor: intentColor },
      variant === "solid" && { backgroundColor: intentColor },
      variant === "ghost" && { backgroundColor: "transparent" },
      (variant === "text" || variant === "link") && { backgroundColor: "transparent", paddingHorizontal: 0, paddingVertical: 0 },
      isDisabled && variant === "solid" && { backgroundColor: colors.muted },
      isDisabled && { borderColor: colors.muted, opacity: 0.6 },
      style,
    ];

    const iconColor = variant === "solid"
      ? colors.surface
      : isDisabled
        ? colors.muted
        : intentColor;

    const labelStyles: StyleProp<TextStyle> = [
      { fontWeight: "600" },
      variant === "solid" ? { color: colors.surface } : { color: intentColor },
      variant === "link" && { textDecorationLine: "underline" },
      isDisabled && (variant === "solid" ? { color: colors.surface } : { color: colors.muted }),
      textStyle,
    ];

    return (
      <Pressable
          testID={testID}
          onPress={onPress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ disabled: isDisabled, busy: loading }}
          style={containerStyles}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={iconColor}
          />
        ) : isIconOnly ? (
          <Icon name={icon} size={ICON_SIZES[size]} color={iconColor} />
        ) : (
          <>
            {iconLeft && <Icon name={iconLeft} size={ICON_SIZES[size]} color={iconColor} style={{ marginRight: spacing.xs }} />}
            {title && <Text style={labelStyles}>{title}</Text>}
            {iconRight && <Icon name={iconRight} size={ICON_SIZES[size]} color={iconColor} style={{ marginLeft: spacing.xs }} />}
          </>
        )}
      </Pressable>
    );
}


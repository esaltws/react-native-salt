import React from "react";
import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type SocialProvider =
  | "google"
  | "facebook"
  | "apple"
  | "github"
  | "twitter"
  | "microsoft";

type SocialVariant = "filled" | "outline" | "icon-only";

type Props = {
  provider: SocialProvider;
  onPress: () => void;
  variant?: SocialVariant;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
};

type BrandConfig = {
  color: string;
  icon: string;
  label: string;
};

const BRANDS: Record<SocialProvider, BrandConfig> = {
  google: {
    color: "#4285F4",
    icon: "logo-google",
    label: "Continue with Google",
  },
  facebook: {
    color: "#1877F2",
    icon: "logo-facebook",
    label: "Continue with Facebook",
  },
  apple: {
    color: "#000000",
    icon: "logo-apple",
    label: "Continue with Apple",
  },
  github: {
    color: "#24292e",
    icon: "logo-github",
    label: "Continue with GitHub",
  },
  twitter: {
    color: "#1DA1F2",
    icon: "logo-twitter",
    label: "Continue with Twitter",
  },
  microsoft: {
    color: "#2F2F2F",
    icon: "logo-microsoft",
    label: "Continue with Microsoft",
  },
};

export default function SocialButton({
  provider,
  onPress,
  variant = "filled",
  label,
  loading = false,
  disabled = false,
  fullWidth = true,
  size = "md",
  style,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing, fontSizes, iconSizes, sizeMap } = theme;

  const SIZE_MAP = {
    sm: { height: sizeMap.sm, icon: iconSizes.xs, font: fontSizes.sm, px: spacing.md },
    md: { height: sizeMap.md, icon: iconSizes.sm, font: fontSizes.md, px: spacing.lg },
    lg: { height: sizeMap.xl, icon: iconSizes.md, font: fontSizes.lg, px: spacing.xl },
  };

  const brand = BRANDS[provider];
  const sizeConfig = SIZE_MAP[size];
  const isDisabled = disabled || loading;

  // Apple special: use white in dark mode
  const brandColor =
    provider === "apple" && theme.mode === "dark" ? "#FFFFFF" : brand.color;

  const isFilled = variant === "filled";
  const isIconOnly = variant === "icon-only";

  const bgColor = isFilled ? brandColor : "transparent";
  const textColor = isFilled
    ? provider === "apple" && theme.mode === "dark"
      ? "#000000"
      : "#FFFFFF"
    : colors.text;
  const iconColor = isFilled ? textColor : brandColor;
  const borderColor = isFilled ? "transparent" : colors.border;

  const displayLabel = label ?? brand.label;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          height: sizeConfig.height,
          backgroundColor: bgColor,
          borderRadius: radius.md,
          borderWidth: isFilled ? 0 : 1,
          borderColor,
          paddingHorizontal: isIconOnly ? 0 : sizeConfig.px,
          width: isIconOnly ? sizeConfig.height : undefined,
          opacity: isDisabled ? 0.5 : 1,
        },
        fullWidth && !isIconOnly && { width: "100%" },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          <Icon name={brand.icon} size={sizeConfig.icon} color={iconColor} />
          {!isIconOnly && (
            <Text
              style={{
                color: textColor,
                fontSize: sizeConfig.font,
                fontWeight: "600",
                marginLeft: spacing.md,
              }}
            >
              {displayLabel}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

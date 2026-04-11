import React from "react";
import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { resolveIntentColor } from "../../theme/intent";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent, Size, FontSize, IconSize, Dimension } from "../../types";

type Props = {
  icon?: string;
  label?: string;
  onPress: () => void;
  intent?: Intent;
  size?: Size;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const FAB_MAP: Record<Size, { btn: Dimension; icon: IconSize; font: FontSize }> = {
  sm: { btn: "md", icon: "sm", font: "xs" },
  md: { btn: "xl", icon: "md", font: "sm" },
  lg: { btn: "xxl", icon: "lg", font: "md" },
};

export default function FAB({
  icon = "add",
  label,
  onPress,
  intent = "primary",
  size = "md",
  position = "bottom-right",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, iconSizes, dimensions } = theme;
  const s = FAB_MAP[size];

  const bgColor = disabled ? colors.muted : resolveIntentColor(colors, intent);

  const positionStyle: ViewStyle =
    position === "bottom-right"
      ? { bottom: spacing.xl, right: spacing.xl }
      : position === "bottom-left"
      ? { bottom: spacing.xl, left: spacing.xl }
      : { bottom: spacing.xl, alignSelf: "center", left: "50%", marginLeft: -(label ? 60 : dimensions[s.btn] / 2) };

  const isExtended = !!label;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label || icon}
      accessibilityState={{ disabled }}
      style={[
        styles.fab,
        {
          backgroundColor: bgColor,
          borderRadius: isExtended ? dimensions[s.btn] / 2 : dimensions[s.btn] / 2,
          width: isExtended ? undefined : dimensions[s.btn],
          height: dimensions[s.btn],
          paddingHorizontal: isExtended ? spacing.lg : 0,
          position: "absolute",
          ...positionStyle,
        },
        styles.shadow,
        style,
      ]}
    >
      <Icon name={icon} size={iconSizes[s.icon]} color={colors.surface} />
      {label && (
        <Text
          style={{
            color: colors.surface,
            fontWeight: "600",
            fontSize: fontSizes[s.font],
            marginLeft: spacing.sm,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
});

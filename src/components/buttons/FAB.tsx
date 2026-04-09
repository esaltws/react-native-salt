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
import { Intent, SizeToken } from "../../types";

type Props = {
  icon?: string;
  label?: string;
  onPress: () => void;
  intent?: Intent;
  size?: SizeToken;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SIZE_MAP: Record<SizeToken, { btn: number; icon: number; font: number }> = {
  sm: { btn: 40, icon: 18, font: 12 },
  md: { btn: 56, icon: 24, font: 14 },
  lg: { btn: 64, icon: 28, font: 16 },
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
  const { colors, spacing } = theme;

  const sizeConfig = SIZE_MAP[size];

  const bgColor = disabled ? colors.muted : resolveIntentColor(colors, intent);

  const positionStyle: ViewStyle =
    position === "bottom-right"
      ? { bottom: spacing.xl, right: spacing.xl }
      : position === "bottom-left"
      ? { bottom: spacing.xl, left: spacing.xl }
      : { bottom: spacing.xl, alignSelf: "center", left: "50%", marginLeft: -(label ? 60 : sizeConfig.btn / 2) };

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
          borderRadius: isExtended ? sizeConfig.btn / 2 : sizeConfig.btn / 2,
          width: isExtended ? undefined : sizeConfig.btn,
          height: sizeConfig.btn,
          paddingHorizontal: isExtended ? spacing.lg : 0,
          position: "absolute",
          ...positionStyle,
        },
        styles.shadow,
        style,
      ]}
    >
      <Icon name={icon} size={sizeConfig.icon} color={colors.surface} />
      {label && (
        <Text
          style={{
            color: colors.surface,
            fontWeight: "600",
            fontSize: sizeConfig.font,
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

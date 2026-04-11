import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";

type HeaderAction = {
  icon: string;
  onPress: () => void;
  badge?: number;
};

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backIcon?: string;
  actions?: HeaderAction[];
  transparent?: boolean;
  centerTitle?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  backIcon = "arrow-back",
  actions = [],
  transparent = false,
  centerTitle = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, sizeMap, dimensions } = theme;

  return (
    <View
      testID={testID}
      style={[
        { flexDirection: "row" as const, alignItems: "center" as const, minHeight: sizeMap.xl },
        {
          backgroundColor: transparent ? "transparent" : colors.surface,
          borderBottomWidth: transparent ? 0 : 1,
          borderBottomColor: colors.border,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.md,
        },
        style,
      ]}
    >
      {/* Left: back button */}
      <View style={{ minWidth: dimensions.md }}>
        {onBack && (
          <Pressable
            onPress={onBack}
            style={{ padding: spacing.xs }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Icon name={backIcon} size={iconSizes.md} color={colors.text} />
          </Pressable>
        )}
      </View>

      {/* Center: title */}
      <View style={[styles.center, centerTitle && styles.centerAbsolute]}>
        <Title fontSize="lg" lines={1}>
          {title}
        </Title>
        {subtitle && (
          <Caption lines={1} style={{ marginTop: 1 }}>
            {subtitle}
          </Caption>
        )}
      </View>

      {/* Right: actions */}
      <View style={{ flexDirection: "row", minWidth: dimensions.md, justifyContent: "flex-end", gap: spacing.sm }}>
        {actions.map((act, index) => (
          <Pressable
            key={index}
            onPress={act.onPress}
            style={{ padding: spacing.xs, position: "relative" as const }}
            accessibilityRole="button"
            accessibilityLabel={act.icon}
          >
            <Icon name={act.icon} size={iconSizes.md} color={colors.text} />
            {act.badge != null && act.badge > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  minWidth: spacing.lg,
                  height: spacing.lg,
                  borderRadius: radius.md,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 3,
                  backgroundColor: colors.danger,
                }}
              >
                <Text style={{ color: colors.onDanger, fontSize: fontSizes.xxs, fontWeight: "700" }}>
                  {act.badge > 99 ? "99+" : act.badge}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  centerAbsolute: {
    alignItems: "center",
  },
});

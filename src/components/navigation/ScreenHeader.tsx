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
  const { colors, spacing } = theme;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
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
      <View style={styles.left}>
        {onBack && (
          <Pressable
            onPress={onBack}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Icon name={backIcon} size={24} color={colors.text} />
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
      <View style={styles.right}>
        {actions.map((act, index) => (
          <Pressable
            key={index}
            onPress={act.onPress}
            style={styles.actionBtn}
            accessibilityRole="button"
            accessibilityLabel={act.icon}
          >
            <Icon name={act.icon} size={22} color={colors.text} />
            {act.badge != null && act.badge > 0 && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: colors.danger },
                ]}
              >
                <Text style={{ color: colors.onDanger, fontSize: 9, fontWeight: "700" }}>
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
  },
  left: {
    minWidth: 40,
  },
  center: {
    flex: 1,
  },
  centerAbsolute: {
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    minWidth: 40,
    justifyContent: "flex-end",
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
  actionBtn: {
    padding: 4,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
});

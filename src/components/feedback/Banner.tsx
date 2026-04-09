import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent } from "../../types";

type Props = {
  title: string;
  message?: string;
  intent?: Intent;
  icon?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const INTENT_ICONS: Record<string, string> = {
  primary: "information-circle-outline",
  info: "information-circle-outline",
  success: "checkmark-circle-outline",
  warning: "warning-outline",
  danger: "alert-circle-outline",
  secondary: "information-circle-outline",
};

export default function Banner({
  title,
  message,
  intent = "info",
  icon,
  dismissible = false,
  onDismiss,
  onAction,
  actionLabel,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const accentColor = (colors as any)[intent] || colors.primary;
  const bgColor = `${accentColor}14`;
  const resolvedIcon = icon || INTENT_ICONS[intent] || INTENT_ICONS.info;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <View
      testID={testID}
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderLeftWidth: 4,
          borderLeftColor: accentColor,
          borderRadius: radius.md,
          padding: spacing.md,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <Icon
          name={resolvedIcon}
          size={22}
          color={accentColor}
          style={{ marginRight: spacing.sm }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: fontSizes.sm,
              fontWeight: "700",
              color: colors.text,
            }}
          >
            {title}
          </Text>
          {message && (
            <Text
              style={{
                fontSize: fontSizes.xs,
                color: colors.muted,
                marginTop: 4,
              }}
            >
              {message}
            </Text>
          )}
          {onAction && actionLabel && (
            <Pressable onPress={onAction} style={{ marginTop: spacing.sm }} accessibilityRole="button" accessibilityLabel={actionLabel}>
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  fontWeight: "700",
                  color: accentColor,
                }}
              >
                {actionLabel}
              </Text>
            </Pressable>
          )}
        </View>
        {dismissible && (
          <Pressable onPress={handleDismiss} style={{ padding: 4 }} accessibilityRole="button" accessibilityLabel="Dismiss">
            <Icon name="close" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Button from "../buttons/Button";

export type PermissionStatus =
  | "granted"
  | "denied"
  | "blocked"
  | "limited"
  | "unknown";

type Props = {
  title: string;
  description?: string;
  status?: PermissionStatus;
  icon?: React.ReactNode;
  actionText?: string;
  secondaryActionText?: string;
  onActionPress?: () => void;
  onSecondaryActionPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const STATUS_CONFIG: Record<
  PermissionStatus,
  { label: string; color: string; actionDefault: string }
> = {
  unknown: {
    label: "Not Requested",
    color: "muted",
    actionDefault: "Allow Access",
  },
  granted: {
    label: "Granted",
    color: "success",
    actionDefault: "Granted",
  },
  denied: {
    label: "Denied",
    color: "danger",
    actionDefault: "Try Again",
  },
  blocked: {
    label: "Blocked",
    color: "danger",
    actionDefault: "Open Settings",
  },
  limited: {
    label: "Limited",
    color: "warning",
    actionDefault: "Change Access",
  },
};

export default function PermissionCard({
  title,
  description,
  status = "unknown",
  icon,
  actionText,
  secondaryActionText,
  onActionPress,
  onSecondaryActionPress,
  loading = false,
  disabled = false,
  fullWidth = false,
  elevated = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const config = STATUS_CONFIG[status];
  const statusColor = colors[config.color as keyof typeof colors] || colors.muted;
  const isGranted = status === "granted";
  const isActionDisabled = disabled || isGranted;
  const resolvedActionText = actionText || config.actionDefault;

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        elevated && {
          borderWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        fullWidth && { width: "100%" },
        style,
      ]}
    >
      {/* Header row: icon + title + status badge */}
      <View style={styles.header}>
        {icon && <View style={{ marginRight: spacing.sm }}>{icon}</View>}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: fontSizes.md,
              fontWeight: "600",
              color: colors.text,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: statusColor + "1A", // 10% opacity
              borderRadius: radius.xl,
              paddingHorizontal: spacing.sm,
              paddingVertical: 2,
            },
          ]}
        >
          <Text
            style={{
              fontSize: fontSizes.xs,
              fontWeight: "600",
              color: statusColor,
            }}
          >
            {config.label}
          </Text>
        </View>
      </View>

      {/* Description */}
      {description && (
        <Text
          style={{
            fontSize: fontSizes.sm,
            color: colors.muted,
            marginTop: spacing.sm,
          }}
        >
          {description}
        </Text>
      )}

      {/* Actions */}
      {(onActionPress || onSecondaryActionPress) && (
        <View style={[styles.actions, { marginTop: spacing.md, gap: spacing.sm }]}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <>
              {onActionPress && (
                <Button
                  title={resolvedActionText}
                  variant={isGranted ? "outline" : "solid"}
                  intent={isGranted ? "success" : "primary"}
                  size="sm"
                  onPress={onActionPress}
                  disabled={isActionDisabled}
                />
              )}
              {onSecondaryActionPress && secondaryActionText && (
                <Button
                  title={secondaryActionText}
                  variant="text"
                  size="sm"
                  onPress={onSecondaryActionPress}
                />
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

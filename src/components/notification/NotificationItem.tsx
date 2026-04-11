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
import Icon from "../theme-settings/Icon";
import Avatar from "../user/Avatar";
import { Intent } from "../../types";

type Props = {
  title: string;
  message: string;
  timestamp: string;
  icon?: string;
  avatar?: string;
  avatarName?: string;
  intent?: Intent;
  read?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function NotificationItem({
  title,
  message,
  timestamp,
  icon,
  avatar,
  avatarName,
  intent = "primary",
  read = false,
  onPress,
  onDismiss,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, dimensions } = theme;

  const accentColor = colors[intent];
  const circleSize = dimensions.md;
  const iconSize = iconSizes.md;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: read ? "transparent" : `${accentColor}08`,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          borderRadius: radius.md,
        },
        style,
      ]}
    >
      {/* Unread dot */}
      {!read && (
        <View
          style={[
            styles.dot,
            {
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: accentColor,
              marginRight: spacing.sm,
              marginTop: 6,
            },
          ]}
        />
      )}

      {/* Avatar or Icon */}
      <View style={{ marginRight: spacing.md }}>
        {avatar || avatarName ? (
          <Avatar name={avatarName || ""} uri={avatar} size="lg" />
        ) : icon ? (
          <View
            style={[
              styles.iconCircle,
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: `${accentColor}18`,
              },
            ]}
          >
            <Icon name={icon} size={iconSize} color={accentColor} />
          </View>
        ) : (
          <View
            style={[
              styles.iconCircle,
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: `${accentColor}18`,
              },
            ]}
          >
            <Icon name="notifications-outline" size={iconSize} color={accentColor} />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: fontSizes.sm,
            fontWeight: read ? "400" : "600",
            color: colors.text,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: fontSizes.xs,
            color: colors.muted,
            marginTop: 2,
          }}
          numberOfLines={2}
        >
          {message}
        </Text>
        <Text
          style={{
            fontSize: fontSizes.xs,
            color: colors.muted,
            marginTop: 4,
            fontWeight: "500",
          }}
        >
          {timestamp}
        </Text>
      </View>

      {/* Dismiss */}
      {onDismiss && (
        <Pressable onPress={onDismiss} hitSlop={8} style={{ padding: 4 }}>
          <Icon name="close" size={iconSizes.sm} color={colors.muted} />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dot: {},
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

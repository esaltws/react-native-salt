import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { resolveIntentColor } from "../../theme/intent";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent } from "../../types";

type ToastPosition = "top" | "bottom";

type Props = {
  visible: boolean;
  message: string;
  intent?: Intent;
  icon?: string;
  duration?: number;
  position?: ToastPosition;
  onDismiss: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const INTENT_ICONS: Record<Intent, string> = {
  primary: "information-circle-outline",
  secondary: "information-circle-outline",
  success: "checkmark-circle-outline",
  danger: "alert-circle-outline",
  warning: "warning-outline",
  info: "information-circle-outline",
};

export default function Toast({
  visible,
  message,
  intent = "primary",
  icon,
  duration = 3000,
  position = "bottom",
  onDismiss,
  actionLabel,
  onActionPress,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === "top" ? -20 : 20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        const timer = setTimeout(onDismiss, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: position === "top" ? -20 : 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const toastColor = resolveIntentColor(colors, intent);
  const displayIcon = icon ?? INTENT_ICONS[intent];

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        {
          [position]: spacing.xxl,
          opacity,
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="box-none"
    >
      <View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          styles.toast,
          {
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            padding: spacing.md,
            borderLeftWidth: 4,
            borderLeftColor: toastColor,
          },
          styles.shadow,
          style,
        ]}
      >
        <Icon name={displayIcon} size={20} color={toastColor} />
        <Text
          style={{
            flex: 1,
            fontSize: fontSizes.sm,
            color: colors.text,
            marginLeft: spacing.sm,
          }}
          numberOfLines={2}
        >
          {message}
        </Text>

        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} style={{ marginLeft: spacing.sm }} accessibilityRole="button" accessibilityLabel={actionLabel}>
            <Text
              style={{
                fontSize: fontSizes.sm,
                fontWeight: "600",
                color: toastColor,
              }}
            >
              {actionLabel}
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={onDismiss} style={{ marginLeft: spacing.sm }} accessibilityRole="button" accessibilityLabel="Dismiss">
            <Icon name="close" size={16} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

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
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  visible: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss: () => void;
  duration?: number;
  icon?: string;
  position?: "top" | "bottom";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Snackbar({
  visible,
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = 4000,
  icon,
  position = "bottom",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 4,
      }).start();

      if (duration > 0) {
        timerRef.current = setTimeout(onDismiss, duration);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [position === "bottom" ? 80 : -80, 0],
  });

  if (!visible) return null;

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        position === "bottom"
          ? { bottom: spacing.xl }
          : { top: spacing.xl },
        {
          transform: [{ translateY }],
          opacity: slideAnim,
        },
      ]}
    >
      <View
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          styles.snackbar,
          {
            backgroundColor:
              theme.mode === "dark" ? colors.surface : colors.text,
            borderRadius: radius.md,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
          },
          style,
        ]}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={theme.mode === "dark" ? colors.text : colors.surface}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <Text
          style={{
            flex: 1,
            color: theme.mode === "dark" ? colors.text : colors.surface,
            fontSize: fontSizes.sm,
          }}
          numberOfLines={2}
        >
          {message}
        </Text>
        {actionLabel && onAction && (
          <Pressable
            onPress={() => {
              onAction();
              onDismiss();
            }}
            style={{ marginLeft: spacing.md }}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: fontSizes.sm,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {actionLabel}
            </Text>
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
  },
  snackbar: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});

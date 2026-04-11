import React from "react";
import {
  View,
  Pressable,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import Button from "../buttons/Button";
import { Intent } from "../../types";

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  icon?: string;
  intent?: Intent;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function AlertDialog({
  visible,
  onClose,
  title,
  message,
  icon,
  intent = "primary",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, dimensions } = theme;

  const accentColor = destructive
    ? colors.danger
    : colors[intent] || colors.primary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View
          accessibilityRole="alert"
          style={[
            styles.dialog,
            {
              backgroundColor: colors.background,
              borderRadius: radius.lg,
              padding: spacing.xl,
              maxWidth: 340,
              width: "90%",
            },
            style,
          ]}
        >
          {/* Icon */}
          {icon && (
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: `${accentColor}14`,
                  width: dimensions.xl,
                  height: dimensions.xl,
                  borderRadius: dimensions.xl / 2,
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Icon name={icon} size={iconSizes.xl} color={accentColor} />
            </View>
          )}

          {/* Title */}
          <Text
            style={{
              fontSize: fontSizes.xxl,
              fontWeight: "700",
              color: colors.text,
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          {/* Message */}
          {message && (
            <Text
              style={{
                fontSize: fontSizes.sm,
                color: colors.muted,
                textAlign: "center",
                marginTop: spacing.sm,
                lineHeight: (fontSizes.sm ?? 14) * 1.5,
              }}
            >
              {message}
            </Text>
          )}

          {/* Buttons */}
          <View style={[styles.buttons, { marginTop: spacing.xl, gap: spacing.sm }]}>
            {onCancel && (
              <View style={{ flex: 1 }}>
                <Button
                  title={cancelText}
                  variant="outline"
                  onPress={() => {
                    onCancel();
                    onClose();
                  }}
                />
              </View>
            )}
            {onConfirm && (
              <View style={{ flex: 1 }}>
                <Button
                  title={confirmText}
                  intent={destructive ? "danger" : intent}
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
  },
});

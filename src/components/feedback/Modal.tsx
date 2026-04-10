import React from "react";
import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Button from "../buttons/Button";
import Icon from "../theme-settings/Icon";

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
  closable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Modal({
  visible,
  onClose,
  title,
  message,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  destructive = false,
  closable = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closable ? onClose : undefined}
      testID={testID}
    >
      <Pressable
        style={styles.overlay}
        onPress={closable ? onClose : undefined}
      >
        <Pressable
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing.xl,
              maxWidth: 340,
              width: "85%",
            },
            styles.shadow,
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
          accessibilityViewIsModal={true}
        >
          {/* Close button */}
          {closable && (
            <Pressable
              onPress={onClose}
              style={[styles.closeBtn, { top: spacing.md, right: spacing.md }]}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Icon name="close" size={20} color={colors.muted} />
            </Pressable>
          )}

          {/* Title */}
          {title && (
            <Text
              style={{
                fontSize: fontSizes.xxl,
                fontWeight: "700",
                color: colors.text,
                textAlign: "center",
                marginBottom: spacing.sm,
              }}
            >
              {title}
            </Text>
          )}

          {/* Message */}
          {message && (
            <Text
              style={{
                fontSize: fontSizes.sm,
                color: colors.muted,
                textAlign: "center",
                lineHeight: 20,
                marginBottom: spacing.lg,
              }}
            >
              {message}
            </Text>
          )}

          {/* Custom content */}
          {children}

          {/* Action buttons */}
          {(onConfirm || onCancel) && (
            <View style={[styles.actions, { marginTop: spacing.lg, gap: spacing.sm }]}>
              {onCancel && (
                <View style={styles.btnWrap}>
                  <Button
                    title={cancelText}
                    variant="outline"
                    intent="secondary"
                    onPress={handleCancel}
                    fullWidth
                  />
                </View>
              )}
              {onConfirm && (
                <View style={styles.btnWrap}>
                  <Button
                    title={confirmText}
                    variant="solid"
                    intent={destructive ? "danger" : "primary"}
                    onPress={handleConfirm}
                    fullWidth
                  />
                </View>
              )}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {},
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  closeBtn: {
    position: "absolute",
    zIndex: 1,
    padding: 4,
  },
  actions: {
    flexDirection: "row",
  },
  btnWrap: {
    flex: 1,
  },
});

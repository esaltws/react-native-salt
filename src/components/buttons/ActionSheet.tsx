import React from "react";
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Divider from "../layout/Divider";

type ActionOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionOption[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ActionSheet({
  visible,
  onClose,
  title,
  options,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, sizeMap } = theme;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={testID}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              paddingBottom: spacing.xxl,
            },
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <View
            style={[
              styles.handle,
              { backgroundColor: colors.border, marginVertical: spacing.sm, width: sizeMap.sm, borderRadius: 2 },
            ]}
          />

          {title && (
            <Text
              style={{
                fontWeight: "600",
                fontSize: fontSizes.md,
                textAlign: "center",
                paddingVertical: spacing.sm,
                color: colors.muted,
              }}
            >
              {title}
            </Text>
          )}

          {options.map((option, index) => (
            <View key={option.label}>
              {index > 0 && <Divider />}
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
                  pressed && { backgroundColor: colors.border + "40" },
                ]}
                onPress={() => {
                  option.onPress();
                  onClose();
                }}
                accessibilityRole="button"
                accessibilityLabel={option.label}
              >
                <Text
                  style={{
                    fontSize: fontSizes.md,
                    textAlign: "center",
                    color: option.destructive ? colors.danger : colors.text,
                    fontWeight: option.destructive ? "600" : "400",
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            </View>
          ))}

          <Divider />
          <Pressable
            style={({ pressed }) => [
              styles.option,
              { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
              pressed && { backgroundColor: colors.border + "40" },
            ]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
          >
            <Text
              style={{
                fontSize: fontSizes.md,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {},
  handle: {
    height: 4,
    alignSelf: "center",
  },
  option: {},
});

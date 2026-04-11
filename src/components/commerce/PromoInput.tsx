import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Input from "../forms/Input";
import Icon from "../theme-settings/Icon";

type PromoStatus = "idle" | "loading" | "success" | "error";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onApply: (code: string) => void;
  status?: PromoStatus;
  successMessage?: string;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function PromoInput({
  value,
  onChangeText,
  onApply,
  status = "idle",
  successMessage = "Code applied!",
  errorMessage = "Invalid code",
  placeholder = "Enter promo code",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;

  const isLoading = status === "loading";
  const isDisabled = disabled || isLoading || !value.trim();

  const handleApply = () => {
    if (!isDisabled) {
      onApply(value.trim());
    }
  };

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <Input
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={!isLoading && !disabled}
            style={{ textTransform: "uppercase" }}
          />
        </View>
        <Pressable
          onPress={handleApply}
          disabled={isDisabled}
          style={[
            styles.applyBtn,
            {
              backgroundColor: isDisabled ? colors.muted : colors.primary,
              borderRadius: radius.md,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              marginLeft: spacing.sm,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Apply promo code"
          accessibilityState={{ disabled: isDisabled }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.surface} />
          ) : (
            <Text
              style={{
                color: colors.surface,
                fontWeight: "600",
                fontSize: fontSizes.sm,
              }}
            >
              Apply
            </Text>
          )}
        </Pressable>
      </View>

      {status === "success" && (
        <View style={[styles.feedback, { marginTop: spacing.xs }]}>
          <Icon name="checkmark-circle" size={iconSizes.xs} color={colors.success} />
          <Text
            style={{
              color: colors.success,
              fontSize: fontSizes.xs,
              marginLeft: spacing.xs,
            }}
          >
            {successMessage}
          </Text>
        </View>
      )}

      {status === "error" && (
        <View style={[styles.feedback, { marginTop: spacing.xs }]}>
          <Icon name="close-circle" size={iconSizes.xs} color={colors.danger} />
          <Text
            style={{
              color: colors.danger,
              fontSize: fontSizes.xs,
              marginLeft: spacing.xs,
            }}
          >
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrap: {
    flex: 1,
  },
  applyBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
  },
});

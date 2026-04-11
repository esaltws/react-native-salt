import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import { Size, IconSize } from "../../types";

const BOX_MAP: Record<Size, IconSize> = { sm: "xs", md: "sm", lg: "md" };

type Props = {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Checkbox({
  checked,
  onToggle,
  label,
  description,
  size = "md",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, iconSizes } = theme;

  const boxSize = iconSizes[BOX_MAP[size]];

  return (
    <Pressable
      testID={testID}
      onPress={() => !disabled && onToggle(!checked)}
      style={[
        styles.container,
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            borderRadius: radius.sm,
            borderWidth: 2,
            borderColor: checked ? colors.primary : colors.border,
            backgroundColor: checked ? colors.primary : "transparent",
          },
        ]}
      >
        {checked && (
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: boxSize * 0.65,
              fontWeight: "700",
              lineHeight: boxSize * 0.85,
              textAlign: "center",
            }}
          >
            ✓
          </Text>
        )}
      </View>

      {(label || description) && (
        <View style={{ marginLeft: spacing.sm, flex: 1 }}>
          {label && (
            <Label fontSize={size === "sm" ? "sm" : "md"}>
              {label}
            </Label>
          )}
          {description && (
            <Caption style={{ marginTop: 2 }}>
              {description}
            </Caption>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
});

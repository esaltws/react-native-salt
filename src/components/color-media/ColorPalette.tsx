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

type Props = {
  colors: string[];
  value: string | null;
  onChange: (color: string) => void;
  columns?: number;
  swatchSize?: number;
  label?: string;
  showHex?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ColorPalette({
  colors: palette,
  value,
  onChange,
  columns = 6,
  swatchSize = 40,
  label,
  showHex = false,
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const gap = spacing.sm;

  return (
    <View testID={testID} style={[{ opacity: disabled ? 0.5 : 1 }, style]}>
      {label && (
        <Text
          style={{
            marginBottom: spacing.sm,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.grid,
          {
            gap,
          },
        ]}
      >
        {palette.map((color) => {
          const isSelected = color === value;
          return (
            <Pressable
              key={color}
              onPress={() => !disabled && onChange(color)}
              style={[
                styles.swatch,
                {
                  width: swatchSize,
                  height: swatchSize,
                  borderRadius: radius.md,
                  backgroundColor: color,
                  borderWidth: isSelected ? 3 : 1,
                  borderColor: isSelected ? colors.text : `${colors.text}20`,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Select color ${color}`}
              accessibilityState={{ selected: isSelected, disabled }}
            >
              {isSelected && (
                <Icon
                  name="checkmark"
                  size={swatchSize * 0.45}
                  color={isLightColor(color) ? "#000000" : "#FFFFFF"}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {showHex && value && (
        <Text
          style={{
            marginTop: spacing.sm,
            fontSize: fontSizes.xs,
            color: colors.muted,
            fontWeight: "500",
            fontVariant: ["tabular-nums"],
          }}
        >
          {value.toUpperCase()}
        </Text>
      )}
    </View>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  swatch: {
    alignItems: "center",
    justifyContent: "center",
  },
});

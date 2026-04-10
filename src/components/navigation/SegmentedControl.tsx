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
import { Size } from "../../types";

type SegmentItem = {
  key: string;
  label: string;
};

type Props = {
  items: SegmentItem[];
  selected: string;
  onSelect: (key: string) => void;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SIZE_MAP: Record<Size, { py: number; px: number; font: number }> = {
  sm: { py: 4, px: 10, font: 12 },
  md: { py: 6, px: 14, font: 14 },
  lg: { py: 8, px: 18, font: 16 },
};

export default function SegmentedControl({
  items,
  selected,
  onSelect,
  size = "md",
  fullWidth = false,
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;
  const sizeConfig = SIZE_MAP[size];

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.border + "60",
          borderRadius: radius.lg,
          padding: 3,
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && { width: "100%" },
        style,
      ]}
    >
      {items.map((item) => {
        const isActive = selected === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => !disabled && onSelect(item.key)}
            disabled={disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive, disabled }}
            style={[
              styles.segment,
              {
                backgroundColor: isActive ? colors.surface : "transparent",
                borderRadius: radius.md,
                paddingVertical: sizeConfig.py,
                paddingHorizontal: sizeConfig.px,
              },
              isActive && styles.shadow,
              fullWidth && { flex: 1 },
            ]}
          >
            <Text
              style={{
                fontSize: sizeConfig.font,
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.text : colors.muted,
                textAlign: "center",
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  segment: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

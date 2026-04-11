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
import { Size, FontSize } from "../../types";

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

const COMPACT_MAP: Record<Size, { py: "xs" | "sm" | "md"; px: "sm" | "md" | "lg"; font: FontSize }> = {
  sm: { py: "xs", px: "sm", font: "xs" },
  md: { py: "sm", px: "md", font: "sm" },
  lg: { py: "md", px: "lg", font: "md" },
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
  const { colors, spacing, radius, fontSizes } = theme;
  const s = COMPACT_MAP[size];

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

import React, { useState, useRef } from "react";
import {
  View,
  Pressable,
  ScrollView,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Size, FontSize, IconSize } from "../../types";

type DropdownOption = {
  key: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
};

type Props = {
  options: DropdownOption[];
  value: string | null;
  onChange: (key: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: Size;
  fullWidth?: boolean;
  maxVisible?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const COMPACT_MAP: Record<Size, { font: FontSize; icon: IconSize; px: "sm" | "md" | "lg" }> = {
  sm: { font: "xs", icon: "xs", px: "sm" },
  md: { font: "sm", icon: "sm", px: "md" },
  lg: { font: "md", icon: "md", px: "lg" },
};

export default function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  disabled = false,
  size = "md",
  fullWidth = true,
  maxVisible = 5,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, sizeMap } = theme;
  const [open, setOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const s = COMPACT_MAP[size];

  const selected = options.find((o) => o.key === value);

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    Animated.spring(rotateAnim, {
      toValue: next ? 1 : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const handleSelect = (key: string) => {
    onChange(key);
    setOpen(false);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const itemHeight = sizeMap[size] + 2;
  const listHeight = Math.min(options.length, maxVisible) * itemHeight;

  return (
    <View testID={testID} style={[fullWidth && { width: "100%" }, { zIndex: 10 }, style]}>
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

      {/* Trigger */}
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled, expanded: open }}
        style={[
          styles.trigger,
          {
            height: sizeMap[size],
            paddingHorizontal: spacing[s.px],
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.danger
              : open
              ? colors.primary
              : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {selected?.icon && (
          <Icon
            name={selected.icon}
            size={iconSizes[s.icon]}
            color={colors.text}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <Text
          style={{
            flex: 1,
            fontSize: fontSizes[s.font],
            color: selected ? colors.text : colors.muted,
          }}
          numberOfLines={1}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon name="chevron-down-outline" size={iconSizes[s.icon]} color={colors.muted} />
        </Animated.View>
      </Pressable>

      {/* Dropdown list */}
      {open && (
        <View
          style={[
            styles.dropdown,
            {
              marginTop: spacing.xs,
              maxHeight: listHeight,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: radius.md,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 8,
            },
          ]}
        >
          <ScrollView nestedScrollEnabled>
            {options.map((item) => {
              const isSelected = item.key === value;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => !item.disabled && handleSelect(item.key)}
                  accessibilityRole="menuitem"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: isSelected, disabled: !!item.disabled }}
                  style={[
                    styles.option,
                    {
                      paddingHorizontal: spacing[s.px],
                      paddingVertical: spacing.sm,
                      backgroundColor: isSelected
                        ? `${colors.primary}12`
                        : "transparent",
                      opacity: item.disabled ? 0.4 : 1,
                    },
                  ]}
                >
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      size={iconSizes[s.icon]}
                      color={isSelected ? colors.primary : colors.text}
                      style={{ marginRight: spacing.sm }}
                    />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: fontSizes[s.font],
                        color: isSelected ? colors.primary : colors.text,
                        fontWeight: isSelected ? "600" : "400",
                      }}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text
                        style={{
                          fontSize: fontSizes.xs,
                          color: colors.muted,
                          marginTop: 2,
                        }}
                        numberOfLines={1}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>
                  {isSelected && (
                    <Icon
                      name="checkmark"
                      size={iconSizes[s.icon]}
                      color={colors.primary}
                      style={{ marginLeft: spacing.sm }}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      {error && (
        <Text
          style={{
            marginTop: spacing.xs,
            color: colors.danger,
            fontSize: fontSizes.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
});

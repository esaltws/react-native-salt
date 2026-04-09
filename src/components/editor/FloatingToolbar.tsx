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

type ToolbarItem = {
  key: string;
  icon: string;
  label?: string;
  disabled?: boolean;
};

type Position = "top" | "bottom" | "left" | "right";

type Props = {
  items: ToolbarItem[];
  selected?: string;
  onSelect: (key: string) => void;
  position?: Position;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function FloatingToolbar({
  items,
  selected,
  onSelect,
  position = "bottom",
  horizontal = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  const positionStyle: ViewStyle =
    position === "top"
      ? { top: spacing.lg, left: 0, right: 0 }
      : position === "bottom"
      ? { bottom: spacing.lg, left: 0, right: 0 }
      : position === "left"
      ? { left: spacing.lg, top: "5%" }
      : { right: spacing.lg, top: "5%" };

  const isHorizontal = position === "top" || position === "bottom" ? horizontal : false;

  return (
    <View
      testID={testID}
      style={[
        styles.wrapper,
        { position: "absolute", ...positionStyle },
        (position === "top" || position === "bottom") && styles.centerH,
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.toolbar,
          {
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.xs,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: isHorizontal ? "row" : "column",
            gap: spacing.xs,
          },
          styles.shadow,
          style,
        ]}
      >
        {items.map((item) => {
          const isActive = selected === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => !item.disabled && onSelect(item.key)}
              disabled={item.disabled}
              style={[
                styles.item,
                {
                  backgroundColor: isActive
                    ? colors.primary + "18"
                    : "transparent",
                  borderRadius: radius.md,
                  padding: spacing.sm,
                  opacity: item.disabled ? 0.4 : 1,
                },
              ]}
            >
              <Icon
                name={item.icon}
                size={20}
                color={isActive ? colors.primary : colors.text}
              />
              {item.label && (
                <Text
                  style={{
                    fontSize: 10,
                    color: isActive ? colors.primary : colors.muted,
                    marginTop: 2,
                  }}
                >
                  {item.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  centerH: {
    alignItems: "center",
  },
  toolbar: {},
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
  },
});

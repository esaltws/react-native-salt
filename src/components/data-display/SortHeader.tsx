import React from "react";
import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type SortDirection = "asc" | "desc" | null;

type Props = {
  label: string;
  active?: boolean;
  direction?: SortDirection;
  onPress: () => void;
  align?: "left" | "center" | "right";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function SortHeader({
  label,
  active = false,
  direction = null,
  onPress,
  align = "left",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, iconSizes } = theme;

  const iconName =
    direction === "asc"
      ? "arrow-up-outline"
      : direction === "desc"
      ? "arrow-down-outline"
      : "swap-vertical-outline";

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.xs,
          justifyContent:
            align === "right"
              ? "flex-end"
              : align === "center"
              ? "center"
              : "flex-start",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: fontSizes.xs,
          fontWeight: "700",
          color: active ? colors.primary : colors.muted,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
      <View style={{ marginLeft: spacing.xs }}>
        <Icon
          name={iconName}
          size={iconSizes.xs}
          color={active ? colors.primary : colors.muted}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

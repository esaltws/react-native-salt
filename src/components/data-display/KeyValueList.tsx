import React, { ReactNode } from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type KeyValueItem = {
  key: string;
  label: string;
  value: string | ReactNode;
  icon?: string;
  onPress?: () => void;
};

type Props = {
  items: KeyValueItem[];
  bordered?: boolean;
  compact?: boolean;
  labelWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function KeyValueList({
  items,
  bordered = true,
  compact = false,
  labelWidth,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;

  const py = compact ? spacing.sm : spacing.md;

  return (
    <View
      testID={testID}
      style={[
        bordered && {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.md,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Wrapper = item.onPress ? Pressable : View;

        return (
          <Wrapper
            key={item.key}
            onPress={item.onPress}
            style={[
              styles.row,
              {
                paddingVertical: py,
                paddingHorizontal: spacing.md,
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: colors.border,
              },
            ]}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                size={iconSizes.sm}
                color={colors.muted}
                style={{ marginRight: spacing.sm }}
              />
            )}
            <Text
              style={[
                {
                  fontSize: fontSizes.sm,
                  color: colors.muted,
                },
                labelWidth ? { width: labelWidth } : { flex: 1 },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
            {typeof item.value === "string" ? (
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  color: colors.text,
                  fontWeight: "500",
                  flex: labelWidth ? 1 : undefined,
                  textAlign: "right",
                }}
                numberOfLines={1}
              >
                {item.value}
              </Text>
            ) : (
              <View style={{ flex: labelWidth ? 1 : undefined, alignItems: "flex-end" }}>
                {item.value}
              </View>
            )}
            {item.onPress && (
              <Icon
                name="chevron-forward-outline"
                size={iconSizes.xs}
                color={colors.muted}
                style={{ marginLeft: spacing.xs }}
              />
            )}
          </Wrapper>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

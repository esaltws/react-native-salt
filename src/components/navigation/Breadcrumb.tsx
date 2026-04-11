import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Size, FontSize, IconSize } from "../../types";

type BreadcrumbItem = {
  key: string;
  label: string;
  icon?: string;
  onPress?: () => void;
};

type Props = {
  items: BreadcrumbItem[];
  separator?: string;
  separatorIcon?: string;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const COMPACT_MAP: Record<Size, { font: FontSize; icon: IconSize; sep: FontSize }> = {
  sm: { font: "xs", icon: "xs", sep: "xs" },
  md: { font: "sm", icon: "sm", sep: "xs" },
  lg: { font: "md", icon: "md", sep: "sm" },
};

export default function Breadcrumb({
  items,
  separator,
  separatorIcon = "chevron-forward-outline",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, iconSizes } = theme;
  const s = COMPACT_MAP[size];

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.xs }, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Wrapper = item.onPress && !isLast ? Pressable : View;

        return (
          <React.Fragment key={item.key}>
            <Wrapper
              onPress={item.onPress}
              style={styles.item}
              {...(item.onPress && !isLast
                ? {
                    accessibilityRole: "link" as const,
                    accessibilityLabel: item.label,
                  }
                : {})}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={iconSizes[s.icon]}
                  color={isLast ? colors.text : colors.primary}
                  style={{ marginRight: spacing.xs }}
                />
              )}
              <Text
                style={{
                  fontSize: fontSizes[s.font],
                  color: isLast ? colors.text : colors.primary,
                  fontWeight: isLast ? "600" : "400",
                }}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Wrapper>

            {!isLast && (
              separator ? (
                <Text
                  style={{
                    fontSize: fontSizes[s.sep],
                    color: colors.muted,
                  }}
                >
                  {separator}
                </Text>
              ) : (
                <Icon
                  name={separatorIcon}
                  size={fontSizes[s.sep]}
                  color={colors.muted}
                />
              )
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
});

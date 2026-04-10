import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Size } from "../../types";

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

const SIZE_MAP = {
  sm: { font: 12, icon: 12, sep: 10 },
  md: { font: 14, icon: 16, sep: 12 },
  lg: { font: 16, icon: 18, sep: 14 },
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
  const { colors, spacing } = theme;
  const s = SIZE_MAP[size];

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
                  size={s.icon}
                  color={isLast ? colors.text : colors.primary}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={{
                  fontSize: s.font,
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
                    fontSize: s.sep,
                    color: colors.muted,
                  }}
                >
                  {separator}
                </Text>
              ) : (
                <Icon
                  name={separatorIcon}
                  size={s.sep}
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

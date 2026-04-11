import React from "react";
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Size } from "../../types";

type TabItem = {
  key: string;
  label: string;
  badge?: number;
};

type Props = {
  items: TabItem[];
  selected: string;
  onSelect: (key: string) => void;
  size?: Size;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Tabs({
  items,
  selected,
  onSelect,
  size = "md",
  scrollable = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, radius, dimensions, sizeMap } = theme;

  const HEIGHT_MAP = { sm: dimensions.sm, md: sizeMap.md, lg: sizeMap.xl };
  const height = HEIGHT_MAP[size];
  const fontSize = fontSizes[size === "lg" ? "md" : "sm"];

  const renderTab = (item: TabItem) => {
    const isActive = item.key === selected;
    return (
      <Pressable
        key={item.key}
        onPress={() => onSelect(item.key)}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        style={[
          styles.tab,
          {
            height,
            paddingHorizontal: spacing.lg,
            borderBottomWidth: 2,
            borderBottomColor: isActive ? colors.primary : "transparent",
          },
        ]}
      >
        <Text
          style={{
            fontSize,
            fontWeight: isActive ? "600" : "400",
            color: isActive ? colors.primary : colors.muted,
          }}
        >
          {item.label}
        </Text>
        {item.badge !== undefined && item.badge > 0 && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.primary,
                borderRadius: radius.xl,
                marginLeft: spacing.xs,
                paddingHorizontal: spacing.sm,
                paddingVertical: 1,
              },
            ]}
          >
            <Text
              style={{
                color: colors.onPrimary,
                fontSize: fontSizes.xs,
                fontWeight: "600",
              }}
            >
              {item.badge > 99 ? "99+" : item.badge}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  const content = items.map(renderTab);

  return (
    <View
      testID={testID}
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      {scrollable ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  scrollContent: {
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState, useRef } from "react";
import {
  View,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItem = {
  key: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
};

type Props = {
  items: AccordionItem[];
  expandedKeys?: string[];
  onToggle?: (key: string) => void;
  multiple?: boolean;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Accordion({
  items,
  expandedKeys: controlledKeys,
  onToggle,
  multiple = false,
  bordered = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const [internalKeys, setInternalKeys] = useState<string[]>([]);

  const expanded = controlledKeys ?? internalKeys;

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (onToggle) {
      onToggle(key);
      return;
    }

    setInternalKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      return multiple ? [...prev, key] : [key];
    });
  };

  return (
    <View
      testID={testID}
      style={[
        bordered && {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const isOpen = expanded.includes(item.key);
        return (
          <View key={item.key}>
            {index > 0 && bordered && (
              <View style={{ height: 1, backgroundColor: colors.border }} />
            )}
            <Pressable
              onPress={() => toggle(item.key)}
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              style={[
                styles.header,
                {
                  padding: spacing.md,
                  backgroundColor: isOpen
                    ? colors.primary + "08"
                    : "transparent",
                },
              ]}
            >
              {item.icon && (
                <Icon
                  name={item.icon}
                  size={18}
                  color={isOpen ? colors.primary : colors.muted}
                  style={{ marginRight: spacing.sm }}
                />
              )}
              <Text
                style={{
                  flex: 1,
                  fontSize: fontSizes.md,
                  fontWeight: isOpen ? "600" : "400",
                  color: isOpen ? colors.primary : colors.text,
                }}
              >
                {item.title}
              </Text>
              <Icon
                name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                size={18}
                color={isOpen ? colors.primary : colors.muted}
              />
            </Pressable>

            {isOpen && (
              <View
                style={{
                  paddingHorizontal: spacing.md,
                  paddingBottom: spacing.md,
                }}
              >
                {item.content}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  UIManager,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Icon } from "../theme-settings/Icon";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Button from "../buttons/Button";
import Stack from "./Stack";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  title: string;
  subtitle?: string;
  icon?: string;
  actionText?: string;
  onActionPress?: () => void;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  children?: React.ReactNode;
  sticky?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  icon,
  actionText,
  onActionPress,
  collapsible = false,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  children,
  sticky = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const isControlled = controlledCollapsed !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const chevronAnim = useRef(new Animated.Value(isCollapsed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(chevronAnim, {
      toValue: isCollapsed ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isCollapsed, chevronAnim]);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const next = !isCollapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const chevronRotation = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const headerRow = (
    <View style={styles.row}>
      <Stack direction="horizontal" gap="xs" style={styles.titleArea}>
        {icon ? <Icon name={icon} size={20} color={colors.text} /> : null}
        <Stack gap="xs" style={styles.flex}>
          <Title fontSize="md">{title}</Title>
          {subtitle ? (
            <Caption>{subtitle}</Caption>
          ) : null}
        </Stack>
      </Stack>

      {collapsible ? (
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <Icon name="chevron-up-outline" size={20} color={colors.muted} />
        </Animated.View>
      ) : actionText && onActionPress ? (
        <Button title={actionText} variant="text" onPress={onActionPress} />
      ) : null}
    </View>
  );

  return (
    <View
      testID={testID}
      style={[
        sticky && {
          zIndex: 10,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {collapsible ? (
        <Pressable
          onPress={toggleCollapse}
          accessibilityRole="button"
          accessibilityState={{ expanded: !isCollapsed }}
        >
          {headerRow}
        </Pressable>
      ) : (
        headerRow
      )}

      {collapsible && !isCollapsed && children ? (
        <View style={{ marginTop: spacing.sm }}>{children}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleArea: {
    flex: 1,
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
});

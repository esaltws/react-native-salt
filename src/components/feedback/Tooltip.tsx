import React, { useState, useRef } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type TooltipPosition = "top" | "bottom" | "left" | "right";

type Props = {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
  maxWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Tooltip({
  content,
  children,
  position = "top",
  visible: controlledVisible,
  onToggle,
  maxWidth = 200,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({ width: 0, height: 0 });

  const isVisible = controlledVisible ?? internalVisible;

  const toggle = () => {
    const next = !isVisible;
    if (onToggle) {
      onToggle(next);
    } else {
      setInternalVisible(next);
    }
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setTriggerLayout({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const tipStyle: ViewStyle =
    position === "top"
      ? { bottom: triggerLayout.height + 8, left: 0 }
      : position === "bottom"
      ? { top: triggerLayout.height + 8, left: 0 }
      : position === "left"
      ? { right: triggerLayout.width + 8, top: 0 }
      : { left: triggerLayout.width + 8, top: 0 };

  return (
    <View testID={testID} style={[styles.wrapper, style]}>
      <Pressable onPress={toggle} onLayout={handleLayout} accessibilityRole="button" accessibilityHint="Shows tooltip">
        <View pointerEvents="none">{children}</View>
      </Pressable>

      {isVisible && (
        <View
          style={[
            styles.tooltip,
            {
              backgroundColor: theme.mode === "dark" ? "#334155" : "#1e293b",
              borderRadius: radius.sm,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
              maxWidth,
              ...tipStyle,
            },
          ]}
        >
          <Text
            style={{
              color: "#f8fafc",
              fontSize: fontSizes.xs,
              lineHeight: 16,
            }}
          >
            {content}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  tooltip: {
    position: "absolute",
    zIndex: 9999,
  },
});

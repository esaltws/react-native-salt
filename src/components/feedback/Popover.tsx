import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Pressable,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type PopoverPosition = "top" | "bottom" | "left" | "right";

type Props = {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: PopoverPosition;
  visible?: boolean;
  onToggle?: (visible: boolean) => void;
  closeOnPress?: boolean;
  maxWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Popover({
  content,
  children,
  position = "bottom",
  visible: controlledVisible,
  onToggle,
  closeOnPress = true,
  maxWidth = 280,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;
  const [internalVisible, setInternalVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);

  const isControlled = controlledVisible !== undefined;
  const isVisible = isControlled ? controlledVisible : internalVisible;

  const show = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
      });
    }
    if (isControlled) {
      onToggle?.(true);
    } else {
      setInternalVisible(true);
    }
  };

  const hide = () => {
    if (isControlled) {
      onToggle?.(false);
    } else {
      setInternalVisible(false);
    }
  };

  const screen = Dimensions.get("window");

  const getPopoverStyle = (): ViewStyle => {
    const { x, y, width, height } = triggerLayout;
    const gap = 8;

    switch (position) {
      case "top":
        return {
          position: "absolute",
          bottom: screen.height - y + gap,
          left: Math.max(8, x + width / 2 - maxWidth / 2),
        };
      case "bottom":
        return {
          position: "absolute",
          top: y + height + gap,
          left: Math.max(8, x + width / 2 - maxWidth / 2),
        };
      case "left":
        return {
          position: "absolute",
          top: y,
          right: screen.width - x + gap,
        };
      case "right":
        return {
          position: "absolute",
          top: y,
          left: x + width + gap,
        };
    }
  };

  return (
    <>
      <View ref={triggerRef} collapsable={false} testID={testID}>
        <Pressable onPress={show} accessibilityRole="button" accessibilityState={{ expanded: isVisible }}>
          <View pointerEvents="none">{children}</View>
        </Pressable>
      </View>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={hide}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={hide}>
          <View
            style={[
              getPopoverStyle(),
              {
                maxWidth,
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                padding: spacing.md,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
                elevation: 6,
              },
              style,
            ]}
          >
            <Pressable onPress={closeOnPress ? hide : undefined}>
              {content}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

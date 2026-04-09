import React, { useRef } from "react";
import {
  View,
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Icon from "../theme-settings/Icon";

type SwipeAction = {
  key: string;
  icon: string;
  label?: string;
  color: string;
  onPress: () => void;
};

type Props = {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  actionWidth?: number;
  threshold?: number;
  onSwipeOpen?: (side: "left" | "right") => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function SwipeableRow({
  children,
  leftActions = [],
  rightActions = [],
  actionWidth = 72,
  threshold = 0.4,
  onSwipeOpen,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors } = theme;
  const translateX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  const leftWidth = leftActions.length * actionWidth;
  const rightWidth = rightActions.length * actionWidth;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (_, gestureState) => {
        const newX = lastOffset.current + gestureState.dx;
        const clamped = Math.max(-rightWidth, Math.min(leftWidth, newX));
        translateX.setValue(clamped);
      },
      onPanResponderRelease: (_, gestureState) => {
        const newX = lastOffset.current + gestureState.dx;

        let snapTo = 0;

        if (newX > leftWidth * threshold && leftActions.length > 0) {
          snapTo = leftWidth;
          onSwipeOpen?.("left");
        } else if (
          newX < -rightWidth * threshold &&
          rightActions.length > 0
        ) {
          snapTo = -rightWidth;
          onSwipeOpen?.("right");
        }

        lastOffset.current = snapTo;
        Animated.spring(translateX, {
          toValue: snapTo,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      },
    })
  ).current;

  const close = () => {
    lastOffset.current = 0;
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const renderActions = (actions: SwipeAction[], side: "left" | "right") => (
    <View
      style={[
        styles.actionsContainer,
        side === "left"
          ? { left: 0 }
          : { right: 0 },
        { flexDirection: "row" },
      ]}
    >
      {actions.map((action) => (
        <Pressable
          key={action.key}
          onPress={() => {
            close();
            action.onPress();
          }}
          accessibilityRole="button"
          accessibilityLabel={action.label ?? action.icon}
          style={[
            styles.actionBtn,
            {
              width: actionWidth,
              backgroundColor: action.color,
            },
          ]}
        >
          <Icon name={action.icon} size={22} color={colors.surface} />
          {action.label && (
            <Label
              fontSize="sm"
              style={{
                color: colors.surface,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              {action.label}
            </Label>
          )}
        </Pressable>
      ))}
    </View>
  );

  return (
    <View testID={testID} style={[styles.container, { backgroundColor: colors.surface }, style]}>
      {/* Background actions */}
      {leftActions.length > 0 && renderActions(leftActions, "left")}
      {rightActions.length > 0 && renderActions(rightActions, "right")}

      {/* Foreground content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  actionsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 12,
    overflow: "hidden",
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    zIndex: 1,
  },
});

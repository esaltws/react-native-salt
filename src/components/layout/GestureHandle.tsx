import React, { useRef, useCallback } from "react";
import {
  Animated,
  Pressable,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { HandlePosition, HandleVariant } from "../../types";

type GestureCallbacks = {
  onDragStart?: () => void;
  onDrag?: (dx: number, dy: number) => void;
  onDragEnd?: (dx: number, dy: number) => void;
};

type Props = {
  position?: HandlePosition;
  size?: number;
  color?: string;
  variant?: HandleVariant;
  hitSlop?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
} & GestureCallbacks;

export default function GestureHandle({
  position = "bottom",
  size = 8,
  color,
  variant = "dot",
  hitSlop = 12,
  onPress,
  onDragStart,
  onDrag,
  onDragEnd,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const handleColor = color ?? colors.muted;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const hasDragging = onDrag || onDragStart || onDragEnd;

  const animateIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [scaleAnim]);

  const animateOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [scaleAnim]);

  // Keep callbacks in refs for stable PanResponder
  const callbacksRef = useRef({ onDragStart, onDrag, onDragEnd });
  callbacksRef.current = { onDragStart, onDrag, onDragEnd };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animateIn();
        callbacksRef.current.onDragStart?.();
      },
      onPanResponderMove: (_e: GestureResponderEvent, gs: PanResponderGestureState) => {
        callbacksRef.current.onDrag?.(gs.dx, gs.dy);
      },
      onPanResponderRelease: (_e: GestureResponderEvent, gs: PanResponderGestureState) => {
        animateOut();
        callbacksRef.current.onDragEnd?.(gs.dx, gs.dy);
      },
      onPanResponderTerminate: () => {
        animateOut();
      },
    })
  ).current;

  const hitSlopValue = { top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop };

  const renderHandle = () => {
    if (variant === "bar") {
      const isVertical = position === "left" || position === "right";
      return (
        <Animated.View
          style={[
            styles.barContainer,
            isVertical ? styles.barVertical : styles.barHorizontal,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View
            style={{
              width: isVertical ? 4 : 36,
              height: isVertical ? 36 : 4,
              borderRadius: 2,
              backgroundColor: handleColor,
            }}
          />
        </Animated.View>
      );
    }

    if (variant === "corner") {
      return (
        <Animated.View
          style={[styles.cornerHandle, { transform: [{ scale: scaleAnim }] }]}
        >
          <View
            style={{
              width: size + 4,
              height: size + 4,
              borderRadius: (size + 4) / 2,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          />
        </Animated.View>
      );
    }

    // Default: dot
    return (
      <Animated.View
        style={[
          styles.dotContainer,
          { padding: spacing.xs, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: handleColor,
          }}
        />
      </Animated.View>
    );
  };

  if (hasDragging) {
    return (
      <View
        testID={testID}
        style={style}
        hitSlop={hitSlopValue}
        {...panResponder.panHandlers}
      >
        {renderHandle()}
      </View>
    );
  }

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        style={style}
        hitSlop={hitSlopValue}
        onPress={onPress}
        onPressIn={animateIn}
        onPressOut={animateOut}
      >
        {renderHandle()}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={style}>
      {renderHandle()}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  barContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  barHorizontal: {
    alignSelf: "center",
  },
  barVertical: {
    alignSelf: "center",
  },
  cornerHandle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

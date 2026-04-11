import React, { useRef, useCallback } from "react";
import {
  View,
  PanResponder,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Size, IconSize } from "../../types";

const TRACK_HEIGHT = { sm: 3, md: 4, lg: 6 };
const THUMB_MAP: Record<Size, IconSize> = { sm: "sm", md: "md", lg: "xl" };

type Props = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: Size;
  disabled?: boolean;
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  disabled = false,
  showValue = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes, spacing, iconSizes } = theme;

  const trackHeight = TRACK_HEIGHT[size];
  const thumbSize = iconSizes[THUMB_MAP[size]];
  const trackWidth = useRef(0);
  const trackRef = useRef<View>(null);
  const trackPageX = useRef(0);

  // Keep latest props in refs so PanResponder always has fresh values
  const propsRef = useRef({ min, max, step, onValueChange, disabled });
  propsRef.current = { min, max, step, onValueChange, disabled };

  const clamp = useCallback((v: number, lo: number, hi: number) => {
    return Math.min(hi, Math.max(lo, v));
  }, []);

  const valueFromPageX = useCallback((pageX: number) => {
    const { min: lo, max: hi, step: s } = propsRef.current;
    const w = trackWidth.current;
    if (w <= 0) return lo;
    const localX = pageX - trackPageX.current;
    const ratio = clamp(localX / w, 0, 1);
    const raw = lo + ratio * (hi - lo);
    const snapped = Math.round((raw - lo) / s) * s + lo;
    return clamp(parseFloat(snapped.toFixed(10)), lo, hi);
  }, [clamp]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !propsRef.current.disabled,
      onMoveShouldSetPanResponder: () => !propsRef.current.disabled,
      onPanResponderGrant: (e) => {
        // Measure track position on screen for accurate calculation
        trackRef.current?.measure((_x, _y, _w, _h, pageX) => {
          if (pageX != null) trackPageX.current = pageX;
          const val = valueFromPageX(e.nativeEvent.pageX);
          propsRef.current.onValueChange(val);
        });
      },
      onPanResponderMove: (e) => {
        const val = valueFromPageX(e.nativeEvent.pageX);
        propsRef.current.onValueChange(val);
      },
    })
  ).current;

  const fraction = max === min ? 0 : (clamp(value, min, max) - min) / (max - min);

  const onLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
    // Also measure page position for accurate touch handling
    trackRef.current?.measure((_x, _y, _w, _h, pageX) => {
      if (pageX != null) trackPageX.current = pageX;
    });
  };

  return (
    <View
      testID={testID}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      accessibilityState={{ disabled }}
    >
      <View
        ref={trackRef}
        style={[styles.trackContainer, { height: thumbSize }]}
        onLayout={onLayout}
        {...panResponder.panHandlers}
      >
        {/* Background track */}
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: colors.border,
            },
          ]}
        />
        {/* Filled track */}
        <View
          style={[
            styles.track,
            styles.filledTrack,
            {
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: colors.primary,
              width: `${fraction * 100}%`,
            },
          ]}
        />
        {/* Thumb */}
        <View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: colors.primary,
              left: `${fraction * 100}%`,
              marginLeft: -(thumbSize / 2),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
            },
          ]}
        />
      </View>
      {showValue && (
        <Text
          style={{
            fontSize: fontSizes.sm,
            color: colors.muted,
            textAlign: "center",
            marginTop: spacing.xs,
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trackContainer: {
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  filledTrack: {
    right: undefined,
  },
  thumb: {
    position: "absolute",
  },
});

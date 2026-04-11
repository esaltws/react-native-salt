import React, { useRef, useState, useCallback } from "react";
import {
  View,
  PanResponder,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import { Intent } from "../../types";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  low: number;
  high: number;
  onChangeRange: (low: number, high: number) => void;
  minGap?: number;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  intent?: Intent;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  low,
  high,
  onChangeRange,
  minGap,
  showValues = true,
  formatValue,
  intent = "primary",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, iconSizes } = theme;
  const [trackWidth, setTrackWidth] = useState(0);
  const accentColor = colors[intent] || colors.primary;

  const thumbSize = iconSizes.xl;
  const trackHeight = 6;
  const gap = minGap ?? step;

  // Use refs so PanResponder always reads fresh values
  const lowRef = useRef(low);
  const highRef = useRef(high);
  const trackWidthRef = useRef(trackWidth);
  lowRef.current = low;
  highRef.current = high;
  trackWidthRef.current = trackWidth;

  // Store the position at gesture start
  const startPosRef = useRef(0);

  const valueToPosition = useCallback(
    (val: number) => ((val - min) / (max - min)) * trackWidthRef.current,
    [min, max]
  );

  const positionToValue = useCallback(
    (pos: number) => {
      const tw = trackWidthRef.current;
      if (tw === 0) return min;
      const raw = (pos / tw) * (max - min) + min;
      const stepped = Math.round(raw / step) * step;
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step]
  );

  const lowPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        startPosRef.current = valueToPosition(lowRef.current);
      },
      onPanResponderMove: (_, gs) => {
        const newVal = positionToValue(startPosRef.current + gs.dx);
        const clamped = Math.min(newVal, highRef.current - gap);
        if (clamped !== lowRef.current) {
          onChangeRange(clamped, highRef.current);
        }
      },
    })
  ).current;

  const highPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        startPosRef.current = valueToPosition(highRef.current);
      },
      onPanResponderMove: (_, gs) => {
        const newVal = positionToValue(startPosRef.current + gs.dx);
        const clamped = Math.max(newVal, lowRef.current + gap);
        if (clamped !== highRef.current) {
          onChangeRange(lowRef.current, clamped);
        }
      },
    })
  ).current;

  const lowPos = valueToPosition(low);
  const highPos = valueToPosition(high);

  const displayValue = (v: number) =>
    formatValue ? formatValue(v) : String(v);

  return (
    <View testID={testID} style={[{ opacity: disabled ? 0.5 : 1 }, style]}>
      {showValues && (
        <View style={[styles.valueRow, { marginBottom: spacing.sm }]}>
          <Label>{displayValue(low)}</Label>
          <Caption>—</Caption>
          <Label>{displayValue(high)}</Label>
        </View>
      )}

      <View
        style={[styles.trackContainer, { height: thumbSize }]}
        onLayout={(e: LayoutChangeEvent) =>
          setTrackWidth(e.nativeEvent.layout.width)
        }
      >
        {/* Background track */}
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: colors.border,
              borderRadius: trackHeight / 2,
            },
          ]}
        />

        {/* Active range */}
        {trackWidth > 0 && (
          <View
            style={[
              styles.activeTrack,
              {
                height: trackHeight,
                left: lowPos,
                width: highPos - lowPos,
                backgroundColor: accentColor,
                borderRadius: trackHeight / 2,
              },
            ]}
          />
        )}

        {/* Low thumb */}
        {trackWidth > 0 && (
          <View
            {...lowPan.panHandlers}
            hitSlop={{ top: spacing.md, bottom: spacing.md, left: spacing.md, right: spacing.md }}
            accessibilityRole="adjustable"
            accessibilityLabel="Minimum value"
            accessibilityValue={{ min, max, now: low }}
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: colors.surface,
                borderWidth: 3,
                borderColor: accentColor,
                left: lowPos - thumbSize / 2,
                zIndex: low === high ? 2 : 1,
              },
            ]}
          />
        )}

        {/* High thumb */}
        {trackWidth > 0 && (
          <View
            {...highPan.panHandlers}
            hitSlop={{ top: spacing.md, bottom: spacing.md, left: spacing.md, right: spacing.md }}
            accessibilityRole="adjustable"
            accessibilityLabel="Maximum value"
            accessibilityValue={{ min, max, now: high }}
            style={[
              styles.thumb,
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                backgroundColor: colors.surface,
                borderWidth: 3,
                borderColor: accentColor,
                left: highPos - thumbSize / 2,
                zIndex: 1,
              },
            ]}
          />
        )}
      </View>

      {/* Min/Max labels */}
      <View style={[styles.valueRow, { marginTop: spacing.xs }]}>
        <Caption>{displayValue(min)}</Caption>
        <Caption>{displayValue(max)}</Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackContainer: {
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  activeTrack: {
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});

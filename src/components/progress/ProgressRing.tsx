import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Intent, SizeToken } from "../../types";

const RING_SIZE = { sm: 80, md: 120, lg: 160 };
const STROKE_WIDTH = { sm: 6, md: 8, lg: 10 };
const SEGMENT_COUNT = 60;

type Props = {
  progress: number; // 0 to 1
  intent?: Intent;
  size?: SizeToken;
  label?: string;
  sublabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ProgressRing({
  progress,
  intent = "primary",
  size = "md",
  label,
  sublabel,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes } = theme;

  const ringSize = RING_SIZE[size];
  const sw = STROKE_WIDTH[size];
  const half = ringSize / 2;
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const barColor = (colors as any)[intent] || colors.primary;
  const percentage = Math.round(clampedProgress * 100);

  // Radius at center of stroke
  const r = (ringSize - sw) / 2;
  const activeCount = Math.round(clampedProgress * SEGMENT_COUNT);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View style={{ width: ringSize, height: ringSize }}>
        {/* Track circle */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: half,
              borderWidth: sw,
              borderColor: colors.border,
            },
          ]}
        />

        {/* Progress segments — overlapping dots forming smooth arc */}
        {Array.from({ length: activeCount }).map((_, i) => {
          const angle = (i / SEGMENT_COUNT) * 360;
          const rad = ((angle - 90) * Math.PI) / 180;
          return (
            <View
              key={i}
              style={{
                position: "absolute",
                left: half + r * Math.cos(rad) - sw / 2,
                top: half + r * Math.sin(rad) - sw / 2,
                width: sw,
                height: sw,
                borderRadius: sw / 2,
                backgroundColor: barColor,
              }}
            />
          );
        })}

        {/* Center label */}
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          {label ? (
            <Text
              style={{
                fontWeight: "700",
                fontSize: fontSizes[size === "sm" ? "md" : "lg"],
              }}
            >
              {label}
            </Text>
          ) : (
            <Text
              style={{
                fontWeight: "700",
                fontSize: fontSizes[size === "sm" ? "md" : "lg"],
              }}
            >
              {percentage}%
            </Text>
          )}
          {sublabel && (
            <Text
              style={{
                color: colors.muted,
                fontSize: fontSizes.xs,
                marginTop: 2,
              }}
            >
              {sublabel}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

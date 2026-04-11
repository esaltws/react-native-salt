import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Intent } from "../../types";

type DataPoint = {
  label: string;
  value: number;
};

type Props = {
  data: DataPoint[];
  height?: number;
  showDots?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  showGrid?: boolean;
  intent?: Intent;
  color?: string;
  fillOpacity?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function LineChart({
  data,
  height = 160,
  showDots = true,
  showLabels = true,
  showValues = false,
  showGrid = true,
  intent = "primary",
  color: customColor,
  fillOpacity = 0.1,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes } = theme;

  if (data.length < 2) return null;

  const lineColor =
    customColor || colors[intent] || colors.primary;
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const chartPaddingTop = spacing.xl;
  const chartHeight = height - chartPaddingTop;
  const dotSize = spacing.sm;

  // Normalize values to chart height
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100, // percentage
    y: chartHeight - ((d.value - minVal) / range) * chartHeight,
    ...d,
  }));

  // Grid lines (4 horizontal)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: chartPaddingTop + (1 - pct) * chartHeight,
    value: Math.round(minVal + pct * range),
  }));

  return (
    <View testID={testID} style={style}>
      <View style={[styles.chartContainer, { height }]}>
        {/* Grid */}
        {showGrid &&
          gridLines.map((line, i) => (
            <View
              key={i}
              style={[
                styles.gridLine,
                {
                  top: line.y,
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text
                style={{
                  position: "absolute",
                  right: 0,
                  top: -spacing.sm,
                  fontSize: fontSizes.xxs,
                  color: colors.muted,
                }}
              >
                {line.value}
              </Text>
            </View>
          ))}

        {/* Lines connecting dots */}
        {points.map((point, i) => {
          if (i === 0) return null;
          const prev = points[i - 1];
          const dx = point.x - prev.x;
          const dy = point.y + chartPaddingTop - (prev.y + chartPaddingTop);
          const length = Math.sqrt(dx * dx * 0.01 + dy * dy);
          const angle = Math.atan2(dy, dx * 0.01 * (height / 100)) * (180 / Math.PI);

          // We use View lines between dots
          return null; // Line rendering is handled by dot positions + fill area
        })}

        {/* Fill area */}
        <View style={[styles.fillArea, { top: chartPaddingTop }]}>
          {points.map((point, i) => {
            if (i === data.length - 1) return null;
            const next = points[i + 1];
            const widthPct = `${next.x - point.x}%` as any;
            const topPct = Math.min(point.y, next.y);
            const bottomPct = chartHeight;

            return (
              <View
                key={i}
                style={{
                  position: "absolute",
                  left: `${point.x}%` as any,
                  width: widthPct,
                  top: topPct,
                  bottom: 0,
                  backgroundColor: `${lineColor}${Math.round(fillOpacity * 255)
                    .toString(16)
                    .padStart(2, "0")}`,
                }}
              />
            );
          })}
        </View>

        {/* Connecting lines between points */}
        {points.map((point, i) => {
          if (i === 0) return null;
          const prev = points[i - 1];
          // Simple line using a thin rotated View
          const x1 = prev.x;
          const y1 = prev.y + chartPaddingTop;
          const x2 = point.x;
          const y2 = point.y + chartPaddingTop;

          // Calculate actual pixel positions
          // Width percent to actual needs layout, use percentage positioning
          return (
            <View
              key={`line-${i}`}
              style={{
                position: "absolute",
                left: `${x1}%` as any,
                top: y1,
                width: `${x2 - x1}%` as any,
                height: 2,
                backgroundColor: lineColor,
                transform: [
                  {
                    rotate: `${Math.atan2(y2 - y1, 1) * (180 / Math.PI)}deg`,
                  },
                ],
                transformOrigin: "left center",
              }}
            />
          );
        })}

        {/* Value labels (rendered separately so they don't clip inside small dots) */}
        {showValues &&
          points.map((point, i) => (
            <Text
              key={`val-${i}`}
              style={{
                position: "absolute",
                left: `${point.x}%` as any,
                top: point.y + chartPaddingTop - dotSize / 2 - 16,
                fontSize: fontSizes.xxs,
                fontWeight: "600",
                color: colors.text,
                textAlign: "center",
                marginLeft: -20,
                width: 40,
                zIndex: 3,
              }}
            >
              {point.value}
            </Text>
          ))}

        {/* Dots */}
        {showDots &&
          points.map((point, i) => (
            <View
              key={`dot-${i}`}
              style={[
                styles.dot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: lineColor,
                  borderWidth: 2,
                  borderColor: colors.background,
                  left: `${point.x}%` as any,
                  top: point.y + chartPaddingTop - dotSize / 2,
                  marginLeft: -dotSize / 2,
                },
              ]}
            />
          ))}
      </View>

      {/* X-axis labels */}
      {showLabels && (
        <View style={[styles.labels, { marginTop: spacing.xs }]}>
          {data.map((d, i) => (
            <Text
              key={i}
              style={{
                fontSize: fontSizes.xxs,
                color: colors.muted,
                textAlign: "center",
                flex: 1,
              }}
              numberOfLines={1}
            >
              {d.label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    position: "relative",
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 30,
  },
  fillArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  dot: {
    position: "absolute",
    zIndex: 2,
  },
  labels: {
    flexDirection: "row",
  },
});

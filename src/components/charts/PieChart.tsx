import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type PieSlice = {
  key: string;
  value: number;
  label: string;
  color: string;
};

type Props = {
  slices: PieSlice[];
  size?: number;
  donut?: boolean;
  donutWidth?: number;
  centerLabel?: string;
  centerValue?: string;
  showLegend?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function PieChart({
  slices,
  size = 160,
  donut = false,
  donutWidth = 30,
  centerLabel,
  centerValue,
  showLegend = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes } = theme;

  const total = slices.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  const radius = size / 2;
  const innerRadius = donut ? radius - donutWidth : 0;

  // Build conic gradient simulation with border trick
  // RN doesn't support conic-gradient, so we use overlapping half-circles
  // For simplicity, use colored segments rendered as bordered Views

  // Calculate percentages and cumulative angles
  const segments = slices.map((slice) => ({
    ...slice,
    percentage: (slice.value / total) * 100,
    degrees: (slice.value / total) * 360,
  }));

  // Build segments using the "border" trick for each quarter
  let currentAngle = 0;

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View style={[styles.chartRow, { gap: showLegend ? spacing.xl : 0 }]}>
        {/* Chart */}
        <View
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            overflow: "hidden",
            backgroundColor: colors.border,
          }}
        >
          {/* Segments using absolute positioned rotated views */}
          {segments.map((seg, i) => {
            const startAngle = currentAngle;
            currentAngle += seg.degrees;

            // Render segment as a rotated half-circle
            return (
              <React.Fragment key={seg.key}>
                {seg.degrees <= 180 ? (
                  <View
                    style={[
                      styles.segment,
                      {
                        width: size,
                        height: size,
                        borderRadius: radius,
                        borderWidth: radius,
                        borderColor: "transparent",
                        borderTopColor: seg.color,
                        borderRightColor:
                          seg.degrees > 90 ? seg.color : "transparent",
                        transform: [
                          { rotate: `${startAngle - 90}deg` },
                        ],
                      },
                    ]}
                  />
                ) : (
                  <>
                    <View
                      style={[
                        styles.segment,
                        {
                          width: size,
                          height: size,
                          borderRadius: radius,
                          borderWidth: radius,
                          borderColor: "transparent",
                          borderTopColor: seg.color,
                          borderRightColor: seg.color,
                          transform: [
                            { rotate: `${startAngle - 90}deg` },
                          ],
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.segment,
                        {
                          width: size,
                          height: size,
                          borderRadius: radius,
                          borderWidth: radius,
                          borderColor: "transparent",
                          borderTopColor: seg.color,
                          borderRightColor:
                            seg.degrees > 270
                              ? seg.color
                              : "transparent",
                          transform: [
                            { rotate: `${startAngle + 180 - 90}deg` },
                          ],
                        },
                      ]}
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}

          {/* Donut hole */}
          {donut && (
            <View
              style={[
                styles.donutHole,
                {
                  width: innerRadius * 2,
                  height: innerRadius * 2,
                  borderRadius: innerRadius,
                  backgroundColor: colors.background,
                  top: donutWidth,
                  left: donutWidth,
                },
              ]}
            >
              {centerValue && (
                <Text
                  style={{
                    fontSize: fontSizes.xxl,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {centerValue}
                </Text>
              )}
              {centerLabel && (
                <Text
                  style={{
                    fontSize: fontSizes.xs,
                    color: colors.muted,
                    marginTop: 2,
                  }}
                >
                  {centerLabel}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Legend */}
        {showLegend && (
          <View style={styles.legend}>
            {segments.map((seg) => (
              <View
                key={seg.key}
                style={[styles.legendItem, { marginBottom: spacing.sm }]}
              >
                <View
                  style={{
                    width: spacing.md,
                    height: spacing.md,
                    borderRadius: 3,
                    backgroundColor: seg.color,
                    marginRight: spacing.sm,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: fontSizes.xs,
                      color: colors.text,
                      fontWeight: "500",
                    }}
                    numberOfLines={1}
                  >
                    {seg.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.xs,
                      color: colors.muted,
                    }}
                  >
                    {seg.percentage.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  segment: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  donutHole: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  legend: {
    flex: 1,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});

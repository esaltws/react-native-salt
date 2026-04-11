import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Size, FontSize, Dimension } from "../../types";

type Props = {
  targetDate?: Date;
  seconds?: number;
  onComplete?: () => void;
  running?: boolean;
  showDays?: boolean;
  showLabels?: boolean;
  separator?: string;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const TOKEN_MAP: Record<Size, { num: FontSize; label: FontSize; box: Dimension }> = {
  sm: { num: "lg", label: "xs", box: "md" },
  md: { num: "xxl", label: "xs", box: "xl" },
  lg: { num: "3xl", label: "xs", box: "xxl" },
};

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer({
  targetDate,
  seconds: initialSeconds,
  onComplete,
  running = true,
  showDays = true,
  showLabels = true,
  separator = ":",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, dimensions } = theme;
  const s = TOKEN_MAP[size];

  const getRemaining = (): number => {
    if (targetDate) {
      return Math.max(0, Math.floor((targetDate.getTime() - Date.now()) / 1000));
    }
    return initialSeconds ?? 0;
  };

  const [remaining, setRemaining] = useState(getRemaining);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  const segments: { value: string; label: string }[] = [];
  if (showDays && days > 0) segments.push({ value: pad(days), label: "Days" });
  segments.push({ value: pad(hours), label: "Hours" });
  segments.push({ value: pad(minutes), label: "Min" });
  segments.push({ value: pad(secs), label: "Sec" });

  return (
    <View testID={testID} style={[styles.container, style]}>
      {segments.map((seg, i) => (
        <React.Fragment key={seg.label}>
          {i > 0 && (
            <View
              style={{
                height: dimensions[s.box],
                justifyContent: "center",
                marginHorizontal: spacing.xs,
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes[s.num],
                  fontWeight: "700",
                  color: colors.muted,
                }}
              >
                {separator}
              </Text>
            </View>
          )}
          <View style={styles.segment}>
            <View
              style={[
                styles.box,
                {
                  width: dimensions[s.box],
                  height: dimensions[s.box],
                  borderRadius: radius.md,
                  backgroundColor: colors.primary + "12",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSizes[s.num],
                  fontWeight: "700",
                  color: colors.text,
                  fontFamily: "monospace",
                  includeFontPadding: false,
                  textAlignVertical: "center",
                }}
              >
                {seg.value}
              </Text>
            </View>
            {showLabels && (
              <Text
                style={{
                  fontSize: fontSizes[s.label],
                  color: colors.muted,
                  marginTop: spacing.xs,
                  textAlign: "center",
                }}
              >
                {seg.label}
              </Text>
            )}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 2,
  },
  segment: {
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
});

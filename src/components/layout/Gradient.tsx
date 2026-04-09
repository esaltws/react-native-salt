import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  colors: [string, string, ...string[]];
  direction?: "vertical" | "horizontal" | "diagonal";
  steps?: number;
  height?: number;
  borderRadius?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Gradient({
  colors: gradientColors,
  direction = "vertical",
  steps = 12,
  height,
  borderRadius = 0,
  children,
  style,
  testID,
}: Props) {
  // Generate gradient steps by interpolating between colors
  const gradientSteps: string[] = [];
  const segments = gradientColors.length - 1;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const segIndex = Math.min(Math.floor(t * segments), segments - 1);
    const segT = (t * segments) - segIndex;
    const c1 = hexToRgb(gradientColors[segIndex]);
    const c2 = hexToRgb(gradientColors[segIndex + 1]);

    if (c1 && c2) {
      const r = Math.round(c1.r + (c2.r - c1.r) * segT);
      const g = Math.round(c1.g + (c2.g - c1.g) * segT);
      const b = Math.round(c1.b + (c2.b - c1.b) * segT);
      gradientSteps.push(`rgb(${r},${g},${b})`);
    }
  }

  const isHorizontal = direction === "horizontal";
  const isDiagonal = direction === "diagonal";

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          borderRadius,
          height,
          flexDirection: isHorizontal ? "row" : "column",
          overflow: "hidden",
        },
        style,
      ]}
    >
      {/* Gradient layers */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            flexDirection: isHorizontal ? "row" : "column",
          },
          isDiagonal && {
            flexDirection: "column",
            transform: [{ rotate: "45deg" }, { scale: 1.42 }],
          },
        ]}
      >
        {gradientSteps.map((color, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: color,
            }}
          />
        ))}
      </View>

      {/* Content on top */}
      {children && (
        <View style={[StyleSheet.absoluteFill, styles.content]}>
          {children}
        </View>
      )}
    </View>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace("#", "").match(/.{2}/g);
  if (!match || match.length < 3) return null;
  return {
    r: parseInt(match[0], 16),
    g: parseInt(match[1], 16),
    b: parseInt(match[2], 16),
  };
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  content: {
    zIndex: 1,
  },
});

import React, { useEffect, useRef, useMemo } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = {
  active: boolean;
  count?: number;
  duration?: number;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const DEFAULT_COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#00D084",
  "#FF4081",
];

type Particle = {
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  opacity: Animated.Value;
  color: string;
  size: number;
  shape: "square" | "circle" | "rect";
  startX: number;
  drift: number;
};

export default function Confetti({
  active,
  count = 40,
  duration = 2500,
  colors: customColors,
  style,
  testID,
}: Props) {
  const screen = Dimensions.get("window");
  const palette = customColors || DEFAULT_COLORS;

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => {
        const shapes: Particle["shape"][] = ["square", "circle", "rect"];
        return {
          x: new Animated.Value(0),
          y: new Animated.Value(0),
          rotate: new Animated.Value(0),
          opacity: new Animated.Value(0),
          color: palette[Math.floor(Math.random() * palette.length)],
          size: 6 + Math.random() * 8,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          startX: Math.random() * screen.width,
          drift: (Math.random() - 0.5) * 120,
        };
      }),
    [count, palette]
  );

  useEffect(() => {
    if (active) {
      particles.forEach((p, i) => {
        p.y.setValue(-20);
        p.x.setValue(0);
        p.rotate.setValue(0);
        p.opacity.setValue(1);

        const delay = Math.random() * 400;

        Animated.parallel([
          Animated.timing(p.y, {
            toValue: screen.height + 40,
            duration: duration + Math.random() * 800,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(p.x, {
            toValue: p.drift,
            duration: duration + Math.random() * 800,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(p.rotate, {
            toValue: 2 + Math.random() * 4,
            duration: duration + Math.random() * 800,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: duration + Math.random() * 800,
            delay: delay + duration * 0.6,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      particles.forEach((p) => {
        p.opacity.setValue(0);
      });
    }
  }, [active]);

  if (!active) return null;

  return (
    <View testID={testID} style={[styles.container, style]} pointerEvents="none">
      {particles.map((p, i) => {
        const rotate = p.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        });

        const shapeStyle =
          p.shape === "circle"
            ? { borderRadius: p.size / 2 }
            : p.shape === "rect"
            ? { width: p.size * 0.5, height: p.size * 1.4 }
            : {};

        return (
          <Animated.View
            key={i}
            style={[
              {
                position: "absolute",
                left: p.startX,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: 2,
                transform: [
                  { translateY: p.y },
                  { translateX: p.x },
                  { rotate },
                ],
                opacity: p.opacity,
              },
              shapeStyle,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(StyleSheet.absoluteFill as object),
    zIndex: 999,
    overflow: "hidden",
  },
});

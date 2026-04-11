import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function TypingIndicator({ style, testID }: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );

    const a1 = animate(dot1, 0);
    const a2 = animate(dot2, 200);
    const a3 = animate(dot3, 400);

    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [dot1, dot2, dot3]);

  const dotStyle = {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.muted,
    marginHorizontal: 2,
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Animated.View style={[dotStyle, { opacity: dot1 }]} />
      <Animated.View style={[dotStyle, { opacity: dot2 }]} />
      <Animated.View style={[dotStyle, { opacity: dot3 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

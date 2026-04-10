import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Intent, Size } from "../../types";

const HEIGHT_MAP = { sm: 4, md: 8, lg: 12 };

type Props = {
  progress: number; // 0 to 1
  intent?: Intent;
  size?: Size;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const INTENT_COLORS: Record<Intent, string> = {
  primary: "primary",
  secondary: "muted",
  danger: "danger",
  success: "success",
  warning: "warning",
  info: "info",
};

export default function ProgressBar({
  progress,
  intent = "primary",
  size = "md",
  animated = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius } = theme;

  const clampedProgress = Math.min(1, Math.max(0, progress));
  const height = HEIGHT_MAP[size];
  const barColor = (colors as any)[INTENT_COLORS[intent]] || colors.primary;

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.timing(anim, {
        toValue: clampedProgress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      anim.setValue(clampedProgress);
    }
  }, [clampedProgress, animated, anim]);

  return (
    <View
      testID={testID}
      style={[
        {
          height,
          borderRadius: height / 2,
          backgroundColor: colors.border,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          height: "100%",
          borderRadius: height / 2,
          backgroundColor: barColor,
          width: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        }}
      />
    </View>
  );
}

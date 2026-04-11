import React, { useEffect, useRef } from "react";
import {
  Pressable,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Size } from "../../types";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Switch({
  value,
  onValueChange,
  size = "md",
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, sizeMap, iconSizes } = theme;

  const trackWidth = sizeMap[size];
  const trackHeight = trackWidth * 0.55;
  const thumbSize = iconSizes[size];
  const padding = (trackHeight - thumbSize) / 2;
  const translateEnd = trackWidth - thumbSize - padding * 2;

  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const trackBg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  const thumbTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateEnd],
  });

  return (
    <Pressable
      testID={testID}
      onPress={() => !disabled && onValueChange(!value)}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View
        style={[
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: trackBg,
            padding,
            justifyContent: "center",
          },
        ]}
      >
        <Animated.View
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: colors.surface,
            transform: [{ translateX: thumbTranslate }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

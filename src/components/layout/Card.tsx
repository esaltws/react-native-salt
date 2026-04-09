import React, { ReactNode } from "react";
import {
  View,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { Elevation } from "../../types";

type Props = {
  children: ReactNode;
  elevation?: Elevation;
  onPress?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  image?: ImageSourcePropType;
  imageHeight?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SHADOWS: Record<Elevation, ViewStyle> = {
  0: {},
  1: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
    android: { elevation: 2 },
    default: { boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  }) as ViewStyle,
  2: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
    android: { elevation: 4 },
    default: { boxShadow: "0 2px 6px rgba(0,0,0,0.15)" },
  }) as ViewStyle,
  3: Platform.select({
    ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12 },
    android: { elevation: 8 },
    default: { boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
  }) as ViewStyle,
};

export default function Card({
  children,
  elevation = 0,
  onPress,
  header,
  footer,
  image,
  imageHeight = 160,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing } = theme;

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: elevation > 0 ? 0 : 1,
    overflow: "hidden",
    ...SHADOWS[elevation],
  };

  const content = (
    <View testID={testID} style={[containerStyle, style]}>
      {image && (
        <Image
          source={image}
          style={{ width: "100%", height: imageHeight, backgroundColor: colors.border }}
          resizeMode="cover"
        />
      )}
      {header && <View style={{ padding: spacing.lg, paddingBottom: 0 }}>{header}</View>}
      <View style={{ padding: spacing.lg }}>{children}</View>
      {footer && (
        <View
          style={{
            padding: spacing.lg,
            paddingTop: 0,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}


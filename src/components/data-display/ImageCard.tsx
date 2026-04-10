import React, { ReactNode } from "react";
import {
  Image,
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Badge from "../status/Badge";

type Props = {
  imageUrl: string | null;
  title: string;
  subtitle?: string;
  badge?: string;
  footer?: ReactNode;
  onPress?: () => void;
  imageHeight?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ImageCard({
  imageUrl,
  title,
  subtitle,
  badge,
  footer,
  onPress,
  imageHeight = 180,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing } = theme;

  const content = (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.lg,
          borderWidth: 1,
        },
        style,
      ]}
    >
      {imageUrl ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.image,
              {
                height: imageHeight,
                borderTopLeftRadius: radius.lg - 1,
                borderTopRightRadius: radius.lg - 1,
              },
            ]}
            resizeMode="cover"
          />
          {badge ? (
            <View style={[styles.badge, { top: spacing.sm, left: spacing.sm }]}>
              <Badge label={badge} intent="danger" size="sm" />
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={{ padding: spacing.md }}>
        <Text
          style={{ fontWeight: "600", fontSize: theme.fontSizes.md }}
          numberOfLines={2}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={{ color: colors.muted, marginTop: spacing.xs }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}

        {footer ? (
          <View style={{ marginTop: spacing.sm }}>{footer}</View>
        ) : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
  },
  badge: {
    position: "absolute",
  },
});

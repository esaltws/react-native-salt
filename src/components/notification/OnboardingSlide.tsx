import React from "react";
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import Button from "../buttons/Button";

type Props = {
  title: string;
  description: string;
  image?: ImageSourcePropType;
  icon?: string;
  iconSize?: number;
  actionLabel?: string;
  onAction?: () => void;
  skipLabel?: string;
  onSkip?: () => void;
  step?: number;
  totalSteps?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function OnboardingSlide({
  title,
  description,
  image,
  icon,
  iconSize = 80,
  actionLabel,
  onAction,
  skipLabel = "Skip",
  onSkip,
  step,
  totalSteps,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes } = theme;
  const screen = Dimensions.get("window");

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: screen.width,
          padding: spacing.xl,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {/* Skip */}
      {onSkip && (
        <View style={styles.skipRow}>
          <Button
            label={skipLabel}
            variant="text"
            size="sm"
            onPress={onSkip}
          />
        </View>
      )}

      {/* Visual */}
      <View style={styles.visualContainer}>
        {image ? (
          <Image
            source={image}
            style={{
              width: screen.width * 0.65,
              height: screen.width * 0.65,
            }}
            resizeMode="contain"
          />
        ) : icon ? (
          <View
            style={[
              styles.iconCircle,
              {
                width: iconSize * 1.6,
                height: iconSize * 1.6,
                borderRadius: iconSize * 0.8,
                backgroundColor: `${colors.primary}14`,
              },
            ]}
          >
            <Icon name={icon} size={iconSize} color={colors.primary} />
          </View>
        ) : null}
      </View>

      {/* Text */}
      <Text
        style={{
          fontSize: fontSizes.xxl,
          fontWeight: "700",
          color: colors.text,
          textAlign: "center",
          marginBottom: spacing.md,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: fontSizes.sm,
          color: colors.muted,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        {description}
      </Text>

      {/* Dots */}
      {step !== undefined && totalSteps !== undefined && totalSteps > 1 && (
        <View style={[styles.dots, { marginTop: spacing.xl }]}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === step ? colors.primary : colors.border,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      )}

      {/* Action button */}
      {onAction && actionLabel && (
        <View style={{ marginTop: spacing.xl, width: "100%" }}>
          <Button label={actionLabel} onPress={onAction} fullWidth />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  skipRow: {
    position: "absolute",
    top: 50,
    right: 16,
    zIndex: 10,
  },
  visualContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  iconCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

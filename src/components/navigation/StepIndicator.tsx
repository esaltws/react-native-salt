import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type Props = {
  steps: string[];
  currentStep: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function StepIndicator({ steps, currentStep, style, testID }: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes } = theme;

  return (
    <View testID={testID} style={[styles.container, style]}>
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        const circleColor = isCompleted
          ? colors.primary
          : isCurrent
          ? colors.primary
          : colors.border;

        const textColor = isCompleted || isCurrent ? colors.text : colors.muted;

        const isFirst = index === 0;
        const leftLineColor = index <= currentStep ? colors.primary : colors.border;
        const rightLineColor = isCompleted ? colors.primary : colors.border;

        return (
          <View key={label} style={styles.stepWrapper}>
            <View style={styles.stepRow}>
              {/* Left spacer — transparent for first step, colored line otherwise */}
              <View
                style={[
                  styles.line,
                  {
                    backgroundColor: isFirst ? "transparent" : leftLineColor,
                    height: 2,
                  },
                ]}
              />

              <View
                style={[
                  styles.circle,
                  {
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: circleColor,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isCompleted || isCurrent ? colors.surface : colors.muted,
                    fontSize: fontSizes.xs,
                    fontWeight: "700",
                  }}
                >
                  {isCompleted ? "✓" : `${index + 1}`}
                </Text>
              </View>

              {/* Right spacer — transparent for last step, colored line otherwise */}
              <View
                style={[
                  styles.line,
                  {
                    backgroundColor: isLast ? "transparent" : rightLineColor,
                    height: 2,
                  },
                ]}
              />
            </View>

            <Text
              style={{
                color: textColor,
                fontSize: fontSizes.xs,
                marginTop: spacing.xs,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepWrapper: {
    flex: 1,
    alignItems: "center",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
  },
});

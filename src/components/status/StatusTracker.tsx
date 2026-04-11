import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";

type StatusStep = {
  label: string;
  description?: string;
  date?: string;
};

type Props = {
  steps: StatusStep[];
  currentStep: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function StatusTracker({ steps, currentStep, style, testID }: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, iconSizes, sizeMap } = theme;

  return (
    <View testID={testID} style={[{ gap: 0 }, style]}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        const dotColor = isCompleted
          ? colors.success
          : isCurrent
          ? colors.primary
          : colors.border;

        const textColor = isCompleted || isCurrent ? colors.text : colors.muted;

        return (
          <View key={step.label} style={styles.stepContainer}>
            <View style={styles.timeline}>
              <View
                style={[
                  styles.dot,
                  {
                    width: spacing.xxl,
                    height: spacing.xxl,
                    borderRadius: radius.lg,
                    backgroundColor: dotColor,
                  },
                ]}
              >
                {isCompleted ? (
                  <Icon name="checkmark" size={iconSizes.xs} color={colors.surface} />
                ) : isCurrent ? (
                  <View
                    style={{
                      width: spacing.sm,
                      height: spacing.sm,
                      borderRadius: radius.sm,
                      backgroundColor: colors.surface,
                    }}
                  />
                ) : null}
              </View>

              {!isLast ? (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: isCompleted
                        ? colors.success
                        : colors.border,
                      width: 2,
                      minHeight: sizeMap.xs,
                    },
                  ]}
                />
              ) : null}
            </View>

            <View style={[styles.content, { marginLeft: spacing.md, paddingBottom: spacing.lg }]}>
              <Title fontSize="sm" style={{ color: textColor }}>
                {step.label}
              </Title>
              {step.description ? (
                <Caption style={{ marginTop: 2 }}>
                  {step.description}
                </Caption>
              ) : null}
              {step.date ? (
                <Caption fontSize="sm" style={{ marginTop: 2 }}>
                  {step.date}
                </Caption>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
  },
  timeline: {
    alignItems: "center",
  },
  dot: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

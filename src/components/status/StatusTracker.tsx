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
  const { colors, spacing } = theme;

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
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: dotColor,
                  },
                ]}
              >
                {isCompleted ? (
                  <Icon name="checkmark" size={14} color={colors.surface} />
                ) : isCurrent ? (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
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
                      minHeight: 32,
                    },
                  ]}
                />
              ) : null}
            </View>

            <View style={[styles.content, { marginLeft: spacing.md }]}>
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
    paddingBottom: 16,
  },
});

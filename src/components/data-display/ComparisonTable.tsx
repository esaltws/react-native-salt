import React from "react";
import { View, ScrollView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type FeatureValue = boolean | string;

type ComparisonPlan = {
  key: string;
  name: string;
  highlight?: boolean;
  badge?: string;
};

type ComparisonFeature = {
  key: string;
  label: string;
  values: Record<string, FeatureValue>;
};

type Props = {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  planWidth?: number;
  featureLabelWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ComparisonTable({
  plans,
  features,
  planWidth = 100,
  featureLabelWidth = 140,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;

  const renderValue = (val: FeatureValue) => {
    if (typeof val === "boolean") {
      return val ? (
        <Icon name="checkmark-circle" size={iconSizes.sm} color={colors.success} />
      ) : (
        <Icon name="close-circle" size={iconSizes.sm} color={colors.border} />
      );
    }
    return (
      <Text
        style={{ fontSize: fontSizes.sm, color: colors.text, textAlign: "center" }}
        numberOfLines={1}
      >
        {val}
      </Text>
    );
  };

  return (
    <ScrollView testID={testID} horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={[
          {
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: "hidden",
          },
          style,
        ]}
      >
        {/* Header row */}
        <View
          style={[
            styles.row,
            {
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.labelCell,
              {
                width: featureLabelWidth,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.md,
              },
            ]}
          />
          {plans.map((plan) => (
            <View
              key={plan.key}
              style={[
                styles.valueCell,
                {
                  width: planWidth,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.xs,
                  borderLeftWidth: 1,
                  borderLeftColor: colors.border,
                  backgroundColor: plan.highlight
                    ? `${colors.primary}10`
                    : "transparent",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: "700",
                  color: plan.highlight ? colors.primary : colors.text,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {plan.name}
              </Text>
              {plan.badge && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.primary,
                      borderRadius: radius.sm,
                      marginTop: spacing.xs,
                      paddingHorizontal: spacing.xs,
                      paddingVertical: 2,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: fontSizes.xxs,
                      fontWeight: "700",
                      color: colors.onPrimary,
                    }}
                  >
                    {plan.badge}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Feature rows */}
        {features.map((feature, index) => (
          <View
            key={feature.key}
            style={[
              styles.row,
              {
                borderBottomWidth: index < features.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.labelCell,
                {
                  width: featureLabelWidth,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.md,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  color: colors.text,
                }}
                numberOfLines={2}
              >
                {feature.label}
              </Text>
            </View>
            {plans.map((plan) => (
              <View
                key={plan.key}
                style={[
                  styles.valueCell,
                  {
                    width: planWidth,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.xs,
                    borderLeftWidth: 1,
                    borderLeftColor: colors.border,
                    backgroundColor: plan.highlight
                      ? `${colors.primary}06`
                      : "transparent",
                  },
                ]}
              >
                {renderValue(feature.values[plan.key] ?? false)}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelCell: {
    justifyContent: "center",
  },
  valueCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    alignSelf: "center",
  },
});

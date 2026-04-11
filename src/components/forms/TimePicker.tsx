import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Display from "../typography/Display";
import Label from "../typography/Label";

type TimeFormat = "12h" | "24h";

type Props = {
  value?: { hours: number; minutes: number };
  onChange: (time: { hours: number; minutes: number }) => void;
  format?: TimeFormat;
  minuteStep?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function TimePicker({
  value = { hours: 0, minutes: 0 },
  onChange,
  format = "12h",
  minuteStep = 1,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const is12h = format === "12h";
  const [period, setPeriod] = useState<"AM" | "PM">(
    value.hours >= 12 ? "PM" : "AM"
  );

  const hours = is12h
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  );

  const displayHour = is12h
    ? value.hours === 0
      ? 12
      : value.hours > 12
      ? value.hours - 12
      : value.hours
    : value.hours;

  const handleHourSelect = (h: number) => {
    let hour24 = h;
    if (is12h) {
      if (period === "AM") {
        hour24 = h === 12 ? 0 : h;
      } else {
        hour24 = h === 12 ? 12 : h + 12;
      }
    }
    onChange({ hours: hour24, minutes: value.minutes });
  };

  const handleMinuteSelect = (m: number) => {
    onChange({ hours: value.hours, minutes: m });
  };

  const handlePeriodToggle = (p: "AM" | "PM") => {
    setPeriod(p);
    let h = value.hours;
    if (p === "AM" && h >= 12) h -= 12;
    if (p === "PM" && h < 12) h += 12;
    onChange({ hours: h, minutes: value.minutes });
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const renderColumn = (
    items: number[],
    selected: number,
    onSelect: (n: number) => void,
    padValue = true
  ) => (
    <ScrollView
      style={styles.column}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: spacing.sm }}
    >
      {items.map((item) => {
        const isActive = item === selected;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            accessibilityRole="button"
            accessibilityLabel={`${padValue ? pad(item) : item}`}
            accessibilityState={{ selected: isActive }}
            style={[
              styles.cell,
              {
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: radius.sm,
                backgroundColor: isActive
                  ? colors.primary
                  : "transparent",
              },
            ]}
          >
            <Text
              style={{
                fontSize: fontSizes.md,
                fontWeight: isActive ? "700" : "400",
                color: isActive ? colors.onPrimary : colors.text,
                fontVariant: ["tabular-nums"],
              }}
            >
              {padValue ? pad(item) : item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.md,
        },
        style,
      ]}
    >
      {/* Display */}
      <View style={[styles.display, { marginBottom: spacing.md }]}>
        <Display fontSize="lg" style={{ fontVariant: ["tabular-nums"] }}>
          {pad(displayHour)}:{pad(value.minutes)}
        </Display>
        {is12h && (
          <Label
            style={{
              color: colors.primary,
              marginLeft: spacing.sm,
            }}
          >
            {period}
          </Label>
        )}
      </View>

      {/* Columns */}
      <View style={[styles.columns, { height: 200 }]}>
        {renderColumn(hours, displayHour, handleHourSelect)}
        <View
          style={{
            width: 1,
            backgroundColor: colors.border,
            marginHorizontal: spacing.xs,
          }}
        />
        {renderColumn(minutes, value.minutes, handleMinuteSelect)}

        {is12h && (
          <>
            <View
              style={{
                width: 1,
                backgroundColor: colors.border,
                marginHorizontal: spacing.xs,
              }}
            />
            <View style={[styles.periodCol, { gap: spacing.sm }]}>
              {(["AM", "PM"] as const).map((p) => (
                <Pressable
                  key={p}
                  onPress={() => handlePeriodToggle(p)}
                  accessibilityRole="button"
                  accessibilityLabel={p}
                  accessibilityState={{ selected: period === p }}
                  style={[
                    styles.cell,
                    {
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.lg,
                      borderRadius: radius.sm,
                      backgroundColor:
                        period === p ? colors.primary : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: fontSizes.md,
                      fontWeight: period === p ? "700" : "400",
                      color: period === p ? colors.onPrimary : colors.text,
                    }}
                  >
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  display: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  columns: {
    flexDirection: "row",
    overflow: "hidden",
  },
  column: {
    flex: 1,
  },
  cell: {
    alignItems: "center",
  },
  periodCol: {
    justifyContent: "center",
  },
});

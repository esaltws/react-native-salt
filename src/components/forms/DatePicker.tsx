import React, { useState, useMemo } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const today = new Date();
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth());

  const selectedKey = value
    ? `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`
    : null;
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewYear, viewMonth]);

  const goMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.md,
        },
        style,
      ]}
    >
      {/* Month/Year header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => goMonth(-1)}
          style={styles.navBtn}
          accessibilityRole="button"
          accessibilityLabel="Previous month"
        >
          <Icon name="chevron-back" size={20} color={colors.text} />
        </Pressable>
        <Text
          style={{
            fontSize: fontSizes.md,
            fontWeight: "600",
            color: colors.text,
          }}
        >
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <Pressable
          onPress={() => goMonth(1)}
          style={styles.navBtn}
          accessibilityRole="button"
          accessibilityLabel="Next month"
        >
          <Icon name="chevron-forward" size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Day labels */}
      <View style={styles.row}>
        {DAYS.map((d) => (
          <View key={d} style={styles.cell}>
            <Text
              style={{
                fontSize: fontSizes.xs,
                fontWeight: "600",
                color: colors.muted,
                textAlign: "center",
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {calendarDays.map((day, i) => {
          if (day === null) {
            return <View key={`empty-${i}`} style={styles.cell} />;
          }

          const key = `${viewYear}-${viewMonth}-${day}`;
          const isSelected = key === selectedKey;
          const isToday = key === todayKey;
          const disabled = isDisabled(day);

          return (
            <Pressable
              key={key}
              onPress={() => !disabled && onChange(new Date(viewYear, viewMonth, day))}
              disabled={disabled}
              accessibilityRole="button"
              accessibilityLabel={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
              accessibilityState={{ selected: isSelected, disabled }}
              style={[
                styles.cell,
                styles.dayCell,
                isSelected && {
                  backgroundColor: colors.primary,
                  borderRadius: radius.pill,
                },
                isToday && !isSelected && {
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: radius.pill,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  color: disabled
                    ? colors.muted + "60"
                    : isSelected
                    ? colors.surface
                    : colors.text,
                  fontWeight: isSelected || isToday ? "700" : "400",
                  textAlign: "center",
                }}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  navBtn: {
    padding: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "14.28%",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  dayCell: {
    alignItems: "center",
    justifyContent: "center",
  },
});

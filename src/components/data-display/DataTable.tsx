import React from "react";
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
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";

type SortDirection = "asc" | "desc" | null;

type Column<T> = {
  key: string;
  title: string;
  width?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;
  selectedKeys?: string[];
  onSelectRow?: (key: string) => void;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  emptyMessage?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  sortColumn,
  sortDirection,
  onSort,
  selectedKeys,
  onSelectRow,
  striped = false,
  bordered = true,
  compact = false,
  emptyMessage = "No data",
  style,
  testID,
}: Props<T>) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, radius } = theme;

  const py = compact ? spacing.xs : spacing.md;
  const px = compact ? spacing.sm : spacing.md;

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !onSort) return;
    const next: SortDirection =
      sortColumn === col.key
        ? sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? null
          : "asc"
        : "asc";
    onSort(col.key, next);
  };

  const getColStyle = (col: Column<T>): ViewStyle => ({
    width: col.width,
    flex: col.width ? undefined : col.flex ?? 1,
    paddingVertical: py,
    paddingHorizontal: px,
    justifyContent: "center",
    alignItems:
      col.align === "right"
        ? "flex-end"
        : col.align === "center"
        ? "center"
        : "flex-start",
  });

  return (
    <ScrollView testID={testID} horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={[
          {
            borderRadius: radius.md,
            overflow: "hidden",
            borderWidth: bordered ? 1 : 0,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        {/* Header */}
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
          {columns.map((col) => (
            <Pressable
              key={col.key}
              onPress={() => handleSort(col)}
              disabled={!col.sortable}
              style={[styles.cell, getColStyle(col)]}
            >
              <View style={styles.headerContent}>
                <Label
                  fontSize="sm"
                  uppercase
                  style={{
                    color: colors.muted,
                    letterSpacing: 0.5,
                    fontWeight: "700",
                  }}
                >
                  {col.title}
                </Label>
                {col.sortable && sortColumn === col.key && sortDirection && (
                  <Icon
                    name={
                      sortDirection === "asc"
                        ? "chevron-up-outline"
                        : "chevron-down-outline"
                    }
                    size={12}
                    color={colors.primary}
                  />
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Rows */}
        {data.length === 0 ? (
          <View style={{ padding: spacing.xl, alignItems: "center" }}>
            <Caption fontSize="lg">
              {emptyMessage}
            </Caption>
          </View>
        ) : (
          data.map((item, index) => {
            const key = keyExtractor(item, index);
            const isSelected = selectedKeys?.includes(key);
            const isStriped = striped && index % 2 === 1;

            return (
              <Pressable
                key={key}
                onPress={onSelectRow ? () => onSelectRow(key) : undefined}
                disabled={!onSelectRow}
                style={[
                  styles.row,
                  {
                    backgroundColor: isSelected
                      ? `${colors.primary}18`
                      : isStriped
                      ? `${colors.text}06`
                      : "transparent",
                    borderBottomWidth: index < data.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                {columns.map((col) => (
                  <View key={col.key} style={[styles.cell, getColStyle(col)]}>
                    {col.render ? (
                      col.render(item, index)
                    ) : (
                      <Text
                        style={{
                          fontSize: fontSizes.sm,
                          color: colors.text,
                        }}
                        numberOfLines={1}
                      >
                        {String(item[col.key] ?? "")}
                      </Text>
                    )}
                  </View>
                ))}
              </Pressable>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  cell: {
    flexDirection: "row",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

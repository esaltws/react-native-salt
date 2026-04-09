import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SIZE_MAP = {
  sm: { height: 28, font: 12, icon: 14, px: 8 },
  md: { height: 36, font: 14, icon: 18, px: 12 },
  lg: { height: 44, font: 16, icon: 22, px: 16 },
};

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;
  const sizeConfig = SIZE_MAP[size];

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  // Calculate visible page numbers
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | "...")[] = [];
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const btnStyle = (active: boolean, disabled: boolean): ViewStyle => ({
    height: sizeConfig.height,
    minWidth: sizeConfig.height,
    paddingHorizontal: sizeConfig.px,
    borderRadius: radius.sm,
    backgroundColor: active ? colors.primary : "transparent",
    opacity: disabled ? 0.4 : 1,
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.xs }, style]}>
      {/* Prev */}
      <Pressable
        onPress={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        style={btnStyle(false, isFirst)}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: isFirst }}
      >
        <Icon
          name="chevron-back-outline"
          size={sizeConfig.icon}
          color={isFirst ? colors.muted : colors.text}
        />
      </Pressable>

      {/* Page numbers */}
      {showPageNumbers &&
        getPageNumbers().map((page, i) =>
          page === "..." ? (
            <View key={`ellipsis-${i}`} style={btnStyle(false, true)}>
              <Text
                style={{ fontSize: sizeConfig.font, color: colors.muted }}
              >
                ...
              </Text>
            </View>
          ) : (
            <Pressable
              key={page}
              onPress={() => onPageChange(page)}
              style={btnStyle(page === currentPage, false)}
              accessibilityRole="button"
              accessibilityLabel={`Page ${page}`}
              accessibilityState={{ selected: page === currentPage }}
            >
              <Text
                style={{
                  fontSize: sizeConfig.font,
                  fontWeight: page === currentPage ? "700" : "400",
                  color: page === currentPage ? colors.onPrimary : colors.text,
                }}
              >
                {page}
              </Text>
            </Pressable>
          )
        )}

      {/* Info when no page numbers */}
      {!showPageNumbers && (
        <Text
          style={{
            fontSize: sizeConfig.font,
            color: colors.text,
            fontWeight: "500",
            marginHorizontal: spacing.sm,
          }}
        >
          {currentPage} of {totalPages}
        </Text>
      )}

      {/* Next */}
      <Pressable
        onPress={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        style={btnStyle(false, isLast)}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: isLast }}
      >
        <Icon
          name="chevron-forward-outline"
          size={sizeConfig.icon}
          color={isLast ? colors.muted : colors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState } from "react";
import {
  View,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";
import { Size } from "../../types";

type SelectOption = {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

type Props = {
  options: SelectOption[];
  value: string | null;
  onChange: (key: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  size?: Size;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  searchable = false,
  size = "md",
  fullWidth = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const sizeStyles: Record<Size, ViewStyle> = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  };

  const inputSize = sizeStyles[size];

  const selected = options.find((o) => o.key === value);

  const filtered = searchable && search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <View testID={testID} style={[fullWidth && { width: "100%" }, style]}>
      {label && (
        <Label style={{ marginBottom: spacing.sm }}>
          {label}
        </Label>
      )}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled, expanded: open }}
        style={[
          styles.trigger,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            opacity: disabled ? 0.5 : 1,
          },
          inputSize,
        ]}
      >
        {selected?.icon && (
          <Icon
            name={selected.icon}
            size={18}
            color={colors.text}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <Text
          style={{
            flex: 1,
            color: selected ? colors.text : colors.muted,
            fontSize: fontSizes.sm,
          }}
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Icon
          name="chevron-down-outline"
          size={18}
          color={colors.muted}
        />
      </Pressable>

      {error && (
        <Caption style={{ marginTop: spacing.xs, color: colors.danger }}>
          {error}
        </Caption>
      )}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.background,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                maxHeight: 360,
              },
            ]}
          >
            {searchable && (
              <View
                style={[
                  styles.searchRow,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    padding: spacing.md,
                  },
                ]}
              >
                <Icon
                  name="search-outline"
                  size={18}
                  color={colors.muted}
                  style={{ marginRight: spacing.sm }}
                />
                <Text
                  style={{ flex: 1, color: colors.muted, fontSize: fontSizes.sm }}
                >
                  {search || "Search..."}
                </Text>
              </View>
            )}

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                const isSelected = item.key === value;
                return (
                  <Pressable
                    onPress={() => {
                      if (!item.disabled) {
                        onChange(item.key);
                        setOpen(false);
                        setSearch("");
                      }
                    }}
                    disabled={item.disabled}
                    accessibilityRole="menuitem"
                    accessibilityLabel={item.label}
                    accessibilityState={{ selected: isSelected, disabled: !!item.disabled }}
                    style={[
                      styles.option,
                      {
                        paddingVertical: spacing.md,
                        paddingHorizontal: spacing.lg,
                        backgroundColor: isSelected
                          ? `${colors.primary}12`
                          : "transparent",
                        opacity: item.disabled ? 0.4 : 1,
                      },
                    ]}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size={18}
                        color={isSelected ? colors.primary : colors.text}
                        style={{ marginRight: spacing.sm }}
                      />
                    )}
                    <Text
                      style={{
                        flex: 1,
                        fontSize: fontSizes.sm,
                        color: isSelected ? colors.primary : colors.text,
                        fontWeight: isSelected ? "600" : "400",
                      }}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Icon
                        name="checkmark"
                        size={18}
                        color={colors.primary}
                      />
                    )}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <View style={{ padding: spacing.xl, alignItems: "center" }}>
                  <Text style={{ color: colors.muted }}>
                    No options found
                  </Text>
                </View>
              }
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  dropdown: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
});

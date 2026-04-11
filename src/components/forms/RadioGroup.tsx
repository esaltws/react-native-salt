import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Caption from "../typography/Caption";

type RadioItem = {
  key: string;
  label: string;
  description?: string;
};

type Props = {
  items: RadioItem[];
  selected: string | null;
  onSelect: (key: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function RadioGroup({
  items,
  selected,
  onSelect,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  return (
    <View testID={testID} style={[{ gap: spacing.sm }, style]}>
      {items.map((item) => {
        const isSelected = item.key === selected;

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            accessibilityRole="radio"
            accessibilityLabel={item.label}
            accessibilityState={{ checked: isSelected }}
            style={[
              styles.item,
              {
                borderColor: isSelected ? colors.primary : colors.border,
                borderRadius: radius.md,
                padding: spacing.md,
                backgroundColor: isSelected
                  ? colors.primary + "10"
                  : colors.surface,
              },
            ]}
          >
            <View
              style={[
                styles.radio,
                {
                  borderColor: isSelected ? colors.primary : colors.border,
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  marginRight: spacing.md,
                },
              ]}
            >
              {isSelected ? (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: colors.primary,
                  }}
                />
              ) : null}
            </View>

            <View style={styles.textContainer}>
              <Label>{item.label}</Label>
              {item.description ? (
                <Caption style={{ marginTop: 2 }}>
                  {item.description}
                </Caption>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  radio: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
});

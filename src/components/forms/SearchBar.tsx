import React from "react";
import {
  View,
  StyleProp,
  TextInput,
  StyleSheet,
  TextStyle,
  Pressable,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme";
import Text from "../typography/Text";
import { Icon } from "../theme-settings/Icon";

type SizePreset = "sm" | "md" | "lg";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  size?: SizePreset;
  showIcon?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  autoFocus?: boolean;
  testID?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  size = "md",
  showIcon = true,
  clearable = true,
  onClear,
  containerStyle,
  inputStyle,
  autoFocus = false,
  testID,
}: Props) {
  const { theme } = useTheme();

  const padding = {
    sm: { py: theme.spacing.sm, px: theme.spacing.md },
    md: { py: theme.spacing.md, px: theme.spacing.lg },
    lg: { py: theme.spacing.lg, px: theme.spacing.xl },
  }[size];

  const canClear = clearable && value.trim().length > 0;

  const handleClear = () => {
    if(onClear) {
      onClear();
      return;
    }

    onChangeText("");
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          paddingVertical: padding.py,
          paddingHorizontal: padding.px,
        },
        containerStyle,
      ]}
    >
      {showIcon ? (
        <Icon
          name="search"
          size={18}
          color={theme.colors.muted}
          accessibilityLabel="Search icon"
          style={styles.icon}
        />
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        returnKeyType="search"
        style={[
          styles.input,
          { color: theme.colors.text },
          inputStyle,
        ]}
      />

      {canClear ? (
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={10}
          style={styles.clearBtn}
        >
          <Icon name="close" size={18} color={theme.colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
    fontWeight: "700",
  },
  input: {
    flex: 1,
    paddingVertical: 0, // keep vertical padding controlled by container
  },
  clearBtn: {
    marginLeft: 8,
  },
});
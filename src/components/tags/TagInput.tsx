import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  tags: string[];
  onChangeTags: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  maxTags?: number;
  disabled?: boolean;
  suggestions?: string[];
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function TagInput({
  tags,
  onChangeTags,
  placeholder = "Add tag...",
  label,
  error,
  maxTags,
  disabled = false,
  suggestions = [],
  fullWidth = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const atLimit = maxTags !== undefined && tags.length >= maxTags;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed) || atLimit) return;
    onChangeTags([...tags, trimmed]);
    setText("");
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    onChangeTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    addTag(text);
  };

  const filteredSuggestions =
    text.length > 0
      ? suggestions.filter(
          (s) =>
            s.toLowerCase().includes(text.toLowerCase()) &&
            !tags.includes(s)
        )
      : [];

  return (
    <View testID={testID} style={[fullWidth && { width: "100%" }, style]}>
      {label && (
        <Text
          style={{
            marginBottom: spacing.sm,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.danger
              : focused
              ? colors.primary
              : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            padding: spacing.sm,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Tags */}
        {tags.map((tag, i) => (
          <View
            key={tag}
            style={[
              styles.tag,
              {
                backgroundColor: `${colors.primary}18`,
                borderRadius: radius.lg,
                paddingHorizontal: spacing.sm,
                paddingVertical: 4,
                marginRight: 6,
                marginBottom: 6,
              },
            ]}
          >
            <Text
              style={{
                fontSize: fontSizes.xs,
                color: colors.primary,
                fontWeight: "500",
              }}
            >
              {tag}
            </Text>
            {!disabled && (
              <Pressable
                onPress={() => removeTag(i)}
                hitSlop={6}
                style={{ marginLeft: 4 }}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${tag}`}
              >
                <Icon name="close" size={14} color={colors.primary} />
              </Pressable>
            )}
          </View>
        ))}

        {/* Input */}
        {!atLimit && (
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSubmit}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={tags.length === 0 ? placeholder : ""}
            placeholderTextColor={colors.muted}
            editable={!disabled}
            blurOnSubmit={false}
            returnKeyType="done"
            accessibilityLabel={label || "Add tag"}
            style={[
              styles.input,
              {
                fontSize: fontSizes.sm,
                color: colors.text,
                minWidth: 80,
              },
            ]}
          />
        )}
      </View>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <View
          style={[
            styles.suggestions,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: radius.md,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 4,
            },
          ]}
        >
          {filteredSuggestions.slice(0, 5).map((s) => (
            <Pressable
              key={s}
              onPress={() => addTag(s)}
              style={[
                styles.suggestion,
                {
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                },
              ]}
            >
              <Text
                style={{ fontSize: fontSizes.sm, color: colors.text }}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Error / counter */}
      <View style={styles.footer}>
        {error && (
          <Text
            style={{ fontSize: fontSizes.xs, color: colors.danger, flex: 1 }}
          >
            {error}
          </Text>
        )}
        {maxTags !== undefined && (
          <Text
            style={{
              fontSize: fontSizes.xs,
              color: atLimit ? colors.danger : colors.muted,
              marginLeft: "auto",
            }}
          >
            {tags.length}/{maxTags}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    minHeight: 30,
  },
  suggestions: {
    marginTop: 4,
    overflow: "hidden",
  },
  suggestion: {},
  footer: {
    flexDirection: "row",
    marginTop: 4,
  },
});

import React, { useState } from "react";
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
import Icon from "../theme-settings/Icon";

type Props = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  onCopy?: (code: string) => void;
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const LANG_COLORS: Record<string, string> = {
  javascript: "#f7df1e",
  typescript: "#3178c6",
  python: "#3776ab",
  java: "#ed8b00",
  kotlin: "#7f52ff",
  swift: "#f05138",
  dart: "#0175c2",
  rust: "#dea584",
  go: "#00add8",
  ruby: "#cc342d",
  php: "#777bb4",
  html: "#e34f26",
  css: "#1572b6",
  sql: "#e38c00",
  json: "#292929",
  yaml: "#cb171e",
  bash: "#4eaa25",
  shell: "#4eaa25",
  c: "#a8b9cc",
  cpp: "#00599c",
  csharp: "#239120",
  jsx: "#61dafb",
  tsx: "#3178c6",
  xml: "#e44d26",
  markdown: "#083fa1",
  graphql: "#e535ab",
};

export default function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  copyable = false,
  onCopy,
  maxHeight,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;
  const [copied, setCopied] = useState(false);

  const bgColor = colors.background;
  const codeFg = colors.text;
  const lineNumColor = colors.muted;
  const headerBg = colors.surface;

  const langColor =
    language && LANG_COLORS[language.toLowerCase()]
      ? LANG_COLORS[language.toLowerCase()]
      : colors.primary;

  const lines = code.split("\n");

  const handleCopy = () => {
    onCopy?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {/* Header: language label + copy */}
      {(language || copyable) && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: headerBg,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            },
          ]}
        >
          {language ? (
            <View style={[styles.langRow, { gap: spacing.sm }]}>
              <View
                style={[
                  styles.langDot,
                  { backgroundColor: langColor, width: spacing.sm, height: spacing.sm, borderRadius: radius.sm },
                ]}
              />
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  fontWeight: "600",
                  color: langColor,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {language}
              </Text>
            </View>
          ) : (
            <View />
          )}

          {copyable && (
            <Pressable onPress={handleCopy} style={styles.copyBtn}>
              <Icon
                name={copied ? "checkmark" : "copy-outline"}
                size={iconSizes.xs}
                color={copied ? colors.success : colors.muted}
              />
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  color: copied ? colors.success : colors.muted,
                  marginLeft: spacing.xs,
                }}
              >
                {copied ? "Copied" : "Copy"}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Code body */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          { backgroundColor: bgColor },
          maxHeight ? { maxHeight } : undefined,
        ]}
      >
        <View style={{ padding: spacing.md }}>
          {lines.map((line, i) => (
            <View key={i} style={styles.line}>
              {showLineNumbers && (
                <Text
                  style={{
                    color: lineNumColor,
                    fontSize: fontSizes.xs,
                    fontFamily: "monospace",
                    width: lines.length > 99 ? 36 : 24,
                    textAlign: "right",
                    marginRight: spacing.md,
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </Text>
              )}
              <Text
                style={{
                  color: codeFg,
                  fontSize: fontSizes.sm,
                  fontFamily: "monospace",
                  lineHeight: (fontSizes.sm ?? 14) * 1.6,
                }}
              >
                {line || " "}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  langDot: {},
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flexDirection: "row",
  },
});

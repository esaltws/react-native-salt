import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Caption from "../typography/Caption";

type Props = {
  text: string;
  isOwn: boolean;
  timestamp?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function MessageBubble({
  text,
  isOwn,
  timestamp,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  const bubbleBg = isOwn ? colors.primary : colors.surface;
  const textColor = isOwn ? colors.onPrimary : colors.text;
  const timeColor = isOwn ? colors.onPrimary : colors.muted;

  return (
    <View
      testID={testID}
      style={[
        styles.wrapper,
        { alignItems: isOwn ? "flex-end" : "flex-start" },
        style,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: bubbleBg,
            borderRadius: radius.lg,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            maxWidth: "80%",
            borderWidth: isOwn ? 0 : 1,
            borderColor: colors.border,
          },
          isOwn
            ? { borderBottomRightRadius: spacing.xs }
            : { borderBottomLeftRadius: spacing.xs },
        ]}
      >
        <Text style={{ color: textColor }}>
          {text}
        </Text>
        {timestamp && (
          <Caption
            align="right"
            style={{
              color: timeColor,
              marginTop: spacing.xs,
            }}
          >
            {timestamp}
          </Caption>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 4,
  },
  bubble: {},
});

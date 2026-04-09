import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent } from "../../types";

type TimelineEvent = {
  key: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: string;
  intent?: Intent;
  content?: ReactNode;
};

type Props = {
  events: TimelineEvent[];
  linePosition?: "left" | "center";
  showConnector?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Timeline({
  events,
  linePosition = "left",
  showConnector = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const dotSize = 12;
  const iconDotSize = 28;
  const lineWidth = 2;

  return (
    <View testID={testID} style={style}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const accentColor = event.intent
          ? (colors as any)[event.intent] || colors.primary
          : colors.primary;
        const hasIcon = !!event.icon;
        const currentDotSize = hasIcon ? iconDotSize : dotSize;

        if (linePosition === "center") {
          const isLeft = index % 2 === 0;
          return (
            <View key={event.key} style={styles.centerRow}>
              {/* Left content */}
              <View style={[styles.centerSide, { alignItems: "flex-end" }]}>
                {isLeft && (
                  <View style={{ paddingRight: spacing.md }}>
                    <Text
                      style={{
                        fontSize: fontSizes.sm,
                        fontWeight: "600",
                        color: colors.text,
                        textAlign: "right",
                      }}
                    >
                      {event.title}
                    </Text>
                    {event.timestamp && (
                      <Text
                        style={{
                          fontSize: fontSizes.xs,
                          color: colors.muted,
                          textAlign: "right",
                          marginTop: 2,
                        }}
                      >
                        {event.timestamp}
                      </Text>
                    )}
                  </View>
                )}
              </View>

              {/* Center line + dot */}
              <View style={styles.centerLine}>
                {hasIcon ? (
                  <View
                    style={{
                      width: iconDotSize,
                      height: iconDotSize,
                      borderRadius: iconDotSize / 2,
                      backgroundColor: `${accentColor}18`,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={event.icon!} size={14} color={accentColor} />
                  </View>
                ) : (
                  <View
                    style={{
                      width: dotSize,
                      height: dotSize,
                      borderRadius: dotSize / 2,
                      backgroundColor: accentColor,
                    }}
                  />
                )}
                {showConnector && !isLast && (
                  <View
                    style={{
                      width: lineWidth,
                      flex: 1,
                      backgroundColor: colors.border,
                      marginVertical: 4,
                    }}
                  />
                )}
              </View>

              {/* Right content */}
              <View style={[styles.centerSide, { alignItems: "flex-start" }]}>
                {!isLeft && (
                  <View style={{ paddingLeft: spacing.md }}>
                    <Text
                      style={{
                        fontSize: fontSizes.sm,
                        fontWeight: "600",
                        color: colors.text,
                      }}
                    >
                      {event.title}
                    </Text>
                    {event.timestamp && (
                      <Text
                        style={{
                          fontSize: fontSizes.xs,
                          color: colors.muted,
                          marginTop: 2,
                        }}
                      >
                        {event.timestamp}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          );
        }

        // Left position (default)
        return (
          <View key={event.key} style={styles.leftRow}>
            {/* Line + dot */}
            <View style={[styles.leftLine, { width: currentDotSize }]}>
              {hasIcon ? (
                <View
                  style={{
                    width: iconDotSize,
                    height: iconDotSize,
                    borderRadius: iconDotSize / 2,
                    backgroundColor: `${accentColor}18`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={event.icon!} size={14} color={accentColor} />
                </View>
              ) : (
                <View
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: accentColor,
                  }}
                />
              )}
              {showConnector && !isLast && (
                <View
                  style={{
                    position: "absolute",
                    top: currentDotSize + 4,
                    bottom: 0,
                    left: (currentDotSize - lineWidth) / 2,
                    width: lineWidth,
                    backgroundColor: colors.border,
                  }}
                />
              )}
            </View>

            {/* Content */}
            <View
              style={[
                styles.leftContent,
                {
                  marginLeft: spacing.md,
                  paddingBottom: isLast ? 0 : spacing.lg,
                },
              ]}
            >
              <View style={styles.titleRow}>
                <Text
                  style={{
                    fontSize: fontSizes.sm,
                    fontWeight: "600",
                    color: colors.text,
                    flex: 1,
                  }}
                >
                  {event.title}
                </Text>
                {event.timestamp && (
                  <Text
                    style={{
                      fontSize: fontSizes.xs,
                      color: colors.muted,
                      marginLeft: spacing.sm,
                    }}
                  >
                    {event.timestamp}
                  </Text>
                )}
              </View>
              {event.description && (
                <Text
                  style={{
                    fontSize: fontSizes.sm,
                    color: colors.muted,
                    marginTop: 4,
                  }}
                >
                  {event.description}
                </Text>
              )}
              {event.content && (
                <View style={{ marginTop: spacing.sm }}>{event.content}</View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  leftRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftLine: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  leftContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerRow: {
    flexDirection: "row",
    minHeight: 60,
  },
  centerSide: {
    flex: 1,
    justifyContent: "center",
  },
  centerLine: {
    alignItems: "center",
    width: 28,
  },
});

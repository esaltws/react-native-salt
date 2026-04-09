import React from "react";
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import Divider from "../layout/Divider";

type ControlSection = {
  key: string;
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
};

type Props = {
  sections: ControlSection[];
  onToggleSection?: (key: string) => void;
  title?: string;
  position?: "left" | "right";
  width?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function CanvasControlPanel({
  sections,
  onToggleSection,
  title,
  position = "right",
  width = 260,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  return (
    <View
      testID={testID}
      style={[
        styles.panel,
        {
          width,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftWidth: position === "right" ? 1 : 0,
          borderRightWidth: position === "left" ? 1 : 0,
        },
        style,
      ]}
    >
      {title && (
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontSize: fontSizes.sm,
              fontWeight: "700",
              color: colors.text,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map((section, index) => (
          <View key={section.key}>
            {index > 0 && <Divider />}
            <Pressable
              onPress={() => onToggleSection?.(section.key)}
              style={[
                styles.sectionHeader,
                {
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  fontWeight: "600",
                  color: colors.muted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {section.title}
              </Text>
              <Icon
                name={
                  section.collapsed
                    ? "chevron-forward"
                    : "chevron-down-outline"
                }
                size={14}
                color={colors.muted}
              />
            </Pressable>

            {!section.collapsed && (
              <View
                style={{
                  paddingHorizontal: spacing.md,
                  paddingBottom: spacing.md,
                }}
              >
                {section.children}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
  },
  header: {},
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

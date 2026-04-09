import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Display from "../typography/Display";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Avatar from "./Avatar";

type StatItem = {
  label: string;
  value: string;
};

type Props = {
  avatar?: string | null;
  name: string;
  subtitle?: string;
  stats?: StatItem[];
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ProfileHeader({
  avatar,
  name,
  subtitle,
  stats,
  action,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { spacing } = theme;

  return (
    <View testID={testID} style={[styles.container, { padding: spacing.lg }, style]}>
      <View style={styles.topRow}>
        <Avatar uri={avatar} name={name} size="lg" />

        {stats && stats.length > 0 && (
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Title fontSize="lg" align="center">
                  {stat.value}
                </Title>
                <Caption align="center">
                  {stat.label}
                </Caption>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={{ marginTop: spacing.sm }}>
        <Display fontSize="sm">
          {name}
        </Display>
        {subtitle && (
          <Caption fontSize="lg" style={{ marginTop: spacing.xs }}>
            {subtitle}
          </Caption>
        )}
      </View>

      {action && <View style={{ marginTop: spacing.sm }}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    marginLeft: 16,
  },
  statItem: {
    alignItems: "center",
  },
});

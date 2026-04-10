import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Title from "../typography/Title";
import Caption from "../typography/Caption";
import Button from "../buttons/Button";
import Stack from "../layout/Stack";

type Action = { title: string; onPress: () => void };

type Props = {
  title: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function EmptyState({
  title,
  description,
  primaryAction,
  secondaryAction,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Stack gap="sm" align="center">
        <Title fontSize={"md"}>{title}</Title>
        {description ? (
          <Caption align="center">
            {description}
          </Caption>
        ) : null}

        {(primaryAction || secondaryAction) ? (
          <Stack direction="vertical" gap="sm" wrap justify="center">
            {primaryAction ? (
              <Button title={primaryAction.title} onPress={primaryAction.onPress} />
            ) : null}
            {secondaryAction ? (
              <Button
                title={secondaryAction.title}
                variant="outline"
                intent="secondary"
                onPress={secondaryAction.onPress}
              />
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
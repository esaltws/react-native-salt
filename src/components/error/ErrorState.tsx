import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Title from "../typography/Title";
import Text from "../typography/Text";
import Button from "../buttons/Button";
import Stack from "../layout/Stack";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Stack gap="sm" align="center">
        <Title fontSize={'md'} style={{ color: theme.colors.danger }}>
          {title}
        </Title>
        <Text style={{ color: theme.colors.muted, textAlign: "center" }}>
          {description}
        </Text>
        {onRetry ? (
          <Button title="Retry" intent="danger" variant="outline" onPress={onRetry} />
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
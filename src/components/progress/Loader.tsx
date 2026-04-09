import React from "react";
import { View, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Caption from "../typography/Caption";
import Spacer from "../layout/Spacer";

type Props = {
  label?: string;
  size?: "small" | "large";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Loader({ label, size = "small", style, testID }: Props) {
  const { theme } = useTheme();
  const colors = theme.colors;
  return (
    <View testID={testID} style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
      {label ? (
        <>
          <Spacer size="sm" />
          <Caption>{label}</Caption>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
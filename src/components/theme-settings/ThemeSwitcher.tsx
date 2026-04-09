import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Button from "../buttons/Button";

type Props = {
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  testID?: string;
};

export default function ThemeSwitcher({ style, fullWidth = false, testID }: Props) {
  const { preference, setPreference } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Button
        title="System"
        variant={preference === "system" ? "solid" : "outline"}
        onPress={() => setPreference("system")}
        fullWidth={fullWidth}
      />
      <Button
        title="Light"
        variant={preference === "light" ? "solid" : "outline"}
        onPress={() => setPreference("light")}
        fullWidth={fullWidth}
      />
      <Button
        title="Dark"
        variant={preference === "dark" ? "solid" : "outline"}
        onPress={() => setPreference("dark")}
        fullWidth={fullWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

type Props = SafeAreaViewProps & {
  children: ReactNode;
  /** Wraps children in a ScrollView */
  scroll?: boolean;
  /** Style for ScrollView's contentContainerStyle (only when scroll is true) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Wraps content in KeyboardAvoidingView with platform defaults */
  keyboardAware?: boolean;
  /** Sets the StatusBar appearance */
  statusBarStyle?: "light" | "dark" | "default";
};

export default function Screen({
  children,
  style,
  scroll,
  contentContainerStyle,
  keyboardAware,
  statusBarStyle,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const colors = theme.colors;

  let content: ReactNode = children;

  if (scroll) {
    content = (
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  if (keyboardAware) {
    content = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView
      style={[{ backgroundColor: colors.background, flex: 1 }, style]}
      {...rest}
    >
      {statusBarStyle ? (
        <StatusBar
          barStyle={statusBarStyle === "default" ? "default" : statusBarStyle === "light" ? "light-content" : "dark-content"}
        />
      ) : null}
      {content}
    </SafeAreaView>
  );
}

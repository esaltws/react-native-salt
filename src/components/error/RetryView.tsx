import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Loader from "../progress/Loader";
import ErrorState from "./ErrorState";

type Props = {
  loading?: boolean;
  error?: string | boolean;
  onRetry?: () => void;
  children: ReactNode;
  loadingLabel?: string;
  errorTitle?: string;
  errorDescription?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function RetryView({
  loading = false,
  error = false,
  onRetry,
  children,
  loadingLabel,
  errorTitle,
  errorDescription,
  style,
  testID,
}: Props) {
  if (loading) {
    return (
      <View testID={testID} style={[styles.centered, style]}>
        <Loader size="large" label={loadingLabel} />
      </View>
    );
  }

  if (error) {
    const description =
      typeof error === "string" ? error : errorDescription;

    return (
      <View testID={testID} style={[styles.centered, style]}>
        <ErrorState
          title={errorTitle}
          description={description}
          onRetry={onRetry}
        />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

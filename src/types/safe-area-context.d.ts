declare module "react-native-safe-area-context" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";

  export type SafeAreaViewProps = ViewProps;
  export const SafeAreaView: ComponentType<SafeAreaViewProps>;
}

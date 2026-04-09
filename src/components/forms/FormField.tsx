import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Spacer from "../layout/Spacer";
import Input from "./Input";
import { Size } from "../../types";


type Props =
  | ({
      mode?: "input";
      label?: string;
      required?: boolean;
      helperText?: string;
      error?: string;
      size?: Size;
      containerStyle?: StyleProp<ViewStyle>;
      children?: never;
    } & React.ComponentProps<typeof Input>)
  | {
      mode: "custom";
      label?: string;
      required?: boolean;
      helperText?: string;
      error?: string;
      containerStyle?: StyleProp<ViewStyle>;
      children: ReactNode;
    };

export default function FormField(props: Props) {
  const { theme } = useTheme();
  const { colors } = theme;

  const label = "label" in props ? props.label : undefined;
  const required = "required" in props ? props.required : undefined;
  const helperText = "helperText" in props ? props.helperText : undefined;
  const error = "error" in props ? props.error : undefined;

  const isCustom = "mode" in props && props.mode === "custom";

  return (
    <View style={props.containerStyle} accessible={true} accessibilityLabel={label}>
      {isCustom && label ? (
        <>
          <View style={styles.labelRow}>
            <Label>{label}</Label>
            {required ? (
              <Text style={{ color: colors.danger, marginLeft: 4 }}>
                *
              </Text>
            ) : null}
          </View>
          <Spacer size="sm" />
        </>
      ) : null}

      {isCustom ? (
        props.children
      ) : (
        <Input {...props} error={error} />
      )}

      {isCustom && helperText && !error ? (
        <>
          <Spacer size="xs" />
          <Caption>{helperText}</Caption>
        </>
      ) : null}

      {isCustom && error ? (
        <>
          <Spacer size="xs" />
          <Caption style={{ color: colors.danger }}>{error}</Caption>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: "row", alignItems: "center" },
});
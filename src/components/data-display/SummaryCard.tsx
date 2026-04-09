import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Card from "../layout/Card";
import Stack from "../layout/Stack";
import Title from "../typography/Title";
import Caption from "../typography/Caption";

type Props = {
  label: string;
  value: string;
  subtitle?: string;
  style?: ViewStyle;
  testID?: string;
};

export default function SummaryCard({ label, value, subtitle, style, testID }: Props) {
  return (
    <Card testID={testID} style={style}>
      <Stack gap="xs">
        <Caption>{label}</Caption>
        <Title fontSize="md">{value}</Title>
        {subtitle ? (
          <Caption>{subtitle}</Caption>
        ) : null}
      </Stack>
    </Card>
  );
}

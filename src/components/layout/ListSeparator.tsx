import React from "react";
import Divider from "./Divider";
import type { Spacing } from "../../types";

type Props = {
  inset?: Spacing;
  margin?: Spacing;
  testID?: string;
};

export default function ListSeparator({ inset = "lg", margin = "sm", testID }: Props) {
  return <Divider testID={testID} inset={inset} margin={margin} />;
}
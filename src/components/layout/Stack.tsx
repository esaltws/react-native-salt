import React, { ReactNode } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Spacing } from "../../types";

type ResponsiveConfig = {
  breakpoint?: number;
  direction?: "horizontal" | "vertical";
  gap?: Spacing;
};

type Props = {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  gap?: Spacing;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: boolean;
  divider?: boolean | ReactNode;
  responsive?: ResponsiveConfig;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Stack({
  children,
  direction = "vertical",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = false,
  divider,
  responsive,
  animated,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  // Responsive overrides
  const breakpoint = responsive?.breakpoint ?? 768;
  const isWide = responsive && width >= breakpoint;
  const finalDirection = isWide && responsive?.direction ? responsive.direction : direction;
  const finalGap = isWide && responsive?.gap !== undefined ? responsive.gap : gap;

  const gapValue =
    typeof finalGap === "number" ? finalGap : theme.spacing[finalGap] ?? theme.spacing.md;

  const items = React.Children.toArray(children);
  const isVertical = finalDirection === "vertical";

  const dividerStyle: ViewStyle | null = divider === true
    ? isVertical
      ? { height: 1, backgroundColor: theme.colors.border, width: "100%" }
      : { width: 1, backgroundColor: theme.colors.border, alignSelf: "stretch" }
    : null;

  const elements: ReactNode[] = [];
  items.forEach((child, index) => {
    if (divider && index > 0) {
      if (dividerStyle) {
        elements.push(<View key={`div-${index}`} style={dividerStyle} />);
      } else {
        elements.push(<React.Fragment key={`div-${index}`}>{divider}</React.Fragment>);
      }
    }
    const isLast = index === items.length - 1;
    const itemStyle: ViewStyle = isVertical
      ? { marginBottom: isLast ? 0 : gapValue }
      : { marginRight: isLast ? 0 : gapValue };
    elements.push(
      <View key={`item-${index}`} style={itemStyle}>{child}</View>
    );
  });

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: isVertical ? "column" : "row",
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        style,
      ]}
    >
      {elements}
    </View>
  );
}

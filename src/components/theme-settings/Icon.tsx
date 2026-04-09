import React from "react";
import { StyleProp, TextStyle } from "react-native";

let Ionicons: any;
try {
  Ionicons = require("@expo/vector-icons").Ionicons;
} catch {
  try {
    Ionicons = require("react-native-vector-icons/Ionicons").default;
  } catch {
    // Fallback: render nothing if no icon library is installed
    Ionicons = null;
  }
}

export type IconAlias =
  | 'search'
  | 'close'
  | 'back'
  | 'add'
  | 'edit'
  | 'check'
  | 'chevron-right'
  | 'save';

export type IconName = IconAlias | (string & {});

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  testID?: string;
};

const ICON_MAP: Record<IconAlias, string> = {
  search: 'search-outline',
  close: 'close',
  back: 'arrow-back',
  add: 'add',
  edit: 'create-outline',
  check: 'checkmark',
  'chevron-right': 'chevron-forward',
  save: 'save-outline',
};

export function Icon({
  name,
  size = 20,
  color = '#111827',
  style,
  accessibilityLabel,
  testID,
}: IconProps) {
  if (!Ionicons) return null;
  const ionName = (ICON_MAP as Record<string, string>)[name] || name;
  return (
    <Ionicons
      name={ionName as any}
      size={size}
      color={color}
      style={style}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );
}

export default Icon;
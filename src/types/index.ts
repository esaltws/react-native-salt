import type { FontLevel, FontLevelPreset } from "../theme/typography";

export type Variant = "solid" | "outline" | "ghost" | "text" | "link";
export type Intent = "primary" | "secondary" | "danger" | "success" | "warning" | "info";


//Theme

export type ThemeMode = "light" | "dark";
export type ThemePreference = "system" | ThemeMode;

export type ThemeColors = {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    danger: string;
    success: string;
    warning: string;
    info: string;
    onPrimary: string;
    onSecondary: string;
    onDanger: string;
    onSuccess: string;
    onWarning: string;
    onInfo: string;
};

export type Theme = {
    mode: ThemeMode;
    colors: ThemeColors;
    spacing: { none: number; xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
    radius: { none: number; sm: number; md: number; lg: number; xl: number; xxl: number; pill: number };
    fontSizes: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; "3xl": number };
    iconSizes: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; "3xl": number };
    fontLevel: FontLevel;
};


//Token Keys (safe)
export type Spacing = keyof Theme["spacing"];
export type Radius = keyof Theme["radius"];
export type FontSize = keyof Theme["fontSizes"];
export type ColorToken = keyof ThemeColors;
export type Size = "sm" | "md" | "lg";

//Values allowed in components props
export type ColorValue = ColorToken | (string & {});

export type { FontLevel, FontLevelPreset } from "../theme/typography";

// Typography
export type TypographySize = "sm" | "md" | "lg";
export type WeightToken = "normal" | "medium" | "semibold" | "bold";
export type LineHeightToken = "tight" | "normal" | "relaxed";
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type Decoration = "underline" | "strikethrough";

// Layout
export type Elevation = 0 | 1 | 2 | 3;
export type HandlePosition = "top" | "bottom" | "left" | "right" | "corner";
export type HandleVariant = "dot" | "bar" | "corner";
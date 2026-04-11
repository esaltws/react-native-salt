export type FontLevel = 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

export type FontLevelPreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const FONT_LEVEL_PRESETS: Record<FontLevelPreset, FontLevel> = {
  xs: 14,
  sm: 15,
  md: 16,
  lg: 17,
  xl: 18,
};

const FONT_SCALE: Record<FontLevel, { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; '3xl': number }> = {
  8:  { xs: 6,  sm: 7,  md: 8,  lg: 9,  xl: 10, xxl: 12, '3xl': 16 },
  9:  { xs: 7,  sm: 8,  md: 9,  lg: 10, xl: 11, xxl: 14, '3xl': 18 },
  10: { xs: 8,  sm: 9,  md: 10, lg: 11, xl: 13, xxl: 15, '3xl': 20 },
  11: { xs: 9,  sm: 10, md: 11, lg: 12, xl: 14, xxl: 17, '3xl': 22 },
  12: { xs: 9,  sm: 11, md: 12, lg: 14, xl: 15, xxl: 18, '3xl': 24 },
  13: { xs: 10, sm: 12, md: 13, lg: 15, xl: 16, xxl: 20, '3xl': 26 },
  14: { xs: 11, sm: 12, md: 14, lg: 16, xl: 18, xxl: 21, '3xl': 28 },
  15: { xs: 12, sm: 13, md: 15, lg: 17, xl: 19, xxl: 23, '3xl': 30 },
  16: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, '3xl': 32 },
  17: { xs: 13, sm: 15, md: 17, lg: 19, xl: 21, xxl: 26, '3xl': 34 },
  18: { xs: 14, sm: 16, md: 18, lg: 20, xl: 22, xxl: 28, '3xl': 36 },
};

export function buildFontSizes(level: FontLevel | FontLevelPreset = 16) {
  const key = typeof level === 'string' ? FONT_LEVEL_PRESETS[level] : level;
  return FONT_SCALE[key];
}

// Icon sizes — visually balanced with text, min 12px for tappability
const ICON_SCALE: Record<FontLevel, { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; '3xl': number }> = {
  8:  { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 22, '3xl': 28 },
  9:  { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, '3xl': 30 },
  10: { xs: 12, sm: 16, md: 18, lg: 20, xl: 22, xxl: 26, '3xl': 32 },
  11: { xs: 14, sm: 16, md: 18, lg: 20, xl: 22, xxl: 28, '3xl': 34 },
  12: { xs: 14, sm: 16, md: 20, lg: 22, xl: 24, xxl: 28, '3xl': 36 },
  13: { xs: 14, sm: 18, md: 20, lg: 22, xl: 24, xxl: 30, '3xl': 38 },
  14: { xs: 16, sm: 18, md: 20, lg: 24, xl: 26, xxl: 30, '3xl': 40 },
  15: { xs: 16, sm: 18, md: 22, lg: 24, xl: 26, xxl: 32, '3xl': 42 },
  16: { xs: 16, sm: 20, md: 24, lg: 26, xl: 28, xxl: 32, '3xl': 44 },
  17: { xs: 18, sm: 20, md: 24, lg: 26, xl: 28, xxl: 34, '3xl': 46 },
  18: { xs: 18, sm: 22, md: 24, lg: 28, xl: 30, xxl: 36, '3xl': 48 },
};

// Component height/padding — for buttons, inputs, segments, chips
const SIZE_MAP_SCALE: Record<FontLevel, { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; '3xl': number }> = {
  8:  { xs: 20, sm: 24, md: 28, lg: 32, xl: 36, xxl: 40, '3xl': 48 },
  9:  { xs: 22, sm: 26, md: 30, lg: 34, xl: 38, xxl: 44, '3xl': 52 },
  10: { xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 46, '3xl': 56 },
  11: { xs: 26, sm: 30, md: 34, lg: 38, xl: 42, xxl: 48, '3xl': 58 },
  12: { xs: 26, sm: 32, md: 36, lg: 40, xl: 44, xxl: 50, '3xl': 60 },
  13: { xs: 28, sm: 32, md: 38, lg: 42, xl: 46, xxl: 52, '3xl': 64 },
  14: { xs: 28, sm: 34, md: 40, lg: 44, xl: 48, xxl: 54, '3xl': 68 },
  15: { xs: 30, sm: 36, md: 40, lg: 46, xl: 50, xxl: 56, '3xl': 72 },
  16: { xs: 32, sm: 36, md: 44, lg: 48, xl: 52, xxl: 60, '3xl': 76 },
  17: { xs: 32, sm: 38, md: 46, lg: 50, xl: 54, xxl: 62, '3xl': 80 },
  18: { xs: 34, sm: 40, md: 48, lg: 52, xl: 56, xxl: 64, '3xl': 84 },
};

// Component dimensions — for avatars, checkboxes, dots, rings
const DIMENSION_SCALE: Record<FontLevel, { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number; '3xl': number }> = {
  8:  { xs: 16, sm: 20, md: 24, lg: 28, xl: 32, xxl: 40, '3xl': 56 },
  9:  { xs: 18, sm: 22, md: 26, lg: 30, xl: 36, xxl: 44, '3xl': 60 },
  10: { xs: 20, sm: 24, md: 28, lg: 32, xl: 38, xxl: 48, '3xl': 64 },
  11: { xs: 20, sm: 26, md: 30, lg: 36, xl: 40, xxl: 50, '3xl': 68 },
  12: { xs: 22, sm: 28, md: 32, lg: 38, xl: 44, xxl: 54, '3xl': 72 },
  13: { xs: 24, sm: 30, md: 36, lg: 40, xl: 46, xxl: 56, '3xl': 76 },
  14: { xs: 24, sm: 32, md: 36, lg: 42, xl: 48, xxl: 60, '3xl': 80 },
  15: { xs: 26, sm: 32, md: 40, lg: 44, xl: 50, xxl: 64, '3xl': 84 },
  16: { xs: 28, sm: 36, md: 40, lg: 48, xl: 56, xxl: 68, '3xl': 88 },
  17: { xs: 30, sm: 36, md: 44, lg: 50, xl: 58, xxl: 72, '3xl': 92 },
  18: { xs: 32, sm: 40, md: 48, lg: 52, xl: 60, xxl: 76, '3xl': 96 },
};

export function buildIconSizes(level: FontLevel | FontLevelPreset = 16) {
  const key = typeof level === 'string' ? FONT_LEVEL_PRESETS[level] : level;
  return ICON_SCALE[key];
}

export function buildSizeMap(level: FontLevel | FontLevelPreset = 16) {
  const key = typeof level === 'string' ? FONT_LEVEL_PRESETS[level] : level;
  return SIZE_MAP_SCALE[key];
}

export function buildDimensions(level: FontLevel | FontLevelPreset = 16) {
  const key = typeof level === 'string' ? FONT_LEVEL_PRESETS[level] : level;
  return DIMENSION_SCALE[key];
}

export const fontSizes = buildFontSizes(16);
export const iconSizes = buildIconSizes(16);
export const sizeMap = buildSizeMap(16);
export const dimensions = buildDimensions(16);

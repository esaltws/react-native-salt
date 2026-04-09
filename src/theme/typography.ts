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
  18: { xs: 14, sm: 16, md: 18, lg: 20, xl: 22, xxl: 27, '3xl': 36 },
};

export function buildFontSizes(level: FontLevel | FontLevelPreset = 16) {
  const key = typeof level === 'string' ? FONT_LEVEL_PRESETS[level] : level;
  return FONT_SCALE[key];
}

export const fontSizes = buildFontSizes(16);

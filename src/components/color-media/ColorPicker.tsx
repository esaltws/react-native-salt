import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  TextInput,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Slider from "../forms/Slider";

// ── Color conversion helpers ──

function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function rgbToHcl(r: number, g: number, b: number): { h: number; c: number; l: number } {
  // sRGB → linear
  const lin = (v: number) => {
    const n = v / 255;
    return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
  };
  const rl = lin(r), gl = lin(g), bl = lin(b);

  // Linear RGB → XYZ (D65)
  const x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl;
  const y = 0.2126729 * rl + 0.7151522 * gl + 0.0721750 * bl;
  const z = 0.0193339 * rl + 0.1191920 * gl + 0.9503041 * bl;

  // XYZ → Lab
  const e = 216 / 24389, k = 24389 / 27;
  const f = (t: number) => (t > e ? Math.cbrt(t) : (k * t + 16) / 116);
  const fx = f(x / 0.95047), fy = f(y / 1.0), fz = f(z / 1.08883);
  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bLab = 200 * (fy - fz);

  // Lab → LCH → HCL
  const C = Math.sqrt(a * a + bLab * bLab);
  let H = Math.atan2(bLab, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return { h: Math.round(H), c: Math.round(C), l: Math.round(L) };
}

// ── OKLCH helpers ──

function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  const lin = (v: number) => {
    const n = v / 255;
    return n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92;
  };
  const rl = lin(r), gl = lin(g), bl = lin(b);

  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const lc = Math.cbrt(l), mc = Math.cbrt(m), sc = Math.cbrt(s);

  const L = 0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc;
  const a = 1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc;
  const bOk = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc;

  const C = Math.sqrt(a * a + bOk * bOk);
  let H = Math.atan2(bOk, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return {
    l: parseFloat((L * 100).toFixed(1)),
    c: parseFloat(C.toFixed(3)),
    h: parseFloat(H.toFixed(1)),
  };
}

function oklchToHex(l: number, c: number, h: number): string {
  const L = l / 100;
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const lc = L + 0.3963377774 * a + 0.2158037573 * b;
  const mc = L - 0.1055613458 * a - 0.0638541728 * b;
  const sc = L - 0.0894841775 * a - 1.2914855480 * b;

  const lo = lc * lc * lc, mo = mc * mc * mc, so = sc * sc * sc;

  let rl = +4.0767416621 * lo - 3.3077115913 * mo + 0.2309699292 * so;
  let gl = -1.2684380046 * lo + 2.6097574011 * mo - 0.3413193965 * so;
  let bl = -0.0041960863 * lo - 0.7034186147 * mo + 1.7076147010 * so;

  const gamma = (v: number) =>
    v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;

  const toB = (v: number) =>
    Math.round(clamp(gamma(clamp(v, 0, 1)), 0, 1) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toB(rl)}${toB(gl)}${toB(bl)}`;
}

function hclToHex(h: number, c: number, l: number): string {
  // HCL → Lab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const bLab = c * Math.sin(hRad);

  // Lab → XYZ (D65)
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - bLab / 200;

  const e = 216 / 24389, k = 24389 / 27;
  const inv = (t: number) => (t * t * t > e ? t * t * t : (116 * t - 16) / k);
  const x = 0.95047 * inv(fx);
  const y = 1.0 * inv(fy);
  const z = 1.08883 * inv(fz);

  // XYZ → linear sRGB
  let rl = +3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  let gl = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
  let bl = +0.0556434 * x - 0.2040259 * y + 1.0572252 * z;

  const gamma = (v: number) =>
    v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v;

  const toB = (v: number) =>
    Math.round(clamp(gamma(clamp(v, 0, 1)), 0, 1) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toB(rl)}${toB(gl)}${toB(bl)}`;
}

export type ColorSpace = "hcl" | "oklch";

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

// ── Gradient config (no native LinearGradient dependency) ──

const SPECTRUM_STEPS = 24;
const HUE_STEPS = 36;

// Pre-compute hue strip colors (static)
const HUE_STRIP_COLORS = Array.from({ length: HUE_STEPS }, (_, i) =>
  hsvToHex((i / HUE_STEPS) * 360, 1, 1)
);

// ── Default presets ──

const DEFAULT_PRESETS = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#ffffff",
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
  "#d946ef", "#ec4899", "#f43f5e", "#78350f", "#1e3a5f", "#064e3b",
];

// ── Props ──

type Props = {
  color?: string;
  onColorChange?: (color: string) => void;
  showAlpha?: boolean;
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  colorSpace?: ColorSpace;
  onColorSpaceChange?: (cs: ColorSpace) => void;
  presets?: string[];
  recentColors?: string[];
  showInput?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ColorPicker({
  color = "#000000",
  onColorChange,
  showAlpha = false,
  alpha = 1,
  onAlphaChange,
  colorSpace: colorSpaceProp,
  onColorSpaceChange,
  presets = DEFAULT_PRESETS,
  recentColors = [],
  showInput = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius } = theme;

  const safeColor = isValidHex(color) ? color : "#000000";
  const hsv = hexToHsv(safeColor);

  const [hue, setHue] = useState(hsv.h);
  const [saturation, setSaturation] = useState(hsv.s);
  const [brightness, setBrightness] = useState(hsv.v);
  const [hexInput, setHexInput] = useState(safeColor.toUpperCase());
  const [spectrumSize, setSpectrumSize] = useState({ width: 0, height: 0 });
  const [colorSpaceInternal, setColorSpaceInternal] = useState<ColorSpace>("hcl");
  const colorSpace = colorSpaceProp ?? colorSpaceInternal;
  const setColorSpace = (cs: ColorSpace | ((prev: ColorSpace) => ColorSpace)) => {
    const next = typeof cs === "function" ? cs(colorSpace) : cs;
    setColorSpaceInternal(next);
    onColorSpaceChange?.(next);
  };

  // ── Refs for fresh values in PanResponder callbacks ──

  const spectrumRef = useRef<View>(null);
  const hueBarRef = useRef<View>(null);
  const spectrumSizeRef = useRef({ width: 0, height: 0 });
  const spectrumPageRef = useRef({ x: 0, y: 0 });
  const hueBarWidthRef = useRef(0);
  const hueBarPageXRef = useRef(0);
  const stateRef = useRef({
    hue: hsv.h,
    saturation: hsv.s,
    brightness: hsv.v,
    onColorChange,
  });
  stateRef.current = { hue, saturation, brightness, onColorChange };

  // Sync when external color changes
  React.useEffect(() => {
    if (isValidHex(color)) {
      const newHsv = hexToHsv(color);
      setHue(newHsv.h);
      setSaturation(newHsv.s);
      setBrightness(newHsv.v);
      setHexInput(color.toUpperCase());
    }
  }, [color]);

  // ── Spectrum PanResponder (saturation × brightness) ──
  // Uses pageX/pageY + view measurement for reliable Android touch

  function spectrumFromPage(pageX: number, pageY: number) {
    const { width: w, height: h } = spectrumSizeRef.current;
    if (w === 0 || h === 0) return;
    const localX = pageX - spectrumPageRef.current.x;
    const localY = pageY - spectrumPageRef.current.y;
    const s = clamp(localX / w, 0, 1);
    const v = clamp(1 - localY / h, 0, 1);
    setSaturation(s);
    setBrightness(v);
    const hex = hsvToHex(stateRef.current.hue, s, v);
    setHexInput(hex.toUpperCase());
    stateRef.current.onColorChange?.(hex);
  }

  const spectrumPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        spectrumRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
          if (pageX != null) spectrumPageRef.current = { x: pageX, y: pageY ?? 0 };
          spectrumFromPage(e.nativeEvent.pageX, e.nativeEvent.pageY);
        });
      },
      onPanResponderMove: (e) =>
        spectrumFromPage(e.nativeEvent.pageX, e.nativeEvent.pageY),
    })
  ).current;

  // ── Hue bar PanResponder ──

  function hueFromPage(pageX: number) {
    const w = hueBarWidthRef.current;
    if (w === 0) return;
    const localX = pageX - hueBarPageXRef.current;
    const h = clamp(Math.round((localX / w) * 359), 0, 359);
    setHue(h);
    const { saturation: s, brightness: v, onColorChange: cb } = stateRef.current;
    const hex = hsvToHex(h, s, v);
    setHexInput(hex.toUpperCase());
    cb?.(hex);
  }

  const hueBarPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        hueBarRef.current?.measure((_x, _y, _w, _h, pageX) => {
          if (pageX != null) hueBarPageXRef.current = pageX;
          hueFromPage(e.nativeEvent.pageX);
        });
      },
      onPanResponderMove: (e) => hueFromPage(e.nativeEvent.pageX),
    })
  ).current;

  // ── Layout handlers ──

  const onSpectrumLayout = (e: LayoutChangeEvent) => {
    const size = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    };
    spectrumSizeRef.current = size;
    setSpectrumSize(size);
    spectrumRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
      if (pageX != null) spectrumPageRef.current = { x: pageX, y: pageY ?? 0 };
    });
  };

  const onHueBarLayout = (e: LayoutChangeEvent) => {
    hueBarWidthRef.current = e.nativeEvent.layout.width;
    hueBarRef.current?.measure((_x, _y, _w, _h, pageX) => {
      if (pageX != null) hueBarPageXRef.current = pageX;
    });
  };

  // ── Hex input ──

  const handleHexSubmit = () => {
    let value = hexInput.trim();
    if (!value.startsWith("#")) value = `#${value}`;
    if (isValidHex(value)) {
      const newHsv = hexToHsv(value);
      setHue(newHsv.h);
      setSaturation(newHsv.s);
      setBrightness(newHsv.v);
      onColorChange?.(value.toLowerCase());
    } else {
      setHexInput(safeColor.toUpperCase());
    }
  };

  // ── Preset select ──

  const handlePresetSelect = (preset: string) => {
    const newHsv = hexToHsv(preset);
    setHue(newHsv.h);
    setSaturation(newHsv.s);
    setBrightness(newHsv.v);
    setHexInput(preset.toUpperCase());
    onColorChange?.(preset);
  };

  // ── Color space input ──

  const handleColorSpaceSubmit = (field: string, raw: string) => {
    const num = parseFloat(raw);
    if (isNaN(num)) return;

    const rgb2 = hexToRgb(hsvToHex(hue, saturation, brightness));
    let hex: string;

    if (colorSpace === "oklch") {
      const ok = rgbToOklch(rgb2.r, rgb2.g, rgb2.b);
      const l = field === "l" ? clamp(num, 0, 100) : ok.l;
      const c = field === "c" ? clamp(num, 0, 0.4) : ok.c;
      const h2 = field === "h" ? ((num % 360) + 360) % 360 : ok.h;
      hex = oklchToHex(l, c, h2);
    } else {
      const hcl2 = rgbToHcl(rgb2.r, rgb2.g, rgb2.b);
      const h2 = field === "h" ? ((num % 360) + 360) % 360 : hcl2.h;
      const c = field === "c" ? clamp(num, 0, 150) : hcl2.c;
      const l = field === "l" ? clamp(num, 0, 100) : hcl2.l;
      hex = hclToHex(h2, c, l);
    }

    const newHsv = hexToHsv(hex);
    setHue(newHsv.h);
    setSaturation(newHsv.s);
    setBrightness(newHsv.v);
    setHexInput(hex.toUpperCase());
    onColorChange?.(hex);
  };

  const currentHex = hsvToHex(hue, saturation, brightness);
  const rgb = hexToRgb(currentHex);
  const hcl = rgbToHcl(rgb.r, rgb.g, rgb.b);
  const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
  const pureHueColor = hsvToHex(hue, 1, 1);

  // Indicator positions
  const indicatorX = saturation * spectrumSize.width;
  const indicatorY = (1 - brightness) * spectrumSize.height;
  const hueFraction = hue / 359;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          padding: spacing.md,
          gap: spacing.md,
        },
        style,
      ]}
    >
      {/* Selected color preview + hex */}
      <View style={[styles.previewRow, { gap: spacing.md }]}>
        <View
          style={[
            styles.previewSwatch,
            {
              backgroundColor: currentHex,
              borderRadius: radius.sm,
              borderWidth: 1,
              borderColor: colors.border,
            },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Label style={{ fontWeight: "700", color: colors.text }}>
            {currentHex.toUpperCase()}
          </Label>
          <Caption>
            RGB({rgb.r}, {rgb.g}, {rgb.b})
          </Caption>
          <Caption>
            {colorSpace === "oklch"
              ? `OKLCH(${oklch.l}%, ${oklch.c}, ${oklch.h}°)`
              : `HCL(${hcl.h}°, ${hcl.c}, ${hcl.l})`}
          </Caption>
        </View>
      </View>

      {/* Spectrum area (saturation × brightness) */}
      <View
        ref={spectrumRef}
        onLayout={onSpectrumLayout}
        style={[
          styles.spectrum,
          {
            borderRadius: radius.sm,
            borderWidth: 1,
            borderColor: colors.border,
          },
        ]}
        {...spectrumPanResponder.panHandlers}
      >
        {/* Layer 1: pure hue background */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: pureHueColor }]} />

        {/* Layer 2: white → transparent (left → right) for saturation */}
        <View
          style={[StyleSheet.absoluteFill, { flexDirection: "row" }]}
          pointerEvents="none"
        >
          {Array.from({ length: SPECTRUM_STEPS }, (_, i) => (
            <View
              key={`w${i}`}
              style={{
                flex: 1,
                backgroundColor: "#ffffff",
                opacity: 1 - i / (SPECTRUM_STEPS - 1),
              }}
            />
          ))}
        </View>

        {/* Layer 3: transparent → black (top → bottom) for brightness */}
        <View
          style={[StyleSheet.absoluteFill, { flexDirection: "column" }]}
          pointerEvents="none"
        >
          {Array.from({ length: SPECTRUM_STEPS }, (_, i) => (
            <View
              key={`b${i}`}
              style={{
                flex: 1,
                backgroundColor: "#000000",
                opacity: i / (SPECTRUM_STEPS - 1),
              }}
            />
          ))}
        </View>

        {/* Spectrum indicator */}
        {spectrumSize.width > 0 && (
          <View
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                left: indicatorX - 10,
                top: indicatorY - 10,
                borderColor: brightness > 0.5 ? "#000" : "#fff",
              },
            ]}
          >
            <View
              style={[styles.indicatorInner, { backgroundColor: currentHex }]}
            />
          </View>
        )}
      </View>

      {/* Hue bar — custom PanResponder with rainbow strips */}
      <View>
        <Caption style={{ marginBottom: 4 }}>Hue</Caption>
        <View
          ref={hueBarRef}
          onLayout={onHueBarLayout}
          style={[
            styles.hueBar,
            { borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border },
          ]}
          {...hueBarPanResponder.panHandlers}
        >
          {/* Smooth rainbow gradient (36 strips = 10° each) */}
          <View style={[StyleSheet.absoluteFill, { flexDirection: "row" }]}>
            {HUE_STRIP_COLORS.map((c, i) => (
              <View key={i} style={{ flex: 1, backgroundColor: c }} />
            ))}
          </View>

          {/* Hue marker */}
          <View
            pointerEvents="none"
            style={[
              styles.hueMarker,
              {
                left: `${hueFraction * 100}%`,
                marginLeft: -8,
              },
            ]}
          />
        </View>
      </View>

      {/* Alpha slider */}
      {showAlpha && (
        <View>
          <Caption style={{ marginBottom: 4 }}>
            Opacity: {Math.round(alpha * 100)}%
          </Caption>
          <Slider
            value={alpha}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(v) => onAlphaChange?.(v)}
          />
        </View>
      )}

      {/* Hex input */}
      {showInput && (
        <View style={[styles.inputRow, { gap: spacing.sm }]}>
          <View
            style={[
              styles.hexInputWrap,
              {
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: radius.sm,
                backgroundColor: colors.background,
                paddingHorizontal: spacing.sm,
              },
            ]}
          >
            <Caption style={{ color: colors.muted }}>#</Caption>
            <TextInput
              style={[
                styles.hexInput,
                {
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: "monospace",
                },
              ]}
              value={hexInput.replace("#", "")}
              onChangeText={(v) => setHexInput(`#${v}`)}
              onBlur={handleHexSubmit}
              onSubmitEditing={handleHexSubmit}
              maxLength={6}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="000000"
              placeholderTextColor={colors.muted}
              accessibilityLabel="Hex color value"
            />
          </View>

          <View style={[styles.valuesBox, { gap: spacing.xs }]}>
            <View style={[styles.rgbBox, { gap: spacing.xs }]}>
              <ValLabel label="R" value={rgb.r} color={colors.muted} />
              <ValLabel label="G" value={rgb.g} color={colors.muted} />
              <ValLabel label="B" value={rgb.b} color={colors.muted} />
            </View>

            {/* Color space toggle */}
            <TouchableOpacity
              onPress={() => setColorSpace((s) => (s === "hcl" ? "oklch" : "hcl"))}
              style={[styles.csToggle, { backgroundColor: colors.background, borderRadius: radius.sm }]}
              accessibilityRole="button"
              accessibilityLabel={`Switch to ${colorSpace === "hcl" ? "OKLCH" : "HCL"}`}
            >
              <Caption fontSize="sm" style={{ color: colors.primary, fontWeight: "600" }}>
                {colorSpace === "hcl" ? "HCL" : "OKLCH"}
              </Caption>
            </TouchableOpacity>

            {/* Editable color space inputs */}
            {colorSpace === "oklch" ? (
              <View style={[styles.rgbBox, { gap: spacing.xs }]}>
                <ValInput label="L" value={String(oklch.l)} suffix="%" onSubmit={(v) => handleColorSpaceSubmit("l", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
                <ValInput label="C" value={String(oklch.c)} onSubmit={(v) => handleColorSpaceSubmit("c", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
                <ValInput label="H" value={String(oklch.h)} suffix="°" onSubmit={(v) => handleColorSpaceSubmit("h", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
              </View>
            ) : (
              <View style={[styles.rgbBox, { gap: spacing.xs }]}>
                <ValInput label="H" value={String(hcl.h)} suffix="°" onSubmit={(v) => handleColorSpaceSubmit("h", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
                <ValInput label="C" value={String(hcl.c)} onSubmit={(v) => handleColorSpaceSubmit("c", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
                <ValInput label="L" value={String(hcl.l)} onSubmit={(v) => handleColorSpaceSubmit("l", v)} textColor={colors.text} mutedColor={colors.muted} borderColor={colors.border} bgColor={colors.background} />
              </View>
            )}
          </View>
        </View>
      )}

      {/* Preset colors */}
      {presets.length > 0 && (
        <View>
          <Caption style={{ marginBottom: 6 }}>Presets</Caption>
          <View style={styles.presetGrid}>
            {presets.map((preset, i) => (
              <TouchableOpacity
                key={`${preset}-${i}`}
                onPress={() => handlePresetSelect(preset)}
                style={[
                  styles.presetSwatch,
                  {
                    backgroundColor: preset,
                    borderRadius: radius.sm,
                    borderWidth:
                      preset.toLowerCase() === currentHex.toLowerCase() ? 2 : 1,
                    borderColor:
                      preset.toLowerCase() === currentHex.toLowerCase()
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Select color ${preset}`}
              />
            ))}
          </View>
        </View>
      )}

      {/* Recent colors */}
      {recentColors.length > 0 && (
        <View>
          <Caption style={{ marginBottom: 6 }}>Recent</Caption>
          <View style={[styles.recentRow, { gap: spacing.xs }]}>
            {recentColors.slice(0, 8).map((rc, i) => (
              <TouchableOpacity
                key={`${rc}-${i}`}
                onPress={() => handlePresetSelect(rc)}
                style={[
                  styles.recentSwatch,
                  {
                    backgroundColor: rc,
                    borderRadius: radius.sm,
                    borderWidth: 1,
                    borderColor: colors.border,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Select recent color ${rc}`}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ── Small helpers ──

function ValLabel({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <View style={styles.rgbItem}>
      <Caption fontSize="sm" style={{ color, fontWeight: "600" }}>
        {label}
      </Caption>
      <Caption fontSize="sm" style={{ color, fontFamily: "monospace" }}>
        {value}
      </Caption>
    </View>
  );
}

function ValInput({
  label,
  value,
  suffix,
  onSubmit,
  textColor,
  mutedColor,
  borderColor,
  bgColor,
}: {
  label: string;
  value: string;
  suffix?: string;
  onSubmit: (value: string) => void;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  bgColor: string;
}) {
  const [draft, setDraft] = React.useState(value);
  const prevValue = React.useRef(value);
  if (prevValue.current !== value) {
    prevValue.current = value;
    setDraft(value);
  }

  const submit = () => {
    onSubmit(draft);
  };

  return (
    <View style={styles.valInputItem}>
      <Caption fontSize="sm" style={{ color: mutedColor, fontWeight: "600" }}>
        {label}
      </Caption>
      <View style={[styles.valInputWrap, { borderColor, backgroundColor: bgColor }]}>
        <TextInput
          style={[styles.valInputField, { color: textColor }]}
          value={draft}
          onChangeText={setDraft}
          onBlur={submit}
          onSubmitEditing={submit}
          keyboardType="numeric"
          selectTextOnFocus
        />
        {suffix && (
          <Caption fontSize="sm" style={{ color: mutedColor }}>{suffix}</Caption>
        )}
      </View>
    </View>
  );
}

// ── Styles ──

const styles = StyleSheet.create({
  container: {},
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewSwatch: {
    width: 48,
    height: 48,
  },
  spectrum: {
    width: "100%",
    height: 180,
    overflow: "hidden",
  },
  indicator: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  hueBar: {
    height: 28,
    overflow: "hidden",
    justifyContent: "center",
  },
  hueMarker: {
    position: "absolute",
    width: 16,
    height: 28,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  hexInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  hexInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 4,
  },
  valuesBox: {
    alignItems: "flex-end",
  },
  rgbBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rgbItem: {
    alignItems: "center",
    minWidth: 32,
  },
  csToggle: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-end",
  },
  valInputItem: {
    alignItems: "center",
    minWidth: 40,
  },
  valInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 3,
    height: 24,
  },
  valInputField: {
    fontSize: 10,
    fontFamily: "monospace",
    minWidth: 28,
    height: 24,
    padding: 0,
    textAlign: "center",
  },
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  presetSwatch: {
    width: 28,
    height: 28,
  },
  recentRow: {
    flexDirection: "row",
  },
  recentSwatch: {
    width: 28,
    height: 28,
  },
});

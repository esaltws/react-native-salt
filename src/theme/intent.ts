import type { Intent, Theme } from "../types";

const INTENT_KEY: Record<Intent, string> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  success: "success",
  warning: "warning",
  info: "info",
};

const ON_INTENT_KEY: Record<Intent, string> = {
  primary: "onPrimary",
  secondary: "onSecondary",
  danger: "onDanger",
  success: "onSuccess",
  warning: "onWarning",
  info: "onInfo",
};

export function resolveIntentColor(colors: Theme["colors"], intent: Intent): string {
  return (colors as any)[INTENT_KEY[intent]];
}

export function resolveOnIntentColor(colors: Theme["colors"], intent: Intent): string {
  return (colors as any)[ON_INTENT_KEY[intent]];
}

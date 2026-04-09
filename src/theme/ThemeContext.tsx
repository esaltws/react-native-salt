import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import { Appearance, useColorScheme } from "react-native" 
import { lightTheme as lightThemeDefault } from "./lightTheme";
import { darkTheme as darkThemeDefault } from "./darkTheme";
import { Theme, ThemeMode, ThemePreference, FontLevel, FontLevelPreset } from "../types";
import { buildFontSizes, FONT_LEVEL_PRESETS } from "./typography";
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
  toggleTheme: () => void;
  fontLevel: FontLevel;
  setFontLevel: (value: FontLevel) => void;
  isThemeLoaded: boolean;
};

const THEME_PREFERENCE_KEY = "app_theme_preference"

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
  initialPreference?: ThemePreference;
  fontLevel?: FontLevel | FontLevelPreset;
  lightTheme?: Theme;
  darkTheme?: Theme;
};

export function SaltProvider({ children, initialPreference = "system", fontLevel: initialFontLevel = 16, lightTheme: customLightTheme, darkTheme: customDarkTheme }: Props) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);
  const resolvedInitial = typeof initialFontLevel === 'string' ? FONT_LEVEL_PRESETS[initialFontLevel] : initialFontLevel;
  const [fontLevel, setFontLevel] = useState<FontLevel>(resolvedInitial);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect (()=>{
    const loadPreference = async () =>{
      try{
        const savedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);

        if( savedPreference === "system" || savedPreference === "light" || savedPreference === "dark"){
          setPreference(savedPreference);

        }
      }catch (error){
        console.log("Failed to load theme preference: ", error);
      } finally {
        setIsThemeLoaded(true);
      }
    };
    loadPreference();
  }, []);



  useEffect(()=>{
    if(!isThemeLoaded) return;

    const savePreference = async() =>{
      try{
        await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
      } catch (error){
        console.log("Failed to save theme preference:", error);
      }
    };

    savePreference();

  }, [preference, isThemeLoaded]);

  const resolvedMode: ThemeMode =  preference === "system" ? (systemScheme === "dark" ? "dark" : "light") : preference;

  useEffect(() => {
    if(!isThemeLoaded) return;
    // Optional: keeps native UI elements aligned with your app preference
    const scheme = preference === "system" ? "unspecified" : preference;
    Appearance.setColorScheme(scheme as "light" | "dark" | "unspecified");
  }, [preference, isThemeLoaded]);

  const value = useMemo(() => {
    const baseTheme = resolvedMode === "dark"
      ? (customDarkTheme ?? darkThemeDefault)
      : (customLightTheme ?? lightThemeDefault);
    const theme: Theme = {
      ...baseTheme,
      fontSizes: buildFontSizes(fontLevel),
      fontLevel,
    };
    return {
      theme,
      mode: resolvedMode,
      preference,
      setPreference,
      toggleTheme: () => setPreference((prev) => {
        const current = prev === "system" ? (systemScheme ?? "light") : prev;
        return current === "light" ? "dark" : "light";
      }),
      fontLevel,
      setFontLevel,
      isThemeLoaded,
    };
  }, [resolvedMode, preference, systemScheme, isThemeLoaded, fontLevel, customLightTheme, customDarkTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside SaltProvider");
  }

  return context;
}

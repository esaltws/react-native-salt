import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent } from "../../types";

type SpeedDialAction = {
  key: string;
  icon: string;
  label?: string;
  onPress: () => void;
  color?: string;
};

type Props = {
  actions: SpeedDialAction[];
  icon?: string;
  openIcon?: string;
  intent?: Intent;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function SpeedDial({
  actions,
  icon = "add-outline",
  openIcon = "close-outline",
  intent = "primary",
  position = "bottom-right",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, dimensions, sizeMap, iconSizes } = theme;
  const [open, setOpen] = useState(false);
  const anims = useRef(actions.map(() => new Animated.Value(0))).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const accentColor = colors[intent] || colors.primary;

  useEffect(() => {
    if (open) {
      Animated.spring(rotateAnim, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();

      anims.forEach((anim, i) => {
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          delay: i * 50,
          bounciness: 8,
        }).start();
      });
    } else {
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();

      anims.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [open]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const positionStyle: ViewStyle =
    position === "bottom-left"
      ? { left: spacing.lg, bottom: spacing.lg }
      : position === "bottom-center"
      ? {
          left: "50%" as any,
          bottom: spacing.lg,
          transform: [{ translateX: -(dimensions.xl / 2) }],
        }
      : { right: spacing.lg, bottom: spacing.lg };

  const alignRight = position !== "bottom-left";

  return (
    <View testID={testID} style={[styles.container, positionStyle, style]}>
      {/* Action items */}
      {actions.map((item, index) => {
        const translateY = anims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(dimensions.xl + index * (sizeMap.md + spacing.lg))],
        });
        const scale = anims[index];

        return (
          <Animated.View
            key={item.key}
            style={[
              styles.actionRow,
              {
                transform: [{ translateY }, { scale }],
                opacity: anims[index],
                flexDirection: alignRight ? "row" : "row-reverse",
              },
            ]}
          >
            {item.label && (
              <View
                style={[
                  styles.label,
                  {
                    backgroundColor: colors.surface,
                    borderRadius: radius.sm,
                    paddingVertical: spacing.xs,
                    paddingHorizontal: spacing.sm,
                    [alignRight ? "marginRight" : "marginLeft"]: spacing.sm,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: fontSizes.xs,
                    color: colors.text,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </Text>
              </View>
            )}
            <Pressable
              onPress={() => {
                setOpen(false);
                item.onPress();
              }}
              accessibilityRole="button"
              accessibilityLabel={item.label || item.icon}
              style={[
                styles.miniBtn,
                {
                  backgroundColor: item.color || colors.surface,
                  width: sizeMap.md,
                  height: sizeMap.md,
                  borderRadius: sizeMap.md / 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.12,
                  shadowRadius: 4,
                  elevation: 4,
                },
              ]}
            >
              <Icon
                name={item.icon}
                size={iconSizes.sm}
                color={item.color ? colors.onPrimary : accentColor}
              />
            </Pressable>
          </Animated.View>
        );
      })}

      {/* Main FAB */}
      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityLabel={open ? "Close speed dial" : "Open speed dial"}
        style={[
          styles.mainBtn,
          {
            backgroundColor: accentColor,
            width: dimensions.xl,
            height: dimensions.xl,
            borderRadius: dimensions.xl / 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 6,
          },
        ]}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon
            name={open ? openIcon : icon}
            size={iconSizes.xl}
            color={colors.onPrimary}
          />
        </Animated.View>
      </Pressable>

      {/* Backdrop */}
      {open && (
        <Pressable
          style={styles.backdropTouch}
          onPress={() => setOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    zIndex: 100,
    overflow: "visible",
  },
  mainBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  miniBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionRow: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  label: {},
  backdropTouch: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: -1,
  },
});

import React, { useRef, useEffect } from "react";
import {
  View,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Modal,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type DrawerItem = {
  key: string;
  label: string;
  icon?: string;
  onPress: () => void;
  active?: boolean;
  badge?: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items?: DrawerItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  position?: "left" | "right";
  width?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Drawer({
  visible,
  onClose,
  items,
  header,
  footer,
  children,
  position = "left",
  width: drawerWidth,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const screenWidth = Dimensions.get("window").width;
  const width = drawerWidth ?? screenWidth * 0.8;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 0,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [position === "left" ? -width : width, 0],
  });

  return (
    <Modal
      testID={testID}
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: fadeAnim }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width,
            backgroundColor: colors.background,
            borderTopRightRadius: position === "left" ? radius.lg : 0,
            borderBottomRightRadius: position === "left" ? radius.lg : 0,
            borderTopLeftRadius: position === "right" ? radius.lg : 0,
            borderBottomLeftRadius: position === "right" ? radius.lg : 0,
            [position]: 0,
            transform: [{ translateX }],
          },
          style,
        ]}
      >
        {/* Header */}
        {header && (
          <View
            style={[
              styles.section,
              {
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                padding: spacing.lg,
              },
            ]}
          >
            {header}
          </View>
        )}

        {/* Items or children */}
        <View style={styles.body}>
          {children ??
            items?.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => {
                  item.onPress();
                  onClose();
                }}
                accessibilityRole="menuitem"
                accessibilityLabel={item.label}
                style={[
                  styles.menuItem,
                  {
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    backgroundColor: item.active
                      ? `${colors.primary}12`
                      : "transparent",
                    borderRadius: radius.md,
                    marginHorizontal: spacing.sm,
                    marginVertical: 2,
                  },
                ]}
              >
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={22}
                    color={item.active ? colors.primary : colors.muted}
                    style={{ marginRight: spacing.md }}
                  />
                )}
                <Text
                  style={{
                    flex: 1,
                    fontSize: fontSizes.sm,
                    fontWeight: item.active ? "600" : "400",
                    color: item.active ? colors.primary : colors.text,
                  }}
                >
                  {item.label}
                </Text>
                {item.badge != null && item.badge > 0 && (
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: colors.danger,
                        borderRadius: 10,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "700",
                        color: colors.onDanger,
                      }}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
        </View>

        {/* Footer */}
        {footer && (
          <View
            style={[
              styles.section,
              {
                borderTopWidth: 1,
                borderTopColor: colors.border,
                padding: spacing.lg,
              },
            ]}
          >
            {footer}
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  section: {},
  body: {
    flex: 1,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    minWidth: 20,
    alignItems: "center",
  },
});

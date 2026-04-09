import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number;
  closable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
  height: customHeight,
  closable = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const screenHeight = Dimensions.get("window").height;
  const sheetHeight = customHeight ?? screenHeight * 0.5;
  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }).start();
    } else {
      translateY.setValue(sheetHeight);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          translateY.setValue(g.dy);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > sheetHeight * 0.3 || g.vy > 0.5) {
          Animated.timing(translateY, {
            toValue: sheetHeight,
            duration: 200,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 150,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal testID={testID} transparent visible={visible} animationType="none" onRequestClose={closable ? onClose : undefined}>
      <Pressable
        style={styles.overlay}
        onPress={closable ? onClose : undefined}
        accessibilityLabel="Close bottom sheet"
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              backgroundColor: colors.surface,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              transform: [{ translateY }],
            },
            style,
          ]}
          {...panResponder.panHandlers}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            {/* Drag handle */}
            <View style={styles.handleRow} accessibilityLabel="Drag handle, swipe down to close">
              <View
                style={[
                  styles.handle,
                  { backgroundColor: colors.border },
                ]}
              />
            </View>

            {/* Title */}
            {title && (
              <Text
                style={{
                  fontSize: fontSizes.md,
                  fontWeight: "700",
                  color: colors.text,
                  textAlign: "center",
                  paddingBottom: spacing.md,
                }}
              >
                {title}
              </Text>
            )}

            {/* Content */}
            <View style={{ paddingHorizontal: spacing.lg, flex: 1 }}>
              {children}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    overflow: "hidden",
  },
  handleRow: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});

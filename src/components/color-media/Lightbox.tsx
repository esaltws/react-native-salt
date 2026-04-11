import React, { useRef } from "react";
import {
  View,
  Image,
  Pressable,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  visible: boolean;
  onClose: () => void;
  source: ImageSourcePropType;
  title?: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Lightbox({
  visible,
  onClose,
  source,
  title,
  description,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, iconSizes } = theme;
  const screen = Dimensions.get("window");
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      testID={testID}
    >
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.92)" }]}>
        {/* Close button */}
        <Pressable
          onPress={onClose}
          style={[styles.closeBtn, { top: spacing.xl + 20, right: spacing.lg, padding: spacing.sm }]}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Icon name="close" size={iconSizes.xl} color={colors.surface} />
        </Pressable>

        {/* Image */}
        <Animated.Image
          source={source}
          style={[
            styles.image,
            {
              width: screen.width,
              height: screen.width,
              transform: [{ scale }],
            },
          ]}
          resizeMode="contain"
        />

        {/* Info overlay */}
        {(title || description) && (
          <View
            style={[
              styles.info,
              {
                padding: spacing.lg,
                paddingBottom: spacing.xl + 20,
              },
            ]}
          >
            {title && (
              <Text
                style={{
                  fontSize: fontSizes.md,
                  fontWeight: "700",
                  color: colors.surface,
                }}
              >
                {title}
              </Text>
            )}
            {description && (
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  color: "rgba(255,255,255,0.7)",
                  marginTop: spacing.xs,
                }}
              >
                {description}
              </Text>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    zIndex: 10,
  },
  image: {
    maxHeight: "70%",
  },
  info: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

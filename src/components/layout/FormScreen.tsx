import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeContext";
import { Icon } from "../theme-settings/Icon";
import Title from "../typography/Title";
import Caption from "../typography/Caption";

type StepConfig = {
  current: number;
  total: number;
  labels?: string[];
};

export type FormScreenProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  children: React.ReactNode;
  bottomActions?: React.ReactNode;
  scrollable?: boolean;
  loading?: boolean;
  onLoadingPress?: () => void;
  error?: string;
  step?: StepConfig;
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export function FormScreen({
  title,
  subtitle,
  onBackPress,
  children,
  bottomActions,
  scrollable = true,
  loading = false,
  onLoadingPress,
  error,
  step,
  contentContainerStyle,
  testID,
}: FormScreenProps) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, sizeMap, iconSizes } = theme;

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, { padding: spacing.xl, gap: spacing.lg }, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { padding: spacing.xl }, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView testID={testID} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: spacing.md }]}>
          <View style={[styles.headerRow, { gap: spacing.md }]}>
            {onBackPress ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Go back"
                hitSlop={10}
                onPress={onBackPress}
                style={[styles.backButton, { width: sizeMap.sm, height: sizeMap.sm, borderRadius: sizeMap.sm / 2 }]}
              >
                <Icon name="back" size={iconSizes.sm} />
              </Pressable>
            ) : (
              <View style={{ width: sizeMap.sm }} />
            )}

            <View style={styles.titleBlock}>
              <Title style={[styles.title, { fontSize: fontSizes.lg }]}>{title}</Title>
              {subtitle ? (
                <Caption fontSize="lg" style={styles.subtitle}>
                  {subtitle}
                </Caption>
              ) : null}
            </View>
          </View>

          {step && (
            <View style={[styles.stepRow, { paddingHorizontal: spacing.xs }]}>
              {Array.from({ length: step.total }, (_, i) => (
                <View key={i} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepDot,
                      {
                        backgroundColor: i < step.current ? colors.primary : colors.border,
                        width: i === step.current - 1 ? spacing.xxl : spacing.sm,
                        height: spacing.sm,
                        borderRadius: radius.sm,
                      },
                    ]}
                  />
                  {step.labels?.[i] && (
                    <Caption style={{ color: i < step.current ? colors.primary : undefined, marginTop: 2 }}>
                      {step.labels[i]}
                    </Caption>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {error ? (
          <View style={[styles.errorBanner, { backgroundColor: colors.danger + "15", paddingHorizontal: spacing.xl }]}>
            <Caption fontSize="lg" style={{ color: colors.danger }}>{error}</Caption>
          </View>
        ) : null}

        <View style={styles.flex}>{content}</View>

        {bottomActions ? (
          <View style={[styles.bottomActions, { borderTopColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl }]}>
            {bottomActions}
          </View>
        ) : null}

        {loading && (
          <Pressable style={styles.loadingOverlay} onPress={onLoadingPress}>
            <ActivityIndicator size="large" color={colors.primary} />
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 6,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomActions: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 10,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepDot: {},
  errorBanner: {
    paddingVertical: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});

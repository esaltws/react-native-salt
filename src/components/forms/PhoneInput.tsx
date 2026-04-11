import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type CountryCode = {
  code: string;
  dial: string;
  flag: string;
  name: string;
};

const COUNTRIES: CountryCode[] = [
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "NL", dial: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "SE", dial: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "NO", dial: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "PK", dial: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "ZA", dial: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "EG", dial: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "PH", dial: "+63", flag: "🇵🇭", name: "Philippines" },
];

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  countryCode?: string;
  onChangeCountry?: (country: CountryCode) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  countries?: CountryCode[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function PhoneInput({
  value,
  onChangeText,
  countryCode = "US",
  onChangeCountry,
  label,
  error,
  placeholder = "Phone number",
  disabled = false,
  required = false,
  fullWidth = true,
  countries = COUNTRIES,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState("");

  const selected = countries.find((c) => c.code === countryCode) ?? countries[0];

  const filtered = search
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <View testID={testID} style={[fullWidth && { width: "100%" }, style]}>
      {label && (
        <Text
          style={{
            marginBottom: spacing.sm,
            color: colors.text,
            fontWeight: "600",
          }}
        >
          {label}
          {required && (
            <Text style={{ color: colors.danger }}> *</Text>
          )}
        </Text>
      )}

      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            borderWidth: 1,
            borderRadius: radius.md,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        {/* Country picker trigger */}
        <Pressable
          onPress={() => !disabled && setShowPicker(true)}
          accessibilityRole="button"
          accessibilityLabel={`Select country, current: ${selected.name}`}
          style={[
            styles.countryBtn,
            {
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.md,
              borderRightWidth: 1,
              borderRightColor: colors.border,
            },
          ]}
        >
          <Text style={{ fontSize: fontSizes.lg }}>{selected.flag}</Text>
          <Text
            style={{
              fontSize: fontSizes.sm,
              color: colors.text,
              fontWeight: "500",
              marginLeft: 6,
            }}
          >
            {selected.dial}
          </Text>
          <Icon
            name="chevron-down-outline"
            size={iconSizes.xs}
            color={colors.muted}
            style={{ marginLeft: spacing.xs }}
          />
        </Pressable>

        {/* Phone input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType="phone-pad"
          editable={!disabled}
          accessibilityLabel={label || "Phone number"}
          accessibilityState={{ disabled }}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: fontSizes.sm,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.md,
            },
          ]}
        />
      </View>

      {error && (
        <Text
          style={{
            marginTop: spacing.xs,
            color: colors.danger,
            fontSize: fontSizes.xs,
          }}
        >
          {error}
        </Text>
      )}

      {/* Country picker modal */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.background,
              borderTopLeftRadius: radius.lg,
              borderTopRightRadius: radius.lg,
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.modalHeader,
              {
                padding: spacing.lg,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                fontSize: fontSizes.md,
                fontWeight: "700",
                color: colors.text,
                flex: 1,
              }}
            >
              Select Country
            </Text>
            <Pressable
              onPress={() => setShowPicker(false)}
              accessibilityRole="button"
              accessibilityLabel="Close country picker"
            >
              <Icon name="close" size={iconSizes.md} color={colors.text} />
            </Pressable>
          </View>

          {/* Search */}
          <View
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
            }}
          >
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search country..."
              placeholderTextColor={colors.muted}
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                color: colors.text,
                fontSize: fontSizes.sm,
              }}
            />
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChangeCountry?.(item);
                  setShowPicker(false);
                  setSearch("");
                }}
                accessibilityRole="button"
                accessibilityLabel={`${item.name} ${item.dial}`}
                accessibilityState={{ selected: item.code === countryCode }}
                style={[
                  styles.countryRow,
                  {
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    backgroundColor:
                      item.code === countryCode
                        ? `${colors.primary}12`
                        : "transparent",
                  },
                ]}
              >
                <Text style={{ fontSize: fontSizes.xl, marginRight: spacing.md }}>
                  {item.flag}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: fontSizes.sm,
                    color: colors.text,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.sm,
                    color: colors.muted,
                    fontWeight: "500",
                  }}
                >
                  {item.dial}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  modal: {
    flex: 1,
    marginTop: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

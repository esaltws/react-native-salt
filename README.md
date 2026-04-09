# react-native-salt

119 themed React Native components for Expo. Built-in light/dark theming, font scaling, and zero native dependencies.

## Install

```bash
npm install react-native-salt
```

### Peer Dependencies

```bash
npm install react react-native @react-native-async-storage/async-storage
```

Optional (for icons):
```bash
npm install @expo/vector-icons
```

### Compatibility

| Requirement | Version |
|-------------|---------|
| React | >= 18.0.0 |
| React Native | >= 0.72.0 |
| Expo | SDK 49+ |
| TypeScript | >= 5.0 (recommended) |

Works in **Expo Go** — no dev build required.

---

## Quick Start

```tsx
import { SaltProvider, Screen, Stack, Title, Text, Button } from "react-native-salt";

export default function App() {
  return (
    <SaltProvider>
      <Screen scroll>
        <Stack gap="lg" style={{ padding: 16 }}>
          <Title>Hello</Title>
          <Text>Welcome to Salt.</Text>
          <Button title="Get Started" onPress={() => {}} />
        </Stack>
      </Screen>
    </SaltProvider>
  );
}
```

---

## Theme System

### SaltProvider

Wrap your app root. Manages light/dark mode, font scaling, and persists preference to AsyncStorage.

```tsx
<SaltProvider
  defaultPreference="system" // "system" | "light" | "dark"
  defaultFontLevel={16}      // 8–18
>
  {children}
</SaltProvider>
```

#### Custom Themes

```tsx
<SaltProvider customLight={myLightTheme} customDark={myDarkTheme}>
  {children}
</SaltProvider>
```

### useTheme()

Access theme tokens and controls in any component:

```tsx
import { useTheme } from "react-native-salt";

function MyComponent() {
  const { theme, mode, preference, setPreference, fontLevel, setFontLevel, isThemeLoaded } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  return <View style={{ backgroundColor: colors.surface, padding: spacing.md, borderRadius: radius.md }} />;
}
```

### Design Tokens

```
spacing:   { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 }
radius:    { none: 0, sm: 6, md: 10, lg: 14, xl: 20, xxl: 24, pill: 999 }
fontSizes: { xs: 10, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, "3xl": 32 }
           (values shift based on fontLevel 8–18)
```

### Colors

| Token | Light | Dark |
|-------|-------|------|
| primary | #2563eb | #60a5fa |
| secondary | #7c3aed | #a78bfa |
| danger | #dc2626 | #f87171 |
| success | #16a34a | #4ade80 |
| warning | #d97706 | #fbbf24 |
| info | #0ea5e9 | #38bdf8 |
| background | #f8fafc | #0f172a |
| surface | #ffffff | #1e293b |
| text | #0f172a | #f8fafc |
| muted | #64748b | #94a3b8 |
| border | #e2e8f0 | #334155 |

Each intent has an `onX` counterpart (e.g., `onPrimary`, `onDanger`) for text on colored backgrounds.

---

## Shared Types

```typescript
import type {
  Variant,          // "solid" | "outline" | "ghost" | "text" | "link"
  Intent,           // "primary" | "secondary" | "danger" | "success" | "warning" | "info"
  SizeToken,        // "sm" | "md" | "lg"
  TypographySize,   // "sm" | "md" | "lg"
  Theme,            // Full theme object
  ThemeMode,        // "light" | "dark"
  ThemePreference,  // "system" | "light" | "dark"
  ThemeColors,      // All color tokens
  SpacingToken,     // "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  RadiusToken,      // "none" | "sm" | "md" | "lg" | "xl" | "xxl" | "pill"
  FontSizeToken,    // "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl"
  ColorToken,       // keyof ThemeColors
  Elevation,        // 0 | 1 | 2 | 3
  Decoration,       // "underline" | "strikethrough"
  LineHeightToken,  // "tight" | "normal" | "relaxed"
} from "react-native-salt";
```

---

## Components (119)

| Category | Count | Components |
|----------|-------|------------|
| Layout | 13 | Screen, Stack, Row, Column, Spacer, Divider, Card, FormScreen, Gradient, SectionHeader, ListSeparator, PullIndicator, GestureHandle |
| Typography | 5 | Display, Title, Text, Label, Caption |
| Buttons | 6 | Button, ButtonGroup, FAB, SpeedDial, ActionFooter, ActionSheet |
| Forms | 18 | Input, TextArea, FormField, SearchBar, Select, DropdownSelect, Checkbox, Switch, RadioGroup, Slider, RangeSlider, NumericInput, DatePicker, TimePicker, OTPInput, PasswordInput, PhoneInput, CurrencyInput |
| Tags | 3 | ChipGroup, TagList, TagInput |
| Color & Media | 5 | ColorPalette, ColorPicker, ColorPickerTrigger, MediaPickerRow, Lightbox |
| Data Display | 13 | ListItem, InfoRow, KeyValueList, DataTable, ComparisonTable, SortHeader, StatGrid, MetricCard, SummaryCard, Leaderboard, Timeline, CodeBlock, ImageCard |
| Charts | 3 | BarChart, PieChart, LineChart |
| Navigation | 7 | ScreenHeader, Tabs, SegmentedControl, Breadcrumb, StepIndicator, PaginationBar, Drawer |
| Feedback | 8 | Toast, Snackbar, Banner, AlertDialog, Modal, Tooltip, Popover, Confetti |
| Progress | 5 | ProgressBar, ProgressRing, Loader, Skeleton, CountdownTimer |
| Status | 4 | Badge, StatusDot, StatusTracker, NetworkBanner |
| User | 4 | Avatar, AvatarGroup, ProfileHeader, SocialButton |
| Auth | 1 | AuthDivider |
| Chat | 2 | MessageBubble, TypingIndicator |
| Notification | 3 | NotificationItem, OnboardingSlide, PermissionCard |
| Commerce | 4 | PriceTag, QuantitySelector, RatingStars, PromoInput |
| Lists | 3 | SwipeableRow, DragList, Accordion |
| Tree | 1 | TreeView |
| Error | 3 | EmptyState, ErrorState, RetryView |
| Editor | 3 | FloatingToolbar, CanvasControlPanel, LayerListItem |
| Theme | 3 | ThemeSwitcher, FontLevelSwitcher, Icon |
| Carousel | 2 | Carousel, BottomSheet |

---

## API Reference

### Layout & Structure

#### Screen

SafeArea wrapper with optional scroll and keyboard avoidance.

```tsx
<Screen scroll keyboardAware statusBarStyle="dark">
  {children}
</Screen>
```

| Prop | Type | Default |
|------|------|---------|
| scroll | boolean | false |
| keyboardAware | boolean | false |
| statusBarStyle | "light" \| "dark" \| "default" | — |
| contentContainerStyle | StyleProp\<ViewStyle\> | — |

#### Stack

Flex container with direction, gap, and optional dividers.

```tsx
<Stack direction="vertical" gap="md" align="center" divider>
  {children}
</Stack>
```

| Prop | Type | Default |
|------|------|---------|
| direction | "horizontal" \| "vertical" | "vertical" |
| gap | Spacing | — |
| align | ViewStyle["alignItems"] | — |
| justify | ViewStyle["justifyContent"] | — |
| wrap | boolean | false |
| divider | boolean \| ReactNode | — |
| animated | boolean | false |
| responsive | { breakpoint, direction, gap } | — |

#### Row

Horizontal flex shorthand.

```tsx
<Row gap="sm" align="center" justify="space-between" fill>
  {children}
</Row>
```

| Prop | Type | Default |
|------|------|---------|
| gap | Spacing | — |
| align | ViewStyle["alignItems"] | — |
| justify | ViewStyle["justifyContent"] | — |
| wrap | boolean | false |
| fill | boolean | false |

#### Column

Vertical flex shorthand. Props identical to Row.

```tsx
<Column gap="md" align="stretch">
  {children}
</Column>
```

#### Card

Elevated container with optional press, header, footer, image.

```tsx
<Card elevation={2} onPress={handlePress}>
  <Text>Content</Text>
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| elevation | Elevation | — |
| onPress | () => void | — |
| header | ReactNode | — |
| footer | ReactNode | — |
| image | ImageSourcePropType | — |
| imageHeight | number | — |

#### Spacer

```tsx
<Spacer size="lg" />
<Spacer flex />
<Spacer horizontal size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| size | Spacing \| ResponsiveSize | — |
| horizontal | boolean | false |
| flex | number \| boolean | — |

#### Divider

```tsx
<Divider />
<Divider vertical thickness={2} inset="md" />
```

| Prop | Type | Default |
|------|------|---------|
| vertical | boolean | false |
| thickness | number | — |
| color | string | — |
| inset | Spacing | — |
| margin | Spacing | — |

#### SectionHeader

```tsx
<SectionHeader title="Settings" actionText="See All" onActionPress={go} collapsible>
  {children}
</SectionHeader>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| subtitle | string | — |
| icon | string | — |
| actionText | string | — |
| onActionPress | () => void | — |
| collapsible | boolean | false |
| defaultCollapsed | boolean | — |
| collapsed | boolean | — |
| onCollapsedChange | (collapsed: boolean) => void | — |
| sticky | boolean | false |

#### FormScreen

Form wrapper with title, back, steps, footer, loading, and error.

```tsx
<FormScreen title="Sign Up" step={{ current: 1, total: 3 }} bottomActions={<Button title="Next" />}>
  <Input label="Email" />
</FormScreen>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| subtitle | string | — |
| onBackPress | () => void | — |
| bottomActions | ReactNode | — |
| scrollable | boolean | — |
| loading | boolean | — |
| error | string | — |
| step | { current, total, labels? } | — |

#### Gradient

```tsx
<Gradient colors={["#4A90D9", "#7c3aed"]} direction="diagonal" height={200}>
  <Title style={{ color: "#fff" }}>Hero</Title>
</Gradient>
```

| Prop | Type | Default |
|------|------|---------|
| colors | [string, string, ...string[]] | required |
| direction | "vertical" \| "horizontal" \| "diagonal" | "vertical" |
| steps | number | — |
| height | number | — |
| borderRadius | number | — |

#### ListSeparator

```tsx
<ListSeparator inset="lg" />
```

| Prop | Type | Default |
|------|------|---------|
| inset | Spacing | — |
| margin | Spacing | — |

#### PullIndicator

Pill bar handle for bottom sheets / modals.

```tsx
<PullIndicator width={40} height={4} />
```

| Prop | Type | Default |
|------|------|---------|
| width | number | — |
| height | number | — |
| color | string | — |

#### GestureHandle

```tsx
<GestureHandle position="corner" variant="dot" onDrag={(dx, dy) => {}} />
```

| Prop | Type | Default |
|------|------|---------|
| position | "top" \| "bottom" \| "left" \| "right" \| "corner" | — |
| variant | "dot" \| "bar" \| "corner" | — |
| size | number | — |
| hitSlop | number | — |
| onDragStart | () => void | — |
| onDrag | (dx, dy) => void | — |
| onDragEnd | (dx, dy) => void | — |

---

### Typography

All 5 typography components share these props:

```typescript
{
  fontSize?: "sm" | "md" | "lg";  // default: "md"
  align?: "left" | "center" | "right";
  lines?: number;
  truncate?: "head" | "middle" | "tail" | "clip";
  decoration?: "underline" | "strikethrough";
  // + all React Native TextProps (style, onPress, etc.)
}
```

#### Display

Hero text. Weight 700, color: text.

```tsx
<Display fontSize="lg">Welcome</Display>
```

| Size | Pixels |
|------|--------|
| sm | 24 |
| md | 32 |
| lg | 40 |

#### Title

Screen/section headers. Weight 600, color: text. Auto `accessibilityRole="header"`.

```tsx
<Title fontSize="md">Settings</Title>
```

| Size | Pixels |
|------|--------|
| sm | 18 |
| md | 20 |
| lg | 24 |

#### Text

Body text. Weight 400, color: text.

```tsx
<Text fontSize="md" lineHeight="relaxed">Paragraph text here.</Text>
```

| Size | Pixels |
|------|--------|
| sm | 14 |
| md | 16 |
| lg | 18 |

Extra prop: `lineHeight?: "tight" | "normal" | "relaxed"` (default: "normal")

#### Label

Form labels, chips, tags. Weight 500, color: text.

```tsx
<Label fontSize="sm" uppercase>Category</Label>
```

| Size | Pixels |
|------|--------|
| sm | 12 |
| md | 14 |
| lg | 16 |

Extra prop: `uppercase?: boolean`

#### Caption

Timestamps, footnotes, helper text. Weight 400, color: muted.

```tsx
<Caption>2 hours ago</Caption>
```

| Size | Pixels |
|------|--------|
| sm | 10 |
| md | 12 |
| lg | 14 |

---

### Buttons & Actions

#### Button

```tsx
<Button title="Save" variant="solid" intent="primary" size="md" onPress={save} />
<Button title="Delete" variant="outline" intent="danger" />
<Button icon="add" intent="primary" />           {/* icon-only */}
<Button title="Next" iconRight="arrow-forward" /> {/* with trailing icon */}
<Button title="Saving..." loading disabled />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | — |
| variant | Variant | "solid" |
| intent | Intent | "primary" |
| size | SizeToken | "md" |
| onPress | () => void | — |
| disabled | boolean | false |
| loading | boolean | false |
| fullWidth | boolean | false |
| iconLeft | string | — |
| iconRight | string | — |
| icon | string | — (icon-only mode) |
| textStyle | StyleProp\<TextStyle\> | — |

#### ButtonGroup

```tsx
<ButtonGroup
  items={[{ key: "left", label: "Left" }, { key: "center", icon: "grid-outline" }]}
  selected="left"
  onSelect={setAlign}
  intent="primary"
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | ButtonItem[] | required |
| selected | string \| string[] | required |
| onSelect | (key: string) => void | required |
| multiple | boolean | false |
| intent | Intent | — |
| size | SizeToken | — |
| fullWidth | boolean | false |

ButtonItem: `{ key, label?, icon?, disabled? }`

#### FAB

```tsx
<FAB icon="add" onPress={create} intent="primary" position="bottom-right" />
```

| Prop | Type | Default |
|------|------|---------|
| icon | string | — |
| label | string | — |
| onPress | () => void | required |
| intent | Intent | — |
| size | SizeToken | — |
| position | "bottom-right" \| "bottom-left" \| "bottom-center" | "bottom-right" |
| disabled | boolean | false |

#### SpeedDial

```tsx
<SpeedDial
  icon="add"
  actions={[
    { key: "photo", icon: "camera-outline", label: "Photo", onPress: takePhoto },
    { key: "file", icon: "document-outline", label: "File", onPress: pickFile },
  ]}
  intent="primary"
/>
```

| Prop | Type | Default |
|------|------|---------|
| actions | SpeedDialAction[] | required |
| icon | string | — |
| openIcon | string | — |
| intent | Intent | — |
| position | "bottom-right" \| "bottom-left" \| "bottom-center" | — |

SpeedDialAction: `{ key, icon, label?, onPress, color? }`

#### ActionFooter

Sticky bottom bar.

```tsx
<ActionFooter>
  <Button title="Cancel" variant="outline" />
  <Button title="Save" />
</ActionFooter>
```

#### ActionSheet

```tsx
<ActionSheet
  visible={open}
  onClose={() => setOpen(false)}
  title="Options"
  options={[
    { label: "Edit", onPress: edit },
    { label: "Delete", onPress: del, destructive: true },
  ]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| title | string | — |
| options | ActionOption[] | required |

ActionOption: `{ label, onPress, destructive? }`

---

### Form Inputs

#### Input

```tsx
<Input label="Email" placeholder="you@example.com" size="md" error={errors.email} required />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | — |
| error | string | — |
| size | Size | — |
| fullWidth | boolean | — |
| required | boolean | — |
| containerStyle | StyleProp\<ViewStyle\> | — |
| + all TextInputProps | | |

#### FormField

Wraps Input or custom content with label, helper text, and error.

```tsx
<FormField mode="input" label="Name" helperText="As on your ID" required />
<FormField mode="custom" label="Color" error={err}>
  <ColorPalette ... />
</FormField>
```

#### SearchBar

```tsx
<SearchBar value={query} onChangeText={setQuery} placeholder="Search..." size="md" clearable />
```

| Prop | Type | Default |
|------|------|---------|
| value | string | required |
| onChangeText | (text) => void | required |
| placeholder | string | — |
| size | "sm" \| "md" \| "lg" | — |
| showIcon | boolean | — |
| clearable | boolean | — |
| onClear | () => void | — |
| autoFocus | boolean | — |

#### TextArea

```tsx
<TextArea label="Bio" maxLength={200} showCount rows={4} required />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | — |
| error | string | — |
| maxLength | number | — |
| showCount | boolean | — |
| rows | number | — |
| fullWidth | boolean | — |
| required | boolean | — |

#### PasswordInput

```tsx
<PasswordInput label="Password" showStrength strength="strong" required />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | — |
| error | string | — |
| size | Size | — |
| fullWidth | boolean | — |
| showStrength | boolean | — |
| strength | "weak" \| "fair" \| "good" \| "strong" | — |
| required | boolean | — |

#### OTPInput

```tsx
<OTPInput length={6} value={otp} onChange={setOtp} autoFocus size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| length | number | — |
| value | string | required |
| onChange | (code) => void | required |
| autoFocus | boolean | — |
| secure | boolean | — |
| error | string | — |
| disabled | boolean | — |
| size | "sm" \| "md" \| "lg" | — |

#### Select

Modal picker with optional search.

```tsx
<Select
  options={[{ key: "us", label: "United States" }, { key: "uk", label: "United Kingdom" }]}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
  label="Country"
  searchable
/>
```

| Prop | Type | Default |
|------|------|---------|
| options | SelectOption[] | required |
| value | string \| null | required |
| onChange | (key) => void | required |
| placeholder | string | — |
| label | string | — |
| error | string | — |
| disabled | boolean | — |
| searchable | boolean | — |
| size | Size | — |
| fullWidth | boolean | — |

SelectOption: `{ key, label, icon?, disabled? }`

#### DropdownSelect

Inline dropdown (no modal).

```tsx
<DropdownSelect options={options} value={selected} onChange={setSelected} label="Category" maxVisible={5} />
```

| Prop | Type | Default |
|------|------|---------|
| options | DropdownOption[] | required |
| value | string \| null | required |
| onChange | (key) => void | required |
| placeholder | string | — |
| label | string | — |
| error | string | — |
| disabled | boolean | — |
| size | SizeToken | — |
| fullWidth | boolean | — |
| maxVisible | number | — |

DropdownOption: `{ key, label, icon?, description?, disabled? }`

#### Switch

```tsx
<Switch value={enabled} onValueChange={setEnabled} size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| value | boolean | required |
| onValueChange | (value) => void | required |
| size | SizeToken | — |
| disabled | boolean | — |

#### Checkbox

```tsx
<Checkbox checked={agreed} onToggle={setAgreed} label="I agree to terms" size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| checked | boolean | required |
| onToggle | (checked) => void | required |
| label | string | — |
| description | string | — |
| size | SizeToken | — |
| disabled | boolean | — |

#### RadioGroup

```tsx
<RadioGroup
  items={[{ key: "s", label: "Small" }, { key: "m", label: "Medium" }, { key: "l", label: "Large" }]}
  selected={size}
  onSelect={setSize}
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | RadioItem[] | required |
| selected | string \| null | required |
| onSelect | (key) => void | required |

RadioItem: `{ key, label, description? }`

#### Slider

```tsx
<Slider value={50} onValueChange={setValue} min={0} max={100} step={1} showValue />
```

| Prop | Type | Default |
|------|------|---------|
| value | number | required |
| onValueChange | (value) => void | required |
| min | number | 0 |
| max | number | 100 |
| step | number | — |
| size | SizeToken | — |
| disabled | boolean | — |
| showValue | boolean | — |

#### RangeSlider

```tsx
<RangeSlider low={20} high={80} onChangeRange={(l, h) => {}} min={0} max={100} showValues />
```

| Prop | Type | Default |
|------|------|---------|
| low | number | required |
| high | number | required |
| onChangeRange | (low, high) => void | required |
| min | number | 0 |
| max | number | 100 |
| step | number | — |
| minGap | number | — |
| showValues | boolean | — |
| formatValue | (value) => string | — |
| intent | Intent | — |
| disabled | boolean | — |

#### DatePicker

```tsx
<DatePicker value={date} onChange={setDate} minDate={new Date()} />
```

| Prop | Type | Default |
|------|------|---------|
| value | Date | — |
| onChange | (date) => void | required |
| minDate | Date | — |
| maxDate | Date | — |

#### TimePicker

```tsx
<TimePicker value={{ hours: 14, minutes: 30 }} onChange={setTime} format="12h" minuteStep={5} />
```

| Prop | Type | Default |
|------|------|---------|
| value | { hours, minutes } | — |
| onChange | (time) => void | required |
| format | "12h" \| "24h" | — |
| minuteStep | number | — |

#### NumericInput

```tsx
<NumericInput value={42} onChange={setVal} min={0} max={999} step={1} prefix="$" />
```

| Prop | Type | Default |
|------|------|---------|
| value | number | required |
| onChange | (value) => void | required |
| min | number | — |
| max | number | — |
| step | number | — |
| label | string | — |
| error | string | — |
| disabled | boolean | — |
| size | SizeToken | — |
| fullWidth | boolean | — |
| prefix | string | — |
| suffix | string | — |

#### CurrencyInput

```tsx
<CurrencyInput value={29.99} onChange={setPrice} currency="$" decimals={2} label="Price" />
```

| Prop | Type | Default |
|------|------|---------|
| value | number | required |
| onChange | (value) => void | required |
| currency | string | "$" |
| decimals | number | — |
| label | string | — |
| error | string | — |
| disabled | boolean | — |
| required | boolean | — |
| size | Size | — |
| fullWidth | boolean | — |
| min | number | — |
| max | number | — |

#### PhoneInput

```tsx
<PhoneInput value={phone} onChangeText={setPhone} countryCode="US" label="Phone" required />
```

| Prop | Type | Default |
|------|------|---------|
| value | string | required |
| onChangeText | (text) => void | required |
| countryCode | string | — |
| onChangeCountry | (country) => void | — |
| label | string | — |
| error | string | — |
| disabled | boolean | — |
| required | boolean | — |
| fullWidth | boolean | — |

---

### Tags & Chips

#### ChipGroup

Single-select filter chips with optional "All" chip.

```tsx
<ChipGroup
  items={[{ key: "new", label: "New" }, { key: "sale", label: "Sale" }]}
  selected={filter}
  onSelect={setFilter}
  showAll
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | ChipItem[] | required |
| selected | string \| null | required |
| onSelect | (key \| null) => void | required |
| showAll | boolean | — |
| allLabel | string | "All" |
| size | SizeToken | — |

ChipItem: `{ key, label }`

#### TagInput

```tsx
<TagInput tags={tags} onChangeTags={setTags} placeholder="Add tag..." maxTags={10} suggestions={["react", "expo"]} />
```

| Prop | Type | Default |
|------|------|---------|
| tags | string[] | required |
| onChangeTags | (tags) => void | required |
| placeholder | string | — |
| label | string | — |
| error | string | — |
| maxTags | number | — |
| disabled | boolean | — |
| suggestions | string[] | — |
| fullWidth | boolean | — |

#### TagList

```tsx
<TagList tags={[{ key: "1", label: "React", intent: "primary" }]} onRemove={removeTag} onAdd={addTag} />
```

| Prop | Type | Default |
|------|------|---------|
| tags | TagItem[] | required |
| onRemove | (key) => void | — |
| onPress | (key) => void | — |
| onAdd | () => void | — |
| addLabel | string | — |
| size | SizeToken | — |

TagItem: `{ key, label, color?, intent? }`

---

### Color & Media

#### ColorPalette

```tsx
<ColorPalette colors={["#f00", "#0f0", "#00f"]} value={color} onChange={setColor} columns={6} showHex />
```

| Prop | Type | Default |
|------|------|---------|
| colors | string[] | required |
| value | string \| null | required |
| onChange | (color) => void | required |
| columns | number | — |
| swatchSize | number | — |
| label | string | — |
| showHex | boolean | — |
| disabled | boolean | — |

#### ColorPicker

```tsx
<ColorPicker color="#2563eb" onColorChange={setColor} showAlpha presets={["#f00", "#0f0"]} />
```

| Prop | Type | Default |
|------|------|---------|
| color | string | — |
| onColorChange | (color) => void | — |
| showAlpha | boolean | — |
| alpha | number | — |
| onAlphaChange | (alpha) => void | — |
| colorSpace | "hcl" \| "oklch" | — |
| presets | string[] | — |
| recentColors | string[] | — |
| showInput | boolean | — |

#### ColorPickerTrigger

```tsx
<ColorPickerTrigger color="#2563eb" onPress={openPicker} label="Fill" showHex size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| color | string | required |
| onPress | () => void | — |
| label | string | — |
| showHex | boolean | — |
| size | "sm" \| "md" \| "lg" | — |
| disabled | boolean | — |

#### Lightbox

```tsx
<Lightbox visible={open} onClose={close} source={{ uri: imageUrl }} title="Photo" />
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| source | ImageSourcePropType | required |
| title | string | — |
| description | string | — |

#### MediaPickerRow

```tsx
<MediaPickerRow items={media} onAdd={pickMedia} onRemove={removeMedia} maxItems={5} />
```

| Prop | Type | Default |
|------|------|---------|
| items | MediaItem[] | required |
| onAdd | () => void | — |
| onRemove | (id) => void | — |
| onPress | (item) => void | — |
| maxItems | number | — |
| size | number | — |
| label | string | — |
| disabled | boolean | — |

MediaItem: `{ uri, id }`

---

### Data Display

#### ListItem

```tsx
<ListItem title="Wi-Fi" subtitle="Connected" left={<Icon name="wifi" />} right={<Switch ... />} onPress={go} />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| subtitle | string | — |
| left | ReactNode | — |
| right | ReactNode | — |
| onPress | () => void | — |
| disabled | boolean | — |

#### ImageCard

```tsx
<ImageCard imageUrl={url} title="Mountain" subtitle="Nepal" badge="New" imageHeight={200} onPress={open} />
```

| Prop | Type | Default |
|------|------|---------|
| imageUrl | string \| null | required |
| title | string | required |
| subtitle | string | — |
| badge | string | — |
| footer | ReactNode | — |
| onPress | () => void | — |
| imageHeight | number | — |

#### InfoRow

```tsx
<InfoRow title="Status" value="Active" subtitle="Since Jan 2024" left={<StatusDot status="online" />} />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| value | string | required |
| subtitle | string | — |
| left | ReactNode | — |

#### MetricCard

```tsx
<MetricCard title="Revenue" value="$12,340" trend="up" trendValue="+12%" icon="trending-up" intent="success" />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| value | string \| number | required |
| subtitle | string | — |
| trend | "up" \| "down" \| "neutral" | — |
| trendValue | string | — |
| icon | string | — |
| intent | Intent | — |

#### SummaryCard

```tsx
<SummaryCard label="Total Orders" value="1,234" subtitle="+5% this week" />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | required |
| value | string | required |
| subtitle | string | — |

#### CodeBlock

```tsx
<CodeBlock code={`const x = 1;`} language="tsx" showLineNumbers copyable />
```

| Prop | Type | Default |
|------|------|---------|
| code | string | required |
| language | string | — |
| showLineNumbers | boolean | — |
| copyable | boolean | — |
| onCopy | (code) => void | — |
| maxHeight | number | — |

#### DataTable

Generic typed table with sorting, selection, striping.

```tsx
<DataTable
  columns={[
    { key: "name", title: "Name", flex: 1 },
    { key: "age", title: "Age", width: 60, sortable: true },
  ]}
  data={users}
  keyExtractor={(u) => u.id}
  sortColumn="age"
  sortDirection="asc"
  onSort={handleSort}
  striped
/>
```

| Prop | Type | Default |
|------|------|---------|
| columns | Column\<T\>[] | required |
| data | T[] | required |
| keyExtractor | (item, index) => string | required |
| sortColumn | string | — |
| sortDirection | "asc" \| "desc" \| null | — |
| onSort | (column, direction) => void | — |
| selectedKeys | string[] | — |
| onSelectRow | (key) => void | — |
| striped | boolean | — |
| bordered | boolean | — |
| compact | boolean | — |
| emptyMessage | string | — |

Column: `{ key, title, width?, flex?, align?, render?, sortable? }`

#### KeyValueList

```tsx
<KeyValueList items={[{ key: "1", label: "Email", value: "user@test.com" }]} bordered compact />
```

| Prop | Type | Default |
|------|------|---------|
| items | KeyValueItem[] | required |
| bordered | boolean | — |
| compact | boolean | — |
| labelWidth | number | — |

KeyValueItem: `{ key, label, value: string | ReactNode, icon?, onPress? }`

#### StatGrid

```tsx
<StatGrid items={stats} columns={3} compact bordered />
```

| Prop | Type | Default |
|------|------|---------|
| items | StatItem[] | required |
| columns | 2 \| 3 \| 4 | — |
| compact | boolean | — |
| bordered | boolean | — |

StatItem: `{ key, label, value, icon?, color? }`

#### ComparisonTable

```tsx
<ComparisonTable
  plans={[{ key: "free", name: "Free" }, { key: "pro", name: "Pro", highlight: true, badge: "Popular" }]}
  features={[{ key: "storage", label: "Storage", values: { free: "5GB", pro: "100GB" } }]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| plans | ComparisonPlan[] | required |
| features | ComparisonFeature[] | required |
| planWidth | number | — |
| featureLabelWidth | number | — |

ComparisonPlan: `{ key, name, highlight?, badge? }`
ComparisonFeature: `{ key, label, values: Record<string, boolean | string> }`

#### Leaderboard

```tsx
<Leaderboard items={players} showMedals highlightKey="currentUser" />
```

| Prop | Type | Default |
|------|------|---------|
| items | LeaderboardItem[] | required |
| showMedals | boolean | — |
| highlightKey | string | — |
| startRank | number | — |
| scoreLabel | string | — |

LeaderboardItem: `{ key, name, score, avatar?, subtitle? }`

#### SortHeader

```tsx
<SortHeader label="Name" active direction="asc" onPress={toggleSort} />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | required |
| active | boolean | — |
| direction | "asc" \| "desc" \| null | — |
| onPress | () => void | required |
| align | "left" \| "center" \| "right" | — |

#### Timeline

```tsx
<Timeline
  events={[
    { key: "1", title: "Order placed", timestamp: "10:00 AM", intent: "success" },
    { key: "2", title: "Shipped", timestamp: "2:00 PM", icon: "airplane-outline" },
  ]}
  linePosition="left"
/>
```

| Prop | Type | Default |
|------|------|---------|
| events | TimelineEvent[] | required |
| linePosition | "left" \| "center" | — |
| showConnector | boolean | — |

TimelineEvent: `{ key, title, description?, timestamp?, icon?, intent?, content? }`

---

### Charts

All charts are pure React Native — no SVG dependency.

#### BarChart

```tsx
<BarChart
  items={[{ key: "jan", label: "Jan", value: 100 }, { key: "feb", label: "Feb", value: 150 }]}
  intent="primary"
  showValues
  animated
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | BarItem[] | required |
| maxValue | number | — |
| showValues | boolean | — |
| showLabels | boolean | — |
| barHeight | number | — |
| intent | Intent | — |
| animated | boolean | — |

BarItem: `{ key, label, value, color?, intent? }`

#### LineChart

```tsx
<LineChart data={points} height={200} showDots showGrid intent="primary" fillOpacity={0.1} />
```

| Prop | Type | Default |
|------|------|---------|
| data | DataPoint[] | required |
| height | number | — |
| showDots | boolean | — |
| showLabels | boolean | — |
| showValues | boolean | — |
| showGrid | boolean | — |
| intent | Intent | — |
| color | string | — |
| fillOpacity | number | — |

DataPoint: `{ label, value }`

#### PieChart

```tsx
<PieChart
  slices={[{ key: "a", value: 40, label: "Food", color: "#f00" }]}
  donut
  centerLabel="Total"
  centerValue="$100"
  showLegend
/>
```

| Prop | Type | Default |
|------|------|---------|
| slices | PieSlice[] | required |
| size | number | — |
| donut | boolean | — |
| donutWidth | number | — |
| centerLabel | string | — |
| centerValue | string | — |
| showLegend | boolean | — |

PieSlice: `{ key, value, label, color }`

---

### Navigation

#### ScreenHeader

```tsx
<ScreenHeader
  title="Profile"
  subtitle="Edit your details"
  onBack={goBack}
  actions={[{ icon: "settings-outline", onPress: openSettings }]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| subtitle | string | — |
| onBack | () => void | — |
| backIcon | string | — |
| actions | HeaderAction[] | — |
| transparent | boolean | — |
| centerTitle | boolean | — |

HeaderAction: `{ icon, onPress, badge? }`

#### Tabs

```tsx
<Tabs
  items={[{ key: "all", label: "All" }, { key: "active", label: "Active", badge: 3 }]}
  selected={tab}
  onSelect={setTab}
  scrollable
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | TabItem[] | required |
| selected | string | required |
| onSelect | (key) => void | required |
| size | SizeToken | — |
| scrollable | boolean | — |

TabItem: `{ key, label, badge? }`

#### SegmentedControl

```tsx
<SegmentedControl
  items={[{ key: "day", label: "Day" }, { key: "week", label: "Week" }]}
  selected={period}
  onSelect={setPeriod}
  fullWidth
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | SegmentItem[] | required |
| selected | string | required |
| onSelect | (key) => void | required |
| size | SizeToken | — |
| fullWidth | boolean | — |
| disabled | boolean | — |

SegmentItem: `{ key, label }`

#### StepIndicator

```tsx
<StepIndicator steps={["Cart", "Shipping", "Payment"]} currentStep={1} />
```

| Prop | Type | Default |
|------|------|---------|
| steps | string[] | required |
| currentStep | number | required |

#### Breadcrumb

```tsx
<Breadcrumb items={[{ key: "home", label: "Home", onPress: goHome }, { key: "settings", label: "Settings" }]} />
```

| Prop | Type | Default |
|------|------|---------|
| items | BreadcrumbItem[] | required |
| separator | string | — |
| separatorIcon | string | — |
| size | SizeToken | — |

BreadcrumbItem: `{ key, label, icon?, onPress? }`

#### PaginationBar

```tsx
<PaginationBar currentPage={1} totalPages={10} onPageChange={setPage} showPageNumbers />
```

| Prop | Type | Default |
|------|------|---------|
| currentPage | number | required |
| totalPages | number | required |
| onPageChange | (page) => void | required |
| showPageNumbers | boolean | — |
| maxVisiblePages | number | — |
| size | "sm" \| "md" \| "lg" | — |

#### Drawer

```tsx
<Drawer
  visible={open}
  onClose={() => setOpen(false)}
  items={[{ key: "home", label: "Home", icon: "home-outline", onPress: goHome, active: true }]}
  header={<ProfileHeader ... />}
  position="left"
/>
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| items | DrawerItem[] | — |
| header | ReactNode | — |
| footer | ReactNode | — |
| children | ReactNode | — |
| position | "left" \| "right" | — |
| width | number | — |

DrawerItem: `{ key, label, icon?, onPress, active?, badge? }`

---

### Feedback & Alerts

#### Modal

```tsx
<Modal
  visible={open}
  onClose={close}
  title="Confirm"
  message="Are you sure?"
  confirmText="Yes"
  cancelText="No"
  onConfirm={doIt}
  destructive
/>
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| title | string | — |
| message | string | — |
| children | ReactNode | — |
| confirmText | string | — |
| cancelText | string | — |
| onConfirm | () => void | — |
| onCancel | () => void | — |
| destructive | boolean | — |
| closable | boolean | — |

#### AlertDialog

```tsx
<AlertDialog
  visible={open}
  onClose={close}
  title="Delete?"
  message="This cannot be undone."
  intent="danger"
  icon="warning-outline"
  confirmText="Delete"
  onConfirm={handleDelete}
  destructive
/>
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| title | string | required |
| message | string | — |
| icon | string | — |
| intent | Intent | — |
| confirmText | string | — |
| cancelText | string | — |
| onConfirm | () => void | — |
| onCancel | () => void | — |
| destructive | boolean | — |

#### Toast

```tsx
<Toast visible={show} message="Saved!" intent="success" icon="checkmark" position="top" onDismiss={hide} duration={3000} />
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| message | string | required |
| intent | Intent | — |
| icon | string | — |
| duration | number | 3000 |
| position | "top" \| "bottom" | — |
| onDismiss | () => void | required |
| actionLabel | string | — |
| onActionPress | () => void | — |

#### Snackbar

```tsx
<Snackbar visible={show} message="Item deleted" actionLabel="Undo" onAction={undo} onDismiss={hide} />
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| message | string | required |
| actionLabel | string | — |
| onAction | () => void | — |
| onDismiss | () => void | required |
| duration | number | — |
| icon | string | — |
| position | "top" \| "bottom" | — |

#### Banner

```tsx
<Banner title="Update available" intent="info" dismissible onDismiss={hide} actionLabel="Update" onAction={update} />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| message | string | — |
| intent | Intent | — |
| icon | string | — |
| dismissible | boolean | — |
| onDismiss | () => void | — |
| actionLabel | string | — |
| onAction | () => void | — |

#### Tooltip

```tsx
<Tooltip content="Copy to clipboard" position="top">
  <Button icon="copy-outline" variant="ghost" onPress={copy} />
</Tooltip>
```

| Prop | Type | Default |
|------|------|---------|
| content | string | required |
| children | ReactNode | required |
| position | "top" \| "bottom" \| "left" \| "right" | — |
| visible | boolean | — |
| onToggle | (visible) => void | — |
| maxWidth | number | — |

#### Popover

```tsx
<Popover content={<Menu />} position="bottom" closeOnPress>
  <Button icon="ellipsis-vertical" variant="ghost" onPress={() => {}} />
</Popover>
```

| Prop | Type | Default |
|------|------|---------|
| content | ReactNode | required |
| children | ReactNode | required |
| position | "top" \| "bottom" \| "left" \| "right" | — |
| visible | boolean | — |
| onToggle | (visible) => void | — |
| closeOnPress | boolean | — |
| maxWidth | number | — |

#### Confetti

```tsx
<Confetti active={celebrate} count={50} duration={3000} />
```

| Prop | Type | Default |
|------|------|---------|
| active | boolean | required |
| count | number | — |
| duration | number | — |
| colors | string[] | — |

---

### Progress & Loading

#### ProgressBar

```tsx
<ProgressBar progress={0.75} intent="success" size="md" animated />
```

| Prop | Type | Default |
|------|------|---------|
| progress | number (0–1) | required |
| intent | Intent | — |
| size | SizeToken | — |
| animated | boolean | — |

#### ProgressRing

```tsx
<ProgressRing progress={0.75} intent="primary" size="lg" label="75%" sublabel="Complete" />
```

| Prop | Type | Default |
|------|------|---------|
| progress | number (0–1) | required |
| intent | Intent | — |
| size | SizeToken | — |
| label | string | — |
| sublabel | string | — |

#### Loader

```tsx
<Loader label="Loading..." size="large" />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | — |
| size | "small" \| "large" | — |

#### Skeleton

```tsx
<Skeleton width={200} height={20} radius={6} />
<Skeleton width="100%" height={120} />
```

| Prop | Type | Default |
|------|------|---------|
| width | DimensionValue | — |
| height | DimensionValue | — |
| radius | number | — |

#### CountdownTimer

```tsx
<CountdownTimer targetDate={new Date("2025-01-01")} showDays showLabels size="lg" onComplete={done} />
<CountdownTimer seconds={300} running onComplete={done} />
```

| Prop | Type | Default |
|------|------|---------|
| targetDate | Date | — |
| seconds | number | — |
| onComplete | () => void | — |
| running | boolean | — |
| showDays | boolean | — |
| showLabels | boolean | — |
| separator | string | — |
| size | SizeToken | — |

---

### Status & Indicators

#### Badge

```tsx
<Badge label="New" intent="success" variant="solid" size="sm" />
```

| Prop | Type | Default |
|------|------|---------|
| label | string | required |
| intent | Intent | — |
| variant | "solid" \| "outline" | — |
| size | SizeToken | — |

#### StatusDot

```tsx
<StatusDot status="online" size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| status | "online" \| "offline" \| "idle" | — |
| size | SizeToken | — |

#### StatusTracker

```tsx
<StatusTracker
  steps={[{ label: "Ordered", date: "Jan 1" }, { label: "Shipped", date: "Jan 3" }, { label: "Delivered" }]}
  currentStep={1}
/>
```

| Prop | Type | Default |
|------|------|---------|
| steps | StatusStep[] | required |
| currentStep | number | required |

StatusStep: `{ label, description?, date? }`

#### NetworkBanner

```tsx
<NetworkBanner visible={!isOnline} message="No internet connection" intent="danger" />
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| message | string | — |
| intent | Intent | — |

---

### User & Profile

#### Avatar

```tsx
<Avatar uri="https://..." name="John Doe" size="lg" status="online" />
```

| Prop | Type | Default |
|------|------|---------|
| uri | string \| null | — |
| name | string | — |
| size | SizeToken | — |
| status | "online" \| "offline" \| "idle" | — |

#### AvatarGroup

```tsx
<AvatarGroup items={users} max={5} size={40} overlap={12} />
```

| Prop | Type | Default |
|------|------|---------|
| items | AvatarItem[] | required |
| max | number | — |
| size | number | — |
| overlap | number | — |

AvatarItem: `{ key, name, source?: { uri } }`

#### ProfileHeader

```tsx
<ProfileHeader
  avatar="https://..."
  name="Jane Doe"
  subtitle="@janedoe"
  stats={[{ label: "Posts", value: "42" }, { label: "Followers", value: "1.2K" }]}
  action={<Button title="Follow" size="sm" />}
/>
```

| Prop | Type | Default |
|------|------|---------|
| avatar | string \| null | — |
| name | string | required |
| subtitle | string | — |
| stats | { label, value }[] | — |
| action | ReactNode | — |

#### SocialButton

```tsx
<SocialButton provider="google" onPress={loginGoogle} variant="filled" fullWidth />
<SocialButton provider="apple" onPress={loginApple} variant="outline" />
```

| Prop | Type | Default |
|------|------|---------|
| provider | "google" \| "facebook" \| "apple" \| "github" \| "twitter" \| "microsoft" | required |
| onPress | () => void | required |
| variant | "filled" \| "outline" \| "icon-only" | — |
| label | string | — (auto from provider) |
| loading | boolean | — |
| disabled | boolean | — |
| fullWidth | boolean | — |
| size | "sm" \| "md" \| "lg" | — |

---

### Auth

#### AuthDivider

```tsx
<AuthDivider text="or continue with" />
```

| Prop | Type | Default |
|------|------|---------|
| text | string | — |

---

### Chat & Messaging

#### MessageBubble

```tsx
<MessageBubble text="Hello!" isOwn={true} timestamp="10:30 AM" />
```

| Prop | Type | Default |
|------|------|---------|
| text | string | required |
| isOwn | boolean | required |
| timestamp | string | — |

#### TypingIndicator

Animated dots indicator.

```tsx
<TypingIndicator />
```

No required props (only `style` and `testID`).

---

### Notification & Onboarding

#### NotificationItem

```tsx
<NotificationItem
  title="New message"
  message="You have a new message from John"
  timestamp="2m ago"
  icon="mail-outline"
  intent="info"
  read={false}
  onPress={openNotif}
  onDismiss={dismissNotif}
/>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| message | string | required |
| timestamp | string | required |
| icon | string | — |
| avatar | string | — |
| avatarName | string | — |
| intent | Intent | — |
| read | boolean | — |
| onPress | () => void | — |
| onDismiss | () => void | — |

#### OnboardingSlide

```tsx
<OnboardingSlide
  title="Welcome"
  description="Get started with our app"
  icon="rocket-outline"
  actionLabel="Next"
  onAction={next}
  skipLabel="Skip"
  onSkip={skip}
  step={1}
  totalSteps={3}
/>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| description | string | required |
| image | ImageSourcePropType | — |
| icon | string | — |
| iconSize | number | — |
| actionLabel | string | — |
| onAction | () => void | — |
| skipLabel | string | — |
| onSkip | () => void | — |
| step | number | — |
| totalSteps | number | — |

#### PermissionCard

```tsx
<PermissionCard
  title="Camera Access"
  description="Required for taking photos"
  status="unknown"
  icon={<Icon name="camera" size={24} />}
  actionText="Allow"
  onActionPress={requestPermission}
/>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| description | string | — |
| status | "granted" \| "denied" \| "blocked" \| "limited" \| "unknown" | — |
| icon | ReactNode | — |
| actionText | string | — |
| secondaryActionText | string | — |
| onActionPress | () => void | — |
| onSecondaryActionPress | () => void | — |
| loading | boolean | — |
| disabled | boolean | — |
| fullWidth | boolean | — |
| elevated | boolean | — |

---

### Commerce

#### PriceTag

```tsx
<PriceTag amount={29.99} currency="$" original={49.99} size="lg" />
```

| Prop | Type | Default |
|------|------|---------|
| amount | number | required |
| currency | string | "$" |
| original | number | — (shows strikethrough) |
| size | SizeToken | — |

#### QuantitySelector

```tsx
<QuantitySelector value={1} onValueChange={setQty} min={1} max={10} size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| value | number | required |
| onValueChange | (value) => void | required |
| min | number | — |
| max | number | — |
| size | SizeToken | — |

#### RatingStars

```tsx
<RatingStars rating={4.5} total={5} size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| rating | number | required |
| total | number | 5 |
| size | SizeToken | — |

#### PromoInput

```tsx
<PromoInput value={code} onChangeText={setCode} onApply={applyCode} status="success" successMessage="10% off!" />
```

| Prop | Type | Default |
|------|------|---------|
| value | string | required |
| onChangeText | (text) => void | required |
| onApply | (code) => void | required |
| status | "idle" \| "loading" \| "success" \| "error" | — |
| successMessage | string | — |
| errorMessage | string | — |
| placeholder | string | — |
| disabled | boolean | — |

---

### List Management

#### Accordion

```tsx
<Accordion
  items={[{ key: "faq1", title: "What is Salt?", content: <Text>A UI library.</Text>, icon: "help-circle-outline" }]}
  multiple
  bordered
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | AccordionItem[] | required |
| expandedKeys | string[] | — |
| onToggle | (key) => void | — |
| multiple | boolean | — |
| bordered | boolean | — |

AccordionItem: `{ key, title, content: ReactNode, icon? }`

#### SwipeableRow

```tsx
<SwipeableRow
  rightActions={[{ key: "delete", icon: "trash-outline", label: "Delete", color: "#dc2626", onPress: del }]}
>
  <ListItem title="Swipe me" />
</SwipeableRow>
```

| Prop | Type | Default |
|------|------|---------|
| children | ReactNode | required |
| leftActions | SwipeAction[] | — |
| rightActions | SwipeAction[] | — |
| actionWidth | number | — |
| threshold | number | — |
| onSwipeOpen | (side) => void | — |

SwipeAction: `{ key, icon, label?, color, onPress }`

#### DragList

```tsx
<DragList items={[{ key: "1", label: "First", icon: "star" }]} onReorder={setItems} handlePosition="right" />
```

| Prop | Type | Default |
|------|------|---------|
| items | DragItem[] | required |
| onReorder | (items) => void | required |
| renderItem | (item, index) => ReactNode | — |
| handlePosition | "left" \| "right" | — |

DragItem: `{ key, label, icon? }`

---

### Tree & Hierarchy

#### TreeView

```tsx
<TreeView
  nodes={[{
    key: "src", label: "src", icon: "folder",
    children: [{ key: "app", label: "App.tsx", icon: "document" }],
  }]}
  expandedKeys={expanded}
  onToggle={toggleNode}
  selectedKey="app"
  onSelect={selectNode}
/>
```

| Prop | Type | Default |
|------|------|---------|
| nodes | TreeNode[] | required |
| expandedKeys | string[] | — |
| onToggle | (key) => void | — |
| onSelect | (node) => void | — |
| selectedKey | string | — |
| indentWidth | number | — |

TreeNode: `{ key, label, icon?, children?: TreeNode[], data? }`

---

### Error & Empty States

#### EmptyState

```tsx
<EmptyState title="No results" description="Try a different search" primaryAction={{ title: "Reset", onPress: reset }} />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| description | string | — |
| primaryAction | { title, onPress } | — |
| secondaryAction | { title, onPress } | — |

#### ErrorState

```tsx
<ErrorState title="Something went wrong" description="Please try again" onRetry={retry} />
```

| Prop | Type | Default |
|------|------|---------|
| title | string | — |
| description | string | — |
| onRetry | () => void | — |

#### RetryView

Wraps children with loading/error/retry states.

```tsx
<RetryView loading={isLoading} error={error} onRetry={refetch}>
  <DataTable ... />
</RetryView>
```

| Prop | Type | Default |
|------|------|---------|
| loading | boolean | — |
| error | string \| boolean | — |
| onRetry | () => void | — |
| children | ReactNode | required |
| loadingLabel | string | — |
| errorTitle | string | — |
| errorDescription | string | — |

---

### Editor / Canvas

#### FloatingToolbar

```tsx
<FloatingToolbar
  items={[{ key: "pen", icon: "pencil-outline", label: "Pen" }, { key: "eraser", icon: "trash-outline" }]}
  selected="pen"
  onSelect={setTool}
  position="bottom"
/>
```

| Prop | Type | Default |
|------|------|---------|
| items | ToolbarItem[] | required |
| selected | string | — |
| onSelect | (key) => void | required |
| position | "top" \| "bottom" \| "left" \| "right" | "bottom" |
| horizontal | boolean | true |

ToolbarItem: `{ key, icon, label?, disabled? }`

#### CanvasControlPanel

```tsx
<CanvasControlPanel
  title="Properties"
  sections={[
    { key: "fill", title: "Fill", children: <ColorPicker />, collapsed: false },
    { key: "stroke", title: "Stroke", children: <Slider />, collapsed: true },
  ]}
  onToggleSection={toggleSection}
  position="right"
  width={260}
/>
```

| Prop | Type | Default |
|------|------|---------|
| sections | ControlSection[] | required |
| onToggleSection | (key) => void | — |
| title | string | — |
| position | "left" \| "right" | "right" |
| width | number | 260 |

ControlSection: `{ key, title, children: ReactNode, collapsed? }`

#### LayerListItem

```tsx
<LayerListItem
  title="Background"
  icon="image-outline"
  selected
  visible
  locked={false}
  onPress={selectLayer}
  onToggleVisibility={toggleVis}
  onToggleLock={toggleLock}
/>
```

| Prop | Type | Default |
|------|------|---------|
| title | string | required |
| icon | string | — |
| thumbnail | ReactNode | — |
| selected | boolean | — |
| visible | boolean | — |
| locked | boolean | — |
| onPress | () => void | — |
| onToggleVisibility | () => void | — |
| onToggleLock | () => void | — |
| onDragStart | () => void | — |

---

### Theme & Settings

#### ThemeSwitcher

Light/dark/system toggle. Reads and sets preference via `useTheme()`.

```tsx
<ThemeSwitcher fullWidth />
```

| Prop | Type | Default |
|------|------|---------|
| fullWidth | boolean | — |

#### FontLevelSwitcher

Font size adjustment slider.

```tsx
<FontLevelSwitcher size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| size | SizeToken | — |

#### Icon

Ionicons wrapper with semantic aliases.

```tsx
<Icon name="search" size={20} color={colors.text} />
<Icon name="chevron-forward" size={16} color={colors.muted} />
```

| Prop | Type | Default |
|------|------|---------|
| name | IconName | required |
| size | number | — |
| color | string | — |

Built-in aliases: `search`, `close`, `back`, `add`, `edit`, `check`, `chevron-right`, `save`. Any Ionicons name also works.

---

### Carousel & Scrolling

#### Carousel

```tsx
<Carousel autoPlay interval={3000} showDots>
  <View><Text>Slide 1</Text></View>
  <View><Text>Slide 2</Text></View>
</Carousel>
```

| Prop | Type | Default |
|------|------|---------|
| children | ReactNode[] | required |
| autoPlay | boolean | false |
| interval | number | 3000 |
| showDots | boolean | true |
| dotSize | number | 8 |
| itemWidth | number | — (auto: container width) |
| gap | number | 0 |

#### BottomSheet

```tsx
<BottomSheet visible={open} onClose={close} title="Options" height={400}>
  {content}
</BottomSheet>
```

| Prop | Type | Default |
|------|------|---------|
| visible | boolean | required |
| onClose | () => void | required |
| title | string | — |
| children | ReactNode | required |
| height | number | — |
| closable | boolean | — |

---

## Design Principles

- **No native dependencies** — pure React Native + Expo Go compatible
- **Theme-driven** — all colors, spacing, and radius from tokens, never hardcoded
- **AI-friendly** — predictable naming, strong defaults, typed unions
- **Composable** — every component accepts `style` and `testID` props
- **Accessible** — `accessibilityRole`, `accessibilityLabel`, and `accessibilityState` on interactive components

## Conventions

1. **Always wrap app root** in `<SaltProvider>`
2. **Typography uses `fontSize`** not `size` — values: `"sm" | "md" | "lg"`
3. **Buttons, badges, inputs use `size`** — values: `"sm" | "md" | "lg"`
4. **Colors come from theme** — use `const { colors } = useTheme().theme`
5. **Intent drives color** for Button, Badge, Toast, Banner, ProgressBar, etc.
6. **Variant drives style** for Button: `"solid" | "outline" | "ghost" | "text" | "link"`
7. **Icons use Ionicons names** (e.g., `"chevron-forward"`, `"trash-outline"`, `"home-outline"`)
8. **Spacing props accept tokens** (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"xxl"`) or numbers

## License

MIT

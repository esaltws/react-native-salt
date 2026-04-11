# @esaltws/react-native-salt

**AI-friendly React Native UI system for Expo with themed components, built-in light/dark mode, font scaling, and zero native dependencies.**

119 themed components, light/dark mode, font scaling, zero native dependencies. Ships raw TypeScript — works in Expo Go out of the box.

[![npm](https://img.shields.io/npm/v/@esaltws/react-native-salt)](https://www.npmjs.com/package/@esaltws/react-native-salt)
[![license](https://img.shields.io/npm/l/@esaltws/react-native-salt)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

---

## Built for humans and AI

Salt uses a **token-based design vocabulary** — spacing, color, radius, sizing are all named tokens from a finite set instead of raw pixel values. This makes it easy for both developers and AI coding assistants to generate consistent, correct UI code.

**Works as an AI guide:** This README documents every component, prop, and valid value. When an AI assistant reads it, it can generate Salt code that follows the same conventions a human developer would:

- `Spacing` tokens (`"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"xxl"`) for gaps and padding
- `Intent` (`"primary"`, `"danger"`, `"success"`, etc.) for semantic color
- `Size` (`"sm"`, `"md"`, `"lg"`) for component sizing
- `theme.colors.*` for custom styling
- `<SaltProvider>` at app root — every component reads from it

Whether you write the code yourself or ask Claude/Copilot/Cursor to do it, the output stays consistent.

---

## Install

```bash
npm install @esaltws/react-native-salt
```

### Peer dependencies

```bash
npm install react react-native @react-native-async-storage/async-storage
```

Optional (for icons):
```bash
npm install @expo/vector-icons
```

### Compatibility

| Requirement | Version |
|---|---|
| React | >= 18.0.0 |
| React Native | >= 0.72.0 |
| Expo | SDK 49+ |
| TypeScript | >= 5.0 (recommended) |

Works in **Expo Go** — no dev build required.

---

## Quick Start

```tsx
import { SaltProvider, Screen, Stack, Title, Text, Button } from "@esaltws/react-native-salt";

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

### With Expo Router

```tsx
// app/_layout.tsx
import { SaltProvider } from "@esaltws/react-native-salt";

export default function RootLayout() {
  return (
    <SaltProvider>
      <Slot />
    </SaltProvider>
  );
}
```

### Dark mode & font scaling

Salt follows device color scheme by default. Override at runtime:

```tsx
import { useTheme, ThemeSwitcher, FontLevelSwitcher } from "@esaltws/react-native-salt";

function Settings() {
  return (
    <Stack gap="lg">
      <ThemeSwitcher />        {/* system / light / dark */}
      <FontLevelSwitcher />    {/* font size presets xs–xl */}
    </Stack>
  );
}
```

---

## Theme System

### SaltProvider

Wrap your app root. Manages light/dark mode, font scaling, and persists preference to AsyncStorage.

```tsx
<SaltProvider
  initialPreference="system" // "system" | "light" | "dark"
  fontLevel={16}             // 8–18 or "xs"|"sm"|"md"|"lg"|"xl"
>
  {children}
</SaltProvider>
```

#### Custom themes

```tsx
<SaltProvider lightTheme={myLightTheme} darkTheme={myDarkTheme}>
  {children}
</SaltProvider>
```

#### Using salt-theme-gen (optional)

[salt-theme-gen](https://www.npmjs.com/package/salt-theme-gen) generates a complete light/dark color system from a single hex color using OKLCH perceptual color science.

```tsx
import { generateTheme } from "salt-theme-gen";
import { SaltProvider } from "@esaltws/react-native-salt";

const branded = generateTheme({
  primary: "#0E9D8E",
  harmony: "complementary", // analogous | triadic | split-complementary | tetradic | monochromatic
});

export default function App() {
  return (
    <SaltProvider lightTheme={branded.light} darkTheme={branded.dark}>
      {/* All 119 components inherit your brand colors */}
    </SaltProvider>
  );
}
```

### useTheme()

Access tokens and controls anywhere:

```tsx
const { theme, mode, preference, setPreference, fontLevel, setFontLevel } = useTheme();
const { colors, spacing, radius, fontSizes, iconSizes, sizeMap, dimensions } = theme;
```

### Design Tokens

All tokens scale with `fontLevel` (8–18). Values shown at default fontLevel 16:

| Token | Scale |
|---|---|
| `spacing` | none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 |
| `radius` | none: 0, sm: 6, md: 10, lg: 14, xl: 20, xxl: 24, pill: 999 |
| `fontSizes` | xxs: 10, xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, 3xl: 32, 4xl: 40 |
| `iconSizes` | xs: 16, sm: 20, md: 24, lg: 26, xl: 28, xxl: 32, 3xl: 44 |
| `sizeMap` | xs: 32, sm: 36, md: 44, lg: 48, xl: 52, xxl: 60, 3xl: 76 |
| `dimensions` | xs: 28, sm: 36, md: 40, lg: 48, xl: 56, xxl: 68, 3xl: 88 |

### Colors

| Token | Light | Dark |
|---|---|---|
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

### Shared Types

```typescript
import type {
  Variant,          // "solid" | "outline" | "ghost" | "text" | "link"
  Intent,           // "primary" | "secondary" | "danger" | "success" | "warning" | "info"
  Size,             // "sm" | "md" | "lg"
  Spacing,          // "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
  Radius,           // "none" | "sm" | "md" | "lg" | "xl" | "xxl" | "pill"
  FontSize,         // "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl" | "4xl"
  IconSize,         // "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl"
  Dimension,        // "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl"
  Elevation,        // 0 | 1 | 2 | 3
  Theme,            // Full theme object
  ThemeMode,        // "light" | "dark"
  ThemePreference,  // "system" | "light" | "dark"
  ThemeColors,      // All color tokens
} from "@esaltws/react-native-salt";
```

---

## Conventions

These rules apply to every Salt component. Follow them when writing code — and when prompting AI to write code for you.

1. **Always wrap app root** in `<SaltProvider>` — every component reads theme from it
2. **Spacing props accept tokens only** — `gap="md"`, `inset="lg"`, never `gap={12}` or `padding={16}`
3. **Intent drives color** — Button, Badge, Toast, Banner, ProgressBar all use `intent="primary"`, not `color="#2563eb"`
4. **Variant drives style** — Button supports `"solid" | "outline" | "ghost" | "text" | "link"`
5. **Size is consistent** — Buttons, badges, inputs, and most interactive components use `size: "sm" | "md" | "lg"`
6. **Typography uses `fontSize`** not `size` — values: `"sm" | "md" | "lg"`
7. **Colors come from theme** — `const { colors } = useTheme().theme`, never hardcoded hex
8. **Icons use Ionicons names** — `"chevron-forward"`, `"trash-outline"`, `"home-outline"`
9. **Every component accepts `style` and `testID`** — for custom styling and testing

---

## Components (119)

| Category | Count | Components |
|---|---|---|
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
|---|---|---|
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
|---|---|---|
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
|---|---|---|
| gap | Spacing | "none" |
| align | ViewStyle["alignItems"] | "center" |
| justify | ViewStyle["justifyContent"] | "flex-start" |
| wrap | boolean | false |
| fill | boolean | false |

#### Column

Vertical flex shorthand. Same props as Row with `align` defaulting to `"stretch"`.

#### Card

Elevated container with optional press, header, footer, image.

```tsx
<Card elevation={2} onPress={handlePress}>
  <Text>Content</Text>
</Card>
```

| Prop | Type | Default |
|---|---|---|
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
|---|---|---|
| size | Spacing | — |
| horizontal | boolean | false |
| flex | number \| boolean | — |

#### Divider

```tsx
<Divider />
<Divider vertical thickness={2} inset="md" />
```

| Prop | Type | Default |
|---|---|---|
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
|---|---|---|
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
|---|---|---|
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
|---|---|---|
| colors | [string, string, ...string[]] | required |
| direction | "vertical" \| "horizontal" \| "diagonal" | "vertical" |
| steps | number | — |
| height | number | — |
| borderRadius | number | — |

#### ListSeparator

```tsx
<ListSeparator inset="lg" />
```

#### PullIndicator

Pill bar handle for bottom sheets / modals.

```tsx
<PullIndicator width={40} height={4} />
```

#### GestureHandle

```tsx
<GestureHandle position="corner" variant="dot" onDrag={(dx, dy) => {}} />
```

| Prop | Type | Default |
|---|---|---|
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
  // + all React Native TextProps
}
```

| Component | Weight | Color | sm | md | lg |
|---|---|---|---|---|---|
| Display | 700 | text | 24 | 32 | 40 |
| Title | 600 | text | 18 | 20 | 24 |
| Text | 400 | text | 14 | 16 | 18 |
| Label | 500 | text | 12 | 14 | 16 |
| Caption | 400 | muted | 10 | 12 | 14 |

**Text** extra prop: `lineHeight?: "tight" | "normal" | "relaxed"`
**Label** extra prop: `uppercase?: boolean`

---

### Buttons & Actions

#### Button

```tsx
<Button title="Save" variant="solid" intent="primary" size="md" onPress={save} />
<Button title="Delete" variant="outline" intent="danger" />
<Button icon="add" intent="primary" />           {/* icon-only */}
<Button title="Saving..." loading disabled />
```

| Prop | Type | Default |
|---|---|---|
| title | string | — |
| variant | Variant | "solid" |
| intent | Intent | "primary" |
| size | Size | "md" |
| onPress | () => void | — |
| disabled | boolean | false |
| loading | boolean | false |
| fullWidth | boolean | false |
| iconLeft | string | — |
| iconRight | string | — |
| icon | string | — (icon-only mode) |

#### ButtonGroup

```tsx
<ButtonGroup
  items={[{ key: "left", label: "Left" }, { key: "center", icon: "grid-outline" }]}
  selected="left"
  onSelect={setAlign}
/>
```

#### FAB

```tsx
<FAB icon="add" onPress={create} intent="primary" position="bottom-right" />
<FAB icon="add" label="Create" onPress={create} />  {/* extended FAB */}
```

| Prop | Type | Default |
|---|---|---|
| icon | string | "add" |
| label | string | — |
| onPress | () => void | required |
| intent | Intent | "primary" |
| size | Size | "md" |
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
/>
```

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

---

### Form Inputs

#### Input

```tsx
<Input label="Email" placeholder="you@example.com" size="md" error={errors.email} required />
```

| Prop | Type | Default |
|---|---|---|
| label | string | — |
| error | string | — |
| size | Size | — |
| fullWidth | boolean | — |
| required | boolean | — |
| + all TextInputProps | | |

#### FormField

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

#### TextArea

```tsx
<TextArea label="Bio" maxLength={200} showCount rows={4} required />
```

#### PasswordInput

```tsx
<PasswordInput label="Password" showStrength strength="strong" required />
```

#### OTPInput

```tsx
<OTPInput length={6} value={otp} onChange={setOtp} autoFocus size="md" />
```

#### Select

Modal picker with optional search.

```tsx
<Select
  options={[{ key: "us", label: "United States" }, { key: "uk", label: "United Kingdom" }]}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
  searchable
/>
```

#### DropdownSelect

Inline dropdown (no modal).

```tsx
<DropdownSelect options={options} value={selected} onChange={setSelected} label="Category" maxVisible={5} />
```

#### Switch

```tsx
<Switch value={enabled} onValueChange={setEnabled} size="md" />
```

#### Checkbox

```tsx
<Checkbox checked={agreed} onToggle={setAgreed} label="I agree to terms" size="md" />
```

#### RadioGroup

```tsx
<RadioGroup
  items={[{ key: "s", label: "Small" }, { key: "m", label: "Medium" }, { key: "l", label: "Large" }]}
  selected={size}
  onSelect={setSize}
/>
```

#### Slider

```tsx
<Slider value={50} onValueChange={setValue} min={0} max={100} step={1} showValue />
```

#### RangeSlider

```tsx
<RangeSlider low={20} high={80} onChangeRange={(l, h) => {}} min={0} max={100} showValues />
```

#### DatePicker / TimePicker

```tsx
<DatePicker value={date} onChange={setDate} minDate={new Date()} />
<TimePicker value={{ hours: 14, minutes: 30 }} onChange={setTime} format="12h" minuteStep={5} />
```

#### NumericInput

```tsx
<NumericInput value={42} onChange={setVal} min={0} max={999} step={1} prefix="$" />
```

#### CurrencyInput

```tsx
<CurrencyInput value={29.99} onChange={setPrice} currency="$" decimals={2} label="Price" />
```

#### PhoneInput

```tsx
<PhoneInput value={phone} onChangeText={setPhone} countryCode="US" label="Phone" required />
```

---

### Tags & Chips

#### ChipGroup

```tsx
<ChipGroup
  items={[{ key: "new", label: "New" }, { key: "sale", label: "Sale" }]}
  selected={filter}
  onSelect={setFilter}
  showAll
/>
```

#### TagInput

```tsx
<TagInput tags={tags} onChangeTags={setTags} placeholder="Add tag..." maxTags={10} suggestions={["react", "expo"]} />
```

#### TagList

```tsx
<TagList tags={[{ key: "1", label: "React", intent: "primary" }]} onRemove={removeTag} onAdd={addTag} />
```

---

### Color & Media

#### ColorPalette

```tsx
<ColorPalette colors={["#f00", "#0f0", "#00f"]} value={color} onChange={setColor} columns={6} showHex />
```

#### ColorPicker

```tsx
<ColorPicker color="#2563eb" onColorChange={setColor} showAlpha presets={["#f00", "#0f0"]} />
```

#### ColorPickerTrigger

```tsx
<ColorPickerTrigger color="#2563eb" onPress={openPicker} label="Fill" showHex size="md" />
```

#### Lightbox

```tsx
<Lightbox visible={open} onClose={close} source={{ uri: imageUrl }} title="Photo" />
```

#### MediaPickerRow

```tsx
<MediaPickerRow items={media} onAdd={pickMedia} onRemove={removeMedia} maxItems={5} />
```

---

### Data Display

#### ListItem

```tsx
<ListItem title="Wi-Fi" subtitle="Connected" left={<Icon name="wifi" />} right={<Switch ... />} onPress={go} />
```

#### ImageCard

```tsx
<ImageCard imageUrl={url} title="Mountain" subtitle="Nepal" badge="New" imageHeight={200} onPress={open} />
```

#### InfoRow

```tsx
<InfoRow title="Status" value="Active" subtitle="Since Jan 2024" left={<StatusDot status="online" />} />
```

#### MetricCard

```tsx
<MetricCard title="Revenue" value="$12,340" trend="up" trendValue="+12%" icon="trending-up" intent="success" />
```

#### SummaryCard

```tsx
<SummaryCard label="Total Orders" value="1,234" subtitle="+5% this week" />
```

#### CodeBlock

```tsx
<CodeBlock code={`const x = 1;`} language="tsx" showLineNumbers copyable />
```

#### DataTable

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

#### KeyValueList

```tsx
<KeyValueList items={[{ key: "1", label: "Email", value: "user@test.com" }]} bordered compact />
```

#### StatGrid

```tsx
<StatGrid items={stats} columns={3} compact bordered />
```

#### ComparisonTable

```tsx
<ComparisonTable
  plans={[{ key: "free", name: "Free" }, { key: "pro", name: "Pro", highlight: true, badge: "Popular" }]}
  features={[{ key: "storage", label: "Storage", values: { free: "5GB", pro: "100GB" } }]}
/>
```

#### Leaderboard

```tsx
<Leaderboard items={players} showMedals highlightKey="currentUser" />
```

#### SortHeader

```tsx
<SortHeader label="Name" active direction="asc" onPress={toggleSort} />
```

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

#### LineChart

```tsx
<LineChart data={points} height={200} showDots showGrid intent="primary" fillOpacity={0.1} />
```

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

---

### Navigation

#### ScreenHeader

```tsx
<ScreenHeader title="Profile" subtitle="Edit your details" onBack={goBack} actions={[{ icon: "settings-outline", onPress: openSettings }]} />
```

#### Tabs

```tsx
<Tabs
  items={[{ key: "all", label: "All" }, { key: "active", label: "Active", badge: 3 }]}
  selected={tab}
  onSelect={setTab}
  scrollable
/>
```

#### SegmentedControl

```tsx
<SegmentedControl
  items={[{ key: "day", label: "Day" }, { key: "week", label: "Week" }]}
  selected={period}
  onSelect={setPeriod}
  fullWidth
/>
```

#### StepIndicator

```tsx
<StepIndicator steps={["Cart", "Shipping", "Payment"]} currentStep={1} />
```

#### Breadcrumb

```tsx
<Breadcrumb items={[{ key: "home", label: "Home", onPress: goHome }, { key: "settings", label: "Settings" }]} />
```

#### PaginationBar

```tsx
<PaginationBar currentPage={1} totalPages={10} onPageChange={setPage} showPageNumbers />
```

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

---

### Feedback & Alerts

#### Modal

```tsx
<Modal visible={open} onClose={close} title="Confirm" message="Are you sure?" confirmText="Yes" cancelText="No" onConfirm={doIt} destructive />
```

#### AlertDialog

```tsx
<AlertDialog visible={open} onClose={close} title="Delete?" message="This cannot be undone." intent="danger" confirmText="Delete" onConfirm={handleDelete} destructive />
```

#### Toast

```tsx
<Toast visible={show} message="Saved!" intent="success" icon="checkmark" position="top" onDismiss={hide} duration={3000} />
```

#### Snackbar

```tsx
<Snackbar visible={show} message="Item deleted" actionLabel="Undo" onAction={undo} onDismiss={hide} />
```

#### Banner

```tsx
<Banner title="Update available" intent="info" dismissible onDismiss={hide} actionLabel="Update" onAction={update} />
```

#### Tooltip

```tsx
<Tooltip content="Copy to clipboard" position="top">
  <Button icon="copy-outline" variant="ghost" onPress={copy} />
</Tooltip>
```

#### Popover

```tsx
<Popover content={<Menu />} position="bottom" closeOnPress>
  <Button icon="ellipsis-vertical" variant="ghost" onPress={() => {}} />
</Popover>
```

#### Confetti

```tsx
<Confetti active={celebrate} count={50} duration={3000} />
```

---

### Progress & Loading

#### ProgressBar

```tsx
<ProgressBar progress={0.75} intent="success" size="md" animated />
```

| Prop | Type | Default |
|---|---|---|
| progress | number (0–1) | required |
| intent | Intent | "primary" |
| size | Size | "md" |
| animated | boolean | true |

#### ProgressRing

```tsx
<ProgressRing progress={0.75} intent="primary" size="lg" sublabel="Complete" />
```

| Prop | Type | Default |
|---|---|---|
| progress | number (0–1) | required |
| intent | Intent | "primary" |
| size | Size | "md" |
| label | string | — (shows percentage by default) |
| sublabel | string | — |

#### Loader

```tsx
<Loader label="Loading..." size="lg" />
```

| Prop | Type | Default |
|---|---|---|
| label | string | — |
| size | Size | "md" |

Size mapping: `sm`/`md` → small spinner, `lg` → large spinner.

#### Skeleton

```tsx
<Skeleton width={200} height={20} radius={6} />
<Skeleton width="100%" />  {/* defaults to fontSizes.sm height */}
```

| Prop | Type | Default |
|---|---|---|
| width | DimensionValue | "100%" |
| height | DimensionValue | fontSizes.sm |
| radius | number | radius.md |

#### CountdownTimer

```tsx
<CountdownTimer targetDate={new Date("2026-01-01")} showDays showLabels size="lg" onComplete={done} />
<CountdownTimer seconds={300} running onComplete={done} />
```

| Prop | Type | Default |
|---|---|---|
| targetDate | Date | — |
| seconds | number | — |
| onComplete | () => void | — |
| running | boolean | true |
| showDays | boolean | true |
| showLabels | boolean | true |
| separator | string | ":" |
| size | Size | "md" |

---

### Status & Indicators

#### Badge

```tsx
<Badge label="New" intent="success" variant="solid" size="sm" />
```

#### StatusDot

```tsx
<StatusDot status="online" size="md" />
```

| Prop | Type | Default |
|---|---|---|
| status | "online" \| "offline" \| "idle" | "offline" |
| size | Size | "md" |

#### StatusTracker

```tsx
<StatusTracker
  steps={[{ label: "Ordered", date: "Jan 1" }, { label: "Shipped", date: "Jan 3" }, { label: "Delivered" }]}
  currentStep={1}
/>
```

#### NetworkBanner

```tsx
<NetworkBanner visible={!isOnline} message="No internet connection" intent="danger" />
```

---

### User & Profile

#### Avatar

```tsx
<Avatar uri="https://..." name="John Doe" size="lg" status="online" />
```

#### AvatarGroup

```tsx
<AvatarGroup items={users} max={5} size={40} overlap={12} />
```

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

#### SocialButton

```tsx
<SocialButton provider="google" onPress={loginGoogle} variant="filled" fullWidth />
<SocialButton provider="apple" onPress={loginApple} variant="outline" />
```

| Prop | Type | Default |
|---|---|---|
| provider | "google" \| "facebook" \| "apple" \| "github" \| "twitter" \| "microsoft" | required |
| onPress | () => void | required |
| variant | "filled" \| "outline" \| "icon-only" | "filled" |
| size | Size | "md" |
| fullWidth | boolean | false |
| loading | boolean | false |
| disabled | boolean | false |

---

### Auth

#### AuthDivider

```tsx
<AuthDivider text="or continue with" />
```

---

### Chat & Messaging

#### MessageBubble

```tsx
<MessageBubble text="Hello!" isOwn={true} timestamp="10:30 AM" />
```

#### TypingIndicator

Animated dots indicator.

```tsx
<TypingIndicator />
```

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

#### OnboardingSlide

```tsx
<OnboardingSlide
  title="Welcome"
  description="Get started with our app"
  icon="rocket-outline"
  actionLabel="Next"
  onAction={next}
  onSkip={skip}
  step={1}
  totalSteps={3}
/>
```

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

---

### Commerce

#### PriceTag

```tsx
<PriceTag amount={29.99} currency="$" original={49.99} size="lg" />
```

#### QuantitySelector

```tsx
<QuantitySelector value={1} onValueChange={setQty} min={1} max={10} size="md" />
```

#### RatingStars

```tsx
<RatingStars rating={4.5} total={5} size="md" />
```

#### PromoInput

```tsx
<PromoInput value={code} onChangeText={setCode} onApply={applyCode} status="success" successMessage="10% off!" />
```

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

#### SwipeableRow

```tsx
<SwipeableRow
  rightActions={[{ key: "delete", icon: "trash-outline", label: "Delete", color: "#dc2626", onPress: del }]}
>
  <ListItem title="Swipe me" />
</SwipeableRow>
```

#### DragList

```tsx
<DragList items={[{ key: "1", label: "First", icon: "star" }]} onReorder={setItems} handlePosition="right" />
```

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

---

### Error & Empty States

#### EmptyState

```tsx
<EmptyState title="No results" description="Try a different search" primaryAction={{ title: "Reset", onPress: reset }} />
```

#### ErrorState

```tsx
<ErrorState title="Something went wrong" description="Please try again" onRetry={retry} />
```

#### RetryView

Wraps children with loading/error/retry states.

```tsx
<RetryView loading={isLoading} error={error} onRetry={refetch}>
  <DataTable ... />
</RetryView>
```

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

---

### Theme & Settings

#### ThemeSwitcher

Light/dark/system toggle. Reads and sets preference via `useTheme()`.

```tsx
<ThemeSwitcher fullWidth />
```

#### FontLevelSwitcher

Font size adjustment slider.

```tsx
<FontLevelSwitcher size="md" />
```

#### Icon

Ionicons wrapper with semantic aliases.

```tsx
<Icon name="search" size={20} color={colors.text} />
<Icon name="chevron-forward" size={16} color={colors.muted} />
```

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
|---|---|---|
| children | ReactNode[] | required |
| autoPlay | boolean | false |
| interval | number | 3000 |
| showDots | boolean | true |
| dotSize | number | 8 |
| itemWidth | number | — (auto) |
| gap | number | 0 |

#### BottomSheet

```tsx
<BottomSheet visible={open} onClose={close} title="Options" height={400}>
  {content}
</BottomSheet>
```

| Prop | Type | Default |
|---|---|---|
| visible | boolean | required |
| onClose | () => void | required |
| title | string | — |
| children | ReactNode | required |
| height | number | 50% of screen |
| closable | boolean | true |

---

## Testing

122 test suites, 932 tests covering all components.

```bash
npm test
```

Test helpers for theme context:

```tsx
import { renderWithTheme, renderWithDarkTheme } from './src/__tests__/test-utils';

const { getByText } = renderWithTheme(<Button title="Click" onPress={() => {}} />);
const { getByText } = renderWithDarkTheme(<Button title="Click" onPress={() => {}} />);
```

---

## License

MIT

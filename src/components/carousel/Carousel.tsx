import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  dotSize?: number;
  itemWidth?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  dotSize = 8,
  itemWidth,
  gap = 0,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing } = theme;
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideWidth = itemWidth ?? containerWidth;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const count = React.Children.count(children);

  React.useEffect(() => {
    if (autoPlay && count > 1) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % count;
          scrollRef.current?.scrollTo({
            x: next * (slideWidth + gap),
            animated: true,
          });
          return next;
        });
      }, interval);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [autoPlay, count, interval, slideWidth, gap]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (slideWidth + gap));
    if (index !== activeIndex && index >= 0 && index < count) {
      setActiveIndex(index);
    }
  };

  return (
    <View testID={testID} style={[styles.container, style]} onLayout={handleLayout}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={!itemWidth}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={itemWidth ? slideWidth + gap : undefined}
        snapToAlignment="start"
        contentContainerStyle={{ gap }}
      >
        {React.Children.map(children, (child, i) => (
          <View key={i} style={{ width: slideWidth }}>
            {child}
          </View>
        ))}
      </ScrollView>

      {showDots && count > 1 && (
        <View style={[styles.dots, { marginTop: spacing.md }]}>
          {Array.from({ length: count }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: i === activeIndex ? dotSize * 2.5 : dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor:
                    i === activeIndex ? colors.primary : colors.border,
                  marginHorizontal: 3,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {},
});

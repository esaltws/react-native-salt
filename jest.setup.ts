jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const React = require('react');
  return {
    Ionicons: (props: any) =>
      React.createElement(Text, { testID: props.testID || `icon-${props.name}` }, props.name),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({
  ...jest.requireActual('react-native/Libraries/Animated/NativeAnimatedHelper'),
  shouldUseNativeDriver: () => false,
}));

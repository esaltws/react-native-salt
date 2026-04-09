jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
      setItem: jest.fn((key: string, value: string) => { store[key] = value; return Promise.resolve(); }),
      removeItem: jest.fn((key: string) => { delete store[key]; return Promise.resolve(); }),
      clear: jest.fn(() => { store = {}; return Promise.resolve(); }),
      getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
      multiGet: jest.fn((keys: string[]) => Promise.resolve(keys.map((k: string) => [k, store[k] ?? null]))),
      multiSet: jest.fn((pairs: [string, string][]) => { pairs.forEach(([k, v]) => { store[k] = v; }); return Promise.resolve(); }),
      multiRemove: jest.fn((keys: string[]) => { keys.forEach((k: string) => { delete store[k]; }); return Promise.resolve(); }),
    },
  };
});

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  const React = require('react');
  return {
    Ionicons: (props: any) =>
      React.createElement(Text, { testID: props.testID || `icon-${props.name}` }, props.name),
  };
}, { virtual: true });

// NativeAnimatedHelper mock is handled by @react-native/jest-preset

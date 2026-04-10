import React from 'react';
import { renderWithTheme } from '../../../__tests__/test-utils';
import MessageBubble from '../MessageBubble';

describe('MessageBubble', () => {
  it('renders the message text', () => {
    const { getByText } = renderWithTheme(
      <MessageBubble text="Hello there!" isOwn={false} testID="msg" />
    );
    expect(getByText('Hello there!')).toBeTruthy();
  });

  it('aligns to flex-end when isOwn is true', () => {
    const { getByTestId } = renderWithTheme(
      <MessageBubble text="My message" isOwn={true} testID="msg" />
    );
    const wrapper = getByTestId('msg');
    const flatStyle = Object.assign(
      {},
      ...([].concat(wrapper.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.alignItems).toBe('flex-end');
  });

  it('aligns to flex-start when isOwn is false', () => {
    const { getByTestId } = renderWithTheme(
      <MessageBubble text="Their message" isOwn={false} testID="msg" />
    );
    const wrapper = getByTestId('msg');
    const flatStyle = Object.assign(
      {},
      ...([].concat(wrapper.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.alignItems).toBe('flex-start');
  });

  it('uses primary background color for own messages', () => {
    const { getByTestId } = renderWithTheme(
      <MessageBubble text="Mine" isOwn={true} testID="msg" />
    );
    const wrapper = getByTestId('msg');
    // The bubble is the first child of the wrapper
    const bubble = wrapper.children[0] as any;
    const flatStyle = Object.assign(
      {},
      ...([].concat(bubble.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.backgroundColor).toBe('#2563eb'); // light theme primary
  });

  it('renders timestamp when provided', () => {
    const { getByText } = renderWithTheme(
      <MessageBubble text="Hello" isOwn={false} timestamp="10:30 AM" testID="msg" />
    );
    expect(getByText('10:30 AM')).toBeTruthy();
  });

  it('does not render timestamp when not provided', () => {
    const { queryByText } = renderWithTheme(
      <MessageBubble text="Hello" isOwn={false} testID="msg" />
    );
    expect(queryByText('AM')).toBeNull();
    expect(queryByText('PM')).toBeNull();
  });

  it('applies maxWidth 80% to the bubble', () => {
    const { getByTestId } = renderWithTheme(
      <MessageBubble text="Message" isOwn={false} testID="msg" />
    );
    const wrapper = getByTestId('msg');
    const bubble = wrapper.children[0] as any;
    const flatStyle = Object.assign(
      {},
      ...([].concat(bubble.props.style as any).flat(Infinity).filter(Boolean))
    );
    expect(flatStyle.maxWidth).toBe('80%');
  });
});

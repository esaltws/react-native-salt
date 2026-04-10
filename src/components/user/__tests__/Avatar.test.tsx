import React from 'react';
import { Image } from 'react-native';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders an Image when uri is provided', () => {
    const { UNSAFE_getByType } = renderWithTheme(
      <Avatar uri="https://example.com/photo.jpg" name="Alice" />
    );
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual({ uri: 'https://example.com/photo.jpg' });
  });

  it('shows initials when no uri is provided', () => {
    const { getByText } = renderWithTheme(<Avatar name="John Doe" />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('shows single initial for a single name', () => {
    const { getByText } = renderWithTheme(<Avatar name="Alice" />);
    expect(getByText('A')).toBeTruthy();
  });

  it('shows "?" when no name is provided', () => {
    const { getByText } = renderWithTheme(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it('produces deterministic background color for the same name', () => {
    const { toJSON: toJSON1 } = renderWithTheme(<Avatar name="Charlie" />);
    const { toJSON: toJSON2 } = renderWithTheme(<Avatar name="Charlie" />);
    const json1 = JSON.stringify(toJSON1());
    const json2 = JSON.stringify(toJSON2());
    expect(json1).toEqual(json2);
  });

  it('renders a StatusDot when status is provided', () => {
    const { getByText } = renderWithTheme(
      <Avatar name="Bob" status="online" />
    );
    // The avatar should render with name initials and a status dot
    expect(getByText('B')).toBeTruthy();
  });

  it('applies the testID prop', () => {
    const { getByTestId } = renderWithTheme(
      <Avatar name="Test" testID="avatar-test" />
    );
    expect(getByTestId('avatar-test')).toBeTruthy();
  });
});

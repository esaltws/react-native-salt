import React from 'react';
import { renderWithTheme, fireEvent } from '../../../__tests__/test-utils';
import Lightbox from '../Lightbox';

describe('Lightbox', () => {
  const source = { uri: 'https://example.com/image.jpg' };
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders the modal when visible is true', () => {
    const { getByTestId } = renderWithTheme(
      <Lightbox visible onClose={onClose} source={source} testID="lightbox" />
    );
    expect(getByTestId('lightbox')).toBeTruthy();
  });

  it('renders close button with accessibility label', () => {
    const { getByLabelText } = renderWithTheme(
      <Lightbox visible onClose={onClose} source={source} />
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByLabelText } = renderWithTheme(
      <Lightbox visible onClose={onClose} source={source} />
    );
    fireEvent.press(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the title when provided', () => {
    const { getByText } = renderWithTheme(
      <Lightbox visible onClose={onClose} source={source} title="My Photo" />
    );
    expect(getByText('My Photo')).toBeTruthy();
  });

  it('renders the description when provided', () => {
    const { getByText } = renderWithTheme(
      <Lightbox
        visible
        onClose={onClose}
        source={source}
        title="Photo"
        description="A nice photo"
      />
    );
    expect(getByText('A nice photo')).toBeTruthy();
  });

  it('does not render title or description when not provided', () => {
    const { queryByText } = renderWithTheme(
      <Lightbox visible onClose={onClose} source={source} />
    );
    expect(queryByText('My Photo')).toBeNull();
  });
});

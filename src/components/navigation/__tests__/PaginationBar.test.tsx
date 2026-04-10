import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import PaginationBar from '../PaginationBar';

describe('PaginationBar', () => {
  it('renders page number buttons', () => {
    const { getByText } = renderWithTheme(
      <PaginationBar currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('calls onPageChange when a page number is pressed', () => {
    const onPageChange = jest.fn();
    const { getByText } = renderWithTheme(
      <PaginationBar currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.press(getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when prev button is pressed', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PaginationBar currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.press(getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when next button is pressed', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = renderWithTheme(
      <PaginationBar currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.press(getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables the previous button on the first page', () => {
    const { getByLabelText } = renderWithTheme(
      <PaginationBar currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );

    const prevButton = getByLabelText('Previous page');
    expect(prevButton.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('disables the next button on the last page', () => {
    const { getByLabelText } = renderWithTheme(
      <PaginationBar currentPage={5} totalPages={5} onPageChange={jest.fn()} />
    );

    const nextButton = getByLabelText('Next page');
    expect(nextButton.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true })
    );
  });

  it('marks the current page as selected in accessibilityState', () => {
    const { getByLabelText } = renderWithTheme(
      <PaginationBar currentPage={2} totalPages={5} onPageChange={jest.fn()} />
    );

    const page2 = getByLabelText('Page 2');
    expect(page2.props.accessibilityState).toEqual(
      expect.objectContaining({ selected: true })
    );
  });

  it('shows page info text when showPageNumbers is false', () => {
    const { getByText } = renderWithTheme(
      <PaginationBar
        currentPage={2}
        totalPages={10}
        onPageChange={jest.fn()}
        showPageNumbers={false}
      />
    );

    expect(getByText('2 of 10')).toBeTruthy();
  });
});

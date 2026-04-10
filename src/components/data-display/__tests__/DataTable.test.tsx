import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import DataTable from '../DataTable';

type Row = { id: string; name: string; age: number };

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', sortable: true },
];

const data: Row[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Charlie', age: 35 },
];

const keyExtractor = (item: Row) => item.id;

describe('DataTable', () => {
  it('renders column headers and row data', () => {
    const { getByText } = renderWithTheme(
      <DataTable columns={columns} data={data} keyExtractor={keyExtractor} />
    );

    expect(getByText('NAME')).toBeTruthy();
    expect(getByText('AGE')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
  });

  it('cycles sort direction when a sortable column header is pressed', () => {
    const onSort = jest.fn();
    const { getByText } = renderWithTheme(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onSort={onSort}
      />
    );

    // First press: asc
    fireEvent.press(getByText('NAME'));
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('cycles from asc to desc when already sorting asc on same column', () => {
    const onSort = jest.fn();
    const { getByText } = renderWithTheme(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        sortColumn="name"
        sortDirection="asc"
        onSort={onSort}
      />
    );

    fireEvent.press(getByText('NAME'));
    expect(onSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('cycles from desc to null when already sorting desc on same column', () => {
    const onSort = jest.fn();
    const { getByText } = renderWithTheme(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        sortColumn="name"
        sortDirection="desc"
        onSort={onSort}
      />
    );

    fireEvent.press(getByText('NAME'));
    expect(onSort).toHaveBeenCalledWith('name', null);
  });

  it('renders the empty state message when data is empty', () => {
    const { getByText } = renderWithTheme(
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={keyExtractor}
        emptyMessage="Nothing here"
      />
    );

    expect(getByText('Nothing here')).toBeTruthy();
  });

  it('renders default empty message when no custom message is given', () => {
    const { getByText } = renderWithTheme(
      <DataTable columns={columns} data={[]} keyExtractor={keyExtractor} />
    );

    expect(getByText('No data')).toBeTruthy();
  });

  it('calls onSelectRow when a row is pressed', () => {
    const onSelectRow = jest.fn();
    const { getByText } = renderWithTheme(
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={keyExtractor}
        onSelectRow={onSelectRow}
        selectedKeys={[]}
      />
    );

    fireEvent.press(getByText('Alice'));
    expect(onSelectRow).toHaveBeenCalledWith('1');
  });
});

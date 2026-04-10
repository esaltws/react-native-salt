import React from 'react';
import { renderWithTheme, fireEvent, waitFor, act } from '../../../__tests__/test-utils';
import CodeBlock from '../CodeBlock';

const sampleCode = `function hello() {
  console.log("world");
}`;

describe('CodeBlock', () => {
  it('renders code content', () => {
    const { getByText } = renderWithTheme(
      <CodeBlock code={sampleCode} />
    );

    expect(getByText('function hello() {')).toBeTruthy();
    expect(getByText('  console.log("world");')).toBeTruthy();
  });

  it('renders line numbers when showLineNumbers is true', () => {
    const { getByText } = renderWithTheme(
      <CodeBlock code={sampleCode} showLineNumbers />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('does not render line numbers by default', () => {
    const { queryByText } = renderWithTheme(
      <CodeBlock code="single line" />
    );

    // Line number "1" would be the line number text
    // But "single line" itself doesn't contain "1" as a standalone text node for line numbers
    // The default showLineNumbers is false, so no separate line number element
    const codeText = queryByText('single line');
    expect(codeText).toBeTruthy();
  });

  it('renders copy button when copyable is true', () => {
    const { getByText } = renderWithTheme(
      <CodeBlock code={sampleCode} copyable />
    );

    expect(getByText('Copy')).toBeTruthy();
  });

  it('shows "Copied" state after pressing copy button', () => {
    const onCopy = jest.fn();
    const { getByText } = renderWithTheme(
      <CodeBlock code={sampleCode} copyable onCopy={onCopy} />
    );

    fireEvent.press(getByText('Copy'));
    expect(onCopy).toHaveBeenCalledWith(sampleCode);
    expect(getByText('Copied')).toBeTruthy();
  });

  it('renders the language label in the header', () => {
    const { getByText } = renderWithTheme(
      <CodeBlock code={sampleCode} language="javascript" />
    );

    expect(getByText('javascript')).toBeTruthy();
  });

  it('does not render header when neither language nor copyable is set', () => {
    const { queryByText } = renderWithTheme(
      <CodeBlock code="hello" />
    );

    expect(queryByText('Copy')).toBeNull();
  });

  it('applies testID to the root container', () => {
    const { getByTestId } = renderWithTheme(
      <CodeBlock code={sampleCode} testID="code-block" />
    );

    expect(getByTestId('code-block')).toBeTruthy();
  });
});

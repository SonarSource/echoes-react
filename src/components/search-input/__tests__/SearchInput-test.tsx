/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { screen } from '@testing-library/react';
import { ComponentPropsWithRef, forwardRef, useState } from 'react';
import { render } from '~common/helpers/test-utils';
import { SearchInput } from '../SearchInput';

const CLEAR_SEARCH_BUTTON_NAME = 'Clear search';
const MIN_LENGTH_MESSAGE = '(minimum 3 characters)';
const SEARCH_PRODUCTS_LABEL = 'Search products';

it('should trigger change correctly', async () => {
  const onChange = jest.fn();
  const { user } = setupWithProps({ onChange, value: 'f' });
  await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'oo');
  expect(onChange).toHaveBeenCalledWith('foo');
});

it('should show clear button only when there is a value', async () => {
  const { user } = setupWithProps({ value: 'f' });
  const clearButton = screen.getByRole('button', { name: CLEAR_SEARCH_BUTTON_NAME });
  expect(clearButton).toBeInTheDocument();
  await user.clear(screen.getByRole('searchbox'));
  expect(clearButton).not.toBeInTheDocument();
});

it('should trigger reset correctly with clear button', async () => {
  const onChange = jest.fn();
  const { user } = setupWithProps({ onChange });
  await user.click(screen.getByRole('button', { name: CLEAR_SEARCH_BUTTON_NAME }));
  expect(onChange).toHaveBeenCalledWith('');
  expect(screen.getByRole('searchbox')).toHaveFocus();
});

it('should attach ref', () => {
  const ref = jest.fn();
  setupWithProps({ ref });
  expect(ref).toHaveBeenCalled();
  expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
});

it('should clear input using escape', async () => {
  const onChange = jest.fn();
  const onKeyDown = jest.fn();
  const { user } = setupWithProps({ onChange, onKeyDown, value: 'foo' });
  await user.type(screen.getByRole('searchbox'), '{Escape}');
  expect(onChange).toHaveBeenCalledWith('');
  expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }));
  expect(screen.getByRole('searchbox')).toHaveFocus();
});

it('should autofocus', () => {
  setupWithProps({ hasAutoFocus: true });
  expect(screen.getByRole('searchbox')).toHaveFocus();
});

it('should not prevent scroll on focus by default', () => {
  const focusSpy = jest.spyOn(HTMLInputElement.prototype, 'focus');
  setupWithProps({ hasAutoFocus: true });
  expect(focusSpy).toHaveBeenCalledWith({ preventScroll: false });
});

it('should prevent scroll on focus', () => {
  const focusSpy = jest.spyOn(HTMLInputElement.prototype, 'focus');
  setupWithProps({ hasAutoFocus: true, hasPreventScroll: true });
  expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
});

it('should not autofocus when disabled', () => {
  setupWithProps({ hasAutoFocus: true, isDisabled: true });
  expect(screen.getByRole('searchbox')).not.toHaveFocus();
});

it('should show loading spinner when isLoading is true', () => {
  setupWithProps({ isLoading: true });
  expect(screen.getByRole('status')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: CLEAR_SEARCH_BUTTON_NAME })).not.toBeInTheDocument();
});

it('should warn when input is too short', async () => {
  const { user } = setupWithProps({ value: 'f', minLength: 3 });
  expect(
    screen.getByRole('searchbox', { name: 'Search (minimum 3 characters)' }),
  ).toBeInTheDocument();
  expect(screen.getByText(MIN_LENGTH_MESSAGE)).toBeInTheDocument();

  await user.type(screen.getByRole('searchbox'), 'oo');
  expect(screen.queryByText(MIN_LENGTH_MESSAGE)).not.toBeInTheDocument();

  await user.clear(screen.getByRole('searchbox'));
  expect(screen.queryByText(MIN_LENGTH_MESSAGE)).not.toBeInTheDocument();
});

it('should not show min length message when minLength is 1 or less', () => {
  setupWithProps({ value: '', minLength: 1 });
  expect(
    screen.queryByRole('searchbox', { name: 'Search (minimum 1 characters)' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
});

it('should be disabled when isDisabled is true', () => {
  setupWithProps({ isDisabled: true, value: 'ab', minLength: 3 });
  expect(screen.getByRole('searchbox')).toBeDisabled();
  expect(screen.queryByRole('button', { name: CLEAR_SEARCH_BUTTON_NAME })).not.toBeInTheDocument();
  expect(screen.queryByText(MIN_LENGTH_MESSAGE)).not.toBeInTheDocument();
});

it('should allow to customize labels', async () => {
  const minLengthLabel = 'min 3 chars';
  const { user } = setupWithProps({
    placeholderLabel: SEARCH_PRODUCTS_LABEL,
    ariaLabel: SEARCH_PRODUCTS_LABEL,
    minLength: 3,
    minLengthLabel,
    value: '',
  });
  expect(
    screen.getByPlaceholderText(`${SEARCH_PRODUCTS_LABEL} ${minLengthLabel}`),
  ).toBeInTheDocument();

  await user.type(screen.getByRole('searchbox'), 'a');
  expect(
    screen.getByRole('searchbox', { name: `${SEARCH_PRODUCTS_LABEL} ${minLengthLabel}` }),
  ).toBeInTheDocument();
  expect(screen.getByText(minLengthLabel)).toBeInTheDocument();
});

it('should call onKeyDown for other keys', async () => {
  const onKeyDown = jest.fn();
  const { user } = setupWithProps({ onKeyDown });

  await user.type(screen.getByRole('searchbox'), '{Enter}');

  expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }));
});

it('should not have a11y violations', async () => {
  const { container } = setupWithProps();
  await expect(container).toHaveNoA11yViolations();
});

function setupWithProps(props: Partial<ComponentPropsWithRef<typeof SearchInput>> = {}) {
  return render(<SearchInputTester {...props} />);
}

const SearchInputTester = forwardRef<
  HTMLInputElement,
  Partial<ComponentPropsWithRef<typeof SearchInput>>
>(({ value: initialValue, onChange, ...props }, ref) => {
  const [value, setValue] = useState(initialValue ?? 'foo');
  return (
    <SearchInput
      {...props}
      onChange={(newValue: string) => {
        setValue(newValue);
        onChange?.(newValue);
      }}
      ref={ref}
      value={value}
    />
  );
});
SearchInputTester.displayName = 'SearchInputTester';

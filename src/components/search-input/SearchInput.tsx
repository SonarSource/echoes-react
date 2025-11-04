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
import styled from '@emotion/styled';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useCallback,
  useEffect,
} from 'react';
import { useIntl } from 'react-intl';
import { isDefined, isStringDefined } from '~common/helpers/types';
import { useForwardedRef } from '~common/helpers/useForwardedRef';
import { IconSearch } from '../icons';
import { Spinner } from '../spinner';
import {
  InputEventProps,
  InputPrefix,
  InputStyled,
  InputSuffix,
  InputWrapper,
} from '../text-input/TextInputBase';
import { Text } from '../typography';
import { SearchInputClearButton } from './SearchInputClearButton';

import { cssVar } from '~utils/design-tokens';

type InputAttributes = Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'maxLength'>;

type SearchInputEventProps = Omit<InputEventProps<HTMLInputElement>, 'onChange'>;

/**
 * Available width options for SearchInput
 */
export enum SearchInputWidth {
  /**
   * Full width (100%) (default)
   */
  Full = 'full',
  /**
   * Fixed width that matches FormFieldWidth.Medium
   */
  Medium = 'medium',
  /**
   * Fixed width that matches FormFieldWidth.Large
   */
  Large = 'large',
}

export interface SearchInputProps extends InputAttributes, SearchInputEventProps {
  /**
   * The ID of the element that describes the input field for accessibility (optional).
   */
  ariaDescribedBy?: string;
  /**
   * Custom aria-label for the input field, optional as by default the placeholderLabel value is used as the aria-label
   */
  ariaLabel?: string;
  /**
   * Add a `class` attribute to the root element (optional).
   */
  className?: string;
  /**
   * Whether the input should automatically receive focus when mounted, default to false
   */
  hasAutoFocus?: boolean;
  /**
   * Whether to prevent scrolling when focusing the input with auto-focus, default to false
   */
  hasPreventScroll?: boolean;
  /**
   * Whether the input is disabled and cannot be interacted with, default to false
   */
  isDisabled?: boolean;
  /**
   * Whether to show a loading spinner in the input suffix, default to false
   */
  isLoading?: boolean;
  /**
   * Minimum number of characters required for the search, will display a message if the input value is below this length
   * and the input is not empty (optional).
   */
  minLength?: number;
  /**
   * Custom label text to display for the minimum length requirement (optional).
   */
  minLengthLabel?: string;
  /**
   * Callback function called when the input value changes, this is mandatory, the SearchInput must be controlled.
   * It receives the new value as a string and is NOT debounced.
   * It is the responsibility of the parent component to handle debouncing if needed.
   * @param newValue - The new value of the input field.
   */
  onChange: (newValue: string) => void;
  /**
   * Custom placeholder text for the input field, acts as the SearchInput label when no aria-label is provided.
   * If `minLength` is defined, the placeholder will be appended with the minimum length label.
   */
  placeholderLabel?: string;
  /**
   * The current value of the search input, this is mandatory, the SearchInput must be controlled.
   * It should be a string that represents the current search query.
   */
  value: string;
  /**
   * The width of the input field. Can be either `full`, `medium`, or `large`.
   * Default is `full`.
   */
  width?: `${SearchInputWidth}`;
}

/**
 * A search input allows users to enter search queries with enhanced functionality
 * including auto-focus, loading states, clear functionality, and minimum length message display.
 *
 * The `SearchInput` is a controlled component that requires both `value` and `onChange` handler.
 * /!\ The `onChange` callback is NOT debounced - implement debouncing in the parent component if needed.
 *
 * **Permitted Content**
 *
 * None; it's a self-closing element.
 *
 * **Permitted Parents**
 *
 * Any element that accepts flow content.
 *
 * **Example**
 *
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('');
 *
 * <SearchInput
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   width="full"
 * />
 * ```
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, forwardedRef) => {
  const intl = useIntl();
  const {
    ariaDescribedBy,
    ariaLabel,
    className,
    hasAutoFocus = false,
    hasPreventScroll = false,
    isDisabled = false,
    isLoading = false,
    minLength,
    minLengthLabel = intl.formatMessage(
      {
        id: 'search_input.minimum_characters',
        defaultMessage: '(minimum {minLength} characters)',
        description: 'SearchInput minimum number of characters label',
      },
      { minLength },
    ),
    onChange,
    onKeyDown,
    placeholderLabel = intl.formatMessage({
      id: 'search_input.placeholder',
      defaultMessage: 'Search',
      description: 'SearchInput placeholder/label text',
    }),
    value,
    width = SearchInputWidth.Full,
    ...restProps
  } = props;

  const [ref, setRef] = useForwardedRef(forwardedRef);
  const showClearButton = isStringDefined(value);
  const isMinLengthDefined = isDefined(minLength) && minLength > 1;
  const showMinLengthMessage =
    isMinLengthDefined && isStringDefined(value) && value.length > 0 && value.length < minLength;
  const placeholder = placeholderLabel + (isMinLengthDefined ? ` ${minLengthLabel}` : '');
  let ariaLabelWithMinLength = placeholder;
  if (isStringDefined(ariaLabel)) {
    ariaLabelWithMinLength = `${ariaLabel} ${isMinLengthDefined ? minLengthLabel : ''}`;
  }

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      onChange(newValue);
    },
    [onChange],
  );

  const handleClearInput = useCallback(() => {
    if (showClearButton) {
      onChange('');
      ref.current?.focus({ preventScroll: hasPreventScroll });
    }
  }, [hasPreventScroll, onChange, ref, showClearButton]);

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClearInput();
      }
      onKeyDown?.(event);
    },
    [onKeyDown, handleClearInput],
  );

  useEffect(() => {
    if (hasAutoFocus && !isDisabled && ref.current) {
      ref.current.focus({ preventScroll: hasPreventScroll });
    }
  }, [hasAutoFocus, hasPreventScroll, isDisabled, ref]);

  return (
    <SearchInputWrapper className={className} data-width={width}>
      <InputPrefix data-disabled={isDisabled || undefined}>
        <IconSearch />
      </InputPrefix>
      <SearchInputStyled
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabelWithMinLength}
        // Everything above this line can be overridden by the `restProps` object
        {...restProps}
        autoComplete="off"
        data-prefix
        data-suffix={showClearButton || isLoading ? '' : undefined}
        disabled={isDisabled}
        onChange={handleChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        ref={setRef}
        type="search"
        value={value}
      />

      {!isLoading && !isDisabled && showMinLengthMessage && (
        <MinLengthMessage isSubtle>{minLengthLabel}</MinLengthMessage>
      )}
      {!isDisabled && (isLoading || showClearButton) && (
        <InputSuffix>
          <SearchInputSpinner isLoading={isLoading}>
            {showClearButton && (
              <SearchInputClearButton
                ariaLabel={intl.formatMessage({
                  id: 'search_input.clear',
                  defaultMessage: 'Clear search',
                  description: 'ARIA-label for the clear button in the search input.',
                })}
                onClick={handleClearInput}
              />
            )}
          </SearchInputSpinner>
        </InputSuffix>
      )}
    </SearchInputWrapper>
  );
});

SearchInput.displayName = 'SearchInput';

const SearchInputStyled = styled(InputStyled)`
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
    appearance: none;
  }
`;
SearchInputStyled.displayName = 'SearchInputStyled';

const SearchInputWrapper = styled(InputWrapper)`
  &[data-width='medium'] {
    width: ${cssVar('sizes-form-field-medium')};
  }
  &[data-width='large'] {
    width: ${cssVar('sizes-form-field-large')};
  }
  &[data-width='full'] {
    width: ${cssVar('sizes-form-field-full')};
  }

  // ensure the input maintains its hover state when any child is hovered
  &:hover ${SearchInputStyled}:not(:disabled) {
    background-color: ${cssVar('form-control-colors-background-hover')};
  }
`;
SearchInputWrapper.displayName = 'SearchInputWrapper';

const SearchInputSpinner = styled(Spinner)`
  margin: 0 ${cssVar('dimension-space-25')};
`;
SearchInputSpinner.displayName = 'SearchInputSpinner';

const MinLengthMessage = styled(Text)`
  position: absolute;
  right: calc(${cssVar('dimension-space-150')} + ${cssVar('dimension-width-300')});
  text-align: right;
  pointer-events: none;
  margin-top: 1px;
`;
MinLengthMessage.displayName = 'MinLengthMessage';

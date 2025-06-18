/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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
import { FormFieldWidth } from '../form/FormField';
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

type InputAttributes = Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'maxLength'>;

type SearchInputEventProps = Omit<InputEventProps<HTMLInputElement>, 'onChange'>;

export interface SearchInputProps extends InputAttributes, SearchInputEventProps {
  ariaDescribedBy?: string;
  ariaLabel?: string;
  className?: string;
  hasAutoFocus?: boolean;
  hasPreventScroll?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  minLength?: number;
  minLengthLabel?: string;
  onChange: (newValue: string) => void;
  placeholderLabel?: string;
  value: string;
  width?: `${FormFieldWidth}`;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, forwardedRef) => {
  const intl = useIntl();
  const {
    ariaDescribedBy,
    ariaLabel,
    hasAutoFocus = false,
    hasPreventScroll = false,
    isDisabled = false,
    isLoading = false,
    minLength,
    minLengthLabel = intl.formatMessage(
      {
        id: 'search_input.minimum_characters',
        defaultMessage: '({minLength} chars min)',
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
    width = FormFieldWidth.Large,
    ...rest
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
    <SearchInputWrapper data-width={width}>
      <InputPrefix>
        <IconSearch />
      </InputPrefix>
      <SearchInputStyled
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabelWithMinLength}
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
        {...rest}
      />

      {!isLoading && !isDisabled && showMinLengthMessage && (
        <MinLengthMessage isSubdued>{minLengthLabel}</MinLengthMessage>
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

const SearchInputWrapper = styled(InputWrapper)`
  &[data-width='small'] {
    width: var(--echoes-sizes-form-field-small);
  }
  &[data-width='medium'] {
    width: var(--echoes-sizes-form-field-medium);
  }
  &[data-width='large'] {
    width: var(--echoes-sizes-form-field-large);
  }
  &[data-width='full'] {
    width: var(--echoes-sizes-form-field-full);
  }
`;
SearchInputWrapper.displayName = 'SearchInputWrapper';

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

const SearchInputSpinner = styled(Spinner)`
  margin: 0 var(--echoes-dimension-space-25);
`;
SearchInputSpinner.displayName = 'SearchInputSpinner';

const MinLengthMessage = styled(Text)`
  position: absolute;
  right: calc(var(--echoes-dimension-space-150) + var(--echoes-dimension-width-300));
  text-align: right;
  pointer-events: none;
`;
MinLengthMessage.displayName = 'MinLengthMessage';

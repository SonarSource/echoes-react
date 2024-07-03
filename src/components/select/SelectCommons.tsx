/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { Select as MantineSelect } from '@mantine/core';
import { ComponentProps, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { PropsWithLabels } from '~types/utils';
import { IconChevronDown, Spinner } from '..';
import { INPUT_SIZE_VALUES, InputSize } from '../../utils/inputs';
import { useSelectItemComponent } from './SelectItemCommons';
import { SelectHighlight, SelectOption, SelectOptionType } from './SelectTypes';

type MantineSelectProps = ComponentProps<typeof MantineSelect>;
export interface SelectBaseProps {
  className?: string;
  data: ReadonlyArray<SelectOption>;
  defaultValue?: MantineSelectProps['defaultValue'];
  filter?: MantineSelectProps['filter'];
  hasError?: boolean;
  highlight?: SelectHighlight;
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotClearable?: boolean;
  isSearchable?: boolean;
  isRequired?: boolean;
  labelError?: MantineSelectProps['error'];
  labelNotFound?: MantineSelectProps['nothingFound'];
  limit?: MantineSelectProps['limit'];
  name?: MantineSelectProps['name'];
  optionComponent?: MantineSelectProps['itemComponent'];
  optionType?: SelectOptionType;
  onChange: MantineSelectProps['onChange'];
  onOpen?: MantineSelectProps['onDropdownOpen'];
  onSearch?: MantineSelectProps['onSearchChange'];
  placeholder?: MantineSelectProps['placeholder'];
  size?: InputSize;
  value: MantineSelectProps['value'];
  valueIcon?: MantineSelectProps['icon'];
}

export const SelectBase = forwardRef<HTMLInputElement, PropsWithLabels<SelectBaseProps>>(
  (props, ref) => {
    const {
      ariaLabel,
      ariaLabelledBy,
      data,
      hasError = false,
      helpText,
      highlight = SelectHighlight.Default,
      isDisabled = false,
      isLoading = false,
      isNotClearable = false,
      isSearchable = false,
      isRequired = false,
      label,
      labelError,
      labelNotFound,
      onSearch,
      onOpen,
      optionComponent,
      optionType = SelectOptionType.Check,
      size = InputSize.Full,
      valueIcon,
      ...selectProps
    } = props;

    const intl = useIntl();

    const itemComponent = useSelectItemComponent(optionComponent, optionType);
    const isClearable = !isNotClearable && !isRequired;

    return (
      <SelectStyled
        allowDeselect={isClearable}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        clearButtonProps={
          isClearable
            ? {
                'aria-label': intl.formatMessage({
                  id: 'select.clear',
                  defaultMessage: 'Clear select field',
                  description:
                    'Screen reader-only text to indicate that the select field can be cleared with a button',
                }),
              }
            : {}
        }
        clearable={isClearable}
        data={data}
        data-variant={highlight}
        description={helpText}
        disabled={isDisabled}
        error={labelError ?? hasError}
        icon={valueIcon}
        inputSize={size}
        itemComponent={itemComponent}
        label={label}
        nothingFound={labelNotFound}
        onDropdownOpen={onOpen}
        onSearchChange={onSearch}
        ref={ref}
        required={isRequired}
        rightSection={getSelectRightSection({
          hasValue: isDefined(selectProps.value),
          isLoading,
          isClearable,
        })}
        searchable={isSearchable}
        variant={highlight}
        {...selectProps}
      />
    );
  },
);

SelectBase.displayName = 'SelectBase';

export const SelectStyled = styled(MantineSelect, {
  shouldForwardProp: (prop) => prop !== 'inputSize',
})<{ inputSize: InputSize }>`
  // Set the width of the whole input component and its dropdown
  width: ${({ inputSize }) => INPUT_SIZE_VALUES[inputSize]};

  // Root wrapper around the whole input
  & .mantine-Select-wrapper {
    margin: 0;
  }

  // Label element styles, defined by label prop
  & .mantine-Select-label {
    font: var(--echoes-typography-paragraph-default-semi-bold);
    color: var(--echoes-color-text-bold);

    margin-bottom: var(--echoes-dimension-space-100);
  }

  // Description element styles, defined by description prop
  & .mantine-Select-description {
    font: var(--echoes-typography-paragraph-small-regular);
    color: var(--echoes-color-text-subdued);

    margin-top: calc(-1 * var(--echoes-dimension-space-50));
    margin-bottom: var(--echoes-dimension-space-100);
  }

  // Required asterisk element styles, defined by required prop
  & .mantine-Select-required {
    font: var(--echoes-typography-paragraph-default-medium);
    color: var(--echoes-color-text-danger);
  }

  // Error element styles, defined by error prop
  & .mantine-Select-error {
    font: var(--echoes-typography-paragraph-default-regular);
    color: var(--echoes-color-text-danger);

    margin-top: var(--echoes-dimension-space-100);
  }

  // Main input element, with styling for the default and ghost highlight and the different states
  & .mantine-Select-input {
    box-sizing: border-box;

    font: var(--echoes-typography-paragraph-default-regular);
    color: var(--echoes-color-text-bold);

    padding: var(--echoes-dimension-space-100);
    padding-left: var(--echoes-dimension-space-150);

    background-color: var(--echoes-color-background-default);
    border: var(--echoes-border-width-default) solid var(--echoes-color-border-bold);
    border-radius: var(--echoes-border-radius-400);

    &[data-variant='unstyled'],
    &[data-variant='unstyled'][data-disabled] {
      border-color: transparent;
    }

    &[data-invalid] {
      border-color: var(--echoes-color-border-danger);
    }

    &:hover {
      border-color: var(--echoes-color-border-bolder);
    }

    &:focus,
    &:focus-visible {
      outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
      outline-offset: var(--echoes-focus-border-offset-default);
    }

    &[data-with-icon] {
      padding-left: var(--echoes-dimension-space-400);
    }

    &::placeholder {
      color: var(--echoes-color-text-subdued);
    }

    &[data-disabled] {
      color: var(--echoes-color-text-disabled);
      border-color: var(--echoes-color-border-disabled);

      &::placeholder {
        color: var(--echoes-color-text-disabled);
      }
    }
  }

  // Input icon wrapper on the left side of the input, controlled by icon prop
  & .mantine-Select-icon,
  // Input right section, controlled by rightSection prop
  & .mantine-Select-rightSection {
    color: var(--echoes-color-icon-subdued);
  }

  // Input right section icon when the input is disabled
  & .mantine-Select-wrapper:has(input:disabled) .mantine-Input-rightSection {
    display: flex;
    color: var(--echoes-color-icon-disabled);
  }

  // Clear button
  & .mantine-CloseButton-root {
    color: var(--echoes-color-icon-subdued);
    border-radius: var(--echoes-border-radius-200);

    &:hover {
      background-color: var(--echoes-color-background-default-hover);
    }

    &:focus,
    &:focus-visible {
      outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
      outline-offset: var(--echoes-focus-border-offset-default);
      border-radius: var(--echoes-border-radius-200);
    }
  }

  // Dropdown element - wrapper around the select items
  & .mantine-Select-dropdown {
    padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-0);

    background-color: var(--echoes-color-background-default);
    border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
    border-radius: var(--echoes-border-radius-400);

    box-shadow: var(--echoes-box-shadow-medium);

    & .mantine-Select-itemsWrapper {
      padding: var(--echoes-dimension-space-0);
    }
  }

  // Inside the dropdown - Group header wrapper, contains a divider and a label
  & .mantine-Select-separator {
    display: flex;
    flex-direction: column;
    padding: var(--echoes-dimension-space-0);
  }

  // Inside the dropdown - Group header label
  & .mantine-Select-separatorLabel {
    padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-200);

    font: var(--echoes-typography-paragraph-small-semi-bold);
    color: var(--echoes-color-text-default);

    &::after {
      display: none;
    }
  }

  // Inside the dropdown - Adds a divider between an Item element and the following Group header
  & .mantine-Select-item + .mantine-Select-separator {
    &::before {
      content: '';

      flex: 1;
      padding: var(--echoes-dimension-space-25) var(--echoes-dimension-space-0);

      border-top: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
    }
  }
`;

interface SelectRightSectionProps extends Pick<SelectBaseProps, 'isLoading'> {
  hasValue: boolean;
  isClearable: boolean;
}

// Can't be a component because it must return undefined when not needed
export function getSelectRightSection(props: Readonly<SelectRightSectionProps>) {
  const { isLoading, isClearable, hasValue } = props;

  if (isLoading) {
    return <Spinner isLoading />;
  }

  // Display the clear button instead of the dropdown icon when the select is clearable and has a value selected
  if (isClearable && hasValue) {
    return undefined;
  }

  return <IconChevronDown />;
}

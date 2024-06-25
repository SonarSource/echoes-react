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
import { Select as MantineSelect, SelectItem } from '@mantine/core';
import { ComponentProps, ComponentType, forwardRef, useMemo } from 'react';
import { PropsWithLabels } from '~types/utils';
import { IconChevronDown, Spinner } from '..';
import { INPUT_SIZE_VALUES, InputSize } from '../../utils/inputs';

export enum SelectHighlight {
  Default = 'default',
  Ghost = 'unstyled',
}

type MantineSelectProps = ComponentProps<typeof MantineSelect>;

interface Props {
  className?: string;
  data: ReadonlyArray<SelectItem>;
  defaultValue?: MantineSelectProps['defaultValue'];
  hasError?: boolean;
  highlight?: SelectHighlight;
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotClearable?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  labelError?: MantineSelectProps['error'];
  labelNotFound?: MantineSelectProps['nothingFound'];
  limit?: MantineSelectProps['limit']; // might change for a max height
  name?: MantineSelectProps['name'];
  optionComponent?: MantineSelectProps['itemComponent'];
  onChange?: MantineSelectProps['onChange'];
  onOpen?: MantineSelectProps['onDropdownOpen'];
  placeholder?: MantineSelectProps['placeholder'];
  size?: InputSize;
  value?: MantineSelectProps['value'];
  valueIcon?: MantineSelectProps['icon'];
}

export const Select = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
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
    onOpen,
    optionComponent,
    size = InputSize.Full,
    valueIcon,
    ...selectProps
  } = props;

  // TODO Highlighter for search

  const itemComponent = useMemo(() => withSelectItemWrapper(optionComponent), [optionComponent]);

  return (
    <SelectStyled
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      clearable={!isNotClearable && !isRequired}
      data={data}
      data-variant={highlight}
      description={helpText}
      disabled={isDisabled}
      error={labelError ?? hasError}
      icon={valueIcon}
      initiallyOpened
      inputSize={size}
      itemComponent={itemComponent}
      label={label}
      nothingFound={labelNotFound}
      onDropdownOpen={onOpen}
      ref={ref}
      required={isRequired}
      rightSection={isLoading ? <Spinner isLoading /> : <IconChevronDown />}
      searchable={isSearchable}
      variant={highlight}
      {...selectProps}
    />
  );
});

Select.displayName = 'Select';

function withSelectItemWrapper<P extends Partial<SelectItem>>(WrappedComponent?: ComponentType<P>) {
  const Wrapper = forwardRef<HTMLDivElement, P>((props, ref) => (
    <SelectItemWrapper ref={ref} {...props}>
      {WrappedComponent ? <WrappedComponent {...props} /> : props.label}
    </SelectItemWrapper>
  ));

  Wrapper.displayName = 'SelectItemWrapper';

  return Wrapper;
}

const SelectItemWrapper = styled.div`
  &.mantine-Select-item {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--echoes-dimension-space-50);

    border: var(--echoes-focus-border-width-default) solid transparent;
    border-radius: var(--echoes-border-radius-200);

    padding: calc(var(--echoes-dimension-space-100) - var(--echoes-focus-border-width-default))
      var(--echoes-dimension-space-200);

    font: var(--echoes-typography-paragraph-default-regular);
    color: var(--echoes-color-text-default);

    background-color: var(--echoes-color-background-default);

    &:not([data-disabled]) {
      &:hover {
        background-color: var(--echoes-color-background-default-hover);
      }

      &:active {
        background-color: var(--echoes-color-background-default-active);
      }

      &[data-hovered] {
        border: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
      }
    }

    &[data-disabled] {
      color: var(--echoes-color-text-disabled);
    }
  }
`;

const SelectStyled = styled(MantineSelect, {
  shouldForwardProp: (prop) => prop !== 'inputSize',
})<{ inputSize: InputSize }>`
  width: ${({ inputSize }) => INPUT_SIZE_VALUES[inputSize]};

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

  & .mantine-Select-icon {
    color: var(--echoes-color-icon-subdued);
  }

  & .mantine-Select-rightSection {
    color: var(--echoes-color-icon-subdued);
  }

  & .mantine-Select-wrapper:has(input:disabled) .mantine-Input-rightSection {
    display: flex;
    color: var(--echoes-color-icon-disabled);
  }

  & .mantine-Select-dropdown {
    padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-0);

    background: var(--echoes-color-background-default);
    border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
    border-radius: var(--echoes-border-radius-400);

    box-shadow: var(--echoes-box-shadow-medium);

    & .mantine-Select-itemsWrapper {
      padding: var(--echoes-dimension-space-0);
    }
  }

  & .mantine-Select-separatorLabel {
    font: var(--echoes-typography-paragraph-small-semi-bold);
    color: var(--echoes-color-text-default);
    padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-200);

    &::after {
      display: none;
    }
  }

  & .mantine-Select-separator {
    display: flex;
    flex-direction: column;
    padding: var(--echoes-dimension-space-0);
  }

  & .mantine-Select-item + .mantine-Select-separator {
    &::before {
      content: '';
      flex: 1;
      border-top: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
      padding: var(--echoes-dimension-space-25) var(--echoes-dimension-space-0);
    }
  }
`;

/**
dropdown	.mantine-Select-dropdown	Dropdown element
item	.mantine-Select-item	Item element, rendered inside dropdown
nothingFound	.mantine-Select-nothingFound	Nothing found label
separator	.mantine-Select-separator	Divider wrapper
separatorLabel	.mantine-Select-separatorLabel	Separator Label
itemsWrapper	.mantine-Select-itemsWrapper	Wraps all items in dropdown

wrapper	.mantine-Select-wrapper	Root Input element
root	.mantine-Select-root	Root element
icon	.mantine-Select-icon	Input icon wrapper on the left side of the input, controlled by icon prop
input	.mantine-Select-input	Main input element
rightSection	.mantine-Select-rightSection	Input right section, controlled by rightSection prop

label	.mantine-Select-label	Label element styles, defined by label prop
error	.mantine-Select-error	Error element styles, defined by error prop
description	.mantine-Select-description	Description element styles, defined by description prop
required	.mantine-Select-required	Required asterisk element styles, defined by required prop
 */

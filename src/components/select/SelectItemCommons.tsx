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
import { ComboboxLikeRenderOptionInput } from '@mantine/core';
import { ComponentType, useCallback } from 'react';
import { IconCheck } from '..';
import { SelectOption, SelectOptionType } from './SelectTypes';

import { cssVar } from '~utils/design-tokens';

export type RenderOptionParams = ComboboxLikeRenderOptionInput<SelectOption>;
export type OptionComponent = ComponentType<SelectOption>;

export interface OptionComponentProps extends SelectOption {
  selected?: boolean;
}

// Returns the renderOption function to be used in the renderOption prop of the Mantine Select
export function useSelectOptionFunction(
  OptionComponent: OptionComponent | undefined,
  optionType: `${SelectOptionType}`,
) {
  return useCallback(
    ({ option, checked }: RenderOptionParams) => {
      const { label, helpText, prefix, suffix } = option;
      const optionComponentProps: OptionComponentProps = { ...option, selected: checked };
      return (
        <SelectItemWrapper>
          <SelectItemStatus checked={checked} optionType={optionType} />

          {prefix}

          <SelectItemInner>
            {OptionComponent ? <OptionComponent {...optionComponentProps} /> : <span>{label}</span>}

            {helpText && <SelectItemHelpText>{helpText}</SelectItemHelpText>}
          </SelectItemInner>

          {suffix}
        </SelectItemWrapper>
      );
    },
    [OptionComponent, optionType],
  );
}

// Wrapper around the select item content
const SelectItemWrapper = styled.div`
  .echoes-select-option & {
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: ${cssVar('dimension-space-100')};

    padding: calc(${cssVar('dimension-space-100')} - ${cssVar('focus-border-width-default')})
      ${cssVar('dimension-space-150')};

    font: ${cssVar('typography-text-small-medium')};
    color: ${cssVar('color-text-default')};
    background-color: ${cssVar('color-surface-default')};

    border: ${cssVar('focus-border-width-default')} solid transparent;
    border-radius: ${cssVar('border-radius-none')};

    cursor: pointer;
  }

  .echoes-select-option:not([data-combobox-disabled]):hover &,
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-selected] & {
    background-color: ${cssVar('color-surface-hover')};
  }
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active] & {
    background-color: ${cssVar('color-background-selected-weak-default')};
  }
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active]:hover &,
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active][data-combobox-selected]
    & {
    background-color: ${cssVar('color-background-selected-weak-hover')};
  }
  .echoes-select-option[data-combobox-disabled] & {
    color: ${cssVar('color-text-disabled')};
    cursor: default;
  }
`;
SelectItemWrapper.displayName = 'SelectItemWrapper';

// Inner wrapper around the select item's label and help text
const SelectItemInner = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  font: ${cssVar('typography-text-default-regular')};
`;
SelectItemInner.displayName = 'SelectItemInner';

// Help text below the select item label
const SelectItemHelpText = styled.span`
  font: ${cssVar('typography-others-helper-text')};
  color: ${cssVar('color-text-subtle')};

  .echoes-select-option[data-combobox-disabled] & {
    color: ${cssVar('color-text-disabled')};
  }
`;
SelectItemHelpText.displayName = 'SelectItemHelpText';

interface SelectItemStatusProps {
  optionType: `${SelectOptionType}`;
  checked?: boolean;
}

// Checkmark icon or Radio input icon in front of the select item
function SelectItemStatus(props: Readonly<SelectItemStatusProps>) {
  if (props.optionType === SelectOptionType.Radio) {
    return (
      <SelectItemStatusStyled>
        <SelectItemStatusRadio {...(props.checked ? { 'data-selected': true } : {})} />
      </SelectItemStatusStyled>
    );
  }
  return <SelectItemStatusStyled>{props.checked && <IconCheck />}</SelectItemStatusStyled>;
}

// Wrapper around the Checkmark icon or Radio input icon
const SelectItemStatusStyled = styled.div`
  padding: ${cssVar('dimension-space-25')};
  min-width: ${cssVar('dimension-width-250')};

  font: ${cssVar('typography-text-small-medium')};
  color: ${cssVar('color-icon-selected')};

  .echoes-select-option[data-combobox-disabled] & {
    color: ${cssVar('color-icon-disabled')};
  }
`;
SelectItemStatusStyled.displayName = 'SelectItemStatusStyled';

// Radio input icon in front of the select item for Radio optionType
const SelectItemStatusRadio = styled.div`
  box-sizing: border-box;
  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  min-width: ${cssVar('dimension-width-200')};
  padding: 0;

  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-bolder')};
  border-radius: ${cssVar('border-radius-full')};

  &[data-selected] {
    border-color: ${cssVar('color-border-accent-default')};
    background-color: ${cssVar('color-background-accent-default')};

    &::after {
      content: '';
      display: block;
      box-sizing: border-box;
      height: 100%;
      width: 100%;

      background-color: ${cssVar('color-icon-on-color')};
      border: 0.25rem solid ${cssVar('color-border-accent-default')};
      border-radius: ${cssVar('border-radius-full')};
    }
  }

  .echoes-select-option[data-combobox-disabled] & {
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};
    border-width: ${cssVar('border-width-default')};

    &[data-selected]::after {
      background-color: ${cssVar('color-icon-disabled')};
      border-color: ${cssVar('color-surface-disabled')};
    }
  }
`;
SelectItemStatusRadio.displayName = 'SelectItemStatusRadio';

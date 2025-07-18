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
    gap: var(--echoes-dimension-space-100);

    padding: calc(var(--echoes-dimension-space-100) - var(--echoes-focus-border-width-default))
      var(--echoes-dimension-space-150);

    font: var(--echoes-typography-text-small-medium);
    color: var(--echoes-color-text-default);
    background-color: var(--echoes-color-surface-default);

    border: var(--echoes-focus-border-width-default) solid transparent;
    border-radius: var(--echoes-border-radius-none);

    cursor: pointer;
  }

  .echoes-select-option:not([data-combobox-disabled]):hover &,
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-selected] & {
    background-color: var(--echoes-color-surface-hover);
  }
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active] & {
    background-color: var(--echoes-color-background-selected-weak-default);
  }
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active]:hover &,
  .echoes-select-option:not([data-combobox-disabled])[data-combobox-active][data-combobox-selected]
    & {
    background-color: var(--echoes-color-background-selected-weak-hover);
  }
  .echoes-select-option[data-combobox-disabled] & {
    color: var(--echoes-color-text-disabled);
    cursor: default;
  }
`;
SelectItemWrapper.displayName = 'SelectItemWrapper';

// Inner wrapper around the select item's label and help text
const SelectItemInner = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  font: var(--echoes-typography-text-default-regular);
`;
SelectItemInner.displayName = 'SelectItemInner';

// Help text below the select item label
const SelectItemHelpText = styled.span`
  font: var(--echoes-typography-others-helper-text);
  color: var(--echoes-color-text-subtle);

  .echoes-select-option[data-combobox-disabled] & {
    color: var(--echoes-color-text-disabled);
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
  padding: var(--echoes-dimension-space-25);
  min-width: var(--echoes-dimension-width-250);

  font: var(--echoes-typography-text-small-medium);
  color: var(--echoes-color-icon-selected);

  .echoes-select-option[data-combobox-disabled] & {
    color: var(--echoes-color-icon-disabled);
  }
`;
SelectItemStatusStyled.displayName = 'SelectItemStatusStyled';

// Radio input icon in front of the select item for Radio optionType
const SelectItemStatusRadio = styled.div`
  box-sizing: border-box;
  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
  min-width: var(--echoes-dimension-width-200);
  padding: 0;

  background-color: var(--echoes-color-surface-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bolder);
  border-radius: var(--echoes-border-radius-full);

  &[data-selected] {
    border-color: var(--echoes-color-border-accent-default);
    background-color: var(--echoes-color-background-accent-default);

    &::after {
      content: '';
      display: block;
      box-sizing: border-box;
      height: 100%;
      width: 100%;

      background-color: var(--echoes-color-icon-on-color);
      border: 0.25rem solid var(--echoes-color-border-accent-default);
      border-radius: var(--echoes-border-radius-full);
    }
  }

  .echoes-select-option[data-combobox-disabled] & {
    background-color: var(--echoes-color-surface-disabled);
    border-color: var(--echoes-color-border-disabled);
    border-width: var(--echoes-border-width-default);

    &[data-selected]::after {
      background-color: var(--echoes-color-icon-disabled);
      border-color: var(--echoes-color-surface-disabled);
    }
  }
`;
SelectItemStatusRadio.displayName = 'SelectItemStatusRadio';

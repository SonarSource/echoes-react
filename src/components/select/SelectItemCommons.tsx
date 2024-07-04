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
import { ComponentType, forwardRef, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { IconCheck } from '..';
import { SelectBaseProps } from './SelectCommons';
import { SelectOption, SelectOptionType } from './SelectTypes';

// Returns the stylized SelectItem component to be used in the itemComponent prop of the Mantine Select
export function useSelectItemComponent(
  optionComponent: SelectBaseProps['optionComponent'],
  optionType: SelectOptionType,
) {
  return useMemo(
    () => withSelectItemWrapper(optionComponent, optionType),
    [optionComponent, optionType],
  );
}

// HOC to wrap the optional custom optionComponent with the SelectItemWrapper
function withSelectItemWrapper<P extends SelectOption>(
  WrappedComponent: ComponentType<P> | undefined,
  optionType: SelectOptionType,
) {
  const Wrapper = forwardRef<HTMLDivElement, P>((props, ref) => {
    const { helpText, label, prefix, suffix, value, ...rest } = props;
    return (
      <SelectItemWrapper ref={ref} {...rest}>
        <SelectItemStatus optionType={optionType} {...props} />
        {prefix}
        <SelectItemInner>
          {WrappedComponent ? <WrappedComponent {...props} /> : <span>{props.label}</span>}
          {isDefined(helpText) && <SelectItemHelpText>{helpText}</SelectItemHelpText>}
        </SelectItemInner>
        {suffix}
      </SelectItemWrapper>
    );
  });

  Wrapper.displayName = 'WithSelectItemWrapper';

  return Wrapper;
}

// Wrapper around the whole select item
const SelectItemWrapper = styled.div`
  // Inside the dropdown - Item element
  &.mantine-Select-item {
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: var(--echoes-dimension-space-100);

    padding: calc(var(--echoes-dimension-space-100) - var(--echoes-focus-border-width-default))
      var(--echoes-dimension-space-150);

    font: var(--echoes-typography-paragraph-small-regular);
    color: var(--echoes-color-text-default);
    background-color: var(--echoes-color-background-default);

    border: var(--echoes-focus-border-width-default) solid transparent;
    border-radius: var(--echoes-border-radius-none);

    &:not([data-disabled]) {
      &[data-selected] {
        background-color: var(--echoes-color-background-selected-weak-default);

        &[data-hovered] {
          background-color: var(--echoes-color-background-selected-weak-hover);
        }
      }

      &[data-hovered] {
        background-color: var(--echoes-color-background-default-hover);
      }
    }

    &[data-disabled] {
      color: var(--echoes-color-text-disabled);
    }
  }
`;
SelectItemWrapper.displayName = 'SelectItemWrapper';

// Inner wrapper around the select item's label and help text
const SelectItemInner = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  font: var(--echoes-typography-paragraph-default-regular);
`;
SelectItemInner.displayName = 'SelectItemInner';

// Help text below the select item label
const SelectItemHelpText = styled.span`
  font: var(--echoes-typography-paragraph-small-regular);
  color: var(--echoes-color-text-subdued);

  [data-disabled] & {
    color: var(--echoes-color-text-disabled);
  }
`;
SelectItemHelpText.displayName = 'SelectItemHelpText';

interface SelectItemStatusProps extends SelectOption {
  optionType: SelectOptionType;
}

// Checkmark icon or Radio input icon in front of the select item
function SelectItemStatus(props: Readonly<SelectItemStatusProps>) {
  if (props.optionType === SelectOptionType.Radio) {
    return (
      <SelectItemStatusStyled>
        <SelectItemSatusRadio {...(props.selected ? { 'data-selected': true } : {})} />
      </SelectItemStatusStyled>
    );
  }
  return <SelectItemStatusStyled>{props.selected && <IconCheck />}</SelectItemStatusStyled>;
}

// Wrapper around the Checkmark icon or Radio input icon
const SelectItemStatusStyled = styled.div`
  padding: var(--echoes-dimension-space-25);
  min-width: var(--echoes-dimension-size-250);

  font: var(--echoes-typography-paragraph-small-regular);
  color: var(--echoes-color-icon-selected);

  [data-disabled] & {
    color: var(--echoes-color-icon-disabled);
  }
`;
SelectItemStatusStyled.displayName = 'SelectItemStatusStyled';

// Radio input icon in from of the select item for Radio optionType
const SelectItemSatusRadio = styled.div`
  box-sizing: border-box;
  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
  min-width: var(--echoes-dimension-size-200);
  padding: 0;

  background-color: var(--echoes-color-background-def ault);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bolder);
  border-radius: var(--echoes-border-radius-full);

  &[data-selected] {
    border-color: var(--echoes-color-border-accent);
    background-color: var(--echoes-color-background-accent-default);

    &::after {
      content: '';
      display: block;
      box-sizing: border-box;
      height: 100%;
      width: 100%;

      background-color: var(--echoes-color-icon-on-color);
      border: var(--echoes-dimension-size-50) solid var(--echoes-color-border-accent);
      border-radius: var(--echoes-border-radius-full);
    }
  }

  [data-disabled] & {
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
    border-width: var(--echoes-border-width-default);

    &[data-selected]::after {
      background-color: var(--echoes-color-icon-disabled);
      border-color: var(--echoes-color-background-disabled);
    }
  }
`;
SelectItemSatusRadio.displayName = 'SelectItemSatusRadio';

/**
 == Mantine Select structure & css class reference ==

dropdown	    .mantine-Select-dropdown	        Dropdown element
item	        .mantine-Select-item	            Item element, rendered inside dropdown
nothingFound	.mantine-Select-nothingFound	    Nothing found label
separator	    .mantine-Select-separator	        Divider wrapper
separatorLabel	.mantine-Select-separatorLabel	Separator Label
itemsWrapper	.mantine-Select-itemsWrapper	    Wraps all items in dropdown

wrapper	      .mantine-Select-wrapper	          Root Input element
root	        .mantine-Select-root	            Root element
icon	        .mantine-Select-icon	            Input icon wrapper on the left side of the input, controlled by icon prop
input	        .mantine-Select-input	            Main input element
rightSection	.mantine-Select-rightSection	    Input right section, controlled by rightSection prop

label	        .mantine-Select-label	            Label element styles, defined by label prop
error	        .mantine-Select-error	            Error element styles, defined by error prop
description	  .mantine-Select-description	      Description element styles, defined by description prop
required	    .mantine-Select-required	        Required asterisk element styles, defined by required prop
 */

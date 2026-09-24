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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { Ref, useCallback } from 'react';
import { truncate } from '~common/helpers/styles';
import { isDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';
import { CheckboxIcon } from '../checkbox/CheckboxIcon';
import { CheckboxIndicator, styleCheckboxRootBase } from '../checkbox/CheckboxStyles';
import { styleDropdownItemBase } from '../dropdown-menu/DropdownMenuStyles';
import {
  RadioButtonSelectionIndicator,
  styleRadioButtonInputBase,
} from '../radio-button-group/RadioButtonStyles';
import { Text, TextSize } from '../typography/Text';
import { filterDropdownRowStyles } from './FilterDropdownStyles';
import { FilterDropdownOption } from './FilterDropdownTypes';

/** @internal */
export interface FilterDropdownItemProps extends FilterDropdownOption {
  /** Whether the item is currently selected. */
  isSelected: boolean;
  /** Callback invoked when the item's selection state changes. */
  onChange: () => void;
  /** Ref forwarded to the underlying button element for roving-focus management. */
  ref?: Ref<HTMLButtonElement>;
  /** Roving tabindex value; 0 means this button is the current tab stop, -1 removes it. */
  tabIndex?: number;
}

/** @internal */
export function FilterDropdownItemMultiSelect(props: Readonly<FilterDropdownItemProps>) {
  const { isDisabled, isSelected, label, onChange, prefix, ref, suffix, tabIndex } = props;
  const handleCheckedChange = useCallback(() => onChange(), [onChange]);
  return (
    <StyledCheckboxRow
      checked={isSelected}
      disabled={isDisabled}
      onCheckedChange={handleCheckedChange}
      ref={ref}
      tabIndex={tabIndex}>
      <StyledCheckboxBox>
        <StyledCheckboxIndicator>
          <CheckboxIcon checked={isSelected} />
        </StyledCheckboxIndicator>
      </StyledCheckboxBox>
      <FilterDropdownItemContent label={label} prefix={prefix} suffix={suffix} />
    </StyledCheckboxRow>
  );
}
FilterDropdownItemMultiSelect.displayName = 'FilterDropdownItemMultiSelect';

/** @internal */
export function FilterDropdownItemSingleSelect(props: Readonly<FilterDropdownItemProps>) {
  const { isDisabled, isSelected, label, onChange, prefix, ref, suffix, value } = props;
  const handleClick = useCallback(() => {
    if (isSelected) {
      onChange();
    }
  }, [isSelected, onChange]);

  // Do not pass the tabIndex here, it's handled by radix-ui RadioButtonGroup
  return (
    <StyledRadioRow disabled={isDisabled} onClick={handleClick} ref={ref} value={value}>
      <StyledRadioBox>
        <RadioButtonSelectionIndicator />
      </StyledRadioBox>
      <FilterDropdownItemContent label={label} prefix={prefix} suffix={suffix} />
    </StyledRadioRow>
  );
}
FilterDropdownItemSingleSelect.displayName = 'FilterDropdownItemSingleSelect';

function FilterDropdownItemContent(
  props: Readonly<Pick<FilterDropdownOption, 'label' | 'prefix' | 'suffix'>>,
) {
  const { label, prefix, suffix } = props;
  return (
    <>
      {isDefined(prefix) && <StyledPrefix>{prefix}</StyledPrefix>}
      <StyledItemText>{label}</StyledItemText>
      {isDefined(suffix) && (
        <Text isSubtle size={TextSize.Small}>
          {suffix}
        </Text>
      )}
    </>
  );
}

FilterDropdownItemContent.displayName = 'FilterDropdownItemContent';

const indicatorSelectedStyles = css`
  [data-state='checked'] & {
    background-color: ${cssVar('color-background-selected-bold-default')};
    border-color: ${cssVar('color-background-selected-bold-default')};
  }

  [data-disabled] & {
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};
  }
`;

// Multi-select: the whole row IS the RadixCheckbox.Root (a button with role="checkbox").
const StyledCheckboxRow = styled(styleDropdownItemBase(RadixCheckbox.Root))`
  ${filterDropdownRowStyles}

  &[data-state='checked'] {
    background-color: ${cssVar('color-background-selected-weak-default')};
  }
`;
StyledCheckboxRow.displayName = 'StyledCheckboxRow';

// Visual checkbox box inside the row — mirrors Echoes CheckboxRoot styling.
const StyledCheckboxBox = styled(styleCheckboxRootBase('span'))`
  ${indicatorSelectedStyles}

  [data-disabled] & {
    color: ${cssVar('color-icon-disabled')};
  }
`;
StyledCheckboxBox.displayName = 'StyledCheckboxBox';

// Only rendered when the checkbox is checked — Radix Checkbox.Indicator handles this.
const StyledCheckboxIndicator = styled(CheckboxIndicator)`
  display: flex;
`;
StyledCheckboxIndicator.displayName = 'StyledCheckboxIndicator';

// Single-select: the whole row IS the RadixRadioGroup.Item (a button with role="radio").
const StyledRadioRow = styled(styleDropdownItemBase(RadixRadioGroup.Item))`
  ${filterDropdownRowStyles}
`;
StyledRadioRow.displayName = 'StyledRadioRow';

// Visual radio circle inside the row — mirrors Echoes RadioButtonInput styling.
const StyledRadioBox = styled(styleRadioButtonInputBase('span'))`
  ${indicatorSelectedStyles}
`;
StyledRadioBox.displayName = 'StyledRadioBox';

const StyledPrefix = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;
StyledPrefix.displayName = 'StyledPrefix';

const StyledItemText = styled(Text)`
  flex: 1 1 auto;

  ${truncate}
`;
StyledItemText.displayName = 'StyledItemText';

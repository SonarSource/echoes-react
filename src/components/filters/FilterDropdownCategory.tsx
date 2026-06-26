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
import { Ref } from 'react';
import { truncate } from '~common/helpers/styles';
import { cssVar } from '~utils/design-tokens';
import { BadgeCounter, BadgeCounterVariety } from '../badges/BadgeCounter';
import { styleDropdownItemBase } from '../dropdown-menu/DropdownMenuStyles';
import { IconChevronRight } from '../icons/IconChevronRight';
import { Text } from '../typography';
import { filterDropdownRowStyles } from './FilterDropdownStyles';

/** @internal */
export interface FilterDropdownCategoryProps {
  /** Whether this category is currently active (selected). */
  isActive: boolean;
  /** Label of the category. */
  label: string;
  /** Callback invoked when the category is clicked. */
  onClick: () => void;
  /** Ref forwarded to the underlying button element for roving-focus management. */
  ref?: Ref<HTMLButtonElement>;
  /** Number of selected items in this category. */
  selectionCount: number;
  /** Roving tabindex value; 0 means this button is the current tab stop, -1 removes it. */
  tabIndex?: number;
}

/** @internal */
export function FilterDropdownCategoryItem(props: Readonly<FilterDropdownCategoryProps>) {
  const { isActive, label, onClick, ref, selectionCount, tabIndex } = props;
  return (
    <StyledCategoryButton
      aria-selected={isActive}
      data-active={isActive || undefined}
      onClick={onClick}
      ref={ref}
      role="option"
      tabIndex={tabIndex}
      type="button">
      <StyledCategoryLabel>{label}</StyledCategoryLabel>
      {selectionCount > 0 && (
        <BadgeCounter value={selectionCount} variety={BadgeCounterVariety.Accent} />
      )}
      <StyledChevronRight />
    </StyledCategoryButton>
  );
}
FilterDropdownCategoryItem.displayName = 'FilterDropdownCategoryItem';

const StyledCategoryLabel = styled(Text)`
  flex: 1 1 auto;

  ${truncate}
`;
StyledCategoryLabel.displayName = 'StyledCategoryLabel';

const StyledCategoryButton = styled(styleDropdownItemBase('button'))`
  ${filterDropdownRowStyles}

  &[data-active] {
    background-color: ${cssVar('color-background-selected-weak-default')};
  }

  &[data-active] ${StyledCategoryLabel} {
    color: ${cssVar('color-text-accent')};
    font: ${cssVar('typography-text-default-semi-bold')};
  }
`;
StyledCategoryButton.displayName = 'StyledCategoryButton';

const StyledChevronRight = styled(IconChevronRight)`
  color: ${cssVar('color-icon-subtle')};
  font-size: ${cssVar('font-size-20')};
  flex-shrink: 0;
`;
StyledChevronRight.displayName = 'StyledChevronRight';

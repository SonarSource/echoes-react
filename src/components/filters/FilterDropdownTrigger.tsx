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

import { BadgeCounter, BadgeCounterVariety } from '../badges/BadgeCounter';
import { Button } from '../buttons';
import { ButtonAsButtonProps } from '../buttons/Button';
import { IconFilter } from '../icons';
import { IconChevronDown } from '../icons/IconChevronDown';

export interface FilterDropdownTriggerProps extends Omit<ButtonAsButtonProps, 'suffix'> {
  /** Number of active filter selections; shows an accent badge when greater than 0. */
  selectedCount: number;
}

export function FilterDropdownTrigger(props: Readonly<FilterDropdownTriggerProps>) {
  const { children, selectedCount, ...restProps } = props;
  return (
    <Button
      prefix={<IconFilter />}
      {...restProps}
      suffix={
        <>
          {selectedCount > 0 && (
            <BadgeCounter value={selectedCount} variety={BadgeCounterVariety.Accent} />
          )}
          <IconChevronDown />
        </>
      }>
      {children}
    </Button>
  );
}
FilterDropdownTrigger.displayName = 'FilterDropdownTrigger';

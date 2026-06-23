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

import { KeyboardEvent, Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
  FilterDropdownItemMultiSelect,
  FilterDropdownItemSingleSelect,
} from './FilterDropdownItem';
import { StyledItemsList, StyledItemsListRadioGroup } from './FilterDropdownStyles';
import { FilterDropdownOption } from './FilterDropdownTypes';
import { useFilterDropdownRovingFocus } from './useFilterDropdownRovingFocus';

/** @internal */
export interface FilterDropdownItemsListHandle {
  focusFirstItem: () => void;
}

interface FilterDropdownItemsListProps {
  /** Accessible label for the list container. */
  categoryLabel: string | undefined;
  /** Filtered items to display. */
  items: FilterDropdownOption[];
  /** Moves keyboard focus back to the active category in the left panel. */
  onCategoryFocusBack: () => void;
  /** Called when the user selects an item. */
  onItemToggle: (value: string) => void;
  /** The current set of pending selected values, used to derive checked states. */
  pendingValues: string[];
  /** Ref exposing `focusFirstItem()` to the parent. */
  ref?: Ref<FilterDropdownItemsListHandle>;
}

interface FilterDropdownMultiSelectListProps extends FilterDropdownItemsListProps {
  /** Current search query — used to reset the roving focus index when search changes. */
  searchQuery: string;
}

/** @internal */
export function FilterDropdownMultiSelectList(props: Readonly<FilterDropdownMultiSelectListProps>) {
  const {
    categoryLabel,
    items,
    onCategoryFocusBack,
    onItemToggle,
    pendingValues,
    ref,
    searchQuery,
  } = props;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // Synchronous derived-state reset: when searchQuery changes, reset the roving focus index
  // in the same render pass so no item is ever left without a valid tabIndex=0.
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (prevSearchQuery !== searchQuery) {
    setPrevSearchQuery(searchQuery);
    setActiveItemIndex(0);
  }

  const { register: itemRegister, focus: itemFocus } = useFilterDropdownRovingFocus();

  useImperativeHandle(ref, () => ({
    focusFirstItem: () => itemFocus(0),
  }));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onCategoryFocusBack();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = findEnabledIndex(activeItemIndex, items, 1);
        setActiveItemIndex(nextIndex);
        itemFocus(nextIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const previousIndex = findEnabledIndex(activeItemIndex, items, -1);
        setActiveItemIndex(previousIndex);
        itemFocus(previousIndex);
      }
    },
    [activeItemIndex, items, itemFocus, onCategoryFocusBack],
  );

  return (
    <StyledItemsList aria-label={categoryLabel} onKeyDown={handleKeyDown} role="group">
      {items.map((item, index) => (
        <FilterDropdownItemMultiSelect
          isDisabled={item.isDisabled ?? false}
          isSelected={pendingValues.includes(item.value)}
          key={item.value}
          label={item.label}
          onChange={() => onItemToggle(item.value)}
          prefix={item.prefix}
          ref={itemRegister(index)}
          suffix={item.suffix}
          tabIndex={index === activeItemIndex ? 0 : -1}
          value={item.value}
        />
      ))}
    </StyledItemsList>
  );
}
FilterDropdownMultiSelectList.displayName = 'FilterDropdownMultiSelectList';

interface FilterDropdownSingleSelectListProps extends FilterDropdownItemsListProps {
  /** The value of the currently selected item within this category. */
  currentValue: string;
}

/** @internal */
export function FilterDropdownSingleSelectList(
  props: Readonly<FilterDropdownSingleSelectListProps>,
) {
  const {
    categoryLabel,
    currentValue,
    items,
    onCategoryFocusBack,
    onItemToggle,
    pendingValues,
    ref,
  } = props;
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    focusFirstItem: () => firstItemRef.current?.focus(),
  }));

  const handleKeyDownCapture = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      // Radix RadioGroup intercepts ALL four arrow keys (WAI-ARIA radio pattern).
      // Use capture phase + stopPropagation so ArrowLeft never reaches Radix.
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        onCategoryFocusBack();
      }
    },
    [onCategoryFocusBack],
  );

  return (
    <StyledItemsListRadioGroup
      aria-label={categoryLabel}
      onKeyDownCapture={handleKeyDownCapture}
      onValueChange={onItemToggle}
      value={currentValue}>
      {items.map((item, index) => (
        <FilterDropdownItemSingleSelect
          isDisabled={item.isDisabled ?? false}
          isSelected={pendingValues.includes(item.value)}
          key={item.value}
          label={item.label}
          onChange={() => onItemToggle(item.value)}
          prefix={item.prefix}
          ref={index === 0 ? firstItemRef : undefined}
          suffix={item.suffix}
          value={item.value}
        />
      ))}
    </StyledItemsListRadioGroup>
  );
}
FilterDropdownSingleSelectList.displayName = 'FilterDropdownSingleSelectList';

function findEnabledIndex(
  activeItemIndex: number,
  items: FilterDropdownOption[],
  step: number,
): number {
  let i = activeItemIndex + step;
  while (i >= 0 && i < items.length) {
    if (!items[i].isDisabled) {
      return i;
    }
    i += step;
  }
  return activeItemIndex;
}

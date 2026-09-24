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
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { SearchInput } from '../search-input';
import { Spinner } from '../spinner';
import {
  FilterDropdownItemsListHandle,
  FilterDropdownMultiSelectList,
  FilterDropdownSingleSelectList,
} from './FilterDropdownItemsList';
import {
  StyledCustomContent,
  StyledRightPanel,
  StyledSearchHeader,
  StyledSpinnerWrapper,
} from './FilterDropdownStyles';
import {
  FilterDropdownCategory,
  FilterDropdownOption,
  isCategoryWithContent,
} from './FilterDropdownTypes';

/** @internal */
export interface FilterDropdownRightPanelHandle {
  focusFirstItem: () => void;
}

interface FilterDropdownRightPanelProps {
  /** The currently active category, whose items are displayed in this panel. */
  activeCategory: FilterDropdownCategory | undefined;
  /** Items to display. `undefined` means the category is still loading. */
  items: FilterDropdownOption[] | undefined;
  /** Moves keyboard focus back to the active category in the left panel. */
  onCategoryFocusBack: () => void;
  /** Called when the user toggles an item's selection state. */
  onItemToggle: (value: string) => void;
  /** The current set of pending selected values, used to derive checked states. */
  pendingValues: string[];
  /** Imperative handle ref, exposing `focusFirstItem()`. */
  ref?: Ref<FilterDropdownRightPanelHandle>;
}

/** @internal */
export function FilterDropdownRightPanel(props: Readonly<FilterDropdownRightPanelProps>) {
  const { activeCategory, onCategoryFocusBack, onItemToggle, pendingValues, ref, items } = props;
  const content = activeCategory?.content;
  const { formatMessage } = useIntl();
  const [searchQuery, setSearchQuery] = useState('');
  const listRef = useRef<FilterDropdownItemsListHandle>(null);

  const hasCustomContent = isCategoryWithContent(activeCategory);
  const isLoadingItems = !hasCustomContent && !isDefined(items);

  // When onSearch is provided, the consumer handles filtering and updates items directly.
  // Client-side filtering is only applied when isSearchable is true but onSearch is absent.
  const filteredItems =
    activeCategory?.isSearchable && !activeCategory?.onSearch
      ? items?.filter(
          (item) => !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : items;

  // For single-select, RadioGroup.Root needs the currently selected value within this category.
  const activeCategoryCurrentValue = isDefined(items)
    ? (items.find((i) => pendingValues.includes(i.value))?.value ?? '')
    : '';

  // Expose imperative handle to parent, allowing it to focus the first item in this panel.
  useImperativeHandle(ref, () => ({
    focusFirstItem: () => {
      if (hasCustomContent) {
        activeCategory?.onFocusContent();
      } else {
        listRef.current?.focusFirstItem();
      }
    },
  }));

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      activeCategory?.onSearch?.(query);
    },
    [activeCategory],
  );

  const handleCustomContentKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowLeft') {
        return;
      }
      // Preserve native ArrowLeft behavior for text-editing elements (inputs,
      // textareas, selects, and contenteditable nodes) so cursor movement is
      // not interrupted. For all other focusable descendants (buttons, links,
      // custom widgets, or the wrapper itself) ArrowLeft navigates back to the
      // active category in the left panel.
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      onCategoryFocusBack();
    },
    [onCategoryFocusBack],
  );

  if (hasCustomContent) {
    return (
      <StyledRightPanel>
        <StyledCustomContent onKeyDown={handleCustomContentKeyDown}>{content}</StyledCustomContent>
      </StyledRightPanel>
    );
  }

  return (
    <StyledRightPanel>
      {activeCategory?.isSearchable && (
        <StyledSearchHeader>
          <SearchInput
            onChange={handleSearchChange}
            placeholderLabel={
              activeCategory.labelSearchPlaceholder ??
              formatMessage({
                id: 'filter.dropdown.search',
                defaultMessage: 'Search',
                description: 'Placeholder text for the filter search input',
              })
            }
            value={searchQuery}
          />
        </StyledSearchHeader>
      )}
      {isLoadingItems && (
        <StyledSpinnerWrapper>
          <Spinner isLoading />
        </StyledSpinnerWrapper>
      )}
      {!isLoadingItems &&
        (activeCategory?.isMultiSelect ? (
          <FilterDropdownMultiSelectList
            categoryLabel={activeCategory.label}
            items={filteredItems ?? []}
            onCategoryFocusBack={onCategoryFocusBack}
            onItemToggle={onItemToggle}
            pendingValues={pendingValues}
            ref={listRef}
            searchQuery={searchQuery}
          />
        ) : (
          <FilterDropdownSingleSelectList
            categoryLabel={activeCategory?.label}
            currentValue={activeCategoryCurrentValue}
            items={filteredItems ?? []}
            onCategoryFocusBack={onCategoryFocusBack}
            onItemToggle={onItemToggle}
            pendingValues={pendingValues}
            ref={listRef}
          />
        ))}
    </StyledRightPanel>
  );
}
FilterDropdownRightPanel.displayName = 'FilterDropdownRightPanel';

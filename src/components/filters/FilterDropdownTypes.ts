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

import { ReactNode, Ref } from 'react';
import { TextNodeOptional } from '~types/utils';

/**
 * A single selectable option within a FilterDropdown category.
 */
export interface FilterDropdownOption {
  /**
   * Whether the option is disabled and cannot be selected.
   * @defaultValue false
   */
  isDisabled?: boolean;
  /**
   * Display label for the option.
   */
  label: string;
  /**
   * Optional icon or element shown between the checkbox/radio indicator and the label.
   */
  prefix?: ReactNode;
  /**
   * Optional suffix shown to the right of the label.
   */
  suffix?: TextNodeOptional;
  /**
   * Unique string value identifying this option.
   */
  value: string;
}

/**
 * A category shown in the left panel of a FilterDropdown.
 * Each category has its own list of items, multi-select mode, and optional search.
 */
export interface FilterDropdownCategory {
  /**
   * Whether items in this category support multi-selection (checkboxes).
   * When false, only one item can be selected at a time (radio buttons).
   * @defaultValue false
   */
  isMultiSelect?: boolean;
  /**
   * Whether to show a search input above the items list for this category.
   * @defaultValue false
   */
  isSearchable?: boolean;
  /**
   * Items to display for this category.
   * When `undefined`, the right panel shows a loading state and `onCategorySelect` is fired.
   */
  items?: FilterDropdownOption[];
  /**
   * Display label for this category.
   */
  label: string;
  /**
   * Placeholder text for the search input of this category.
   * @defaultValue "Search"
   */
  labelSearchPlaceholder?: string;
  /**
   * Called every time the search query changes for this category.
   * When provided, the component skips its built-in client-side filtering and
   * delegates search entirely to the consumer. The consumer is expected to update
   * `items` in response (e.g. after an async network call).
   * /!\ This callback is NOT debounced — implement debouncing in the parent component if needed.
   */
  onSearch?: (query: string) => void;
}

/**
 * Props for the FilterDropdown component.
 */
export interface FilterDropdownProps {
  /**
   * Categories to display in the left panel.
   * Each category shows its items in the right panel when active.
   */
  categories: FilterDropdownCategory[];
  /**
   * The trigger element. Wrapped with Radix Popover.Trigger using asChild.
   * The trigger button and its badge counter are the consumer's responsibility.
   */
  children: ReactNode;
  /**
   * Additional CSS class name applied to the popover content container.
   */
  className?: string;
  /**
   * Controls the open state externally.
   * When omitted, the component manages its own open/closed state.
   *
   * **Controlled mode**: when `isOpen` is provided, the component cannot close itself — the
   * consumer must flip `isOpen` to `false` in response to `onClose` (and to `true` in response
   * to `onOpen`) for the popover to open and close correctly.
   */
  isOpen?: boolean;
  /**
   * Label for the Apply button.
   * @defaultValue "Apply filters"
   */
  labelApply?: string;
  /**
   * Accessible label for the categories listbox (left panel).
   * @defaultValue "Categories"
   */
  labelCategories?: string;
  /**
   * Label for the Clear button.
   * @defaultValue "Clear filters"
   */
  labelClear?: string;
  /**
   * Accessible label for the filter popover dialog.
   * @defaultValue "Filters"
   */
  labelFilters?: string;
  /**
   * Called when the user clicks Apply.
   * Receives the full set of pending selected values at the time of confirmation.
   * When omitted, the Apply button is not rendered and the consumer should use
   * `onItemSelect` to react to selection changes immediately.
   */
  onApply?: (values: string[]) => void;
  /**
   * Called every time the active category changes, including on initial open.
   * Use this to load or refresh items for the newly active category.
   */
  onCategorySelect?: (categoryLabel: string) => void;
  /**
   * Called when the user clicks Clear.
   */
  onClear: () => void;
  /**
   * Called when the popover closes (whether by Apply, Clear, or Escape/outside click).
   */
  onClose?: () => void;
  /**
   * Called immediately after every item toggle with the full current pending selection.
   * Useful when `onApply` is omitted and the consumer wants to react to changes without
   * waiting for an explicit Apply action.
   */
  onItemSelect?: (values: string[]) => void;
  /**
   * Called when the popover opens.
   */
  onOpen?: () => void;
  /**
   * Ref forwarded to the popover content element.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * The currently committed selected values.
   * Used to initialize the pending selection state each time the popover opens.
   */
  selectedValues?: string[];
}

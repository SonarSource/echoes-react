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

import * as RadixPopover from '@radix-ui/react-popover';
import { KeyboardEvent, useCallback, useContext, useId, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { PortalContext } from '~common/components/PortalContext';
import { EMPTY_OBJECT } from '~common/helpers/constants';
import { isDefined } from '~common/helpers/types';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';
import { Divider } from '../divider';
import { OVERLAY_ARROW_PADDING, OVERLAY_SIDE_OFFSET, PopoverArrow } from '../popover/PopoverStyles';
import { FilterDropdownCategoryItem } from './FilterDropdownCategory';
import {
  FilterDropdownRightPanel,
  FilterDropdownRightPanelHandle,
} from './FilterDropdownRightPanel';
import {
  StyledFilterContent,
  StyledFilterLayout,
  StyledFooter,
  StyledLeftPanel,
} from './FilterDropdownStyles';
import {
  FilterDropdownCategory,
  FilterDropdownProps,
  FilterDropdownSelectedValues,
  isCategoryWithContent,
} from './FilterDropdownTypes';
import { useFilterDropdownKeyboardThrottle } from './useFilterDropdownKeyboardThrottle';
import { useFilterDropdownRovingFocus } from './useFilterDropdownRovingFocus';

function getValuesFor(values: FilterDropdownSelectedValues, id: string) {
  return Object.prototype.hasOwnProperty.call(values, id) ? values[id] : [];
}

export function FilterDropdown(props: Readonly<FilterDropdownProps>) {
  const {
    categories,
    children,
    className,
    isOpen,
    labelApply,
    labelCategories,
    labelClear,
    labelFilters,
    onApply,
    onCategorySelect,
    onClear,
    onClose,
    onItemSelect,
    onOpen,
    ref,
    selectedValues = EMPTY_OBJECT,
    ...restProps
  } = props;
  const { formatMessage } = useIntl();
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<FilterDropdownSelectedValues>({});
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Roving-focus helper for the left-panel category list.
  // Right-panel item focus is managed inside FilterDropdownRightPanel.
  const { register: categoryRegister, focus: categoryFocus } = useFilterDropdownRovingFocus();
  const rightPanelRef = useRef<FilterDropdownRightPanelHandle>(null);
  const allowCategoryKeyNav = useFilterDropdownKeyboardThrottle();

  const portalContext = useContext(PortalContext);
  const theme = useContext(ThemeContext);
  const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

  const contentId = useId();
  const open = isOpen ?? localIsOpen;

  const activeCategory = categories[activeCategoryIndex];
  const activeCategoryValues = isDefined(activeCategory)
    ? getValuesFor(pendingValues, activeCategory.id)
    : [];

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setLocalIsOpen(nextOpen);
      if (nextOpen) {
        setPendingValues({ ...selectedValues });
        setActiveCategoryIndex(0);
        onOpen?.();
        if (categories.length > 0) {
          onCategorySelect?.(categories[0].id);
        }
      } else {
        onClose?.();
      }
    },
    [categories, onCategorySelect, onClose, onOpen, selectedValues],
  );

  const handleCategoryClick = useCallback(
    (index: number) => {
      if (index !== activeCategoryIndex) {
        setActiveCategoryIndex(index);
        onCategorySelect?.(categories[index].id);
      }
    },
    [activeCategoryIndex, categories, onCategorySelect],
  );

  const handleItemToggle = useCallback(
    (value: string) => {
      if (!isDefined(activeCategory)) {
        return;
      }

      const categoryValues = getValuesFor(pendingValues, activeCategory.id);
      const isSelected = categoryValues.includes(value);

      let newCategoryValues: string[];
      if (activeCategory.isMultiSelect) {
        newCategoryValues = isSelected
          ? categoryValues.filter((v) => v !== value)
          : [...categoryValues, value];
      } else {
        newCategoryValues = isSelected ? [] : [value];
      }

      const newValues = { ...pendingValues };
      if (newCategoryValues.length > 0) {
        newValues[activeCategory.id] = newCategoryValues;
      } else {
        delete newValues[activeCategory.id];
      }

      setPendingValues(newValues);
      onItemSelect?.(newValues);
    },
    [activeCategory, onItemSelect, pendingValues],
  );

  const handleApply = useCallback(() => {
    onApply?.(pendingValues);
    handleOpenChange(false);
  }, [handleOpenChange, onApply, pendingValues]);

  const handleClear = useCallback(() => {
    onClear();
    setPendingValues({});
    handleOpenChange(false);
  }, [handleOpenChange, onClear]);

  const handleCategoryKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        rightPanelRef.current?.focusFirstItem();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (e.repeat && !allowCategoryKeyNav()) {
          return;
        }
        if (e.key === 'ArrowDown') {
          const nextIndex = Math.min(activeCategoryIndex + 1, categories.length - 1);
          handleCategoryClick(nextIndex);
          categoryFocus(nextIndex);
        } else {
          const previousIndex = Math.max(activeCategoryIndex - 1, 0);
          handleCategoryClick(previousIndex);
          categoryFocus(previousIndex);
        }
      }
    },
    [
      activeCategoryIndex,
      allowCategoryKeyNav,
      categories.length,
      categoryFocus,
      handleCategoryClick,
    ],
  );

  const handleCategoryFocusBack = useCallback(() => {
    categoryFocus(activeCategoryIndex);
  }, [activeCategoryIndex, categoryFocus]);

  const getCategorySelectionCount = useCallback(
    (category: FilterDropdownCategory) => {
      if (isCategoryWithContent(category)) {
        return category.selectionCount ?? 0;
      }
      return getValuesFor(pendingValues, category.id).length;
    },
    [pendingValues],
  );

  return (
    <RadixPopover.Root onOpenChange={handleOpenChange} open={open}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>

      <RadixPopover.Portal container={portalContext.portalReference}>
        <StyledFilterContent
          {...restProps}
          {...themeOverrideProp}
          aria-label={
            labelFilters ??
            formatMessage({
              id: 'filter.dropdown.label',
              defaultMessage: 'Filters',
              description: 'Accessible label for the filter popover dialog',
            })
          }
          arrowPadding={OVERLAY_ARROW_PADDING}
          className={className}
          id={contentId}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            categoryFocus(0);
          }}
          ref={ref}
          role="dialog"
          sideOffset={OVERLAY_SIDE_OFFSET}>
          <StyledFilterLayout>
            <StyledLeftPanel
              aria-label={
                labelCategories ??
                formatMessage({
                  id: 'filter.dropdown.categories.label',
                  defaultMessage: 'Categories',
                  description: 'Accessible label for the filter categories listbox',
                })
              }
              onKeyDown={handleCategoryKeyDown}
              role="listbox">
              {categories.map((category, index) => (
                <FilterDropdownCategoryItem
                  isActive={index === activeCategoryIndex}
                  key={category.id}
                  label={category.label}
                  onClick={() => handleCategoryClick(index)}
                  ref={categoryRegister(index)}
                  selectionCount={getCategorySelectionCount(category)}
                  tabIndex={index === activeCategoryIndex ? 0 : -1}
                />
              ))}
            </StyledLeftPanel>

            <FilterDropdownRightPanel
              activeCategory={activeCategory}
              items={activeCategory?.items}
              key={activeCategoryIndex}
              onCategoryFocusBack={handleCategoryFocusBack}
              onItemToggle={handleItemToggle}
              pendingValues={activeCategoryValues}
              ref={rightPanelRef}
            />
          </StyledFilterLayout>

          <Divider />

          <StyledFooter>
            <ButtonGroup>
              <Button onClick={handleClear} variety={ButtonVariety.Default}>
                {labelClear ??
                  formatMessage({
                    id: 'filter.dropdown.clear',
                    defaultMessage: 'Clear filters',
                    description: 'Label for the button that clears all active filters',
                  })}
              </Button>
              {isDefined(onApply) && (
                <Button onClick={handleApply} variety={ButtonVariety.Primary}>
                  {labelApply ??
                    formatMessage({
                      id: 'filter.dropdown.apply',
                      defaultMessage: 'Apply filters',
                      description: 'Label for the button that applies the pending filter selection',
                    })}
                </Button>
              )}
            </ButtonGroup>
          </StyledFooter>
          <PopoverArrow />
        </StyledFilterContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
FilterDropdown.displayName = 'FilterDropdown';

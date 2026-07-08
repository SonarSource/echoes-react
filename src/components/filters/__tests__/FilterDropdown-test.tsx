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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { FilterDropdown, FilterDropdownCategory, FilterDropdownProps } from '..';

const CATEGORIES: FilterDropdownCategory[] = [
  {
    isMultiSelect: true,
    label: 'Severity',
    items: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
  },
  {
    isMultiSelect: true,
    label: 'Type',
    items: [
      { label: 'Bug', value: 'bug' },
      { label: 'Vulnerability', value: 'vulnerability' },
    ],
  },
];

describe('FilterDropdown', () => {
  it('opens the popover and displays categories and items', async () => {
    const { user } = renderFilterDropdown();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /severity/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /type/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'High' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Medium' })).toBeInTheDocument();
  });

  it('switches items when a different category is clicked', async () => {
    const { user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('checkbox', { name: 'High' })).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: /type/i }));
    expect(screen.getByRole('checkbox', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'High' })).not.toBeInTheDocument();
  });

  it('fires onCategorySelect on open and on category switch', async () => {
    const onCategorySelect = jest.fn();
    const { user } = renderFilterDropdown({ onCategorySelect });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(onCategorySelect).toHaveBeenCalledWith('Severity');

    await user.click(screen.getByRole('option', { name: /type/i }));
    expect(onCategorySelect).toHaveBeenCalledWith('Type');

    await user.click(screen.getByRole('option', { name: /type/i }));
    expect(onCategorySelect).toHaveBeenCalledTimes(2);
  });

  it('toggles a multi-select item on click', async () => {
    const { user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    const checkbox = screen.getByRole('checkbox', { name: 'High' });

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls onApply with selected values when Apply is clicked', async () => {
    const onApply = jest.fn();
    const { user } = renderFilterDropdown({ onApply });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('checkbox', { name: 'High' }));
    await user.click(screen.getByRole('checkbox', { name: 'Medium' }));
    await user.click(screen.getByRole('button', { name: 'Apply filters' }));

    expect(onApply).toHaveBeenCalledWith(['high', 'medium']);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClear and closes on Clear click', async () => {
    const onClear = jest.fn();
    const { user } = renderFilterDropdown({ onClear, selectedValues: ['high'] });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('discards pending selection when closed without applying', async () => {
    const onApply = jest.fn();
    const { user } = renderFilterDropdown({ onApply });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('checkbox', { name: 'High' }));
    await user.keyboard('{Escape}');

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('checkbox', { name: 'High' })).not.toBeChecked();
    expect(onApply).not.toHaveBeenCalled();
  });

  it('initializes checked items from selectedValues on open', async () => {
    const { user } = renderFilterDropdown({ selectedValues: ['medium'] });

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.getByRole('checkbox', { name: 'Medium' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'High' })).not.toBeChecked();
  });

  it('shows a loading spinner when category items have never been loaded', async () => {
    const { user } = renderFilterDropdown({
      categories: [{ label: 'Severity', items: undefined }],
    });

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows a selection count badge on a category with pending selections', async () => {
    const { user } = renderFilterDropdown({ selectedValues: ['high', 'medium'] });

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('supports single-select mode — selecting one item deselects others in the category', async () => {
    const onApply = jest.fn();
    const { user } = renderFilterDropdown({
      categories: [
        {
          isMultiSelect: false,
          label: 'Severity',
          items: [
            { label: 'High', value: 'high' },
            { label: 'Low', value: 'low' },
          ],
        },
      ],
      onApply,
    });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('radio', { name: 'High' }));
    await user.click(screen.getByRole('radio', { name: 'Low' }));
    await user.click(screen.getByRole('button', { name: 'Apply filters' }));

    expect(onApply).toHaveBeenCalledWith(['low']);
  });

  it('focuses the first category button when the popover opens', async () => {
    const { user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.getByRole('option', { name: /severity/i })).toHaveFocus();
  });

  it('navigates categories with ArrowDown/ArrowUp, moving focus and firing onCategorySelect', async () => {
    const onCategorySelect = jest.fn();
    const { user } = renderFilterDropdown({ onCategorySelect });

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    onCategorySelect.mockClear();
    await user.keyboard('{ArrowDown}');
    expect(onCategorySelect).toHaveBeenCalledWith('Type');
    expect(screen.getByRole('option', { name: /type/i })).toHaveFocus();

    onCategorySelect.mockClear();
    await user.keyboard('{ArrowUp}');
    expect(onCategorySelect).toHaveBeenCalledWith('Severity');
    expect(screen.getByRole('option', { name: /severity/i })).toHaveFocus();
  });

  it('moves focus to the first item when pressing ArrowRight or Enter in the categories panel', async () => {
    const { user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('checkbox', { name: 'High' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('checkbox', { name: 'High' })).toHaveFocus();
  });

  it('moves focus between checkbox items with ArrowDown/ArrowUp without changing selection', async () => {
    const { user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('checkbox', { name: 'High' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('checkbox', { name: 'Medium' })).toHaveFocus();
    expect(screen.getByRole('checkbox', { name: 'High' })).not.toBeChecked();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('checkbox', { name: 'High' })).toHaveFocus();
  });

  it.each([
    { description: 'multi-select (checkbox)', isMultiSelect: true, itemRole: 'checkbox' },
    { description: 'single-select (radio)', isMultiSelect: false, itemRole: 'radio' },
  ])(
    'returns focus to the active category when pressing ArrowLeft from a $description item',
    async ({ isMultiSelect, itemRole }) => {
      const { user } = renderFilterDropdown({
        categories: [
          {
            isMultiSelect,
            label: 'Severity',
            items: [
              { label: 'High', value: 'high' },
              { label: 'Low', value: 'low' },
            ],
          },
        ],
      });

      await user.click(screen.getByRole('button', { name: 'Filters' }));
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole(itemRole, { name: 'High' })).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(screen.getByRole('option', { name: /severity/i })).toHaveFocus();
    },
  );

  it('renders custom content in the right panel for a content category', async () => {
    const { user } = renderFilterDropdown({
      categories: [
        { label: 'Severity', items: [{ label: 'High', value: 'high' }] },
        {
          label: 'Date Range',
          content: <button type="button">Pick date</button>,
          onFocusContent: jest.fn(),
        },
      ],
    });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('option', { name: /date range/i }));

    expect(screen.getByRole('button', { name: 'Pick date' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('moves focus into custom content on ArrowRight and back to the category on ArrowLeft', async () => {
    const buttonRef = { current: null as HTMLButtonElement | null };
    const { user } = renderFilterDropdown({
      categories: [
        { label: 'Severity', items: [{ label: 'High', value: 'high' }] },
        {
          label: 'Date Range',
          content: (
            <button ref={buttonRef} type="button">
              Pick date
            </button>
          ),
          onFocusContent: () => buttonRef.current?.focus(),
        },
      ],
    });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: /date range/i })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Pick date' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('option', { name: /date range/i })).toHaveFocus();
  });

  it('filters items when searching', async () => {
    const { user } = renderFilterDropdown({
      categories: [
        {
          isMultiSelect: true,
          isSearchable: true,
          label: 'Severity',
          items: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
        },
      ],
    });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.type(screen.getByRole('searchbox'), 'hi');

    expect(screen.getByRole('checkbox', { name: 'High' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Medium' })).not.toBeInTheDocument();
  });

  it('does not render the Apply button when onApply is not provided', async () => {
    const { user } = renderFilterDropdown({ onApply: undefined });

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    expect(screen.queryByRole('button', { name: 'Apply filters' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  });

  it('calls onItemSelect with updated pending values on each item toggle', async () => {
    const onItemSelect = jest.fn();
    const { user } = renderFilterDropdown({ onItemSelect });

    await user.click(screen.getByRole('button', { name: 'Filters' }));
    await user.click(screen.getByRole('checkbox', { name: 'High' }));

    expect(onItemSelect).toHaveBeenCalledWith(['high']);

    await user.click(screen.getByRole('checkbox', { name: 'Medium' }));

    expect(onItemSelect).toHaveBeenCalledWith(['high', 'medium']);
  });

  it('passes the accessibility check', async () => {
    const { container, user } = renderFilterDropdown();

    await user.click(screen.getByRole('button', { name: 'Filters' }));

    await expect(container).toHaveNoA11yViolations();
  });
});

function renderFilterDropdown(props: Partial<FilterDropdownProps> = {}) {
  return render(
    <FilterDropdown categories={CATEGORIES} onApply={jest.fn()} onClear={jest.fn()} {...props}>
      <button type="button">Filters</button>
    </FilterDropdown>,
  );
}

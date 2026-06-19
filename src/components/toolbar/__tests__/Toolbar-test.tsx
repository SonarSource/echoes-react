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
import { FilterTag } from '../../filters/FilterTag';
import { Toolbar, ToolbarProps } from '../Toolbar';

describe('Toolbar', () => {
  it('renders search, filters, sorting, and datasetControls in the top row', async () => {
    const { container } = renderToolbar({
      datasetControls: <button type="button">Export</button>,
      filterControls: <button type="button">Severity</button>,
      sortControls: <button type="button">Sort</button>,
    });

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Severity' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sort' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('renders the applied-filters row with filter tags when filterTags is provided', async () => {
    const onClearAll = jest.fn();
    const { container, user } = renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
      onClearAll,
    });

    expect(screen.getByText('Severity')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
    await expect(container).toHaveNoA11yViolations();
  });

  it('does not render the "Clear filters" button when onClearAll is not provided', () => {
    renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
    });

    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  it('does not render the "Clear filters" button when filterTags is empty', () => {
    renderToolbar({
      filterTags: [],
      onClearAll: jest.fn(),
    });

    expect(screen.queryByRole('button', { name: 'Clear filters' })).not.toBeInTheDocument();
  });

  it('activates "Clear filters" via keyboard', async () => {
    const onClearAll = jest.fn();
    const { user } = renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
      onClearAll,
    });

    await user.tab(); // search input
    await user.tab(); // FilterTag dismiss button
    await user.tab(); // "Clear filters" button
    await user.keyboard('{Enter}');

    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('uses custom labelClearAll', () => {
    renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
      labelClearAll: 'Reset',
      onClearAll: jest.fn(),
    });

    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('shows default labelFilterTags when filterTags is non-empty', async () => {
    const { container } = renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
    });

    expect(screen.getByText('Applied filters (1)')).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('shows a custom static labelFilterTags when filterTags is non-empty', () => {
    renderToolbar({
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
      labelFilterTags: 'Active filters (1)',
    });

    expect(screen.getByText('Active filters (1)')).toBeInTheDocument();
  });

  it('renders a group role with ariaLabel on the root element', async () => {
    const { container } = renderToolbar({ ariaLabel: 'Issue filters' });

    expect(screen.getByRole('group', { name: 'Issue filters' })).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('does not render labelFilterTags when filterTags is empty', () => {
    renderToolbar({
      filterTags: [],
      filterControls: <button type="button">Severity</button>,
      labelEmptyFilterTags: 'No filters applied',
      labelFilterTags: 'Applied filters',
    });

    expect(screen.queryByText(/Applied filters/)).not.toBeInTheDocument();
  });

  it('shows labelEmptyFilterTags when filterControls is defined and filterTags is empty', async () => {
    const { container } = renderToolbar({
      filterControls: <button type="button">Severity</button>,
      filterTags: [],
      labelEmptyFilterTags: 'No filters applied',
    });

    expect(screen.getByText('No filters applied')).toBeInTheDocument();
    await expect(container).toHaveNoA11yViolations();
  });

  it('does not render labelEmptyFilterTags when filterTags is non-empty', () => {
    renderToolbar({
      filterControls: <button type="button">Severity</button>,
      filterTags: [
        <FilterTag key="s" onDismiss={jest.fn()}>
          Severity
        </FilterTag>,
      ],
      labelEmptyFilterTags: 'No filters applied',
    });

    expect(screen.queryByText('No filters applied')).not.toBeInTheDocument();
  });

  it('does not render labelEmptyFilterTags when filterControls is not defined', () => {
    renderToolbar({ filterTags: [], labelEmptyFilterTags: 'No filters applied' });

    expect(screen.queryByText('No filters applied')).not.toBeInTheDocument();
  });
});

function renderToolbar(props: Partial<ToolbarProps> = {}) {
  return render(
    <Toolbar
      searchInput={<input aria-label="Search" role="searchbox" type="search" />}
      {...props}
    />,
  );
}

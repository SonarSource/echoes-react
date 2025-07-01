/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { Table } from '..';
import { IconEdit } from '../../icons';

it('should be accessible', () => {
  setupTable();

  expect(screen.getByRole('table')).toHaveNoA11yViolations({
    // We accept non-visible labels
    rules: { 'empty-table-header': { enabled: false } },
  });
});

it('should allow selection', async () => {
  const onCheckHeader = jest.fn();
  const onCheckRow = jest.fn();
  const { user } = setupTable({ onCheckRow, onCheckHeader });

  expect(screen.getByRole('checkbox', { name: 'Select 1' })).toBeChecked();

  await user.click(screen.getByRole('checkbox', { name: 'Select 2' }));

  expect(onCheckRow).toHaveBeenCalledWith('2');

  await user.click(screen.getByRole('checkbox', { name: 'Select all' }));

  expect(onCheckHeader).toHaveBeenCalled();
});

it('should handle sorting', async () => {
  const onSort = jest.fn();
  const { user } = setupTable({ onSort });

  expect(screen.getByRole('columnheader', { name: 'col 1' })).not.toHaveAttribute('aria-sort');
  expect(screen.getByRole('columnheader', { name: 'col 2' })).toHaveAttribute(
    'aria-sort',
    'descending',
  );

  await user.click(screen.getByRole('button', { name: 'col 1' }));

  expect(onSort).toHaveBeenCalledWith('1');
});

type RowType = [boolean, string, string, string];

function setupTable(
  args: {
    onCheckHeader?: () => void;
    onCheckRow?: () => void;
    onSort?: (id: string) => void;
    rows?: RowType[];
  } = {},
) {
  const {
    onCheckHeader = jest.fn(),
    onCheckRow = jest.fn(),
    onSort,
    rows = [
      [true, '1', 'first', 'cool'],
      [false, '2', 'second', 'beans'],
    ],
  } = args;

  return renderWithMemoryRouter(
    <Table ariaLabel="awesome table" gridTemplate="max-content 1fr auto repeat(4, min-content)">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCellCheckbox
            ariaLabel="Select all"
            checked="indeterminate"
            onCheck={onCheckHeader}
          />
          <Table.ColumnHeaderCell label="col 1" onSort={onSort && (() => onSort('1'))} />
          <Table.ColumnHeaderCell
            label="col 2"
            onSort={onSort && (() => onSort('2'))}
            sortDirection="desc"
          />
          <Table.ColumnHeaderCell label="Status" />
          <Table.ColumnHeaderCell label="Related" />
          <Table.ColumnHeaderCell label="Clickable" />
          <Table.ColumnHeaderCell aria-label="Actions" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.map(([checked, id, name, info]) => (
          <Table.Row key={id}>
            <Table.CellCheckbox
              ariaLabel={`Select ${id}`}
              checked={checked}
              onCheck={() => onCheckRow(id)}
            />
            <Table.RowHeaderCell content={name} />
            <Table.CellNumber content={info} />
            <Table.CellBadge variety="highlight">new</Table.CellBadge>
            <Table.CellLink to="#">Interesting link</Table.CellLink>
            <Table.CellButton>Click me</Table.CellButton>
            <Table.CellButtonIcon Icon={IconEdit} ariaLabel={`edit ${name}`} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>,
  );
}

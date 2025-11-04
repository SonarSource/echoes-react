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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { TableProps, TableSortDirection } from 'src/components/table/TableTypes';
import {
  BadgeVariety,
  DropdownMenu,
  IconMoreVertical,
  IconWarning,
  Popover,
  Table,
  TableVariety,
  Tooltip,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Echoes/Table',
  parameters: {
    controls: { exclude: ['children'] },
  },
  argTypes: {
    variety: { control: { type: 'select' }, options: Object.values(TableVariety) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Selectable: Story = {
  args: {
    ariaLabel: 'Awesome table',
    gridTemplate: 'max-content 1fr max-content 1fr 1fr max-content max-content',
    variety: TableVariety.Surface,
  },
  render: (args) => <StateManager {...args} />,
};

const DATA = [
  {
    name: 'Michelangelo',
    email: 'mikey@sewers.nyc',
    weapon: 'Nunchaku',
    age: '13',
    badge: BadgeVariety.Warning,
  },
  {
    name: 'Leonardo',
    description: "He's the leader!",
    email: 'leo@sewers.nyc',
    weapon: 'Katana',
    age: '15',
    ageDescription: 'oldest',
    badge: BadgeVariety.Info,
  },
  {
    name: 'Donatello',
    description: 'techie',
    email: 'donnie@sewers.nyc',
    weapon: 'Bo',
    age: '14',
    badge: BadgeVariety.Highlight,
  },
  {
    name: 'Raphael',
    email: 'raph@sewers.nyc',
    emailDescription: "don't bother him!",
    emailTooltip: 'he can be a bit impatient',
    weapon: 'Sai',
    age: '14',
    badge: BadgeVariety.Danger,
  },
];

function getSelectionState(selectedRows: Record<string, boolean>) {
  const values = Object.values(selectedRows);

  if (values.every(Boolean)) {
    return true;
  }

  if (values.every((v) => !v)) {
    return false;
  }

  return 'indeterminate';
}

function StateManager(props: TableProps) {
  const [selectedRows, setSelectedRows] = useState(
    DATA.reduce(
      (result, item) => {
        result[item.name] = false;
        return result;
      },
      {} as Record<string, boolean>,
    ),
  );

  const [sorting, setSorting] = useState<{ column: string; direction?: `${TableSortDirection}` }>({
    column: '',
    direction: undefined,
  });

  const selectionState = getSelectionState(selectedRows);

  const toggleRow = useCallback(
    (name: string) => {
      setSelectedRows((selectedRows) => {
        return { ...selectedRows, [name]: !selectedRows[name] };
      });
    },
    [setSelectedRows],
  );

  const toggleAll = useCallback(() => {
    setSelectedRows((selectedRows) => {
      for (const d of DATA) {
        selectedRows[d.name] = selectionState === 'indeterminate' || !selectionState;
      }

      return { ...selectedRows };
    });
  }, [setSelectedRows, selectionState]);

  const toggleSorting = useCallback(
    (column: string) => {
      setSorting((sorting) => {
        if (sorting.column === column) {
          return {
            column,
            direction: sorting.direction === 'asc' ? 'desc' : 'asc',
          };
        }

        return { column, direction: 'asc' };
      });
    },
    [setSorting],
  );

  return (
    <Table {...props}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCellCheckbox
            ariaLabel="Select All"
            checked={getSelectionState(selectedRows)}
            onCheck={toggleAll}
          />
          <Table.ColumnHeaderCell
            label="Name"
            toggleTip={{
              title: 'kowabunga!!!',
            }}
          />
          <Table.ColumnHeaderCell aria-label="Color" />
          <Table.ColumnHeaderCell label="Email" />

          <Tooltip content="While inspired by medieval Japan, the weapons the turtles use are made from recycled materials found in the NYC sewers">
            <Table.ColumnHeaderCell
              label="Weapon"
              onSort={() => {
                toggleSorting('weapon');
              }}
              sortDirection={sorting.column === 'weapon' ? sorting.direction : undefined}
            />
          </Tooltip>
          <Table.ColumnHeaderCell
            justify="end"
            label="Age"
            onSort={() => {
              toggleSorting('age');
            }}
            sortDirection={sorting.column === 'age' ? sorting.direction : undefined}
          />
          <Table.ColumnHeaderCell aria-label="more actions" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {DATA.map((turtle) => (
          <Table.Row key={turtle.name} selected={selectedRows[turtle.name]}>
            <Table.CellCheckbox
              ariaLabel={`Select ${turtle.name}`}
              checked={selectedRows[turtle.name]}
              onCheck={() => toggleRow(turtle.name)}
            />
            <Table.RowHeaderCell content={turtle.name} description={turtle.description} />

            <Popover title="Teenage Mutant Ninja Turtles">
              <Table.CellBadge isHighContrast isInteractive variety={turtle.badge}>
                TMNT
              </Table.CellBadge>
            </Popover>

            {turtle.emailTooltip ? (
              <Tooltip content="he can be a bit impatient">
                <Table.CellLink description={turtle.emailDescription} to="#">
                  {turtle.email}
                </Table.CellLink>
              </Tooltip>
            ) : (
              <Table.CellLink description={turtle.emailDescription} to="#">
                {turtle.email}
              </Table.CellLink>
            )}

            <Table.CellText
              content={turtle.weapon}
              icon={<IconWarning color="echoes-color-icon-emphasis" />}
            />
            <Table.CellNumber content={turtle.age} description={turtle.ageDescription} />

            <DropdownMenu
              items={
                <>
                  <DropdownMenu.ItemLink to="#">check out</DropdownMenu.ItemLink>
                  <DropdownMenu.ItemButtonDestructive>Delete!</DropdownMenu.ItemButtonDestructive>
                </>
              }>
              <Table.CellButtonIcon
                Icon={IconMoreVertical}
                ariaLabel={`more actions for ${turtle.name}`}
              />
            </DropdownMenu>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

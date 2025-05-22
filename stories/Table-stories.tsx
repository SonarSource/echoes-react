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

import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon, IconEdit, Table, TableVariety, Tooltip } from '../src';
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

export const Basic: Story = {
  args: {
    ariaLabel: 'Awesome table',
    gridTemplate: 'repeat(4, 1fr) max-content',
    variety: TableVariety.Surface,
  },
  render: (args) => (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell label="Name" />
          <Table.ColumnHeaderCell label="Email" />
          <Table.ColumnHeaderCell
            label="Weapon"
            onSort={() => {
              console.log('asdf');
            }}
            sortDirection="desc"
          />
          <Table.ColumnHeaderCell justify="end" label="Age" />
          <Table.ColumnHeaderCell aria-label="actions" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell content="Michelangelo" />
          <Table.CellLink to="#">mikey@sewers.nyc</Table.CellLink>
          <Table.CellText content="Nunchaku" />
          <Table.CellNumber content="13" />
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit mike" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell content="Leonardo" description="He's the leader!" />
          <Table.CellLink to="#">leo@sewers.nyc</Table.CellLink>
          <Table.CellText content="Katana" />
          <Table.CellNumber content="15" description="oldest" />
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit leo" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell content="Donatello" description="techie" />
          <Table.CellLink to="#">donnie@sewers.nyc</Table.CellLink>
          <Table.CellText content="Bo" />
          <Table.CellNumber content="14" />
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit donnie" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell content="Raphael" />
          <Tooltip content="he can be a bit impatient">
            <Table.CellLink description="don't bother him!" to="#">
              raph@sewers.nyc
            </Table.CellLink>
          </Tooltip>
          <Table.CellText content="Sai" />
          <Table.CellNumber content="14" />
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit raph" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

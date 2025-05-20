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
import { ButtonIcon, IconEdit, Table, TableType } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Echoes/Table',
  parameters: {
    controls: { exclude: ['children'] },
  },
  argTypes: {
    type: { control: { type: 'select' }, options: Object.values(TableType) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  args: {
    ariaLabel: 'Awesome table',
    gridTemplate: 'repeat(3, 1fr) max-content',
    type: TableType.Surface,
  },
  render: (args) => (
    <Table {...args}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Weapon</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell aria-label="actions" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Michelangelo</Table.RowHeaderCell>
          <Table.Cell>mikey@sewers.nyc</Table.Cell>
          <Table.Cell>Nunchaku</Table.Cell>
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit mike" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Leonardo</Table.RowHeaderCell>
          <Table.Cell>leo@sewers.nyc</Table.Cell>
          <Table.Cell>Katana</Table.Cell>
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit leo" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Donatello</Table.RowHeaderCell>
          <Table.Cell>donnie@sewers.nyc</Table.Cell>
          <Table.Cell>Bo</Table.Cell>
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit donnie" />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Raphael</Table.RowHeaderCell>
          <Table.Cell>raph@sewers.nyc</Table.Cell>
          <Table.Cell>Sai</Table.Cell>
          <Table.Cell>
            <ButtonIcon Icon={IconEdit} ariaLabel="edit raph" />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

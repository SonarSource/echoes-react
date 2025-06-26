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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeSeverity, BadgeSeverityLevel, DropdownMenu } from '../../src';
import { iconsComponentsArgType } from '../helpers/arg-types';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const { mapping, options = [] } = iconsComponentsArgType;

const meta: Meta<typeof BadgeSeverity> = {
  component: BadgeSeverity,
  decorators: [basicWrapperDecorator],

  parameters: {
    controls: { exclude: ['className'] },
  },

  argTypes: {
    IconLeft: {
      mapping: { ...mapping, none: undefined },
      options: [...options, 'none'],
    },
    severity: { options: Object.values(BadgeSeverityLevel) },
  },

  title: 'Echoes/Badges/BadgeSeverity',
};

export default meta;

type Story = StoryObj<typeof BadgeSeverity>;

export const Default: Story = {
  args: {
    ariaLabel: 'Click to open severity dropdown',
    quality: 'Maintainability',
    severity: 'high',
  },
  render: (args) => (
    <DropdownMenu
      items={
        <>
          <DropdownMenu.ItemButton>Blocker</DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton>High</DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton>Medium</DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton>Low</DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton>Info</DropdownMenu.ItemButton>
        </>
      }>
      <BadgeSeverity {...args} />
    </DropdownMenu>
  ),
};

export const Disabled: Story = {
  args: {
    ariaLabel: 'Disabled severity badge',
    quality: 'Maintainability',
    severity: 'medium',
    isDisabled: true,
  },
};


export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'start' }}>
      <BadgeSeverity ariaLabel="Blocker severity" quality="Security" severity="blocker" />
      <BadgeSeverity ariaLabel="High severity" quality="Reliability" severity="high" />
      <BadgeSeverity ariaLabel="Medium severity" quality="Maintainability" severity="medium" />
      <BadgeSeverity ariaLabel="Low severity" quality="Security" severity="low" />
      <BadgeSeverity ariaLabel="Info severity" quality="Reliability" severity="info" />
    </div>
  ),
};

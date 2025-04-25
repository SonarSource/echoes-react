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
import { Badge } from '../../src';
import { iconsComponentsArgType } from '../helpers/arg-types';
import { BasicWrapper } from '../helpers/BasicWrapper';

const { mapping, options = [] } = iconsComponentsArgType;

const meta: Meta<typeof Badge> = {
  component: Badge,

  parameters: {
    controls: { exclude: ['className'] },
  },

  argTypes: {
    IconLeft: {
      mapping: { ...mapping, none: undefined },
      options: [...options, 'none'],
    },
  },

  title: 'Echoes/Badges/Badge',
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge!',
    variety: 'neutral',
  },
  render: (args) => (
    <BasicWrapper>
      <Badge {...args} />
    </BasicWrapper>
  ),
};

/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { Select } from '../src';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};

export default meta;

type Story = StoryObj<typeof Select>;

const data = [
  { value: '1', label: 'cheese' },
  { value: '2', label: 'bread' },
  { value: '3', label: 'salad' },
  { value: '4', label: 'no' },
];

export const Default: Story = {
  args: {
    data,
    isSearchable: true,
  },
};
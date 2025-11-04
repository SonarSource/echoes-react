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
import { RatingBadgeLink, RatingBadgeRating } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof RatingBadgeLink> = {
  component: RatingBadgeLink,
  decorators: [basicWrapperDecorator],

  parameters: {
    controls: { exclude: ['className'] },
  },

  title: 'Echoes/Badges/RatingBadgeLink',
};

export default meta;

type Story = StoryObj<typeof RatingBadgeLink>;

export const Default: Story = {
  args: {
    rating: RatingBadgeRating.C,
    style: { marginRight: '6px' },
    to: 'a better place',
  },
  render: (args) => (
    <span>
      <RatingBadgeLink {...args} />
      Some text next to the rating badge
    </span>
  ),
};

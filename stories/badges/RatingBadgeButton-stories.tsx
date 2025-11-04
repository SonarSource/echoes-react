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
import { RatingBadgeButton, RatingBadgeRating, RatingBadgeSize } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof RatingBadgeButton> = {
  component: RatingBadgeButton,
  decorators: [basicWrapperDecorator],

  argTypes: {
    rating: { control: { type: 'select' }, options: Object.values(RatingBadgeRating) },

    size: {
      control: { type: 'radio' },
      options: Object.values(RatingBadgeSize),
    },
  },

  title: 'Echoes/Badges/RatingBadgeButton',
};

export default meta;

type Story = StoryObj<typeof RatingBadgeButton>;

export const Default: Story = {
  args: {
    // eslint-disable-next-line no-alert
    onClick: () => alert('button pressed!'),
    rating: RatingBadgeRating.E,
  },
  render: (args) => (
    <span>
      <RatingBadgeButton {...args} style={{ marginRight: '6px' }} />
      Some text next to the rating badge
    </span>
  ),
};

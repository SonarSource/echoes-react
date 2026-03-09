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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndicatorSize } from '../../src/components/indicators';
import { IndicatorCoverage } from '../../src/components/indicators/IndicatorCoverage';
import { IndicatorCoverageRating } from '../../src/components/indicators/indicatorUtils';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof IndicatorCoverage> = {
  component: IndicatorCoverage,
  title: 'Echoes/indicators/Coverage',
  decorators: [basicWrapperDecorator],
  argTypes: {
    rating: {
      control: { type: 'select' },
      options: [
        undefined,
        IndicatorCoverageRating.A,
        IndicatorCoverageRating.B,
        IndicatorCoverageRating.C,
        IndicatorCoverageRating.D,
        IndicatorCoverageRating.E,
        IndicatorCoverageRating.F,
        IndicatorCoverageRating.G,
        IndicatorCoverageRating.H,
      ],
    },
    size: {
      control: { type: 'select' },
      options: [IndicatorSize.Small, IndicatorSize.Medium, IndicatorSize.Large],
    },
  },
};

export default meta;

type Story = StoryObj<typeof IndicatorCoverage>;

export const Default: Story = {
  args: {
    rating: 'A',
  },
};

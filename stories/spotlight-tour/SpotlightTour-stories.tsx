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
import { LinkStandalone, SpotlightTour } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { FishtankIllustration } from '../helpers/FishtankIllustration';

const meta: Meta<typeof SpotlightTour> = {
  args: {
    cardHeaderText: 'We encourage everyone to contribute',
    image: <FishtankIllustration />,
    helperText: '1 of 3',
  },

  component: SpotlightTour,
  decorators: [basicWrapperDecorator],

  parameters: {
    controls: {
      exclude: ['actions', 'image', 'onDismiss'],
    },
  },

  title: 'Echoes/SpotlightTour',
};

export default meta;
type Story = StoryObj<typeof SpotlightTour>;

export const Default: Story = {
  render: (args) => (
    <SpotlightTour
      {...args}
      cardBodyText={
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean.{' '}
          <LinkStandalone to="">Learn more</LinkStandalone>.
        </>
      }
    />
  ),
};

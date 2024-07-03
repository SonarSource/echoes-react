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
import { IconLink, LinkHighlight, LinkStandalone as LinkStandaloneComp } from '../src';

const meta: Meta<typeof LinkStandaloneComp> = {
  component: LinkStandaloneComp,
  title: 'Echoes/Link/LinkStandalone',
  argTypes: {
    highlight: {
      control: {
        type: 'select',
      },
      options: Object.values(LinkHighlight),
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkStandaloneComp>;

export const LinkStandalone: Story = {
  args: {
    children: 'Standalone Link',
    highlight: undefined,
    to: '/projects/new',
  },
};

export const LinkStandaloneWithIcon: Story = {
  args: {
    children: 'Standalone Link With Icon',
    highlight: LinkHighlight.Default,
    to: '/projects/new',
    iconLeft: <IconLink />,
  },
};

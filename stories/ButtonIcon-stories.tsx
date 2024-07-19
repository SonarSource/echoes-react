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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSize, ButtonVariety, IconClock, TooltipAlign, TooltipSide } from '../src';
import { ButtonIcon } from '../src/components/buttons/ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  component: ButtonIcon,
  title: 'Echoes/ButtonIcon',
  argTypes: {
    size: { options: Object.values(ButtonSize) },
    variety: { options: Object.values(ButtonVariety) },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    'aria-label': 'click the clock',
    onClick: () => console.log('it is now o`clock'),
    tooltipContent: 'Click to log the time',
    tooltipOptions: {
      align: TooltipAlign.Center,
      side: TooltipSide.Right,
    },
  },
  render: (args) => {
    return <ButtonIcon {...args} Icon={IconClock} />;
  },
};

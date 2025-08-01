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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonSize, ButtonVariety, TooltipAlign, TooltipSide } from '../src';
import { ButtonAsLinkVariety } from '../src/components/buttons/ButtonAsLink';
import { ButtonIcon, ButtonIconAsButtonProps } from '../src/components/buttons/ButtonIcon';
import { IconClock, IconInfo, IconLink, IconStar } from '../src/components/icons';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { iconsComponentsArgType } from './helpers/arg-types';

const meta: Meta<typeof ButtonIcon> = {
  component: ButtonIcon,
  title: 'Echoes/ButtonIcon',
  argTypes: {
    Icon: iconsComponentsArgType,
    size: { options: Object.values(ButtonSize) },
    variety: { options: Object.values(ButtonVariety) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    ariaLabel: 'click the clock',
    onClick: () => console.log('it is now o`clock'),
    Icon: IconClock,
  },
};

export const Loading: Story = {
  args: {
    ariaLabel: 'loading',
    onClick: () => console.log('it is loading o`clock'),
    Icon: IconClock,
    isLoading: true,
  },
};

export const FillableIcon: Story = {
  args: {
    ariaLabel: 'click star',
    onClick: () => console.log('it is filled'),
    tooltipContent: 'star',
    tooltipOptions: {
      align: TooltipAlign.Center,
      side: TooltipSide.Right,
    },
    Icon: IconStar,
    isIconFilled: true,
  },
};

export const TooltipDetails: Story = {
  args: {
    ariaLabel: 'click star',
    onClick: () => console.log('info'),
    tooltipContent: 'This is more info to understand the button',
    tooltipOptions: {
      align: TooltipAlign.Center,
      side: TooltipSide.Top,
      isOpen: true,
    },
    Icon: IconInfo,
  },
};

export const AllVarieties: Story = {
  args: {
    ariaLabel: 'click',
    tooltipOptions: {
      align: TooltipAlign.Center,
      side: TooltipSide.Right,
    },
    Icon: IconClock,
    onClick: () => console.log('Button clicked'),
  },
  render: (args: ButtonIconAsButtonProps) => (
    <>
      {Object.values(ButtonVariety).map((variety) => (
        <ButtonIcon key={variety} {...args} variety={variety} />
      ))}
    </>
  ),
};

export const AsALink: Story = {
  args: {
    ariaLabel: 'click',
    to: 'https://example.com',
    enableOpenInNewTab: true,
    Icon: IconLink,
  },
  argTypes: {
    variety: { control: { type: 'select' }, options: Object.values(ButtonAsLinkVariety) },
  },
};

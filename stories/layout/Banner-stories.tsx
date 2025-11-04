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
import { useState } from 'react';
import { BannerProps, BannerVariety, Button, Layout, Link } from '../../src';
import { toDisabledControlArgType, toTextControlArgTypes } from '../helpers/arg-types';
import { BasicWrapper } from '../helpers/BasicWrapper';
import { minWidthBodyDecorator } from '../helpers/decorators';

const meta: Meta<typeof Layout.Banner> = {
  component: Layout.Banner,
  title: 'Echoes/Layout/Banner',

  argTypes: {
    variety: { control: { type: 'select' }, options: Object.values(BannerVariety) },
    ...toTextControlArgTypes('children', 'className', 'screenReaderPrefix'),
    ...toDisabledControlArgType('onDismiss'),
  },

  parameters: {
    layout: 'fullscreen',
  },

  decorators: [minWidthBodyDecorator],
};

export default meta;

type Story = StoryObj<typeof Layout.Banner>;

export const Default: Story = {
  args: {
    children: 'My banner message',
    onDismiss: undefined,
    variety: 'warning',
  },
};

export const WithDismiss: Story = {
  args: {
    children: (
      <>
        My banner message <Link to="#">link</Link>
      </>
    ),
    variety: 'info',
  },
  render: (args) => <BannerWithDismiss {...args} />,
};

function BannerWithDismiss(args: Readonly<BannerProps>) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <BasicWrapper>
        <Button
          onClick={() => {
            setDismissed(false);
          }}>
          Show banner
        </Button>
      </BasicWrapper>
    );
  }

  return (
    <Layout.Banner
      {...args}
      onDismiss={() => {
        setDismissed(true);
      }}
    />
  );
}

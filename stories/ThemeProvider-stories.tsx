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
import type { ComponentProps } from 'react';
import { Text, Theme, ThemeProvider } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

function Background({ children, style }: ComponentProps<'div'>) {
  return (
    <div style={{ backgroundColor: 'var(--echoes-color-background-neutral)', ...style }}>
      {children}
    </div>
  );
}

const meta: Meta<typeof ThemeProvider> = {
  component: ThemeProvider,
  title: 'Echoes/ThemeProvider',
  argTypes: {
    asChild: { control: { type: 'boolean' } },
    theme: { control: { type: 'select' }, options: Object.values(Theme) },
  },
  args: {
    asChild: false,
    theme: Theme.light,
  },
  decorators: [basicWrapperDecorator],
  render: ({ children, ...args }) => (
    <ThemeProvider {...args}>
      <Background style={{ padding: 24 }}>
        <Text>{children}</Text>
      </Background>
    </ThemeProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  args: {
    children: 'My Theme',
  },
};

export const WithDarkTheme: Story = {
  args: {
    children: 'Dark Theme',
    theme: Theme.dark,
  },
};

export const WithNestedTheme: Story = {
  args: {
    children: 'Dark Theme',
    theme: Theme.dark,
  },
  render: ({ children, ...args }) => (
    <ThemeProvider {...args}>
      <Background style={{ padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <Text>{children}</Text>
        </div>
        <ThemeProvider theme={Theme.light}>
          <Background style={{ padding: 24 }}>
            <Text>Light Theme</Text>
          </Background>
        </ThemeProvider>
      </Background>
    </ThemeProvider>
  ),
};

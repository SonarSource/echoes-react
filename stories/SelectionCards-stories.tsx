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
import { Badge, GroupAlignment, IconCheck, SelectionCards } from '../src';
import { FishtankIllustration } from './helpers/FishtankIllustration';

const meta: Meta<typeof SelectionCards> = {
  component: SelectionCards,
  title: 'Echoes/SelectionCards',
  args: {},
};

export default meta;

type Story = StoryObj<typeof SelectionCards>;

export const Basic: Story = {
  args: {
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
    alignment: GroupAlignment.Horizontal,
  },
};

export const Complete: Story = {
  args: {
    ariaLabel: 'Radio Button Group',
    options: [
      { label: 'First option - unselected by default', value: 'a' },
      { label: 'Second option - selected by default', value: 'b' },
      { label: 'Third option is disabled', value: 'c', isDisabled: true },
      {
        ariaLabel: 'Blabla',
        illustration: (
          <div
            style={{
              backgroundColor: '#aee1ff',
              height: 80,
              width: '100%',
              textAlign: 'center',
            }}>
            <FishtankIllustration />
          </div>
        ),
        label: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}>
            <IconCheck />
            <span>This is a complicated Selection Card that has an illustration</span>
            <Badge variety="highlight">Fancy</Badge>
          </div>
        ),
        value: 'd',
      },
      { helpText: 'This is a help text', label: 'Fifth option with help text', value: 'e' },
      {
        isDisabled: true,
        helpText: <span>This is another help text</span>,
        label: 'Six option: disabled with help text',
        value: 'f',
      },
    ],
  },
};

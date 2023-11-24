/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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

import { ExampleComponent } from '@sonarsource/echoes-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ExampleComponent> = {
  component: ExampleComponent,
};

export default meta;

type Story = StoryObj<typeof ExampleComponent>;

export const Primary: Story = {
  render: () => <ExampleComponent a={1} b c="test" />,
};

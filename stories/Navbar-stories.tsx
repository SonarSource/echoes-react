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

import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonVariety,
  IconQuestionMark,
  IconSearch,
  LogoSonarQubeCloud,
  Navbar,
  NavbarLeft,
  NavbarRight,
} from '../src';

const meta: Meta<typeof Navbar> = {
  title: 'Echoes/Navbar',
  component: Navbar,
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: (args) => (
    <Navbar {...args}>
      <NavbarLeft>
        <LogoSonarQubeCloud hasText />
        <div style={{ paddingLeft: '30px' }} />
        <nav>Nav menu will go here</nav>
      </NavbarLeft>
      <NavbarRight>
        <ButtonGroup>
          <ButtonIcon
            Icon={IconQuestionMark}
            ariaLabel="Help"
            isIconFilled
            variety="default-ghost"
          />
          <ButtonIcon Icon={IconSearch} ariaLabel="Search" variety={ButtonVariety.DefaultGhost} />
          <Button variety="primary">Start free trial</Button>
          <Button variety="default">Login</Button>
        </ButtonGroup>
      </NavbarRight>
    </Navbar>
  ),
};

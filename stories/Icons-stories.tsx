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

import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react';
import * as icons from '../src/components/icons';

const meta = {
  title: 'Icons',
} satisfies Meta;

export default meta;

function renderIcons() {
  return Object.values(icons)
    .filter((icon) => !['IconWrapper'].includes(icon.name))
    .map((Icon) => {
      return (
        <>
          <IconTile key={Icon.name}>
            <Icon />
            <span>{(Icon as React.FC).displayName}</span>
          </IconTile>

          {['IconHome', 'IconStar'].includes(Icon.name) && (
            <IconTile key={`${Icon.name} isFilled`}>
              <Icon isFilled />
              <span>{(Icon as React.FC).displayName} isFilled</span>
            </IconTile>
          )}
        </>
      );
    });
}

export const Grid: StoryObj<{ fontSize: number }> = {
  args: {
    fontSize: 20,
  },
  argTypes: {
    fontSize: {
      name: 'Font size',
      description: 'Change the contextual font size the icons will adapt to',
      type: 'number',
      options: [16, 20, 24],
      control: { type: 'select' },
    },
  },
  render: (args) => <GridWrapper fontSize={args.fontSize}>{renderIcons()}</GridWrapper>,
};

const GridWrapper = styled.div<{ fontSize: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 1rem;

  span {
    font-size: ${(props) => props.fontSize}px;
  }
`;

const IconTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 0;
  border: 1px solid lightgrey;
  border-radius: 8px;

  & span {
    margin-top: 8px;
  }
`;

export const AutoSizing: StoryObj = {
  render: () => (
    <div>
      <p style={{ fontSize: '20px', lineHeight: `${(20 * 20) / 14}px` }}>
        <icons.IconMegaphone /> Warning warning!
      </p>
      <p style={{ fontSize: '16px', lineHeight: `${(16 * 20) / 14}px` }}>
        <icons.IconMegaphone /> Warning warning!
      </p>
      <p style={{ color: 'magenta', fontSize: '16px', lineHeight: `${(16 * 20) / 14}px` }}>
        <icons.IconPin /> Pinned!
      </p>
      <p style={{ fontSize: '14px', lineHeight: `${(14 * 20) / 14}px` }}>
        This is pretty cool <icons.IconTarget />, innit?
      </p>
      <p style={{ fontSize: '12px', lineHeight: `${(12 * 20) / 14}px` }}>
        Tiny <icons.IconMegaphone /> text
      </p>
    </div>
  ),
};

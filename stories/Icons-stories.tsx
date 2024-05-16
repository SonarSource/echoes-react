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
import { useMemo, useState } from 'react';
import { DesignTokensColors } from '~types/design-tokens';
import * as icons from '../src/components/icons';

const meta: Meta = {
  title: 'Icons',
};

export default meta;

function renderIcons(regexp?: RegExp) {
  return Object.values(icons)
    .filter((icon) => !['IconWrapper'].includes(icon.name))
    .filter((icon) => !regexp || regexp.exec(icon.name) !== null)
    .map((Icon) => (
      <>
        <IconTile key={Icon.name}>
          <Icon />
          <IconName>{(Icon as React.FC).displayName}</IconName>
        </IconTile>

        {['IconDot', 'IconHome', 'IconStar'].includes((Icon as React.FC).displayName ?? '') && (
          <IconTile key={`${Icon.name} isFilled`}>
            <Icon isFilled />
            <IconName>{(Icon as React.FC).displayName} isFilled</IconName>
          </IconTile>
        )}
      </>
    ));
}

function FilterWrapper({ args }: { args: StoryArgs }) {
  const [filterQuery, setFilterQuery] = useState('');

  const regexp = useMemo(
    () => (filterQuery.length > 0 ? new RegExp(filterQuery, 'i') : undefined),
    [filterQuery],
  );

  return (
    <>
      <div>
        Filter by name:{' '}
        <input onChange={(e) => setFilterQuery(e.target.value)} type="text" value={filterQuery} />
      </div>
      <GridWrapper color={args.fontColor} fontSize={args.fontSize}>
        {renderIcons(regexp)}
      </GridWrapper>
    </>
  );
}

interface StoryArgs {
  fontSize: number;
  fontColor: DesignTokensColors;
}

export const Grid: StoryObj<StoryArgs> = {
  args: {
    fontColor: 'echoes-color-text-default',
    fontSize: 16,
  },
  argTypes: {
    fontSize: {
      name: 'Font size',
      description: 'Change the contextual font size the icons will adapt to',
      type: 'number',
      options: [12, 14, 16, 20],
      control: { type: 'select' },
    },
    fontColor: {
      name: 'color',
      description: 'Change the contextual color the icons will adapt to',
      type: 'string',
      options: ['echoes-color-text-subdued', 'echoes-color-text-default', 'echoes-color-text-bold'],
      control: { type: 'select' },
    },
  },
  render: (args) => <FilterWrapper args={args} />,
};

const IconName = styled.label`
  font-size: 14px;
`;

const GridWrapper = styled.div<{ fontSize: number; color: DesignTokensColors }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 1rem;

  span {
    color: ${(props) => `var(--${props.color})`};
    font-size: ${(props) => props.fontSize}px;
  }
`;

const IconTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  padding: 24px 0 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
`;

export const AutoSizing: StoryObj = {
  render: () => (
    <div>
      <p style={{ fontSize: '16px', lineHeight: '24px' }}>
        <icons.IconMegaphone /> Warning warning!
      </p>
      <p style={{ color: 'magenta', fontSize: '16px', lineHeight: '24px' }}>
        <icons.IconPin /> Pinned!
      </p>
      <p style={{ fontSize: '14px', lineHeight: '20px' }}>
        This is pretty cool <icons.IconTarget />, innit?
      </p>
      <p style={{ fontSize: '12px', lineHeight: '16px' }}>
        Tiny <icons.IconMegaphone /> text
      </p>
    </div>
  ),
};

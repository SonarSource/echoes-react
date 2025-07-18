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

import styled from '@emotion/styled';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { DesignTokensColors, DesignTokensColorsIcons } from '~types/design-tokens';
import { cssVar, Text, TextSize } from '../src';
import * as icons from '../src/components/icons';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta = {
  title: 'Echoes/Icons',
};

export default meta;

function renderIcons(regexp?: RegExp) {
  return Object.values(icons)
    .filter((icon) => !regexp || regexp.exec((icon as React.FC).displayName ?? '') !== null)
    .map((Icon) => (
      <>
        <IconTile key={(Icon as React.FC).displayName}>
          <Icon />
          <IconName>{(Icon as React.FC).displayName}</IconName>
        </IconTile>

        {['IconDot', 'IconHome', 'IconRecommended', 'IconStar'].includes(
          (Icon as React.FC).displayName ?? '',
        ) && (
          <IconTile key={`${(Icon as React.FC).displayName}} isFilled`}>
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

export const IconLogo: StoryObj<IconLogoStoryArgs> = {
  argTypes: {
    Icon: {
      control: { type: 'radio' },
      options: ['SonarQubeCloud', 'SonarQubeCommunity', 'SonarQubeIde', 'SonarQubeServer'],
      mapping: {
        SonarQubeCloud: icons.IconLogoSonarQubeCloud,
        SonarQubeCommunity: icons.IconLogoSonarQubeCommunity,
        SonarQubeIde: icons.IconLogoSonarQubeIde,
        SonarQubeServer: icons.IconLogoSonarQubeServer,
      },
    },
    color: {
      control: { type: 'select' },
      options: [undefined, 'echoes-logos-colors-brand'],
    },
    size: {
      control: { type: 'select' },
      options: Object.values(TextSize),
    },
  },
  args: {
    Icon: icons.IconLogoSonarQubeCloud,
    text: 'This is some text',
    size: TextSize.Default,
  },
  decorators: [basicWrapperDecorator],
  render: ({ color, size, text, Icon }) => (
    <div>
      <Text size={size}>
        <Icon color={color} /> {text}
      </Text>
    </div>
  ),
};

export const Grid: StoryObj<StoryArgs> = {
  args: {
    fontColor: 'echoes-color-text-default',
    fontSize: 20,
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
      options: [
        'echoes-color-text-subtle',
        'echoes-color-text-default',
        'echoes-color-text-strong',
      ],
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
      <p style={{ font: cssVar('typography-text-large-regular') }}>
        <icons.IconMegaphone /> Warning warning!
      </p>
      <p style={{ color: 'magenta', font: cssVar('typography-text-large-regular') }}>
        <icons.IconPin /> Pinned!
      </p>
      <p style={{ font: cssVar('typography-text-default-regular') }}>
        This is pretty cool <icons.IconTarget />, innit?
      </p>
      <p style={{ font: cssVar('typography-text-small-medium') }}>
        Tiny <icons.IconMegaphone /> text
      </p>
    </div>
  ),
};

interface IconLogoStoryArgs {
  Icon: React.ForwardRefExoticComponent<icons.IconProps & React.RefAttributes<HTMLSpanElement>>;
  color: DesignTokensColorsIcons;
  text: string;
  size: TextSize;
}

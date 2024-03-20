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
import {
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconCollapse,
  IconDash,
  IconDirectory,
  IconExpand,
  IconFile,
  IconLock,
  IconMegaphone,
  IconPin,
  IconProject,
  IconRecommended,
  IconSearch,
  IconTarget,
  IconX,
} from '../src';

const meta = {
  title: 'Icons',
} satisfies Meta;

export default meta;

export const Display: StoryObj = {
  render: () => (
    <>
      16px
      <SmallIconsDiv>
        <IconMegaphone />
        <IconDash />
        <IconCollapse />
        <IconExpand />
        <IconLock />
        <IconTarget />
        <IconRecommended />
        <IconPin />
        <IconChevronDown />
        <IconCalendar />
        <IconFile />
        <IconProject />
        <IconDirectory />
        <IconClock />
        <IconSearch />
        <IconX />
      </SmallIconsDiv>
      20px
      <MediumIconsDiv>
        <IconMegaphone />
        <IconDash />
        <IconCollapse />
        <IconExpand />
        <IconLock />
        <IconTarget />
        <IconRecommended />
        <IconPin />
        <IconChevronDown />
        <IconCalendar />
        <IconFile />
        <IconProject />
        <IconDirectory />
        <IconClock />
        <IconSearch />
        <IconX />
      </MediumIconsDiv>
      24px
      <LargeIconsDiv>
        <IconMegaphone />
        <IconDash />
        <IconCollapse />
        <IconExpand />
        <IconLock />
        <IconTarget />
        <IconRecommended />
        <IconPin />
        <IconChevronDown />
        <IconCalendar />
        <IconFile />
        <IconProject />
        <IconDirectory />
        <IconClock />
        <IconSearch />
        <IconX />
      </LargeIconsDiv>
    </>
  ),
};

const SmallIconsDiv = styled.div`
  display: flex;
  gap: 16px;
  margin: 1rem;

  span {
    font-size: 16px;
  }
`;

const MediumIconsDiv = styled(SmallIconsDiv)`
  gap: 12px;

  span {
    font-size: 20px;
  }
`;

const LargeIconsDiv = styled(SmallIconsDiv)`
  gap: 8px;

  span {
    font-size: 24px;
  }
`;

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
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  LogoSize,
  LogoSonar,
  LogoSonarQubeCloud,
  LogoSonarQubeCommunity,
  LogoSonarQubeIde,
  LogoSonarQubeServer,
} from '../src/components/logos';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta = {
  title: 'Echoes/Logos',
  decorators: [basicWrapperDecorator],
  argTypes: {
    hasText: {
      control: 'boolean',
    },
    size: {
      control: { type: 'select' },
      options: [LogoSize.Small, LogoSize.Medium, LogoSize.Large],
    },
  },
  args: {
    hasText: true,
    region: 'US',
  },
};

export default meta;

interface StoryArgs {
  hasText?: boolean;
  region?: string;
}

export const SonarQubeLogos: StoryObj<StoryArgs> = {
  render: (args) => {
    const { region, ...rest } = args;

    return (
      <Wrapper>
        <LogoSonar {...rest} />

        <LogoSonarQubeCloud {...args} />

        <LogoSonarQubeCommunity {...rest} />

        <LogoSonarQubeIde {...rest} />

        <LogoSonarQubeServer {...rest} />
      </Wrapper>
    );
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 1rem;
  align-items: start;
  width: 210px;
`;

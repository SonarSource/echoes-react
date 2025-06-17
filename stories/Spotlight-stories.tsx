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
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spotlight, SpotlightModalPlacement } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { FishtankIllustration } from './helpers/FishtankIllustration';
import { toDisabledControlArgType } from './helpers/arg-types';

const meta: Meta<typeof Spotlight> = {
  argTypes: {
    ...toDisabledControlArgType('activeTargetClassName', 'callback', 'image', 'steps', 'callback'),
  },
  component: Spotlight,
  decorators: [basicWrapperDecorator],
  title: 'Echoes/Spotlight',
};

export default meta;

type Story = StoryObj<typeof Spotlight>;

export const Default: Story = {
  args: {
    closeLabel: 'Custom close label',
    image: (
      <span
        style={{
          backgroundColor: 'oldlace',
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
          width: '100%',
        }}>
        <FishtankIllustration />
      </span>
    ),
    steps: [
      {
        bodyText: "The first step's description",
        headerText: 'First step',
        placement: SpotlightModalPlacement.Left,
        target: '#step1',
      },
      {
        bodyText: "The second step's description",
        headerText: 'Second step',
        placement: SpotlightModalPlacement.Top,
        target: '#step2',
      },
      {
        bodyText: "The third step's description",
        headerText: 'Third step',
        placement: SpotlightModalPlacement.Right,
        target: '#step3',
      },
      {
        bodyText: "The fourth step's description",
        headerText: 'Fourth step',
        placement: SpotlightModalPlacement.Bottom,
        target: '#step4',
      },
      {
        bodyText: "The fifth step's description",
        headerText: 'Fifth and final step',
        placement: SpotlightModalPlacement.Center,
        target: '#step5',
      },
    ],
  },
  render: (args) => (
    <>
      <p id="step1" style={{ marginTop: '200px' }}>
        Step 1 target
      </p>

      <StyledP id="step2">Step 2 target with active class</StyledP>

      <p id="step3">Step 3 target</p>

      <p id="step4">Step 4 target</p>

      <p id="step5">Step 5 target</p>

      <Spotlight {...args} />
    </>
  ),
};

const StyledP = styled.p`
  &.active {
    border: 3px solid red;
    padding: 4px;
  }
`;

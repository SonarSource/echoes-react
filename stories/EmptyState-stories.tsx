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
import styled from '@emotion/styled';
import {
  Button,
  ButtonVariety,
  EmptyState,
  EmptyStateProps,
  IconActivity,
  IconInfo,
  IconWarning,
  LinkStandalone,
} from '../src';
import { cssVar } from '../src/utils/design-tokens';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof EmptyState> = {
  args: {
    graphic: <IconActivity />,
    heading: 'No versions have been released yet',
    text: 'Versions will appear here once the first release is available for this project.',
  },
  component: EmptyState,
  decorators: [basicWrapperDecorator],
  parameters: {
    controls: {
      exclude: ['graphic', 'action', 'link'],
    },
  },
  title: 'Echoes Components/EmptyState',
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

function render(props: Readonly<EmptyStateProps>) {
  return (
    <StoryWrapper>
      <EmptyState {...props} />
    </StoryWrapper>
  );
}

export const Default: Story = {
  render,
};

export const WithAction: Story = {
  args: {
    action: <Button variety={ButtonVariety.Primary}>Read documentation</Button>,
  },
  render,
};

export const WithActionAndLink: Story = {
  args: {
    action: <Button variety={ButtonVariety.Primary}>Read documentation</Button>,
    link: (
      <LinkStandalone enableOpenInNewTab to="https://www.sonarsource.com">
        Learn more about releases
      </LinkStandalone>
    ),
  },
  render,
};

export const WithDifferentGraphics: Story = {
  args: {
    graphic: <IconWarning />,
  },
  render,
};

export const LongTextWrapping: Story = {
  args: {
    action: <Button variety={ButtonVariety.Primary}>Configure releases</Button>,
    graphic: <IconInfo />,
    text: 'Release history will appear here once your team starts publishing versions. Until then, you can configure your release workflow and review how version-based quality gate history will be presented to project members.',
  },
  render,
};

const StoryWrapper = styled.div`
  width: ${cssVar('dimension-width-5000')};
  padding: ${cssVar('dimension-space-400')};
`;

StoryWrapper.displayName = 'StoryWrapper';

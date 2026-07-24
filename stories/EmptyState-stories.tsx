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
  Card,
  EmptyState,
  EmptyStateProps,
  HeadingSize,
  IconActivity,
  IconInfo,
  LinkStandalone,
} from '../src';
import { cssVar } from '../src/utils/design-tokens';
import { iconsElementsArgType, toTextControlArgTypes } from './helpers/arg-types';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof EmptyState> = {
  args: {
    title: 'No versions have been released yet',
    text: 'Versions will appear here once the first release is available for this project.',
    graphic: <IconActivity />,
    titleAs: 'h2',
    titleSize: HeadingSize.Large,
  },
  argTypes: {
    ...toTextControlArgTypes<EmptyStateProps>('title', 'text'),
    graphic: {
      ...iconsElementsArgType,
      control: { type: 'select' },
    },
    titleAs: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
    },
    titleSize: {
      control: { type: 'select' },
      options: Object.values(HeadingSize),
    },
  },
  component: EmptyState,
  decorators: [basicWrapperDecorator],
  parameters: {
    controls: {
      exclude: ['action', 'link'],
    },
  },
  title: 'Echoes Components/EmptyState',
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

const imageGraphicSrc =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22%3E%3Crect x=%223%22 y=%225%22 width=%2218%22 height=%2214%22 rx=%222%22 fill=%22%23F3F4F6%22/%3E%3Cpath d=%22M7 15l3-3 2.5 2.5 2-2L18 16H7z%22 fill=%22%236B7280%22/%3E%3Ccircle cx=%229%22 cy=%229%22 r=%221.5%22 fill=%22%236B7280%22/%3E%3C/svg%3E';

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

export const WithLink: Story = {
  args: {
    link: (
      <LinkStandalone enableOpenInNewTab to="https://www.sonarsource.com">
        Learn more about releases
      </LinkStandalone>
    ),
  },
  render,
};

export const WithImageGraphic: Story = {
  args: {
    graphic: <img alt="" src={imageGraphicSrc} />,
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

export const LongTextWrapping: Story = {
  args: {
    action: <Button variety={ButtonVariety.Primary}>Configure releases</Button>,
    graphic: <IconInfo />,
    text: 'Release history will appear here once your team starts publishing versions. Until then, you can configure your release workflow and review how version-based quality gate history will be presented to project members.',
  },
  render,
};

export const InCard: Story = {
  render: (props) => (
    <StoryWrapper>
      <Card>
        <CardBodyWrapper>
          <EmptyState {...props} />
        </CardBodyWrapper>
      </Card>
    </StoryWrapper>
  ),
};

const StoryWrapper = styled.div`
  padding: ${cssVar('dimension-space-400')};
`;

StoryWrapper.displayName = 'StoryWrapper';

const CardBodyWrapper = styled(Card.Body)`
  display: flex;
  justify-content: center;
`;

CardBodyWrapper.displayName = 'CardBodyWrapper';

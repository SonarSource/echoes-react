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

import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactElement } from 'react';
import { Card, Pagination, RatingBadge } from '../src/components';
import { LoadingSkeleton, LoadingSkeletonVariety } from '../src/components/loading-skeleton';
import { Heading, Label, Text, TextSize } from '../src/components/typography';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof LoadingSkeleton> = {
  component: LoadingSkeleton,
  title: 'Echoes/LoadingSkeleton',
  argTypes: {},
  decorators: [basicWrapperDecorator],
  parameters: {
    controls: { exclude: ['children'] },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSkeleton>;

export const Default: Story = {
  args: {
    children: <div style={{ height: '100px', width: '100px' }} />,
    isLoading: true,
    variety: LoadingSkeletonVariety.Text,
  },
};

interface WithinTextStoryArgs {
  isLoading: boolean;
  size: TextSize;
  variety: LoadingSkeletonVariety.Text | LoadingSkeletonVariety.Paragraph;
}

export const WithinText: StoryObj<WithinTextStoryArgs> = {
  parameters: {
    controls: { exclude: ['children'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TextSize),
    },
    variety: { options: [LoadingSkeletonVariety.Text, LoadingSkeletonVariety.Paragraph] },
  },
  args: {
    isLoading: true,
    size: TextSize.Default,
    variety: LoadingSkeletonVariety.Text,
  },
  render(args) {
    const { size, ...skeletonArgs } = args;
    return (
      <div style={{ width: '300px' }}>
        <Text size={size}>
          <LoadingSkeleton {...skeletonArgs}>Nostradamus!</LoadingSkeleton>
        </Text>
      </div>
    );
  },
};

export const ShowcaseTextDefaultWidths: StoryObj<WithinTextStoryArgs> = {
  parameters: {
    controls: { exclude: ['children'] },
  },
  render() {
    return (
      <>
        <h2>Text</h2>
        <Text>
          <LoadingSkeleton variety="text">Nostradamus!</LoadingSkeleton>
        </Text>

        <h2>Text in a container</h2>
        <div style={{ border: '1px solid grey', padding: '8px 4px', width: '300px' }}>
          <Text>
            <LoadingSkeleton variety="text">Nostradamus!</LoadingSkeleton>
          </Text>
        </div>

        <h2>Label</h2>
        <Label>
          <LoadingSkeleton variety="text">Nostradamus!</LoadingSkeleton>
        </Label>

        <h2>Heading</h2>
        <Heading as="h3">
          <LoadingSkeleton variety="text">Nostradamus!</LoadingSkeleton>
        </Heading>
      </>
    );
  },
};

interface AsAWrapperStoryArgs {
  children: ReactElement;
  isLoading: boolean;
  height: number;
  width: number;
  variety: LoadingSkeletonVariety.Disk | LoadingSkeletonVariety.Rectangle;
}

export const AsAWrapper: StoryObj<AsAWrapperStoryArgs> = {
  parameters: {
    controls: { exclude: [] },
  },
  argTypes: {
    children: {
      mapping: {
        ratingBadge: <RatingBadge rating="B" />,
        pagination: <Pagination onChange={() => {}} page={1} totalPages={1} />,
      },
      options: ['ratingBadge', 'pagination'],
    },
    variety: { options: [LoadingSkeletonVariety.Disk, LoadingSkeletonVariety.Rectangle] },
  },
  args: {
    children: <RatingBadge rating="B" />,
    isLoading: true,
    variety: LoadingSkeletonVariety.Disk,
  },
  render(args) {
    const { children, ...skeletonArgs } = args;
    return <LoadingSkeleton {...skeletonArgs}>{children}</LoadingSkeleton>;
  },
};

export const InACard: Story = {
  parameters: {
    controls: { include: [] },
  },
  render() {
    return (
      <div>
        <Card>
          <Card.Header hasDivider title="Loading card" />

          <Card.Body>
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <LoadingSkeleton
                  css={css`
                    height: 40px;
                    width: 40px;
                  `}
                  isLoading
                  variety={LoadingSkeletonVariety.Disk}
                />

                <LoadingSkeleton
                  css={css`
                    height: 40px;
                    width: 300px;
                  `}
                  isLoading
                  variety={LoadingSkeletonVariety.Rectangle}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <LoadingSkeleton
                  css={css`
                    height: 100px;
                    width: 200px;
                  `}
                  isLoading
                  variety={LoadingSkeletonVariety.Rectangle}
                />

                <LoadingSkeleton
                  css={css`
                    height: 120px;
                    width: 200px;
                  `}
                  isLoading
                  variety={LoadingSkeletonVariety.Rectangle}
                />
                <LoadingSkeleton
                  css={css`
                    height: 80px;
                    width: 200px;
                  `}
                  isLoading
                  variety={LoadingSkeletonVariety.Rectangle}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  },
};

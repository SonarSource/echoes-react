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
import { Breadcrumbs, IconStar, IconTriangleUp } from '../src/components';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Echoes/Breadcrumbs',
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const FixedWrapper = styled.div`
  border: 1px dashed purple;
  padding: 4px;
  width: 900px;
`;

const indices = Array.from({ length: 6 }, (_, i) => i);

const leaf = 'Child element (never truncated)';

export const Default: Story = {
  render: () => {
    const crumbs = indices.map((i) => ({
      linkElement: i === indices.length - 1 ? leaf : `Breadcrumb #${i + 1}`,
      to: `https://google.com/search?q=${i + 1}`,
    }));

    return (
      <FixedWrapper>
        <Breadcrumbs items={crumbs} />
      </FixedWrapper>
    );
  },
};

export const LongListThatWraps: Story = {
  render: () => {
    const crumbs = indices.map((i) => ({
      linkElement: i === indices.length - 1 ? leaf : `Long Breadcrumb #${i + 1}`,
      to: `https://google.com/search?q=${i + 1}`,
    }));

    return (
      <FixedWrapper>
        <Breadcrumbs items={crumbs} />
      </FixedWrapper>
    );
  },
};

export const LongLinksWithEllipsis: Story = {
  render: () => {
    const crumbs = indices.map((i) => ({
      hasEllipsis: true,
      linkElement:
        i === indices.length - 1
          ? leaf
          : `Breadcrumb with a name so long that it overflows the max width #${i + 1}`,
      to: `https://google.com/search?q=${i + 1}`,
    }));

    return (
      <FixedWrapper>
        <Breadcrumbs items={crumbs} />
      </FixedWrapper>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    return (
      <FixedWrapper>
        <Breadcrumbs
          items={[
            { iconLeft: <IconTriangleUp />, linkElement: 'Top-level link', to: 'be continued' },
            { linkElement: 'Second-level link', to: 'be or not to be' },
            {
              iconLeft: <IconStar color="echoes-color-icon-danger" isFilled />,
              linkElement: 'My favorite',
            },
          ]}
        />
      </FixedWrapper>
    );
  },
};

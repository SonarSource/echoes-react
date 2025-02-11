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
import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from '../src';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Echoes/Layout',
  argTypes: {},
  parameters: {
    controls: { exclude: ['children', 'asideLeft', 'asideRight'] },
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {},
  render(args) {
    return (
      <VisibleLayout {...args}>
        <VisibleBlock>MAIN</VisibleBlock>
      </VisibleLayout>
    );
  },
};

export const WithRightAside: Story = {
  args: {},
  render(args) {
    return (
      <VisibleLayout {...args} asideRight={<VisibleBlock>RIGHT</VisibleBlock>}>
        <VisibleBlock>
          MAIN with a lot of content that should wrap at some pointMAIN with a lot of content that
          should wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN
          with a lot of content that should wrap at some pointMAIN with a lot of content that should
          wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot
          of content that should wrap at some pointMAIN with a lot of content that should wrap at
          some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot of
          content that should wrap at some pointMAIN with a lot of content that should wrap at some
          pointMAIN with a lot of content that should wrap at some point
        </VisibleBlock>
      </VisibleLayout>
    );
  },
};

export const WithLeftAside: Story = {
  args: {},
  render(args) {
    return (
      <VisibleLayout {...args} asideLeft={<VisibleBlock>LEFT</VisibleBlock>}>
        <VisibleBlock>
          MAIN with a lot of content that should wrap at some pointMAIN with a lot of content that
          should wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN
          with a lot of content that should wrap at some pointMAIN with a lot of content that should
          wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot
          of content that should wrap at some pointMAIN with a lot of content that should wrap at
          some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot of
          content that should wrap at some pointMAIN with a lot of content that should wrap at some
          pointMAIN with a lot of content that should wrap at some point
        </VisibleBlock>
      </VisibleLayout>
    );
  },
};

export const FullExample: Story = {
  args: {},
  render(args) {
    return (
      <VisibleLayout
        {...args}
        asideLeft={<VisibleBlock>LEFT</VisibleBlock>}
        asideRight={<VisibleBlock>RIGHT</VisibleBlock>}>
        <VisibleBlock>
          MAIN with a lot of content that should wrap at some pointMAIN with a lot of content that
          should wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN
          with a lot of content that should wrap at some pointMAIN with a lot of content that should
          wrap at some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot
          of content that should wrap at some pointMAIN with a lot of content that should wrap at
          some pointMAIN with a lot of content that should wrap at some pointMAIN with a lot of
          content that should wrap at some pointMAIN with a lot of content that should wrap at some
          pointMAIN with a lot of content that should wrap at some point
        </VisibleBlock>
      </VisibleLayout>
    );
  },
};

const VisibleLayout = styled(Layout)`
  border: 2px dashed black;
  margin: 24px 0;

  height: 100vh;
`;

const VisibleBlock = styled.div`
  background-color: var(--echoes-color-background-ghost-accent-active);

  height: 100%;
  width: 100%;
`;

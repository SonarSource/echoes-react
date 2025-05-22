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

import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ButtonGroup,
  ButtonVariety,
  LinkStandalone,
  PromotedSection,
  PromotedSectionProps,
  PromotedSectionVariety,
} from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { FishtankIllustration } from './FishtankIllustration';

const meta: Meta<typeof PromotedSection> = {
  argTypes: {
    titleAs: { control: { type: 'select' }, options: ['h1', 'h2', 'h3', 'h4', 'h5'] },
    variety: { control: { type: 'select' }, options: Object.values(PromotedSectionVariety) },
  },

  component: PromotedSection,
  decorators: [basicWrapperDecorator],

  parameters: {
    controls: {
      exclude: ['actions', 'illustration', 'onDismiss'],
    },
  },

  title: 'Echoes/PromotedSection',
};

export default meta;
type Story = StoryObj<typeof PromotedSection>;

const render = (props: Readonly<PromotedSectionProps>) => (
  <div
    style={{
      padding: '40px',
      width: '532px',
    }}>
    <PromotedSection data-key="my-data-key" {...props} />
  </div>
);

const defaultProps: PromotedSectionProps = {
  actions: <Button>Try feature</Button>,
  badgeText: 'New',
  hasBadge: true,
  headerText: 'My feature is available now',
  illustration: <FishtankIllustration />,
  text: 'Learn how you can improve your code base simply by cleaning your new code.',
  titleAs: 'h2',
  variety: PromotedSectionVariety.Neutral,
};

export const Default: Story = {
  args: defaultProps,
  render,
};

export const Highlight: Story = {
  args: {
    ...defaultProps,
    variety: PromotedSectionVariety.Highlight,
  },

  render,
};

export const Dismissable: Story = {
  args: {
    ...defaultProps,
    onDismiss: () => undefined,
  },

  render,
};

export const NoIllustration: Story = {
  args: {
    ...defaultProps,
    illustration: undefined,
  },

  render,
};

export const NoBadge: Story = {
  args: {
    ...defaultProps,
    hasBadge: false,
  },

  render,
};

export const CustomBadgeText: Story = {
  args: {
    ...defaultProps,
    badgeText: 'Beta',
  },

  render,
};

export const NoActions: Story = {
  args: {
    ...defaultProps,
    actions: undefined,
  },

  render,
};

export const LinkAction: Story = {
  args: {
    ...defaultProps,
    actions: <LinkStandalone to="infinity">Learn more</LinkStandalone>,
  },

  render,
};

export const ButtonGroupAction: Story = {
  args: {
    ...defaultProps,
    actions: (
      <ButtonGroup>
        <Button variety={ButtonVariety.Primary}>Primary action</Button>
        <Button>Secondary action</Button>
      </ButtonGroup>
    ),
  },

  render,
};

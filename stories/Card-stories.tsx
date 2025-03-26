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
  ButtonVariety,
  Card,
  CardSize,
  IconStar,
  Label,
  LinkStandalone,
  RatingBadge,
  Text,
  TextSize,
  Tooltip,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

// Define the metadata for your Card component
const meta: Meta<typeof Card> = {
  title: 'Echoes/Card',
  component: Card,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(CardSize),
      defaultValue: CardSize.Medium,
    },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card story using the new composition pattern
export const Default: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <Card.Header description="Awesome description" hasDivider title="Card Title" />
        <Card.Body>
          <Text as="div" className="sw-p-10">
            This is the content of the card.
          </Text>
        </Card.Body>
      </Card>
    </div>
  ),
};

// Card with right content in header
export const WithRightContent: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div>
      <Card {...args}>
        <Card.Header
          description={
            <span>
              <strong>Last analysis: </strong>
              3/21/2025, 3:32 PM
            </span>
          }
          hasDivider
          rightContent={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Button variety={ButtonVariety.Primary}>Action</Button>
            </div>
          }
          title={
            <div style={{ display: 'flex', gap: '4px' }}>
              <Tooltip content="This is a tooltip">
                <IconStar color="echoes-color-icon-info" isFilled />
              </Tooltip>
              <LinkStandalone to="/">Organization</LinkStandalone>
              {'/'}
              <LinkStandalone title="Cool Project" to="/">
                Cool Project
              </LinkStandalone>
            </div>
          }
        />
        <Card.Body>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              width: '100%',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RatingBadge rating="B" size="md" />
                <strong>0</strong>
              </div>
              <Label style={{ fontSize: '0.875rem', marginTop: '8px' }}>Security</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RatingBadge rating="C" size="md" />
                <strong>1</strong>
              </div>
              <Label style={{ fontSize: '0.875rem', marginTop: '8px' }}>Reliability</Label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RatingBadge rating="A" size="md" />
                <strong>100%</strong>
              </div>
              <Label style={{ fontSize: '0.875rem', marginTop: '8px' }}>Maintainability</Label>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  ),
};

const textSizeMap = {
  [CardSize.Small]: TextSize.Small,
  [CardSize.Medium]: TextSize.Default,
  [CardSize.Large]: TextSize.Large,
};

// Showcase different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      {Object.values(CardSize).map((size) => (
        <Card key={size} size={size}>
          <Card.Header
            description={`Description for the ${size} card`}
            hasDivider
            size={size}
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Card`}
          />
          <Card.Body>
            <Text as="div" className="sw-p-10" size={textSizeMap[size]}>
              Content for the {size} card.
            </Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};

// Card without description
export const NoDescription: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <Card.Header hasDivider title="Header Without Description" />
        <Card.Body>
          <Text as="div" className="sw-p-10">
            This card has a header with title but no description.
          </Text>
        </Card.Body>
      </Card>
    </div>
  ),
};

// Card without header
export const BodyOnly: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <Card.Body>
          <Text as="div" className="sw-p-10">
            This card has no header, only a body.
          </Text>
        </Card.Body>
      </Card>
    </div>
  ),
};

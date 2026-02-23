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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Badge,
  BadgeVariety,
  Button,
  ButtonSize,
  ButtonVariety,
  Card,
  CardSize,
  IconCheckCircle,
  IconSparkleInShieldDisabled,
  IconStar,
  Label,
  LinkStandalone,
  RatingBadge,
  Text,
  TextSize,
  Tooltip,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

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

const CardBodyStyled = styled(Card.Body)`
  display: flex;
  align-items: center;
`;

export const Default: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card data-key="my-data-key" {...args}>
        <Card.Header
          description={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Super awesome description</Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconSparkleInShieldDisabled />
                <Text as="p" size={TextSize.Small}>
                  Helpful text
                </Text>
              </div>
            </div>
          }
          hasDivider
          rightContent={<IconCheckCircle color="echoes-color-icon-success" />}
          title="Card Title"
        />
        <CardBodyStyled>
          <Text as="div" className="sw-p-10">
            This is the content of the card.
          </Text>
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

export const WithRightContent: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div>
      <Card data-key="key2" {...args}>
        <Card.Header
          description={
            <span>
              <strong>Last analysis:</strong>
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
        <CardBodyStyled>
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
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { include: ['isCollapsible'] },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      {Object.values(CardSize).map((size) => (
        <Card key={size} size={size} {...args}>
          <Card.Header
            description={`A ${size} card`}
            hasDivider
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Card`}
          />
          <CardBodyStyled>
            <Text as="div">Content for the {size} card.</Text>
          </CardBodyStyled>
        </Card>
      ))}
    </div>
  ),
};

export const NoDescription: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <Card.Header hasDivider title="Header Without Description" />
        <CardBodyStyled>
          <Text as="div">This card has a header with title but no description.</Text>
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

export const BodyOnly: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <CardBodyStyled>
          <Text as="div">This card has no header, only a body.</Text>
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

export const NoDivider: Story = {
  args: {
    size: CardSize.Medium,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card {...args}>
        <Card.Header
          description="This card has a title and description but no divider between header and body"
          title="Card Without Divider"
        />
        <CardBodyStyled>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text as="div">
              Without a divider, the header and body content flow together visually. This works well
              for simpler cards where visual separation isnt needed.
            </Text>
          </div>
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

export const Collapsible: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: (_) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
      <Card isCollapsible size={CardSize.Large}>
        <Card.Header hasDivider title="Large Card" />

        <CardBodyStyled>
          <Text as="div">Content for the large card.</Text>
        </CardBodyStyled>
      </Card>

      <Card isCollapsible size={CardSize.Medium}>
        <Card.Header
          description="With a badge in the right slot"
          hasDivider
          rightContent={<Badge variety={BadgeVariety.Highlight}>New</Badge>}
          title="Medium Card"
        />

        <CardBodyStyled>
          <Text as="div">Content for the medium card.</Text>
        </CardBodyStyled>
      </Card>

      <Card isCollapsible size={CardSize.Small}>
        <Card.Header
          description="With an action button in the right slot"
          hasDivider
          rightContent={
            <Button
              onClick={() => {
                // eslint-disable-next-line no-alert
                alert('Action triggered from the right slot');
              }}
              size={ButtonSize.Medium}>
              Action
            </Button>
          }
          title="Small Card"
        />

        <CardBodyStyled>
          <Text as="div">Content for the small card.</Text>
        </CardBodyStyled>
      </Card>
    </div>
  ),
};

function ControlledCollapsibleCard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '500px',
        padding: '40px',
      }}>
      <Button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        variety={ButtonVariety.Primary}>
        Click this button to toggle the card collapse state from outside
      </Button>

      <Card isCollapsible isOpen={isOpen} onOpenChange={setIsOpen} size={CardSize.Medium}>
        <Card.Header
          description="Controlled externally, but the title or chevron can still toggle"
          hasDivider
          title="Collapsible Card (Controlled)"
        />

        <CardBodyStyled>
          <Text as="div">This content can be collapsed externally.</Text>
        </CardBodyStyled>
      </Card>
    </div>
  );
}

export const CollapsibleControlled: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: (_) => <ControlledCollapsibleCard />,
};

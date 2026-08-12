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

/* eslint-disable no-console */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { Button, PopoverAlign, PopoverSide, TeachingBubble, TeachingBubbleProps } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { FishtankIllustration } from './helpers/FishtankIllustration';

const meta: Meta<typeof TeachingBubble> = {
  component: TeachingBubble,
  title: 'Echoes Components/Teaching Bubble',
  parameters: {
    controls: { exclude: ['children'] },
  },
  argTypes: {
    align: { options: Object.values(PopoverAlign), control: { type: 'select' } },
    illustration: {
      mapping: {
        fishtank: <FishtankIllustration />,
        none: undefined,
      },
      options: ['fishtank', 'none'],
      control: { type: 'select' },
    },
    side: { options: Object.values(PopoverSide), control: { type: 'select' } },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof TeachingBubble>;

export const Basic: Story = {
  args: {
    align: 'center',
    side: 'bottom',
    illustration: 'fishtank',
    title: 'New feature!',
    description:
      'This is an amazing new feature! Click the button to have it be clicked. You will immediately feel the clickiness and how it adds that click you missed in your life.',
  },
  render: (args) => (
    <ControllingWrapper {...args}>
      <Button
        onClick={() => {
          console.log('something blue?');
        }}>
        I do something new
      </Button>
    </ControllingWrapper>
  ),
};

function ControllingWrapper(props: Readonly<TeachingBubbleProps>) {
  const [isOpen, setIsOpen] = useState(true);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <TeachingBubble
        {...props}
        footer={
          <TeachingBubble.CloseButton
            onClick={() => {
              console.log('test');
            }}
            variety="default">
            Got it, thanks. Now shut up.
          </TeachingBubble.CloseButton>
        }
        isOpen={isOpen}
        onClose={close}
      />

      <br />

      <Button onClick={() => setIsOpen(true)}>Show it again</Button>
    </>
  );
}

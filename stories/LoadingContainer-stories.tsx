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
import { useEffect, useState } from 'react';
import { Label, LoadingContainer, LoadingSkeleton, MessageCallout, RatingBadge } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof LoadingContainer> = {
  title: 'Echoes Components/LoadingContainer',
  component: LoadingContainer,
  decorators: [basicWrapperDecorator],
};

export default meta;
type Story = StoryObj<typeof LoadingContainer>;

export const Default: Story = {
  args: {
    isLoading: true,
  },
  render(args) {
    return (
      <LoadingContainer {...args}>
        <h2>This container has a section that loads</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LoadingSkeleton variety="disk">
            <RatingBadge rating="B" size="md" />
          </LoadingSkeleton>
          <Label>
            <LoadingSkeleton variety="text">Maintainability</LoadingSkeleton>
          </Label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <h3>but this one is separate!</h3>
          <LoadingSkeleton
            css={css`
              width: 100%;
            `}
            isLoading
            variety="rectangle">
            <MessageCallout variety="danger">This should never appear!</MessageCallout>
          </LoadingSkeleton>
          <br />
          <LoadingSkeleton isLoading={false} variety="rectangle">
            <MessageCallout variety="info">This should always be visible</MessageCallout>
          </LoadingSkeleton>
        </div>
      </LoadingContainer>
    );
  },
};

export const FullExample: Story = {
  render() {
    return <StateWrapper />;
  },
};

const data = ['bread', 'cheese', 'profit'];

function StateWrapper() {
  const [loading, setLoading] = useState(true);

  const [steps, setSteps] = useState<string[]>(['loading1', 'loading2', 'loading3']);

  useEffect(() => {
    setTimeout(() => {
      setSteps(data);
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div>
      <LoadingContainer isLoading={loading}>
        <LoadingSkeleton variety="rectangle">
          <ul>
            {steps.map((step, i) => (
              <li key={step}>{`Step ${i}: ${step}`}</li>
            ))}
          </ul>
        </LoadingSkeleton>
      </LoadingContainer>
    </div>
  );
}

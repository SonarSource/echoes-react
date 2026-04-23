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
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cssVar, MarginIndicator, MarginIndicatorType, Popover, Text } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof MarginIndicator> = {
  component: MarginIndicator,
  title: 'Echoes/MarginIndicator',
  argTypes: {
    indicatorType: { control: { type: 'select' }, options: Object.values(MarginIndicatorType) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof MarginIndicator>;

export const Default: Story = {
  args: {
    ariaLabel: 'label',
    indicatorType: MarginIndicatorType.Covered,
  },
};

export const Interactive: Story = {
  args: {
    ariaLabel: 'Indicator!',
    indicatorType: MarginIndicatorType.Covered,
  },
  argTypes: {
    onClick: {
      control: { type: 'select' },
      options: ['log', 'alert'],
      // eslint-disable-next-line no-alert
      mapping: { alert: () => alert('clicked!'), log: () => console.log('clicked!') },
    },
  },
  render(args) {
    return <MarginIndicator isInteractive {...args} />;
  },
};

const lines = [
  '',
  "let evalString = 'console.log('This is not good.')'; ",
  'eval(evalString); // Use of eval: Major security issue',
  '',
  'setTimeout(() => {',
  `   console.log('This is a delayed log.');`,
  "}, '1000'); // Use of string for setTimeout delay: Potential bug",
  '',
];

export const InContext: Story = {
  args: {
    indicatorType: MarginIndicatorType.Covered,
    isInteractive: true,
  },
  render(args) {
    return (
      <FakeCodeViewer>
        <tbody style={{ display: 'contents' }}>
          {lines.map((line, i) => (
            <tr key={i}>
              <th>
                <Text size="small">{i + 27}</Text>
              </th>
              <td>
                <Text isSubtle>author...</Text>
              </td>
              <td style={{ paddingRight: 0 }}>
                {line.length > 0 && (
                  <Popover
                    description="you can use it as an interactive element for popovers and stuff"
                    isOpen={args.isInteractive ? undefined : false}
                    side="right">
                    <MarginIndicator {...args} />
                  </Popover>
                )}
              </td>
              <td style={{ borderLeft: '1px solid grey' }}>
                <StyledCode>{line}</StyledCode>
              </td>
            </tr>
          ))}
        </tbody>
      </FakeCodeViewer>
    );
  },
};

const StyledCode = styled.code`
  color: ${cssVar('color-text-default')};
  background: none;
`;

const FakeCodeViewer = styled.table`
  border: 1px solid grey;
  display: grid;
  grid-template-columns: repeat(3, min-content) auto;

  font: ${cssVar('typography-code-default')};

  & tr {
    display: contents;
    height: 20px;
  }

  & td,
  th {
    height: 20px;
    padding: 0 4px;
  }
`;

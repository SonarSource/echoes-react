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
import { cssVar, Toolbar } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

interface SlotArgs {
  ariaLabel: string;
  datasetControls: number;
  filterControls: number;
  filterTags: number;
  onClearAll: boolean;
  searchInput: boolean;
  selectAllControl: boolean;
  sortControls: number;
}

const meta: Meta<SlotArgs> = {
  argTypes: {
    ariaLabel: { control: 'text' },
    datasetControls: { control: { type: 'number', min: 0, max: 5 } },
    filterControls: { control: { type: 'number', min: 0, max: 5 } },
    filterTags: { control: { type: 'number', min: 0, max: 5 } },
    onClearAll: { control: 'boolean' },
    searchInput: { control: 'boolean' },
    selectAllControl: { control: 'boolean' },
    sortControls: { control: { type: 'number', min: 0, max: 5 } },
  },
  // @ts-expect-error -- SlotArgs intentionally replaces ToolbarProps for story controls
  component: Toolbar,
  decorators: [basicWrapperDecorator],
  title: 'Echoes Components/Toolbar',
};

export default meta;

type Story = StoryObj<SlotArgs>;

export const Default: Story = {
  args: {
    ariaLabel: 'Toolbar slots overview',
    datasetControls: 1,
    filterControls: 2,
    filterTags: 2,
    onClearAll: true,
    searchInput: true,
    selectAllControl: true,
    sortControls: 1,
  },
  render: ({
    ariaLabel,
    datasetControls,
    filterControls,
    filterTags,
    onClearAll,
    searchInput,
    selectAllControl,
    sortControls,
    ...props
  }) => (
    <Toolbar
      ariaLabel={ariaLabel}
      datasetControls={
        datasetControls > 0 ? (
          <>{makeSlots(datasetControls, '#b39ddb', 'datasetControls')}</>
        ) : undefined
      }
      filterControls={
        filterControls > 0 ? (
          <>{makeSlots(filterControls, '#ffcc80', 'filterControls')}</>
        ) : undefined
      }
      filterTags={makeSlots(filterTags, '#90caf9', 'filterTags')}
      onClearAll={onClearAll && filterTags > 0 ? () => {} : undefined}
      searchInput={
        searchInput ? (
          <SlotBlock color="#a5d6a7" style={{ width: '160px' }}>
            searchInput
          </SlotBlock>
        ) : undefined
      }
      selectAllControl={
        selectAllControl ? <SlotBlock color="#ef9a9a">selectAllControl</SlotBlock> : undefined
      }
      sortControls={
        sortControls > 0 ? <>{makeSlots(sortControls, '#ffe082', 'sortControls')}</> : undefined
      }
      {...props}
    />
  ),
};

const SlotBlock = styled.div<{ color: string }>`
  align-items: center;
  background-color: ${({ color }) => color}33;
  border: 2px solid ${({ color }) => color};
  border-radius: ${cssVar('border-radius-200')};

  font: ${cssVar('typography-code-default')};
  color: ${cssVar('color-text-default')};

  display: flex;
  height: ${cssVar('dimension-height-800')};
  justify-content: center;
  padding: 0 ${cssVar('dimension-space-100')};
  white-space: nowrap;
`;

SlotBlock.displayName = 'SlotBlock';

function makeSlots(count: number, color: string, label: string) {
  return Array.from({ length: count }, (_, i) => (
    <SlotBlock color={color} key={i}>
      {label} {i + 1}
    </SlotBlock>
  ));
}

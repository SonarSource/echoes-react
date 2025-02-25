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
import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbLink } from '../../src/components/breadcrumbs/BreadcrumbLink';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof BreadcrumbLink> = {
  component: BreadcrumbLink,
  title: 'Echoes/Breadcrumbs/BreadcrumbLink',
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof BreadcrumbLink>;

export const Default: Story = {
  args: {
    children: 'A non-child breadcrumb link',
    to: 'infinity and beyond',
  },
};

export const Child: Story = {
  args: {
    children: 'A child breadcrumb element',
    isChild: true,
  },
};

export const Ellipsis: Story = {
  args: {
    children: 'A long breadcrumb link with an ellipsis because it overflows the max width',
    hasEllipsis: true,
    to: 'infinity and beyond',
  },
};

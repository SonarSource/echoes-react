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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeaderTitle, PageHeaderTitleProps } from 'src/components/page-header/PageHeaderTitle';
import {
  Button,
  ButtonIcon,
  ButtonVariety,
  DropdownMenu,
  IconArrowLeft,
  IconEdit,
  PageHeader,
  PageHeaderProps,
} from '../src';

const meta: Meta<typeof PageHeader | typeof PageHeaderTitle> = {
  argTypes: {
    actions: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <PageHeader.Actions>
            <Button>Secondary action</Button>
            <Button variety={ButtonVariety.Primary}>Primary action</Button>
          </PageHeader.Actions>
        ),
        false: false,
      },
    },
    breadcrumbs: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <PageHeader.Breadcrumbs
            items={[
              { linkElement: 'Breadcrumb item', to: 'https://sonarsource.com' },
              { linkElement: 'Breadcrumb item', to: '' },
            ]}
          />
        ),
        false: false,
      },
    },
    navigation: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <PageHeader.Navigation>
            <PageHeader.NavigationItem to="/">Home</PageHeader.NavigationItem>
            <PageHeader.NavigationItem to="/qp">Quality Profiles</PageHeader.NavigationItem>
            <PageHeader.NavigationItem to="/rules">Rules</PageHeader.NavigationItem>

            <PageHeader.NavigationDropdownItem
              items={
                <>
                  <DropdownMenu.ItemLink to="/3456">option 1</DropdownMenu.ItemLink>
                  <DropdownMenu.ItemLink to="/hiya">hiya</DropdownMenu.ItemLink>
                </>
              }>
              More
            </PageHeader.NavigationDropdownItem>
          </PageHeader.Navigation>
        ),
        false: false,
      },
    },
    prefix: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <ButtonIcon
            Icon={IconArrowLeft}
            ariaLabel="Go back"
            variety={ButtonVariety.DefaultGhost}
          />
        ),
        false: false,
      },
    },
    suffix: {
      control: { type: 'boolean' },
      mapping: {
        true: <ButtonIcon Icon={IconEdit} ariaLabel="Edit" variety={ButtonVariety.DefaultGhost} />,
        false: false,
      },
    },
  },
  component: PageHeader,
  title: 'Echoes/PageHeader',
};

export default meta;

type Story = StoryObj<typeof PageHeader | typeof PageHeaderTitle>;

const render = ({
  description,
  metadata,
  prefix,
  suffix,
  title,
  ...args
}: PageHeaderProps & PageHeaderTitleProps) => (
  <div
    style={{
      border: '1px dotted blue',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px',
      width: '800px',
    }}>
    <PageHeader
      {...args}
      description={description && <PageHeader.Description>{description}</PageHeader.Description>}
      metadata={metadata && <PageHeader.Metadata>{metadata}</PageHeader.Metadata>}
      title={
        <PageHeader.Title prefix={prefix} suffix={suffix}>
          {title}
        </PageHeader.Title>
      }
    />
  </div>
);

export const Full: Story = {
  args: {
    actions: true,
    breadcrumbs: true,
    description: 'Page description',
    metadata: 'Page metadata',
    hasDivider: false,
    navigation: true,
    prefix: true,
    suffix: true,
    title: 'Page title',
  },
  render,
};

export const Basic: Story = {
  args: {
    title: 'Page title',
  },
  render,
};

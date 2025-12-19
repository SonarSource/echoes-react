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

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  ButtonIcon,
  ButtonVariety,
  ContentHeaderProps,
  ContentHeaderTitleProps,
  DropdownMenu,
  IconArrowLeft,
  IconEdit,
  Layout,
  MessageCallout,
  MessageVariety,
} from '../../src';

const meta: Meta<typeof Layout.ContentHeader | typeof Layout.ContentHeader.Title> = {
  title: 'Echoes/Layout/ContentHeader',
  argTypes: {
    actions: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <Layout.ContentHeader.Actions>
            <Button>Secondary action</Button>
            <Button variety={ButtonVariety.Primary}>Primary action</Button>
          </Layout.ContentHeader.Actions>
        ),
        false: false,
      },
    },
    breadcrumbs: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Breadcrumb item', to: 'https://sonarsource.com' },
              { linkElement: 'Breadcrumb item', to: '' },
            ]}
          />
        ),
        false: false,
      },
    },
    callout: {
      control: { type: 'boolean' },
      mapping: {
        true: <MessageCallout variety={MessageVariety.Warning}>Watch out!</MessageCallout>,
        false: false,
      },
    },
    navigation: {
      control: { type: 'boolean' },
      mapping: {
        true: (
          <Layout.ContentHeader.Navigation>
            <Layout.ContentHeader.NavigationItem to="/">Home</Layout.ContentHeader.NavigationItem>
            <Layout.ContentHeader.NavigationItem to="/qp">
              Quality Profiles
            </Layout.ContentHeader.NavigationItem>
            <Layout.ContentHeader.NavigationItem to="/rules">
              Rules
            </Layout.ContentHeader.NavigationItem>

            <Layout.ContentHeader.NavigationDropdownItem
              items={
                <>
                  <DropdownMenu.ItemLink to="/3456">option 1</DropdownMenu.ItemLink>
                  <DropdownMenu.ItemLink to="/hiya">hiya</DropdownMenu.ItemLink>
                </>
              }>
              More
            </Layout.ContentHeader.NavigationDropdownItem>
          </Layout.ContentHeader.Navigation>
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
};

export default meta;

type Story = StoryObj<typeof Layout.ContentHeader | typeof Layout.ContentHeader.Title>;

const render = ({
  description,
  metadata,
  prefix,
  suffix,
  title,
  ...args
}: ContentHeaderProps & ContentHeaderTitleProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '800px',
    }}>
    <Layout.ContentHeader
      {...args}
      description={
        description && (
          <Layout.ContentHeader.Description>{description}</Layout.ContentHeader.Description>
        )
      }
      metadata={
        metadata && <Layout.ContentHeader.Metadata>{metadata}</Layout.ContentHeader.Metadata>
      }
      title={
        <Layout.ContentHeader.Title prefix={prefix} suffix={suffix}>
          {title}
        </Layout.ContentHeader.Title>
      }
    />
  </div>
);

export const Full: Story = {
  args: {
    actions: true,
    breadcrumbs: true,
    callout: true,
    description: 'Content description',
    metadata: 'Content metadata',
    hasDivider: false,
    navigation: true,
    prefix: true,
    suffix: true,
    title: 'Content title',
  },
  render,
};

export const Basic: Story = {
  args: {
    title: 'Content title',
  },
  render,
};

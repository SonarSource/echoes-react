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

import {
  Badge,
  BadgeSeverity,
  Button,
  cssVar,
  DropdownMenu,
  IconComputer,
  IconGear,
  IconKey,
  IconPackageAlt,
  IconPeople,
  IconProject,
  IconQuestionMark,
  IconReports,
  IconSearch,
  IconShield,
  IconWebhook,
  Layout,
  LinkStandalone,
  LoadingSkeleton,
  LogoSonarQubeServer,
  Text,
  TextInput,
} from '../../src';

import { AsideSize } from '../../src/components/layout/LayoutTypes';
import { PageHeaderScrollBehavior } from '../../src/components/layout/header/common/HeaderTypes';

const meta: Meta = {
  component: Layout,
  title: 'Echoes/Layout',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    banner: {
      control: 'select',
      mapping: {
        one: <Layout.Banner variety="warning">This is a general notification!</Layout.Banner>,
        two: (
          <>
            <Layout.Banner onDismiss={() => {}} variety="danger">
              Oups something is wrong!
            </Layout.Banner>

            <Layout.Banner variety="warning">This is a general notification!</Layout.Banner>
          </>
        ),
        none: undefined,
      },
      options: ['one', 'two', 'none'],
    },
    aside: {
      control: 'select',
      mapping: {
        [AsideSize.small]: (
          <Layout.AsideLeft size={AsideSize.small}>
            <AsideContent />
          </Layout.AsideLeft>
        ),
        [AsideSize.medium]: (
          <Layout.AsideLeft size={AsideSize.medium}>
            <AsideContent />
          </Layout.AsideLeft>
        ),
        [AsideSize.large]: (
          <Layout.AsideLeft size={AsideSize.large}>
            <AsideContent />
          </Layout.AsideLeft>
        ),
        none: undefined,
      },
      options: [AsideSize.small, AsideSize.medium, AsideSize.large, 'none'],
    },
    contentHeader: {
      control: 'boolean',
      mapping: {
        true: (
          <Layout.ContentHeader
            {...getHeaderProps()}
            title={<Layout.ContentHeader.Title>Content title</Layout.ContentHeader.Title>}
          />
        ),
        false: undefined,
      },
    },
    pageHeader: {
      control: 'boolean',
      mapping: {
        true: (behavior: PageHeaderScrollBehavior) => (
          <Layout.PageHeader
            {...getHeaderProps()}
            scrollBehavior={behavior}
            title={<Layout.PageHeader.Title headingLevel="h2">Page title</Layout.PageHeader.Title>}
          />
        ),
        false: (_: boolean) => undefined,
      },
    },
    pageHeaderScrollBehavior: {
      control: 'select',
      options: [
        PageHeaderScrollBehavior.collapse,
        PageHeaderScrollBehavior.scroll,
        PageHeaderScrollBehavior.sticky,
      ],
    },
    pageWidth: {
      control: 'select',
      options: ['default', 'fluid'],
    },
    sidebar: {
      control: 'boolean',
      mapping: {
        true: <SidebarNav />,
        false: undefined,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    aside: AsideSize.medium,
    banner: 'none',
    contentHeader: false,
    pageLoading: true,
    pageContentLoading: true,
    pageHeader: true,
    pageHeaderScrollBehavior: PageHeaderScrollBehavior.scroll,
    pageWidth: 'default',
    sidebar: true,
  },
  render: (args) => (
    <Layout>
      <Layout.BannerContainer>{args.banner}</Layout.BannerContainer>

      <GlobalNav />

      {args.sidebar}

      <Layout.ContentGrid>
        {args.contentHeader}

        {args.aside}

        <Layout.PageGrid isLoading={args.pageLoading} width={args.pageWidth}>
          {args.pageHeader(args.pageHeaderScrollBehavior)}

          <Layout.PageContent isLoading={args.pageContentLoading}>
            <p>
              <LoadingSkeleton variety="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </LoadingSkeleton>
            </p>

            <StackingTestArea>
              <TextInput label="Input (no z-index)" />

              <HighZIndexBox />

              <IsolatedBox />

              <TransformBox />

              <BadgeSeverity
                ariaLabel="Badge (no z-index)"
                quality="Badge (no z-index)"
                severity="critical"
              />

              <DropdownMenu items={<DropdownMenu.ItemButton>An action</DropdownMenu.ItemButton>}>
                <Button>Dropdown (portaled)</Button>
              </DropdownMenu>
            </StackingTestArea>

            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '32px',
              }}>
              {colorBoxIds.map((id, index) => (
                <ColorBox colorIndex={index} key={id} />
              ))}
            </div>
          </Layout.PageContent>

          <Layout.PageFooter>
            <Text isSubtle>2018-2025 SonarSource Sàrl. All rights reserved</Text>

            <Links>
              <LinkStandalone highlight="subtle" to="/1">
                Terms
              </LinkStandalone>

              <LinkStandalone highlight="subtle" to="/2">
                Pricing
              </LinkStandalone>

              <LinkStandalone highlight="subtle" to="/3">
                Privacy
              </LinkStandalone>

              <LinkStandalone highlight="subtle" to="/4">
                Cookies
              </LinkStandalone>

              <LinkStandalone highlight="subtle" to="/5">
                Terms
              </LinkStandalone>
            </Links>
          </Layout.PageFooter>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    </Layout>
  ),
};

function GlobalNav() {
  return (
    <Layout.GlobalNavigation>
      <Layout.GlobalNavigation.Primary>
        <Layout.GlobalNavigation.Home>
          <LogoSonarQubeServer hasText />
        </Layout.GlobalNavigation.Home>

        <Layout.GlobalNavigation.ItemsContainer>
          <Layout.GlobalNavigation.Item to="/">Home</Layout.GlobalNavigation.Item>

          <Layout.GlobalNavigation.Item to="/qp">Quality Profiles</Layout.GlobalNavigation.Item>

          <Layout.GlobalNavigation.Item to="/rules">Rules</Layout.GlobalNavigation.Item>
        </Layout.GlobalNavigation.ItemsContainer>
      </Layout.GlobalNavigation.Primary>

      <Layout.GlobalNavigation.Secondary>
        <Layout.GlobalNavigation.Action Icon={IconSearch} ariaLabel="?" />

        <Layout.GlobalNavigation.Action Icon={IconQuestionMark} ariaLabel="Help" isIconFilled />

        <Layout.GlobalNavigation.Account
          avatar={<Avatar />}
          items={<DropdownMenu.ItemLink to="/account">Settings</DropdownMenu.ItemLink>}
        />
      </Layout.GlobalNavigation.Secondary>
    </Layout.GlobalNavigation>
  );
}

function SidebarNav() {
  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Header
        avatar={
          <div
            style={{
              backgroundColor: cssVar('color-background-emphasis-active'),
              color: cssVar('color-text-on-color'),
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: cssVar('border-radius-400'),
            }}>
            <IconGear />
          </div>
        }
        isInteractive
        name="Administration for a large enterprise instance"
      />

      <Layout.SidebarNavigation.Body>
        <Layout.SidebarNavigation.AccordionItem Icon={IconGear} isDefaultOpen label="Configuration">
          <Layout.SidebarNavigation.AccordionItem.Item to="/">
            General settings
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item suffix={<NewBadge />} to="/alm-integrations">
            DevOps platform integrations
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item Icon={IconWebhook} to="/webhooks">
            Webhooks
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item to="/background-tasks">
            Background tasks
          </Layout.SidebarNavigation.AccordionItem.Item>
        </Layout.SidebarNavigation.AccordionItem>

        <Layout.SidebarNavigation.AccordionItem Icon={IconShield} label="Security">
          <Layout.SidebarNavigation.AccordionItem.Item Icon={IconPeople} to="/users">
            Users
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item to="/groups">
            Groups
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item Icon={IconKey} to="/authentication">
            Authentication
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item to="/global-permissions">
            Global permissions
          </Layout.SidebarNavigation.AccordionItem.Item>
        </Layout.SidebarNavigation.AccordionItem>

        <Layout.SidebarNavigation.AccordionItem
          Icon={IconProject}
          label="Projects"
          suffix={<NewBadge />}>
          <Layout.SidebarNavigation.AccordionItem.Item to="/management">
            Management
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item to="/applications">
            Applications
          </Layout.SidebarNavigation.AccordionItem.Item>

          <Layout.SidebarNavigation.AccordionItem.Item to="/portfolio-projects">
            Portfolio projects
          </Layout.SidebarNavigation.AccordionItem.Item>
        </Layout.SidebarNavigation.AccordionItem>

        <Layout.SidebarNavigation.Item Icon={IconComputer} to="/system">
          System
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconPackageAlt} to="/marketplace">
          Marketplace
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconReports} to="/audit-logs">
          Audit logs
        </Layout.SidebarNavigation.Item>
      </Layout.SidebarNavigation.Body>

      <Layout.SidebarNavigation.Footer>
        <Layout.SidebarNavigation.Item Icon={IconQuestionMark} to="/support">
          Support
        </Layout.SidebarNavigation.Item>
      </Layout.SidebarNavigation.Footer>
    </Layout.SidebarNavigation>
  );
}

function AsideContent() {
  return (
    <List>
      {items.map((k) => (
        <Button key={k} variety="default-ghost">
          Item {k + 1}
        </Button>
      ))}
    </List>
  );
}

function getHeaderProps() {
  return {
    actions: (
      <Layout.PageHeader.Actions>
        <Button>Action!</Button>
      </Layout.PageHeader.Actions>
    ),
    navigation: (
      <Layout.PageHeader.Navigation>
        <Layout.PageHeader.NavigationItem to="/1">Nav Item 1</Layout.PageHeader.NavigationItem>

        <Layout.PageHeader.NavigationItem to="/2">Nav Item 2</Layout.PageHeader.NavigationItem>
      </Layout.PageHeader.Navigation>
    ),
  };
}

function NewBadge() {
  return (
    <Badge isHighContrast variety="highlight">
      New
    </Badge>
  );
}

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  background: radial-gradient(white, ${cssVar('color-background-accent-active')});
`;

const Links = styled.div`
  display: flex;
  gap: ${cssVar('dimension-space-200')};
`;

const items = Array.from({ length: 100 }).map((_, i) => i);
const colorBoxIds = Array.from({ length: 20 }, (_, index) => `color-box-${index.toString()}`);

const COLOR_BOX_HUE_MULTIPLIER = 37;
const COLOR_BOX_HUE_RANGE = 360;
const COLOR_BOX_MIN_SIZE = 150;
const COLOR_BOX_SIZE_VARIATION = 300;
const COLOR_BOX_SIZE_MULTIPLIER = 47;

const List = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};

  & li {
    padding: 0 8px;
  }

  & button {
    width: 100%;
  }
`;

const StackingTestArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  margin-top: 32px;
  margin-bottom: 32px;
`;

function HighZIndexBox() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 9999,
        padding: '12px 16px',
        background: 'salmon',
        borderRadius: '8px',
        fontWeight: 'bold',
      }}>
      z-index: 9999
    </div>
  );
}

function IsolatedBox() {
  return (
    <div
      style={{
        isolation: 'isolate',
        padding: '12px 16px',
        background: 'lightblue',
        borderRadius: '8px',
      }}>
      <div style={{ position: 'relative', zIndex: 9999 }}>
        isolation: isolate (child z-index: 9999)
      </div>
    </div>
  );
}

function TransformBox() {
  return (
    <div
      style={{
        transform: 'translateY(0)',
        padding: '12px 16px',
        background: 'lightgreen',
        borderRadius: '8px',
      }}>
      <div style={{ position: 'relative', zIndex: 9999 }}>transform (child z-index: 9999)</div>
    </div>
  );
}

function getColorBoxColor(colorIndex: number) {
  return `hsl(${(colorIndex * COLOR_BOX_HUE_MULTIPLIER) % COLOR_BOX_HUE_RANGE}, 100%, 75%)`;
}

function getColorBoxSize(colorIndex: number) {
  return `${COLOR_BOX_MIN_SIZE + ((colorIndex * COLOR_BOX_SIZE_MULTIPLIER) % COLOR_BOX_SIZE_VARIATION)}px`;
}

function ColorBox({ colorIndex }: Readonly<{ colorIndex: number }>) {
  const color = getColorBoxColor(colorIndex);
  const size = getColorBoxSize(colorIndex);

  return (
    <div
      style={{
        height: size,
        width: size,
        backgroundColor: color,
        borderRadius: '10px',
        boxShadow: `0 0 6px rgba(0, 0, 0, 0.2)`,
      }}
    />
  );
}

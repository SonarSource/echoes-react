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
import { type ComponentProps, type PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import {
  Badge,
  Button,
  ButtonGroup,
  cssVar,
  IconBell,
  IconCalendar,
  IconComputer,
  IconGear,
  IconKey,
  IconPackageAlt,
  IconPeople,
  IconProject,
  IconQuestionMark,
  IconReports,
  IconShield,
  IconSparkleInShieldError,
  IconWebhook,
  Layout,
  LinkStandalone,
  LogoSonarQubeServer,
  MessageCallout,
} from '../../../src';

const meta: Meta<typeof Layout.SidebarNavigation> = {
  component: Layout.SidebarNavigation,
  title: 'Echoes/Layout/SidebarNavigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Layout.SidebarNavigation>;

const sharedStoryParameters = {
  exclude: ['children'],
};
const sidebarNavigationStoryNarrowViewportWidth = `calc(${cssVar('layout-sidebar-navigation-sizes-breakpoint-dockable')} - ${cssVar('dimension-width-5000')})`;

export const Docked: Story = {
  parameters: sharedStoryParameters,
  render: (args) => (
    <SidebarNavigationStoryLayout isSidebarInitiallyDocked>
      <SidebarNavigationStoryContent {...args} />
    </SidebarNavigationStoryLayout>
  ),
};

export const Undocked: Story = {
  parameters: sharedStoryParameters,
  render: (args) => (
    <SidebarNavigationStoryLayout isSidebarInitiallyDocked={false}>
      <SidebarNavigationStoryContent {...args} />
    </SidebarNavigationStoryLayout>
  ),
};

export const UndockableNarrowViewport: Story = {
  name: 'Undockable Narrow Viewport',
  parameters: sharedStoryParameters,
  render: (args) => (
    <SidebarNavigationStoryLayout
      highlightNarrowViewport
      isSidebarDockable={false}
      isSidebarInitiallyDocked={false}>
      <SidebarNavigationStoryContent {...args} />
    </SidebarNavigationStoryLayout>
  ),
};

function SidebarNavigationStoryLayout({
  children,
  highlightNarrowViewport = false,
  isSidebarInitiallyDocked,
  isSidebarDockable = true,
}: Readonly<
  PropsWithChildren<{
    highlightNarrowViewport?: boolean;
    isSidebarInitiallyDocked: boolean;
    isSidebarDockable?: boolean;
  }>
>) {
  useStoryMatchMediaOverride(isSidebarDockable);

  const layout = <Layout isSidebarInitiallyDocked={isSidebarInitiallyDocked}>{children}</Layout>;

  if (!highlightNarrowViewport) {
    return layout;
  }

  return (
    <SidebarNavigationStoryNarrowViewportFrame>{layout}</SidebarNavigationStoryNarrowViewportFrame>
  );
}

function useStoryMatchMediaOverride(matches: boolean) {
  const originalMatchMedia = useRef(globalThis.matchMedia);

  const storyMatchMedia = useMemo(
    () => (query: string) =>
      ({
        addEventListener: () => undefined,
        addListener: () => undefined,
        dispatchEvent: () => true,
        matches,
        media: query,
        onchange: null,
        removeEventListener: () => undefined,
        removeListener: () => undefined,
      }) as MediaQueryList,
    [matches],
  );

  if (!matches) {
    globalThis.matchMedia = storyMatchMedia;
  }

  useEffect(() => {
    if (matches) {
      return undefined;
    }

    const originalMatchMediaValue = originalMatchMedia.current;

    return () => {
      globalThis.matchMedia = originalMatchMediaValue;
    };
  }, [matches]);
}

function SidebarNavigationStoryContent(
  args: Readonly<ComponentProps<typeof Layout.SidebarNavigation>>,
) {
  return (
    <>
      <Layout.GlobalNavigation>
        <Layout.GlobalNavigation.Primary>
          <Layout.GlobalNavigation.Home>
            <LogoSonarQubeServer hasText size="small" />
          </Layout.GlobalNavigation.Home>

          <Layout.GlobalNavigation.ItemsContainer>
            <Layout.GlobalNavigation.Item to="/">Home</Layout.GlobalNavigation.Item>

            <Layout.GlobalNavigation.Item to="/qp">Quality Profiles</Layout.GlobalNavigation.Item>

            <Layout.GlobalNavigation.Item to="/rules">Rules</Layout.GlobalNavigation.Item>
          </Layout.GlobalNavigation.ItemsContainer>
        </Layout.GlobalNavigation.Primary>
      </Layout.GlobalNavigation>

      <Layout.SidebarNavigation {...args}>
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
          <Layout.SidebarNavigation.AccordionItem
            Icon={IconGear}
            isDefaultOpen
            label="Configuration">
            <Layout.SidebarNavigation.AccordionItem.Item to="/">
              General settings
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item
              suffix={<NewSuffix />}
              to="/alm-integrations">
              DevOps platform integrations
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item Icon={IconWebhook} to="/webhooks">
              Webhooks
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/housekeeping">
              Housekeeping
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/email">
              Email
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

            <Layout.SidebarNavigation.AccordionItem.Item to="/global-permissions">
              Global permissions
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item Icon={IconKey} to="/authentication">
              Authentication
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/encryption">
              Encryption
            </Layout.SidebarNavigation.AccordionItem.Item>
          </Layout.SidebarNavigation.AccordionItem>

          <Layout.SidebarNavigation.AccordionItem
            Icon={IconProject}
            label="Projects"
            suffix={<NewSuffix />}>
            <Layout.SidebarNavigation.AccordionItem.Item to="/management">
              Management
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/project-links">
              Links
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/applications">
              Applications
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/portfolios">
              Portfolios
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/devops-platforms">
              DevOps platform projects
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/project-badges">
              Badges
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

          <Layout.SidebarNavigation.Item Icon={IconQuestionMark} to="/support">
            Support
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Group label="Example grouping label">
            <Layout.SidebarNavigation.Item Icon={IconBell} to="/announcements">
              Announcements
            </Layout.SidebarNavigation.Item>

            <Layout.SidebarNavigation.Item Icon={IconCalendar} to="/maintenance-windows">
              Maintenance windows
            </Layout.SidebarNavigation.Item>

            <Layout.SidebarNavigation.Item
              Icon={IconSparkleInShieldError}
              suffix={<NewSuffix />}
              to="/automation">
              Automation
            </Layout.SidebarNavigation.Item>
          </Layout.SidebarNavigation.Group>
        </Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Footer>
          <Layout.SidebarNavigation.Footer.PromotionCard
            actions={
              <ButtonGroup>
                <Button>Start trial</Button>

                <LinkStandalone to="/compare-editions">Compare editions</LinkStandalone>
              </ButtonGroup>
            }
            badge={<Badge variety="info">Beta</Badge>}
            headerText="Explore advanced governance"
            text="Try portfolio management, extra reporting, and broader administration features."
          />

          <Layout.SidebarNavigation.AccordionItem Icon={IconQuestionMark} label="Resources">
            <Layout.SidebarNavigation.AccordionItem.Item to="/documentation">
              Documentation
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item to="/web-api">
              Web API
            </Layout.SidebarNavigation.AccordionItem.Item>

            <Layout.SidebarNavigation.AccordionItem.Item Icon={IconPackageAlt} to="/release-notes">
              Release notes
            </Layout.SidebarNavigation.AccordionItem.Item>
          </Layout.SidebarNavigation.AccordionItem>
        </Layout.SidebarNavigation.Footer>
      </Layout.SidebarNavigation>

      <Layout.ContentGrid>
        <Layout.PageGrid width="fluid">
          <Layout.PageContent>
            Page content that is long enough to be visible when the sidebar is open on a small
            screen.
            <br />
            <br />
            <MessageCallout variety="info">
              Hover, focus, or click the top-left trigger to reveal the administration sidebar.
            </MessageCallout>
          </Layout.PageContent>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    </>
  );
}

function SidebarNavigationStoryNarrowViewportFrame({ children }: Readonly<PropsWithChildren>) {
  return (
    <div
      style={{
        border: `${cssVar('focus-border-width-default')} solid ${cssVar('color-border-danger-default')}`,
        boxSizing: 'border-box',
        height: '100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        width: sidebarNavigationStoryNarrowViewportWidth,
      }}>
      {children}
    </div>
  );
}

function NewSuffix() {
  return (
    <Badge isHighContrast variety="highlight">
      New
    </Badge>
  );
}

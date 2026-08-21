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

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { linkTo } from '@storybook/addon-links';
import type { MouseEvent, ReactNode } from 'react';
import {
  Button,
  ButtonSize,
  ButtonVariety,
  cssVar,
  DropdownMenu,
  IconActivity,
  IconArchitecture,
  IconBell,
  IconCreditCardGear,
  IconDashboard,
  IconDependencyRisk,
  IconGear,
  IconGraph3,
  IconIssues,
  IconLicenseProfiles,
  IconLockPerson,
  IconMeasures,
  IconOrganization,
  IconOverview,
  IconPeople,
  IconPlus,
  IconProject,
  IconQualityGate,
  IconQualityProfile,
  IconQuestionMark,
  IconRule,
  IconSearch,
  IconSecurityFinding,
  IconShield,
  IconSparkleInShield,
  IconSummary,
  IconWarning,
  Layout,
  LogoSize,
  LogoSonarQubeCloud,
} from '../../src';

export interface ProductShellProps {
  activeItem: 'issues' | 'projects';
  children: ReactNode;
  globalNavigationPrimary?: ReactNode;
}

export interface ProjectShellProps {
  activeItem?: 'issues' | 'overview' | 'summary';
  children: ReactNode;
}

export interface HomeShellProps {
  children: ReactNode;
}

const HOME_STORY_ID = 'playground-home--home';
const PROJECTS_STORY_ID = 'playground-projects--organization-projects';
const ISSUES_STORY_ID = 'playground-issues--code-issues';
const OVERVIEW_STORY_ID = 'playground-overview--project-overview';
const SUMMARY_STORY_ID = 'playground-summary--project-summary';
const ISSUE_DETAIL_STORY_ID = 'playground-issue-detail--project-issue';
const HOME_STORY_URL = `/iframe.html?id=${HOME_STORY_ID}&viewMode=story`;

const openProjectsStory = linkTo(PROJECTS_STORY_ID);
const openIssuesStory = linkTo(ISSUES_STORY_ID);
const openOverviewStory = linkTo(OVERVIEW_STORY_ID);
const openSummaryStory = linkTo(SUMMARY_STORY_ID);
const openIssueDetailStory = linkTo(ISSUE_DETAIL_STORY_ID);

export function ProductShell({
  activeItem,
  children,
  globalNavigationPrimary,
}: Readonly<ProductShellProps>) {
  return (
    <PlaygroundShell
      globalNavigationPrimary={globalNavigationPrimary}
      sidebar={<OrganizationSidebar activeItem={activeItem} />}>
      {children}
    </PlaygroundShell>
  );
}

ProductShell.displayName = 'ProductShell';

export function ProjectShell({ activeItem = 'overview', children }: Readonly<ProjectShellProps>) {
  return (
    <PlaygroundShell sidebar={<ProjectSidebar activeItem={activeItem} />}>
      {children}
    </PlaygroundShell>
  );
}

ProjectShell.displayName = 'ProjectShell';

export function HomeShell({ children }: Readonly<HomeShellProps>) {
  return <PlaygroundShell>{children}</PlaygroundShell>;
}

HomeShell.displayName = 'HomeShell';

function PlaygroundShell({
  children,
  globalNavigationPrimary,
  sidebar,
}: Readonly<{
  children: ReactNode;
  globalNavigationPrimary?: ReactNode;
  sidebar?: ReactNode;
}>) {
  const hasSidebar = sidebar !== undefined;

  return (
    <>
      <Global styles={playgroundSurfaceStyles} />
      <PlaygroundLayout isSidebarInitiallyDocked={hasSidebar}>
        <ProductGlobalNavigation
          primaryContent={globalNavigationPrimary}
          showHome={hasSidebar === false}
        />
        {sidebar}
        <PlaygroundContentGrid>{children}</PlaygroundContentGrid>
      </PlaygroundLayout>
    </>
  );
}

PlaygroundShell.displayName = 'PlaygroundShell';

function ProductGlobalNavigation({
  primaryContent,
  showHome,
}: Readonly<{ primaryContent?: ReactNode; showHome: boolean }>) {
  return (
    <PlaygroundGlobalNavigation>
      <Layout.GlobalNavigation.Primary>
        {showHome && (
          <Layout.GlobalNavigation.Home to={HOME_STORY_URL}>
            <SidebarLogo size={LogoSize.Small} />
          </Layout.GlobalNavigation.Home>
        )}
        {primaryContent}
      </Layout.GlobalNavigation.Primary>

      <Layout.GlobalNavigation.Secondary>
        <Layout.GlobalNavigation.Action
          Icon={IconSearch}
          ariaLabel="Search"
          variety={ButtonVariety.Default}
        />
        <Layout.GlobalNavigation.Action
          Icon={IconBell}
          ariaLabel="Notifications"
          variety={ButtonVariety.Default}
        />
        <Layout.GlobalNavigation.Action
          Icon={IconQuestionMark}
          ariaLabel="Help"
          isIconFilled
          variety={ButtonVariety.Default}
        />
        <Layout.GlobalNavigation.Action
          Icon={IconPlus}
          ariaLabel="Create"
          variety={ButtonVariety.Default}
        />
        <Layout.GlobalNavigation.Account
          avatar={<AccountAvatar>M</AccountAvatar>}
          items={<DropdownMenu.ItemLink to="/account">Account settings</DropdownMenu.ItemLink>}
        />
      </Layout.GlobalNavigation.Secondary>
    </PlaygroundGlobalNavigation>
  );
}

ProductGlobalNavigation.displayName = 'ProductGlobalNavigation';

function OrganizationSidebar({ activeItem }: Readonly<Pick<ProductShellProps, 'activeItem'>>) {
  return (
    <PlaygroundSidebarNavigation>
      <SidebarBrandRow>
        <Layout.GlobalNavigation.Home to={HOME_STORY_URL}>
          <SidebarLogo size={LogoSize.Small} />
        </Layout.GlobalNavigation.Home>
      </SidebarBrandRow>

      <PlaygroundSidebarHeader
        avatar={
          <SidebarOrganizationAvatar>
            <IconOrganization />
          </SidebarOrganizationAvatar>
        }
        isInteractive
        name="Sonar-UX-Testing-Org"
        qualifier="Organization"
      />

      <Layout.SidebarNavigation.Body>
        <PlaygroundPrimaryGroup>
          <PlaygroundPrimaryGroupList aria-label="Organization overview">
            <PlaygroundSidebarItem
              Icon={IconProject}
              isActive={activeItem === 'projects'}
              onClick={handleProjectsStoryNavigation}
              to={`/?path=/story/${PROJECTS_STORY_ID}`}>
              Projects
            </PlaygroundSidebarItem>
            <PlaygroundSidebarItem
              Icon={IconIssues}
              isActive={activeItem === 'issues'}
              onClick={handleIssuesStoryNavigation}
              to={`/?path=/story/${ISSUES_STORY_ID}`}>
              Issues
            </PlaygroundSidebarItem>
          </PlaygroundPrimaryGroupList>
        </PlaygroundPrimaryGroup>

        <Layout.SidebarNavigation.Group label="Policies">
          <PlaygroundSidebarItem Icon={IconLicenseProfiles} to="/license-profiles">
            License profiles
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconRule} to="/rules">
            Rules
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconQualityProfile} to="/quality-profiles">
            Quality profiles
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconQualityGate} to="/quality-gates">
            Quality gates
          </PlaygroundSidebarItem>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.Group label="Access">
          <PlaygroundSidebarItem Icon={IconCreditCardGear} to="/billing">
            Billing and usage
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconPeople} to="/members">
            Members
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconLockPerson} to="/permissions">
            Permissions
          </PlaygroundSidebarItem>
          <PlaygroundSidebarAccordionItem Icon={IconGear} isDefaultOpen label="Administration">
            <PlaygroundSidebarAccordionChildItem to="/administration/general">
              General settings
            </PlaygroundSidebarAccordionChildItem>
            <PlaygroundSidebarAccordionChildItem to="/administration/integrations">
              DevOps integrations
            </PlaygroundSidebarAccordionChildItem>
            <PlaygroundSidebarAccordionChildItem to="/administration/audit-logs">
              Audit logs
            </PlaygroundSidebarAccordionChildItem>
          </PlaygroundSidebarAccordionItem>
        </Layout.SidebarNavigation.Group>
      </Layout.SidebarNavigation.Body>

      <Layout.SidebarNavigation.Footer>
        <SidebarUpgradeButton
          prefix={<SidebarUpgradeIcon />}
          size={ButtonSize.Medium}
          variety={ButtonVariety.Primary}>
          Upgrade
        </SidebarUpgradeButton>
      </Layout.SidebarNavigation.Footer>
    </PlaygroundSidebarNavigation>
  );
}

OrganizationSidebar.displayName = 'OrganizationSidebar';

function SidebarUpgradeIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 2 4.75 13.5h6L9.5 22l8.75-11.5h-6L13.5 2Z" fill="currentColor" />
    </svg>
  );
}

SidebarUpgradeIcon.displayName = 'SidebarUpgradeIcon';

function ProjectSidebar({ activeItem }: Readonly<Pick<ProjectShellProps, 'activeItem'>>) {
  return (
    <PlaygroundSidebarNavigation>
      <SidebarBrandRow>
        <Layout.GlobalNavigation.Home to={HOME_STORY_URL}>
          <SidebarLogo size={LogoSize.Small} />
        </Layout.GlobalNavigation.Home>
      </SidebarBrandRow>

      <PlaygroundSidebarHeader
        avatar={<SidebarProjectAvatar>AI</SidebarProjectAvatar>}
        isInteractive
        name="AI Eval Journey Visualization"
        qualifier="Project"
      />

      <Layout.SidebarNavigation.Body>
        <PlaygroundPrimaryGroup>
          <PlaygroundPrimaryGroupList aria-label="Project overview">
            <PlaygroundSidebarItem
              Icon={IconOverview}
              isActive={activeItem === 'overview'}
              onClick={handleOverviewStoryNavigation}
              to={`/?path=/story/${OVERVIEW_STORY_ID}`}>
              Overview
            </PlaygroundSidebarItem>
            <PlaygroundSidebarItem Icon={IconDashboard} to="/dashboards">
              Dashboards
            </PlaygroundSidebarItem>
          </PlaygroundPrimaryGroupList>
        </PlaygroundPrimaryGroup>

        <Layout.SidebarNavigation.Group label="Analysis">
          <PlaygroundSidebarItem
            Icon={IconSummary}
            isActive={activeItem === 'summary'}
            onClick={handleSummaryStoryNavigation}
            to={`/?path=/story/${SUMMARY_STORY_ID}`}>
            Summary
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem
            Icon={IconIssues}
            isActive={activeItem === 'issues'}
            onClick={handleIssueDetailStoryNavigation}
            to={`/?path=/story/${ISSUE_DETAIL_STORY_ID}`}>
            Issues
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconSparkleInShield} to="/hunter-agent">
            Hunter Agent
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconShield} to="/security-hotspots">
            Security hotspots
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconDependencyRisk} to="/dependency-risks">
            Dependency risks
          </PlaygroundSidebarItem>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.Group label="Architecture">
          <PlaygroundSidebarItem Icon={IconArchitecture} to="/architecture/current">
            Current architecture
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconGraph3} to="/architecture/intended">
            Intended architecture
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconWarning} to="/architecture/deviations">
            Deviations
          </PlaygroundSidebarItem>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.Group label="Reporting">
          <PlaygroundSidebarItem Icon={IconSecurityFinding} to="/security-reports">
            Security reports
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconMeasures} to="/measures">
            Measures
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconActivity} to="/activity">
            Activity
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconQualityGate} to="/quality-gate-history">
            Quality gate history
          </PlaygroundSidebarItem>
          <PlaygroundSidebarItem Icon={IconSparkleInShield} to="/agentic-readiness">
            Agentic readiness
          </PlaygroundSidebarItem>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.Group label="Policies">
          <PlaygroundSidebarItem Icon={IconQualityProfile} to="/project-quality-profiles">
            Quality profiles
          </PlaygroundSidebarItem>
        </Layout.SidebarNavigation.Group>
      </Layout.SidebarNavigation.Body>
    </PlaygroundSidebarNavigation>
  );
}

ProjectSidebar.displayName = 'ProjectSidebar';

function handleProjectsStoryNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openProjectsStory();
}

function handleIssuesStoryNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openIssuesStory();
}

function handleOverviewStoryNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openOverviewStory();
}

function handleSummaryStoryNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openSummaryStory();
}

function handleIssueDetailStoryNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  openIssueDetailStory();
}

const PlaygroundLayout = styled(Layout)`
  grid-template-areas:
    'sidebar banner'
    'sidebar global-nav'
    'sidebar content';

  --echoes-severity-badge-colors-background-severity-blocker-prefix-default: ${cssVar(
    'color-status-danger-surface-hover',
  )};
  --echoes-severity-badge-colors-background-severity-blocker-suffix-default: ${cssVar(
    'color-status-danger-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-blocker-suffix-hover: ${cssVar(
    'color-status-danger-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-high-prefix-default: ${cssVar(
    'color-status-danger-surface-default',
  )};
  --echoes-severity-badge-colors-background-severity-high-suffix-default: ${cssVar(
    'color-status-danger-surface-hover',
  )};
  --echoes-severity-badge-colors-background-severity-high-suffix-hover: ${cssVar(
    'color-status-danger-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-medium-prefix-default: ${cssVar(
    'color-status-warning-surface-hover',
  )};
  --echoes-severity-badge-colors-background-severity-medium-suffix-default: ${cssVar(
    'color-status-warning-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-medium-suffix-hover: ${cssVar(
    'color-status-warning-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-low-prefix-default: ${cssVar(
    'color-status-warning-surface-default',
  )};
  --echoes-severity-badge-colors-background-severity-low-suffix-default: ${cssVar(
    'color-status-warning-surface-hover',
  )};
  --echoes-severity-badge-colors-background-severity-low-suffix-hover: ${cssVar(
    'color-status-warning-surface-pressed',
  )};
  --echoes-severity-badge-colors-background-severity-info-prefix-default: ${cssVar(
    'color-status-information-surface-default',
  )};
  --echoes-severity-badge-colors-background-severity-info-suffix-default: ${cssVar(
    'color-status-information-surface-hover',
  )};
  --echoes-severity-badge-colors-background-severity-info-suffix-hover: ${cssVar(
    'color-status-information-surface-pressed',
  )};

  --echoes-severity-badge-colors-foreground-blocker-icon-default: ${cssVar(
    'color-status-danger-foreground',
  )};
  --echoes-severity-badge-colors-foreground-blocker-text-default: ${cssVar(
    'color-status-danger-foreground',
  )};
  --echoes-severity-badge-colors-foreground-high-icon-default: ${cssVar(
    'color-status-danger-foreground',
  )};
  --echoes-severity-badge-colors-foreground-high-text-default: ${cssVar(
    'color-status-danger-foreground',
  )};
  --echoes-severity-badge-colors-foreground-medium-icon-default: ${cssVar(
    'color-status-warning-foreground',
  )};
  --echoes-severity-badge-colors-foreground-medium-text-default: ${cssVar(
    'color-status-warning-foreground',
  )};
  --echoes-severity-badge-colors-foreground-low-icon-default: ${cssVar(
    'color-status-warning-foreground',
  )};
  --echoes-severity-badge-colors-foreground-low-text-default: ${cssVar(
    'color-status-warning-foreground',
  )};
  --echoes-severity-badge-colors-foreground-info-icon-default: ${cssVar(
    'color-status-information-foreground',
  )};
  --echoes-severity-badge-colors-foreground-info-text-default: ${cssVar(
    'color-status-information-foreground',
  )};

  --echoes-severity-badge-colors-borders-blocker-default: ${cssVar('color-status-danger-border')};
  --echoes-severity-badge-colors-borders-high-default: ${cssVar('color-status-danger-border')};
  --echoes-severity-badge-colors-borders-medium-default: ${cssVar('color-status-warning-border')};
  --echoes-severity-badge-colors-borders-low-default: ${cssVar('color-status-warning-border')};
  --echoes-severity-badge-colors-borders-info-default: ${cssVar('color-status-information-border')};

  &&,
  && *:not([aria-hidden='true']) {
    font-family: 'Geist', ${cssVar('font-family-sans')};
  }

  html[data-echoes-theme='light'] & {
    --echoes-color-icon-subtle: ${cssVar('color-text-subtle')};
    --echoes-color-text-subtle: ${cssVar('color-text-disabled')};
    --echoes-input-colors-background-default: ${cssVar('color-surface-default')};
    --echoes-input-colors-background-hover: ${cssVar('color-surface-default')};
  }

  --echoes-layout-global-navigation-sizes-height-default: ${cssVar('dimension-space-600')};
`;

PlaygroundLayout.displayName = 'PlaygroundLayout';

const playgroundSurfaceStyles = css`
  @font-face {
    font-family: 'Geist';
    src: url('https://unpkg.com/geist@1.7.2/dist/fonts/geist-sans/Geist-Variable.woff2')
      format('woff2');
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
  }

  .echoes-overlays-portal {
    --echoes-input-colors-background-default: var(--echoes-color-surface-default);
  }
`;

const PlaygroundContentGrid = styled(Layout.ContentGrid)`
  html[data-echoes-theme='light'] [data-echoes-surface-layout='gray-sidebar'] & {
    --echoes-color-surface-canvas-default: ${cssVar('color-roles-support-white')};
  }

  html[data-echoes-theme='light'] [data-echoes-surface-layout='gray-canvas'] & {
    --echoes-color-surface-canvas-default: #f5f5f5;
  }
`;

PlaygroundContentGrid.displayName = 'PlaygroundContentGrid';

const PlaygroundGlobalNavigation = styled(Layout.GlobalNavigation)`
  box-sizing: border-box;
  padding-left: ${cssVar('dimension-space-200')};

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }

  & ul a {
    font: ${cssVar('typography-others-label-medium')};
  }

  [data-sidebar-docked='true'] & [data-testid='global-navigation-sidebar-trigger-area'] {
    display: none;
  }
`;

PlaygroundGlobalNavigation.displayName = 'PlaygroundGlobalNavigation';

const PlaygroundSidebarNavigation = styled(Layout.SidebarNavigation)`
  html[data-echoes-theme='light'] &,
  html[data-echoes-theme='dark'] & {
    /* Website-aligned Gray 2 background with Gray 12 content. */
    --echoes-color-surface-default: ${cssVar('color-surface-canvas-default')};
    --echoes-color-text-default: ${cssVar('color-text-strong')};
    --echoes-color-text-subtle: ${cssVar('color-text-strong')};
    --echoes-color-icon-default: ${cssVar('color-icon-bold')};
    --echoes-color-icon-subtle: ${cssVar('color-icon-bold')};
    --echoes-navigation-item-colors-foreground-default: ${cssVar('color-text-strong')};
    --echoes-navigation-item-colors-foreground-selected: ${cssVar('color-text-strong')};
    --echoes-navigation-item-colors-foreground-subtle: ${cssVar('color-text-strong')};

    /* Gray 5 selected, progressing to Gray 6/7 for interaction feedback. */
    --echoes-navigation-item-colors-background-selected: ${cssVar('color-border-weaker')};
    --echoes-navigation-item-colors-background-selected-hover: ${cssVar('color-border-weak')};
    --playground-sidebar-item-background-selected-pressed: ${cssVar('color-border-bold')};
  }
`;

PlaygroundSidebarNavigation.displayName = 'PlaygroundSidebarNavigation';

const PlaygroundSidebarHeader = styled(Layout.SidebarNavigation.Header)`
  box-sizing: border-box;
  padding: ${cssVar('dimension-space-100')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  & > :first-child {
    padding: ${cssVar('dimension-space-75')};
  }

  & > :first-child > span[aria-hidden='true'] {
    color: ${cssVar('color-icon-subtle')};
    font-size: ${cssVar('font-size-30')};
    height: ${cssVar('dimension-height-400')};
    line-height: ${cssVar('dimension-height-400')};
    width: ${cssVar('dimension-width-200')};
  }
`;

PlaygroundSidebarHeader.displayName = 'PlaygroundSidebarHeader';

const SidebarOrganizationAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  color: ${cssVar('color-icon-subtle')};
  background-color: ${cssVar('color-background-neutral-subtle-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-200')};

  & > span[aria-hidden='true'] {
    font-size: ${cssVar('font-size-30')};
    height: ${cssVar('dimension-height-400')};
    line-height: ${cssVar('dimension-height-400')};
    width: ${cssVar('dimension-width-200')};
  }
`;

SidebarOrganizationAvatar.displayName = 'SidebarOrganizationAvatar';

const SidebarProjectAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  color: ${cssVar('color-feature-foreground')};
  background-color: ${cssVar('color-feature-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-feature-border')};
  border-radius: ${cssVar('border-radius-200')};
  font: ${cssVar('typography-text-small-semi-bold')};
`;

SidebarProjectAvatar.displayName = 'SidebarProjectAvatar';

const PlaygroundPrimaryGroup = styled.li`
  all: unset;
  display: block;
`;

PlaygroundPrimaryGroup.displayName = 'PlaygroundPrimaryGroup';

const PlaygroundPrimaryGroupList = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
`;

PlaygroundPrimaryGroupList.displayName = 'PlaygroundPrimaryGroupList';

const sidebarLeadingIconStyles = css`
  & > span[aria-hidden='true']:first-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 ${cssVar('dimension-width-250')};

    color: ${cssVar('color-icon-subtle')};
    font-size: ${cssVar('font-size-30')};
    height: ${cssVar('dimension-height-500')};
    line-height: ${cssVar('dimension-height-500')};
    width: ${cssVar('dimension-width-250')};
  }
`;

const PlaygroundSidebarItem = styled(Layout.SidebarNavigation.Item)`
  ${sidebarLeadingIconStyles}

  gap: ${cssVar('dimension-space-75')};
  padding: ${cssVar('dimension-space-75')};

  &&.active {
    font-weight: ${cssVar('font-weight-medium')};

    &:active {
      background-color: var(--playground-sidebar-item-background-selected-pressed);
    }

    & > span[aria-hidden='true']:first-child {
      color: currentColor;
    }
  }
`;

PlaygroundSidebarItem.displayName = 'PlaygroundSidebarItem';

const PlaygroundSidebarAccordionItem = styled(Layout.SidebarNavigation.AccordionItem)`
  ${sidebarLeadingIconStyles}

  gap: ${cssVar('dimension-space-75')};
  padding: ${cssVar('dimension-space-75')};

  & > span[aria-hidden='true']:last-child {
    flex: 0 0 ${cssVar('dimension-width-200')};
    color: ${cssVar('color-icon-subtle')};
    font-size: ${cssVar('font-size-30')};
    height: ${cssVar('dimension-height-400')};
    line-height: ${cssVar('dimension-height-400')};
    width: ${cssVar('dimension-width-200')};
  }
`;

PlaygroundSidebarAccordionItem.displayName = 'PlaygroundSidebarAccordionItem';

const PlaygroundSidebarAccordionChildItem = styled(Layout.SidebarNavigation.AccordionItem.Item)`
  padding: ${cssVar('dimension-space-75')};
`;

PlaygroundSidebarAccordionChildItem.displayName = 'PlaygroundSidebarAccordionChildItem';

const SidebarBrandRow = styled(Layout.GlobalNavigation.Primary)`
  box-sizing: border-box;
  justify-content: space-between;
  height: ${cssVar('dimension-space-600')};
  width: 100%;
  padding: 0 ${cssVar('dimension-space-100')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  [data-testid='global-navigation-sidebar-trigger-area'] button {
    --button-color: ${cssVar('color-icon-subtle')};
  }

  [data-testid='global-navigation-sidebar-trigger-area'] span[aria-hidden='true'] {
    font-size: ${cssVar('font-size-30')};
    height: ${cssVar('dimension-height-400')};
    line-height: ${cssVar('dimension-height-400')};
    width: ${cssVar('dimension-width-200')};
  }

  & > :first-child {
    order: 2;
  }

  & > :nth-child(2) {
    order: 1;
  }

  & > :nth-child(2) > :first-child {
    padding: 0;
  }

  & > :nth-child(2) > :first-child > :first-child {
    padding: 0 0 0 ${cssVar('dimension-space-100')};
  }

  & > :last-child {
    display: none;
  }
`;

SidebarBrandRow.displayName = 'SidebarBrandRow';

const SidebarLogo = styled(LogoSonarQubeCloud)`
  height: ${cssVar('dimension-height-600')};
`;

SidebarLogo.displayName = 'SidebarLogo';

const SidebarUpgradeButton = styled(Button)`
  && {
    --button-color: ${cssVar('color-feature-on-solid')};
    --button-background: ${cssVar('color-feature-solid-default')};
    --button-background-hover: ${cssVar('color-feature-solid-hover')};
    --button-background-active: ${cssVar('color-feature-solid-pressed')};
    --button-background-focus: ${cssVar('color-feature-solid-default')};
    --spinner-color-override: ${cssVar('color-feature-on-solid')};
  }

  justify-content: center;
  width: 100%;
`;

SidebarUpgradeButton.displayName = 'SidebarUpgradeButton';

const productHeaderStyles = css`
  padding: ${cssVar('dimension-space-200')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  & > :first-child {
    margin-bottom: ${cssVar('dimension-space-50')};
  }

  & > :nth-child(2) {
    gap: ${cssVar('dimension-space-75')};
  }
`;

export const ProductContentHeader = styled(Layout.ContentHeader)`
  ${productHeaderStyles}

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }

  html[data-echoes-theme='light'] *:has(> &) {
    background-color: ${cssVar('color-roles-support-white')};
  }
`;

ProductContentHeader.displayName = 'ProductContentHeader';

export const ProductPageDescription = styled(Layout.ContentHeader.Description)`
  color: ${cssVar('color-text-subtle')};
`;

ProductPageDescription.displayName = 'ProductPageDescription';

export const ProductGlobalNavigationBreadcrumbs = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

ProductGlobalNavigationBreadcrumbs.displayName = 'ProductGlobalNavigationBreadcrumbs';

const AccountAvatar = styled.span`
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  border-radius: ${cssVar('border-radius-300')};
  color: ${cssVar('color-decorative-avatar-purple-foreground')};
  background: ${cssVar('color-decorative-avatar-purple-background')};
  font: ${cssVar('typography-text-small-semi-bold')};
`;

AccountAvatar.displayName = 'AccountAvatar';

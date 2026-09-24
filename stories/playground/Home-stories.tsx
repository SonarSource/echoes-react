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
  BadgeVariety,
  Button,
  ButtonSize,
  ButtonVariety,
  Card,
  CardSize,
  cssVar,
  IconStar,
  Layout,
  LinkStandalone,
  Text,
} from '../../src';
import { HomeShell } from './ProductShell';

const meta: Meta = {
  title: 'Playground/Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  render: () => <HomePage />,
};

const FAVORITE_PROJECTS = [
  {
    gate: 'Passed',
    language: 'TypeScript',
    name: 'echoes-react',
    organization: 'SonarSource',
    updated: 'Analyzed 2 days ago',
  },
  {
    gate: 'Failed',
    language: 'TypeScript, CSS',
    name: 'sonarcloud-webapp',
    organization: 'SonarSource',
    updated: 'Analyzed 3 days ago',
  },
  {
    gate: 'Passed',
    language: 'Java, TypeScript',
    name: 'sonarqube',
    organization: 'SonarSource',
    updated: 'Analyzed 9 days ago',
  },
] as const;

function HomePage() {
  return (
    <HomeShell>
      <Layout.PageGrid>
        <HomePageHeader
          description={
            <Layout.PageHeader.Description>
              Your projects and work across SonarQube Cloud.
            </Layout.PageHeader.Description>
          }
          navigation={
            <Layout.PageHeader.Navigation>
              <Layout.PageHeader.NavigationItem isActive to="#favorite-projects">
                Favorite projects
              </Layout.PageHeader.NavigationItem>
              <Layout.PageHeader.NavigationItem isActive={false} to="#assigned-issues">
                Assigned issues
              </Layout.PageHeader.NavigationItem>
              <Layout.PageHeader.NavigationItem isActive={false} to="#portfolios">
                Portfolios
              </Layout.PageHeader.NavigationItem>
              <Layout.PageHeader.NavigationItem isActive={false} to="#explore">
                Explore
              </Layout.PageHeader.NavigationItem>
            </Layout.PageHeader.Navigation>
          }
          title={<Layout.PageHeader.Title headingLevel="h1">Home</Layout.PageHeader.Title>}
        />

        <HomePageContent>
          <FavoriteProjectsCard size={CardSize.Medium}>
            <Card.Header
              description="Projects you follow across organizations"
              hasDivider
              rightContent={
                <Button
                  size={ButtonSize.Medium}
                  to="/iframe.html?id=playground-projects--organization-projects&viewMode=story"
                  variety={ButtonVariety.DefaultGhost}>
                  View all projects
                </Button>
              }
              title="Favorite projects"
            />
            <Card.Body insetContent>
              <FavoriteProjectList>
                {FAVORITE_PROJECTS.map((project) => (
                  <FavoriteProjectRow key={project.name}>
                    <FavoriteIcon aria-hidden>
                      <IconStar isFilled />
                    </FavoriteIcon>
                    <FavoriteProjectIdentity>
                      <LinkStandalone to={`/projects/${project.name}`}>
                        {project.name}
                      </LinkStandalone>
                      <ProjectContext>
                        {project.organization} · {project.language}
                      </ProjectContext>
                    </FavoriteProjectIdentity>
                    <ProjectAnalysis>{project.updated}</ProjectAnalysis>
                    <Badge
                      variety={
                        project.gate === 'Passed' ? BadgeVariety.Success : BadgeVariety.Danger
                      }>
                      {project.gate}
                    </Badge>
                  </FavoriteProjectRow>
                ))}
              </FavoriteProjectList>
            </Card.Body>
          </FavoriteProjectsCard>
        </HomePageContent>
      </Layout.PageGrid>
    </HomeShell>
  );
}

const HomePageHeader = styled(Layout.PageHeader)`
  background-color: ${cssVar('color-surface-default')};
`;

HomePageHeader.displayName = 'HomePageHeader';

const HomePageContent = styled(Layout.PageContent)`
  display: grid;
  align-content: start;
`;

HomePageContent.displayName = 'HomePageContent';

const FavoriteProjectsCard = styled(Card)`
  width: 100%;
`;

FavoriteProjectsCard.displayName = 'FavoriteProjectsCard';

const FavoriteProjectList = styled.ul`
  all: unset;
  display: block;
`;

FavoriteProjectList.displayName = 'FavoriteProjectList';

const FavoriteProjectRow = styled.li`
  display: grid;
  grid-template-columns: min-content minmax(12rem, 1fr) auto auto;
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-height: ${cssVar('dimension-height-1000')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-200')};

  &:not(:last-child) {
    border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }
`;

FavoriteProjectRow.displayName = 'FavoriteProjectRow';

const FavoriteIcon = styled.span`
  display: inline-flex;
  color: ${cssVar('color-icon-subtle')};
`;

FavoriteIcon.displayName = 'FavoriteIcon';

const FavoriteProjectIdentity = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-25')};
  min-width: 0;
`;

FavoriteProjectIdentity.displayName = 'FavoriteProjectIdentity';

const ProjectContext = styled(Text)`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

ProjectContext.displayName = 'ProjectContext';

const ProjectAnalysis = styled(Text)`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;
`;

ProjectAnalysis.displayName = 'ProjectAnalysis';

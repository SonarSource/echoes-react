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
import { useState, type ReactNode } from 'react';
import {
  Badge,
  BadgeVariety,
  Button,
  ButtonIcon,
  ButtonSize,
  ButtonVariety,
  Card,
  CardSize,
  cssVar,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconLinkExternal,
  IconStar,
  IconWarning,
  Layout,
} from '../../src';
import { ProductContentHeader, ProjectShell } from './ProductShell';

const meta: Meta = {
  title: 'Playground/Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProjectOverview: Story = {
  render: () => <OverviewPage />,
};

function OverviewPage() {
  const [isSecuritySnapshotOpen, setIsSecuritySnapshotOpen] = useState(true);

  return (
    <ProjectShell>
      <ProductContentHeader
        actions={
          <Layout.ContentHeader.Actions>
            <Button
              size={ButtonSize.Medium}
              suffix={<IconChevronDown />}
              variety={ButtonVariety.Default}>
              Downloadable reports
            </Button>
            <Button
              prefix={<IconLinkExternal />}
              size={ButtonSize.Medium}
              to="https://github.com/SonarSource/echoes-react"
              variety={ButtonVariety.Default}>
              View on GitHub
            </Button>
            <ButtonIcon
              Icon={IconStar}
              ariaLabel="Add project to favorites"
              size={ButtonSize.Medium}
              variety={ButtonVariety.Default}
            />
          </Layout.ContentHeader.Actions>
        }
        breadcrumbs={
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Sonar-UX-Testing', to: '/organization' },
              { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/projects' },
              { linkElement: 'AI Eval Journey Visualization', to: '/projects/ai-eval-journey-viz' },
              { linkElement: 'Overview' },
            ]}
          />
        }
        metadata={
          <Layout.ContentHeader.Metadata>
            <Badge variety={BadgeVariety.Neutral}>Private</Badge>
            <MetadataSeparator aria-hidden>•</MetadataSeparator>
            <span>No tags</span>
            <MetadataSeparator aria-hidden>•</MetadataSeparator>
            <span>550 Lines of Code</span>
            <MetadataSeparator aria-hidden>•</MetadataSeparator>
            <span>Last analysis 2 hours ago</span>
            <Badge IconLeft={IconWarning} variety={BadgeVariety.Warning}>
              1 analysis warning
            </Badge>
          </Layout.ContentHeader.Metadata>
        }
        title={<Layout.ContentHeader.Title headingLevel="h1">Overview</Layout.ContentHeader.Title>}
      />

      <Layout.PageGrid width="fluid">
        <OverviewPageContent>
          <DashboardIntro>
            <DashboardIntroText>
              <DashboardTitle>Project health dashboard</DashboardTitle>
              <DashboardDescription>
                Explore branch health, quality trends, and the risks that need attention.
              </DashboardDescription>
            </DashboardIntroText>
            <Button size={ButtonSize.Medium} variety={ButtonVariety.Default}>
              View all dashboards
            </Button>
          </DashboardIntro>

          <MetricDashboard aria-label="Project health metrics">
            <MetricPanel
              context="Overall code"
              indicator={
                <Badge IconLeft={IconCheck} isIconFilled variety={BadgeVariety.Success}>
                  All clear
                </Badge>
              }
              summary="All conditions passed"
              title="Quality gate status"
              value="Passed"
            />

            <MetricPanel
              context="Overall code · Status: Open"
              indicator={<Badge variety={BadgeVariety.Warning}>5 high impact</Badge>}
              summary="Issues need review"
              title="Open issues"
              value="15"
            />

            <MetricPanel
              context="Overall code · Last 30 days"
              indicator={<Badge variety={BadgeVariety.Neutral}>No change</Badge>}
              summary="No duplicated blocks detected"
              title="Duplications"
              value="0.0%"
            />

            <MetricPanel
              context="Overall code · Since last analysis"
              indicator={<Badge variety={BadgeVariety.Success}>+2.1%</Badge>}
              summary="Coverage increased"
              title="Coverage"
              value="82.4%"
              visual={
                <CoverageProgress
                  aria-label="Coverage 82.4 percent"
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={82.4}
                  role="progressbar">
                  <span />
                </CoverageProgress>
              }
            />
          </MetricDashboard>

          <SecuritySnapshotSection aria-labelledby="security-snapshot-title">
            <SecuritySnapshotHeader>
              <DashboardTitle id="security-snapshot-title">Security snapshot</DashboardTitle>
              <ButtonIcon
                Icon={isSecuritySnapshotOpen ? IconChevronUp : IconChevronDown}
                aria-expanded={isSecuritySnapshotOpen}
                ariaLabel={
                  isSecuritySnapshotOpen ? 'Collapse security snapshot' : 'Expand security snapshot'
                }
                onClick={() => setIsSecuritySnapshotOpen((isOpen) => !isOpen)}
                size={ButtonSize.Medium}
                variety={ButtonVariety.DefaultGhost}
              />
            </SecuritySnapshotHeader>

            {isSecuritySnapshotOpen && (
              <SecurityMetricGrid aria-label="Security metrics">
                <MetricPanel
                  context="Overall code"
                  indicator={<Badge variety={BadgeVariety.Success}>No change</Badge>}
                  summary="Security rating"
                  title="Security rating"
                  value="A"
                />

                <MetricPanel
                  context="Overall code · Software quality: Security"
                  indicator={<Badge variety={BadgeVariety.Warning}>1 open</Badge>}
                  summary="Security issue needs review"
                  title="Security issues"
                  value="1"
                />

                <MetricPanel
                  context="Overall code · Slice by severity"
                  indicator={<Badge variety={BadgeVariety.Warning}>Medium</Badge>}
                  summary="Highest open severity: Medium"
                  title="Open security issues by severity"
                  value="1"
                  visual={
                    <SeveritySummary aria-label="High 0, Medium 1, Low 0">
                      <span>
                        High <strong>0</strong>
                      </span>
                      <span>
                        Medium <strong>1</strong>
                      </span>
                      <span>
                        Low <strong>0</strong>
                      </span>
                    </SeveritySummary>
                  }
                />
              </SecurityMetricGrid>
            )}
          </SecuritySnapshotSection>
        </OverviewPageContent>
      </Layout.PageGrid>
    </ProjectShell>
  );
}

OverviewPage.displayName = 'OverviewPage';

function MetricPanel({
  context,
  indicator,
  summary,
  title,
  value,
  visual,
}: Readonly<{
  context: string;
  indicator?: ReactNode;
  summary: string;
  title: string;
  value: ReactNode;
  visual?: ReactNode;
}>) {
  return (
    <MetricPanelRoot size={CardSize.Medium}>
      <Card.Body>
        <MetricPanelLayout>
          <MetricPanelHeader>
            <MetricPanelTitle>{title}</MetricPanelTitle>
            {indicator && <MetricPanelIndicator>{indicator}</MetricPanelIndicator>}
          </MetricPanelHeader>
          <MetricValue>{value}</MetricValue>
          {visual && <MetricPanelVisual>{visual}</MetricPanelVisual>}
          <MetricPanelFooter>
            <MetricPanelSummary>{summary}</MetricPanelSummary>
            <MetricPanelContext>{context}</MetricPanelContext>
          </MetricPanelFooter>
        </MetricPanelLayout>
      </Card.Body>
    </MetricPanelRoot>
  );
}

MetricPanel.displayName = 'MetricPanel';

const MetadataSeparator = styled.span`
  color: ${cssVar('color-text-disabled')};
`;

MetadataSeparator.displayName = 'MetadataSeparator';

const OverviewPageContent = styled(Layout.PageContent)`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-300')};
  padding-block: ${cssVar('dimension-space-300')};
`;

OverviewPageContent.displayName = 'OverviewPageContent';

const DashboardIntro = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-300')};
`;

DashboardIntro.displayName = 'DashboardIntro';

const DashboardIntroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
`;

DashboardIntroText.displayName = 'DashboardIntroText';

const DashboardTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

DashboardTitle.displayName = 'DashboardTitle';

const DashboardDescription = styled.p`
  margin: 0;
  max-width: 70ch;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
`;

DashboardDescription.displayName = 'DashboardDescription';

const MetricDashboard = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-200')};

  @media (max-width: 78rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 52rem) {
    grid-template-columns: 1fr;
  }
`;

MetricDashboard.displayName = 'MetricDashboard';

const MetricPanelRoot = styled(Card)`
  min-width: 0;
  min-height: calc(${cssVar('dimension-height-1000')} * 5);
`;

MetricPanelRoot.displayName = 'MetricPanelRoot';

const MetricPanelLayout = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
`;

MetricPanelLayout.displayName = 'MetricPanelLayout';

const MetricPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-100')};
`;

MetricPanelHeader.displayName = 'MetricPanelHeader';

const MetricPanelTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

MetricPanelTitle.displayName = 'MetricPanelTitle';

const MetricPanelIndicator = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
`;

MetricPanelIndicator.displayName = 'MetricPanelIndicator';

const MetricValue = styled.strong`
  margin-top: ${cssVar('dimension-space-50')};

  color: ${cssVar('color-text-strong')};
  font-size: ${cssVar('font-size-60')};
  font-weight: ${cssVar('font-weight-semi-bold')};
  line-height: ${cssVar('line-height-50')};
  font-variant-numeric: tabular-nums;
`;

MetricValue.displayName = 'MetricValue';

const MetricPanelVisual = styled.div`
  display: flex;
  align-items: center;
  min-height: ${cssVar('dimension-height-200')};
  margin-top: ${cssVar('dimension-space-75')};
`;

MetricPanelVisual.displayName = 'MetricPanelVisual';

const MetricPanelFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-25')};
  margin-top: auto;
  padding-top: ${cssVar('dimension-space-150')};
`;

MetricPanelFooter.displayName = 'MetricPanelFooter';

const MetricPanelSummary = styled.span`
  overflow: hidden;

  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

MetricPanelSummary.displayName = 'MetricPanelSummary';

const MetricPanelContext = styled.p`
  margin: 0;
  overflow: hidden;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

MetricPanelContext.displayName = 'MetricPanelContext';

const CoverageProgress = styled.div`
  width: 100%;
  height: ${cssVar('dimension-height-100')};
  overflow: hidden;

  background-color: ${cssVar('color-background-neutral-subtle-default')};
  border-radius: ${cssVar('border-radius-full')};

  > span {
    display: block;
    width: 82.4%;
    height: 100%;
    background-color: ${cssVar('color-feature-solid-default')};
    border-radius: inherit;
  }
`;

CoverageProgress.displayName = 'CoverageProgress';

const SecuritySnapshotSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
`;

SecuritySnapshotSection.displayName = 'SecuritySnapshotSection';

const SecuritySnapshotHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

SecuritySnapshotHeader.displayName = 'SecuritySnapshotHeader';

const SecurityMetricGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-200')};

  @media (max-width: 78rem) {
    grid-template-columns: 1fr;
  }
`;

SecurityMetricGrid.displayName = 'SecurityMetricGrid';

const SeveritySummary = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-150')};

  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};

  > span {
    display: flex;
    gap: ${cssVar('dimension-space-50')};
  }

  strong {
    color: ${cssVar('color-text-strong')};
    font-weight: ${cssVar('font-weight-semi-bold')};
    font-variant-numeric: tabular-nums;
  }
`;

SeveritySummary.displayName = 'SeveritySummary';

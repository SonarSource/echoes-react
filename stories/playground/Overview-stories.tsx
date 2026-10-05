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
import { type KeyboardEvent, useState } from 'react';
import {
  Badge,
  BadgeVariety,
  Button,
  ButtonSize,
  ButtonVariety,
  Card,
  CardSize,
  cssVar,
  FormFieldWidth,
  IconArrowRight,
  IconCheckCircle,
  IconChevronDown,
  Layout,
  Link,
  RatingBadge,
  RatingBadgeRating,
  Select,
  Table,
  TableVariety,
  ToggleButtonGroup,
  ToggleTip,
} from '../../src';
import { ProductGlobalNavigationBreadcrumbs, ProjectShell } from './ProductShell';
import { ISSUE_SEVERITY_COLORS, type IssueSeverity } from './IssueSeverityColors';
import { IssueImpact } from './IssueImpact';
import { IssueSeverityIcon } from './IssueSeverityIcon';

const meta: Meta = {
  title: 'Playground/Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

type CodeScope = 'new' | 'overall';
type QualityMetricKey = 'maintainability' | 'reliability' | 'security' | 'security-hotspots';
type ChartRangeKey = '30-days' | '90-days' | '6-months' | '8-months';

interface QualityMetricData {
  chartLabel: string;
  chartValueLabel: string;
  chartValues: Record<ChartRangeKey, ReadonlyArray<number>>;
  key: QualityMetricKey;
  label: string;
  rating: `${RatingBadgeRating}`;
  supportingMetrics: ReadonlyArray<{
    helpText?: string;
    label: string;
    value: string;
  }>;
}

interface SeverityDatum {
  count: number;
  label: string;
  severity: IssueSeverity;
}

interface TopIssue {
  assignee: string;
  attribute: string;
  file: string;
  message: string;
  rule: string;
  severity: IssueSeverity;
  severityLabel: string;
  tags: ReadonlyArray<string>;
}

const QUALITY_METRICS: ReadonlyArray<QualityMetricData> = [
  {
    chartLabel: 'Issues closed over time',
    chartValueLabel: 'issues closed',
    chartValues: {
      '30-days': [0, 1, 0, 1],
      '90-days': [3, 3, 2],
      '6-months': [2, 4, 3, 4, 3, 2],
      '8-months': [2, 3, 2, 4, 3, 4, 3, 2],
    },
    key: 'security',
    label: 'Security',
    rating: RatingBadgeRating.A,
    supportingMetrics: [
      { label: 'Security issues', value: '271' },
      { label: 'Open issues', value: '248' },
      {
        helpText: 'The average time between opening and resolving a security issue.',
        label: 'Security MTTR',
        value: '4h 12m',
      },
      {
        helpText: 'The total number of security issues resolved in this analysis scope.',
        label: 'Issues closed',
        value: '23',
      },
    ],
  },
  {
    chartLabel: 'Hotspots reviewed over time',
    chartValueLabel: 'hotspots reviewed',
    chartValues: {
      '30-days': [0, 1, 0, 1],
      '90-days': [2, 2, 2],
      '6-months': [1, 3, 2, 2, 2, 2],
      '8-months': [1, 2, 1, 3, 2, 2, 2, 2],
    },
    key: 'security-hotspots',
    label: 'Security hotspots',
    rating: RatingBadgeRating.A,
    supportingMetrics: [
      { label: 'Security hotspots', value: '18' },
      { label: 'To review', value: '3' },
      { label: 'Review MTTR', value: '2h 18m' },
      { label: 'Hotspots reviewed', value: '15' },
    ],
  },
  {
    chartLabel: 'Reliability issues closed over time',
    chartValueLabel: 'issues closed',
    chartValues: {
      '30-days': [1, 2, 1, 1],
      '90-days': [5, 5, 5],
      '6-months': [3, 6, 4, 5, 5, 5],
      '8-months': [4, 5, 3, 6, 4, 5, 5, 5],
    },
    key: 'reliability',
    label: 'Reliability',
    rating: RatingBadgeRating.A,
    supportingMetrics: [
      { label: 'Reliability issues', value: '42' },
      { label: 'Open issues', value: '5' },
      { label: 'Reliability MTTR', value: '18h' },
      { label: 'Issues closed', value: '37' },
    ],
  },
  {
    chartLabel: 'Maintainability issues closed over time',
    chartValueLabel: 'issues closed',
    chartValues: {
      '30-days': [2, 2, 3, 1],
      '90-days': [11, 9, 8],
      '6-months': [7, 12, 9, 11, 9, 8],
      '8-months': [8, 10, 7, 12, 9, 11, 9, 8],
    },
    key: 'maintainability',
    label: 'Maintainability',
    rating: RatingBadgeRating.A,
    supportingMetrics: [
      { label: 'Maintainability issues', value: '86' },
      { label: 'Open issues', value: '12' },
      { label: 'Remediation effort', value: '3d 4h' },
      { label: 'Issues closed', value: '74' },
    ],
  },
];

const CHART_RANGES: Record<
  ChartRangeKey,
  {
    axisLabels: ReadonlyArray<{ ariaLabel: string; label: string }>;
    description: string;
    label: string;
  }
> = {
  '30-days': {
    axisLabels: [
      { ariaLabel: 'August 1', label: 'Aug 1' },
      { ariaLabel: 'August 8', label: 'Aug 8' },
      { ariaLabel: 'August 15', label: 'Aug 15' },
      { ariaLabel: 'August 22', label: 'Aug 22' },
    ],
    description: 'Last 30 days',
    label: '30 days',
  },
  '90-days': {
    axisLabels: [
      { ariaLabel: 'June', label: 'Jun' },
      { ariaLabel: 'July', label: 'Jul' },
      { ariaLabel: 'August', label: 'Aug' },
    ],
    description: 'Last 90 days',
    label: '90 days',
  },
  '6-months': {
    axisLabels: [
      { ariaLabel: 'March', label: 'Mar' },
      { ariaLabel: 'April', label: 'Apr' },
      { ariaLabel: 'May', label: 'May' },
      { ariaLabel: 'June', label: 'Jun' },
      { ariaLabel: 'July', label: 'Jul' },
      { ariaLabel: 'August', label: 'Aug' },
    ],
    description: 'Last 6 months',
    label: '6 months',
  },
  '8-months': {
    axisLabels: [
      { ariaLabel: 'January', label: 'Jan' },
      { ariaLabel: 'February', label: 'Feb' },
      { ariaLabel: 'March', label: 'Mar' },
      { ariaLabel: 'April', label: 'Apr' },
      { ariaLabel: 'May', label: 'May' },
      { ariaLabel: 'June', label: 'Jun' },
      { ariaLabel: 'July', label: 'Jul' },
      { ariaLabel: 'August', label: 'Aug' },
    ],
    description: 'January–August',
    label: '8 months',
  },
};

const CHART_RANGE_OPTIONS = Object.entries(CHART_RANGES).map(([value, { label }]) => ({
  label,
  value,
}));

const OVERVIEW_METRICS = [
  { label: 'Quality gate', value: 'Passed' },
  { label: 'Open issues', value: '265' },
  { label: 'Duplications', value: '0.0%' },
  { label: 'Coverage', value: '82.4%' },
] as const;

const NEW_CODE_OVERVIEW_METRICS = [
  { label: 'Quality gate', value: 'Passed' },
  { label: 'Open issues', value: '18' },
  { label: 'Duplications', value: '0.0%' },
  { label: 'Coverage', value: '88.6%' },
] as const;

type OverviewMetricLabel = (typeof OVERVIEW_METRICS)[number]['label'];

const OVERVIEW_METRIC_DESTINATIONS: Partial<Record<OverviewMetricLabel, string>> = {
  Coverage: '/measures?metric=coverage',
  Duplications: '/measures?metric=duplicated_lines_density',
  'Open issues': '/project-issues',
};

const CODE_SCOPE_LABELS: Record<CodeScope, string> = {
  new: 'New code',
  overall: 'Overall code',
};

const NEW_CODE_SUPPORTING_METRIC_VALUES: Record<QualityMetricKey, ReadonlyArray<string>> = {
  maintainability: ['21', '4', '12h', '17'],
  reliability: ['8', '2', '4h', '6'],
  security: ['12', '9', '1h 34m', '3'],
  'security-hotspots': ['4', '1', '38m', '3'],
};

const OPEN_SECURITY_ISSUES_BY_SEVERITY: ReadonlyArray<SeverityDatum> = [
  { count: 8, label: 'Blocker', severity: 'blocker' },
  { count: 32, label: 'High', severity: 'high' },
  { count: 74, label: 'Medium', severity: 'medium' },
  { count: 91, label: 'Low', severity: 'low' },
  { count: 43, label: 'Info', severity: 'info' },
];

const NEW_CODE_OPEN_SECURITY_ISSUES_BY_SEVERITY: typeof OPEN_SECURITY_ISSUES_BY_SEVERITY = [
  { count: 0, label: 'Blocker', severity: 'blocker' },
  { count: 1, label: 'High', severity: 'high' },
  { count: 3, label: 'Medium', severity: 'medium' },
  { count: 4, label: 'Low', severity: 'low' },
  { count: 1, label: 'Info', severity: 'info' },
];

const TOP_SECURITY_ISSUES: ReadonlyArray<TopIssue> = [
  {
    assignee: 'Remediation agent',
    attribute: 'Intentionality',
    file: 'src/db/query.ts',
    message: 'Make sure this dynamically formatted SQL query is safe.',
    rule: 'typescript:S2077',
    severity: 'blocker',
    severityLabel: 'Blocker',
    tags: ['injection', 'cwe'],
  },
  {
    assignee: 'M. Dupont',
    attribute: 'Intentionality',
    file: 'src/auth/password.ts',
    message: 'Use a stronger hashing algorithm for stored credentials.',
    rule: 'typescript:S4790',
    severity: 'high',
    severityLabel: 'High',
    tags: ['cryptography', 'owasp'],
  },
  {
    assignee: 'Unassigned',
    attribute: 'Intentionality',
    file: 'src/api/client.ts',
    message: 'Make sure disabling certificate validation is safe.',
    rule: 'typescript:S5527',
    severity: 'medium',
    severityLabel: 'Medium',
    tags: ['certificates', 'network'],
  },
  {
    assignee: 'L. Martin',
    attribute: 'Intentionality',
    file: 'src/server/security.ts',
    message: 'Review this permissive Content Security Policy.',
    rule: 'typescript:S5725',
    severity: 'low',
    severityLabel: 'Low',
    tags: ['csp', 'web'],
  },
  {
    assignee: 'Remediation agent',
    attribute: 'Intentionality',
    file: 'src/crypto/config.ts',
    message: 'Document why this cryptographic key is hard-coded.',
    rule: 'typescript:S6418',
    severity: 'info',
    severityLabel: 'Info',
    tags: ['cryptography', 'review'],
  },
];

const OVERALL_ISSUES_BY_SEVERITY: Record<QualityMetricKey, ReadonlyArray<SeverityDatum>> = {
  maintainability: [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 2, label: 'High', severity: 'high' },
    { count: 4, label: 'Medium', severity: 'medium' },
    { count: 5, label: 'Low', severity: 'low' },
    { count: 1, label: 'Info', severity: 'info' },
  ],
  reliability: [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 1, label: 'High', severity: 'high' },
    { count: 2, label: 'Medium', severity: 'medium' },
    { count: 2, label: 'Low', severity: 'low' },
    { count: 0, label: 'Info', severity: 'info' },
  ],
  security: OPEN_SECURITY_ISSUES_BY_SEVERITY,
  'security-hotspots': [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 1, label: 'High', severity: 'high' },
    { count: 1, label: 'Medium', severity: 'medium' },
    { count: 1, label: 'Low', severity: 'low' },
    { count: 0, label: 'Info', severity: 'info' },
  ],
};

const NEW_CODE_ISSUES_BY_SEVERITY: Record<QualityMetricKey, ReadonlyArray<SeverityDatum>> = {
  maintainability: [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 1, label: 'High', severity: 'high' },
    { count: 1, label: 'Medium', severity: 'medium' },
    { count: 2, label: 'Low', severity: 'low' },
    { count: 0, label: 'Info', severity: 'info' },
  ],
  reliability: [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 0, label: 'High', severity: 'high' },
    { count: 1, label: 'Medium', severity: 'medium' },
    { count: 1, label: 'Low', severity: 'low' },
    { count: 0, label: 'Info', severity: 'info' },
  ],
  security: NEW_CODE_OPEN_SECURITY_ISSUES_BY_SEVERITY,
  'security-hotspots': [
    { count: 0, label: 'Blocker', severity: 'blocker' },
    { count: 1, label: 'High', severity: 'high' },
    { count: 0, label: 'Medium', severity: 'medium' },
    { count: 0, label: 'Low', severity: 'low' },
    { count: 0, label: 'Info', severity: 'info' },
  ],
};

const TOP_ISSUES_BY_METRIC: Record<QualityMetricKey, ReadonlyArray<TopIssue>> = {
  maintainability: [
    {
      assignee: 'Remediation agent',
      attribute: 'Consistency',
      file: 'src/services/report.ts',
      message: 'Refactor this function to reduce its cognitive complexity.',
      rule: 'typescript:S3776',
      severity: 'high',
      severityLabel: 'High',
      tags: ['brain-overload', 'refactoring'],
    },
    {
      assignee: 'M. Dupont',
      attribute: 'Focused',
      file: 'src/utils/format.ts',
      message: 'Remove this duplicated branch and reuse the shared formatter.',
      rule: 'typescript:S1871',
      severity: 'medium',
      severityLabel: 'Medium',
      tags: ['duplicate', 'maintainability'],
    },
    {
      assignee: 'Unassigned',
      attribute: 'Clear',
      file: 'src/components/Panel.tsx',
      message: 'Replace this nested conditional with a clearer expression.',
      rule: 'typescript:S3358',
      severity: 'low',
      severityLabel: 'Low',
      tags: ['readability', 'react'],
    },
  ],
  reliability: [
    {
      assignee: 'Remediation agent',
      attribute: 'Complete',
      file: 'src/api/retry.ts',
      message: 'Handle this rejected promise or return it to the caller.',
      rule: 'typescript:S6544',
      severity: 'high',
      severityLabel: 'High',
      tags: ['async', 'error-handling'],
    },
    {
      assignee: 'L. Martin',
      attribute: 'Logical',
      file: 'src/cache/store.ts',
      message: 'Avoid dereferencing this value before checking it for null.',
      rule: 'typescript:S2259',
      severity: 'medium',
      severityLabel: 'Medium',
      tags: ['nullability', 'runtime'],
    },
    {
      assignee: 'Unassigned',
      attribute: 'Complete',
      file: 'src/jobs/worker.ts',
      message: 'Handle this exception or do not catch it at all.',
      rule: 'typescript:S2486',
      severity: 'low',
      severityLabel: 'Low',
      tags: ['exceptions', 'reliability'],
    },
  ],
  security: TOP_SECURITY_ISSUES,
  'security-hotspots': [
    {
      assignee: 'Security reviewer',
      attribute: 'Intentionality',
      file: 'src/http/cors.ts',
      message: 'Review this permissive cross-origin resource sharing policy.',
      rule: 'typescript:S5122',
      severity: 'high',
      severityLabel: 'High',
      tags: ['cors', 'review'],
    },
    {
      assignee: 'M. Dupont',
      attribute: 'Intentionality',
      file: 'src/logging/audit.ts',
      message: 'Review the information written to this security-sensitive log.',
      rule: 'typescript:S5757',
      severity: 'medium',
      severityLabel: 'Medium',
      tags: ['logging', 'privacy'],
    },
    {
      assignee: 'Unassigned',
      attribute: 'Intentionality',
      file: 'src/auth/session.ts',
      message: 'Review the lifetime configured for this user session.',
      rule: 'typescript:S5876',
      severity: 'low',
      severityLabel: 'Low',
      tags: ['authentication', 'session'],
    },
  ],
};

function getQualityMetricForScope(
  metric: QualityMetricData,
  codeScope: CodeScope,
): QualityMetricData {
  if (codeScope === 'overall') {
    return metric;
  }

  const scaleChartValues = (values: ReadonlyArray<number>) =>
    values.map((value) => (value === 0 ? 0 : Math.max(1, Math.round(value * 0.4))));

  return {
    ...metric,
    chartValues: {
      '30-days': scaleChartValues(metric.chartValues['30-days']),
      '90-days': scaleChartValues(metric.chartValues['90-days']),
      '6-months': scaleChartValues(metric.chartValues['6-months']),
      '8-months': scaleChartValues(metric.chartValues['8-months']),
    },
    supportingMetrics: metric.supportingMetrics.map((supportingMetric, index) => ({
      ...supportingMetric,
      value: NEW_CODE_SUPPORTING_METRIC_VALUES[metric.key][index] ?? supportingMetric.value,
    })),
  };
}

export const ProjectOverview: Story = {
  render: () => <OverviewPage />,
};

function OverviewPage() {
  const [selectedCodeScope, setSelectedCodeScope] = useState<CodeScope>('overall');
  const [selectedMetricKey, setSelectedMetricKey] = useState<QualityMetricKey>('security');
  const [selectedChartRange, setSelectedChartRange] = useState<ChartRangeKey>('8-months');
  const baseSelectedMetric =
    QUALITY_METRICS.find((metric) => metric.key === selectedMetricKey) ?? QUALITY_METRICS[0];
  const selectedMetric = getQualityMetricForScope(baseSelectedMetric, selectedCodeScope);
  const selectedChartValues = selectedMetric.chartValues[selectedChartRange];
  const overviewMetrics =
    selectedCodeScope === 'overall' ? OVERVIEW_METRICS : NEW_CODE_OVERVIEW_METRICS;
  const issueSeverityData =
    selectedCodeScope === 'overall'
      ? OVERALL_ISSUES_BY_SEVERITY[selectedMetricKey]
      : NEW_CODE_ISSUES_BY_SEVERITY[selectedMetricKey];
  const selectedIssues =
    selectedCodeScope === 'overall'
      ? TOP_ISSUES_BY_METRIC[selectedMetricKey]
      : TOP_ISSUES_BY_METRIC[selectedMetricKey].slice(0, 2);

  function handleMetricKeyDown(event: KeyboardEvent<HTMLButtonElement>, key: QualityMetricKey) {
    const currentIndex = QUALITY_METRICS.findIndex((metric) => metric.key === key);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % QUALITY_METRICS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + QUALITY_METRICS.length) % QUALITY_METRICS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = QUALITY_METRICS.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    const nextMetric = QUALITY_METRICS[nextIndex];
    setSelectedMetricKey(nextMetric.key);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-quality-metric="${nextMetric.key}"]`)
      ?.focus();
  }

  return (
    <ProjectShell
      globalNavigationPrimary={
        <ProductGlobalNavigationBreadcrumbs>
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Sonar-UX-Testing', to: '/organization' },
              { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/projects' },
              { linkElement: 'AI Eval Journey Visualization', to: '/projects/ai-eval-journey-viz' },
              { linkElement: 'Overview' },
            ]}
          />
        </ProductGlobalNavigationBreadcrumbs>
      }>
      <Layout.PageGrid width="default">
        <Layout.PageHeader
          actions={
            <Layout.PageHeader.Actions>
              <Button
                size={ButtonSize.Medium}
                suffix={<IconChevronDown />}
                variety={ButtonVariety.Default}>
                Download reports
              </Button>
              <Button size={ButtonSize.Medium} variety={ButtonVariety.Primary}>
                Create dashboard
              </Button>
            </Layout.PageHeader.Actions>
          }
          description={
            <CompactPageHeaderDescription>
              Explore branch health, quality trends, and the risks that need attention.
            </CompactPageHeaderDescription>
          }
          title={<Layout.PageHeader.Title headingLevel="h1">Overview</Layout.PageHeader.Title>}
        />

        <OverviewPageContent>
          <SectionGroup aria-label="Project health">
            <DashboardControls>
              <CodeScopeToolbar aria-label="Code scope">
                <ToggleButtonGroup
                  onChange={(value) => setSelectedCodeScope(value as CodeScope)}
                  options={[
                    { label: 'Overall code', value: 'overall' },
                    { label: 'New code', value: 'new' },
                  ]}
                  selected={selectedCodeScope}
                />
              </CodeScopeToolbar>
              <TrendRangeSelect
                ariaLabel="Select chart date range"
                data={CHART_RANGE_OPTIONS}
                hasDropdownAutoWidth
                isNotClearable
                onChange={(value) => {
                  if (value) {
                    setSelectedChartRange(value as ChartRangeKey);
                  }
                }}
                value={selectedChartRange}
                width={FormFieldWidth.Small}
              />
            </DashboardControls>

            <OverviewMetricGrid aria-label="Project health summary">
              {overviewMetrics.map((metric) => (
                <OverviewMetricCardItem
                  codeScope={selectedCodeScope}
                  key={metric.label}
                  metric={metric}
                />
              ))}
            </OverviewMetricGrid>
          </SectionGroup>

          <SectionGroup aria-label="Quality attributes">
            <OverviewSurfaceCard size={CardSize.Medium}>
              <Card.Body insetContent>
                <QualityMetricTabs aria-label="Software quality metrics" role="tablist">
                  {QUALITY_METRICS.map((metric) => {
                    const isSelected = metric.key === selectedMetricKey;

                    return (
                      <QualityMetricTab
                        aria-controls="quality-metric-detail-panel"
                        aria-selected={isSelected}
                        data-quality-metric={metric.key}
                        id={`quality-metric-${metric.key}-tab`}
                        key={metric.key}
                        onClick={() => setSelectedMetricKey(metric.key)}
                        onKeyDown={(event) => handleMetricKeyDown(event, metric.key)}
                        role="tab"
                        tabIndex={isSelected ? 0 : -1}
                        type="button">
                        <QualityMetricTabLabel>{metric.label}</QualityMetricTabLabel>
                        <QualityMetricTabRating>
                          <QualityMetricRatingBadge
                            ariaLabel={`${metric.label} rating ${metric.rating}`}
                            rating={metric.rating}
                            size="md"
                          />
                        </QualityMetricTabRating>
                      </QualityMetricTab>
                    );
                  })}
                </QualityMetricTabs>
              </Card.Body>
            </OverviewSurfaceCard>

            <QualityMetricDetail
              aria-labelledby={`quality-metric-${selectedMetric.key}-tab`}
              id="quality-metric-detail-panel"
              role="tabpanel">
              <OverviewSurfaceCard size={CardSize.Medium}>
                <Card.Body insetContent>
                  <SupportingMetricGrid>
                    {selectedMetric.supportingMetrics.map((metric) => (
                      <SupportingMetric key={metric.label}>
                        <SupportingMetricLabel>
                          <SupportingMetricLabelText>{metric.label}</SupportingMetricLabelText>
                          {metric.helpText && (
                            <ToggleTip
                              ariaLabel={`More information about ${metric.label}`}
                              description={metric.helpText}
                              title={metric.label}
                            />
                          )}
                        </SupportingMetricLabel>
                        <SupportingMetricValue>{metric.value}</SupportingMetricValue>
                      </SupportingMetric>
                    ))}
                  </SupportingMetricGrid>
                </Card.Body>
              </OverviewSurfaceCard>

              <TrendSection>
                <OverviewSurfaceCard size={CardSize.Medium}>
                  <Card.Body>
                    <IssueSeverityChart
                      codeScope={selectedCodeScope}
                      issues={issueSeverityData}
                      metric={selectedMetric}
                    />
                  </Card.Body>
                </OverviewSurfaceCard>

                <OverviewSurfaceCard size={CardSize.Medium}>
                  <Card.Body>
                    <TrendPanel>
                      <TrendHeader>
                        <div>
                          <TrendTitle>
                            <span>{selectedMetric.chartLabel}</span>
                            <ToggleTip
                              ariaLabel={`More information about ${selectedMetric.chartLabel}`}
                              description="Shows the selected metric across each interval of the chosen date range. Hover or focus a data point for details."
                              title={selectedMetric.chartLabel}
                            />
                          </TrendTitle>
                          <TrendTotal>
                            {selectedChartValues.reduce((sum, value) => sum + value, 0)} total
                          </TrendTotal>
                        </div>
                      </TrendHeader>

                      <QualityTrendChart metric={selectedMetric} rangeKey={selectedChartRange} />
                    </TrendPanel>
                  </Card.Body>
                </OverviewSurfaceCard>
              </TrendSection>

              <IssuesTable
                codeScope={selectedCodeScope}
                issues={selectedIssues}
                metric={selectedMetric}
              />
            </QualityMetricDetail>
          </SectionGroup>
        </OverviewPageContent>
      </Layout.PageGrid>
    </ProjectShell>
  );
}

OverviewPage.displayName = 'OverviewPage';

function OverviewMetricCardItem({
  codeScope,
  metric,
}: Readonly<{
  codeScope: CodeScope;
  metric: { label: OverviewMetricLabel; value: string };
}>) {
  const destination = OVERVIEW_METRIC_DESTINATIONS[metric.label];
  const card = (
    <OverviewMetricCard className="overview-metric-card" size={CardSize.Small}>
      <Card.Body>
        <OverviewMetric>
          <OverviewMetricLabel>{metric.label}</OverviewMetricLabel>
          {destination && (
            <OverviewMetricNavigationArrow aria-hidden="true" data-navigation-arrow>
              <IconArrowRight />
            </OverviewMetricNavigationArrow>
          )}
          <OverviewMetricValueRow>
            <OverviewMetricValue>{metric.value}</OverviewMetricValue>
            <OverviewMetricIndicatorSlot>
              <OverviewMetricIndicator codeScope={codeScope} label={metric.label} />
            </OverviewMetricIndicatorSlot>
          </OverviewMetricValueRow>
        </OverviewMetric>
      </Card.Body>
    </OverviewMetricCard>
  );

  return destination ? (
    <OverviewMetricNavigationLink aria-label={`View ${metric.label}`} to={destination}>
      {card}
    </OverviewMetricNavigationLink>
  ) : (
    card
  );
}

OverviewMetricCardItem.displayName = 'OverviewMetricCardItem';

function OverviewMetricIndicator({
  codeScope,
  label,
}: Readonly<{ codeScope: CodeScope; label: OverviewMetricLabel }>) {
  switch (label) {
    case 'Quality gate':
      return (
        <OverviewPassedIndicator aria-label="Quality gate passed" role="img">
          <IconCheckCircle color="echoes-color-icon-success" />
        </OverviewPassedIndicator>
      );
    case 'Open issues':
      return (
        <MetricDelta
          ariaLabel={`Open issues decreased ${codeScope === 'overall' ? '16.7' : '11.1'} percent since the last analysis`}
          direction="down"
          tone="success"
          value={codeScope === 'overall' ? '−16.7%' : '−11.1%'}
        />
      );
    case 'Duplications':
      return (
        <MetricDelta
          ariaLabel={`Duplications decreased ${codeScope === 'overall' ? '0.3' : '0.1'} percent since the last analysis`}
          direction="down"
          tone="success"
          value={codeScope === 'overall' ? '−0.3%' : '−0.1%'}
        />
      );
    case 'Coverage':
      return (
        <MetricDelta
          ariaLabel={`Coverage increased ${codeScope === 'overall' ? '2.1' : '4.2'} percent since the last analysis`}
          direction="up"
          tone="success"
          value={codeScope === 'overall' ? '+2.1%' : '+4.2%'}
        />
      );
  }
}

OverviewMetricIndicator.displayName = 'OverviewMetricIndicator';

type MetricDeltaTone = 'danger' | 'success';

function MetricDelta({
  ariaLabel,
  direction,
  tone,
  value,
}: Readonly<{
  ariaLabel: string;
  direction: 'down' | 'up';
  tone: MetricDeltaTone;
  value: string;
}>) {
  return (
    <MetricDeltaRoot aria-label={ariaLabel} role="img">
      <MetricDeltaIcon $tone={tone} aria-hidden="true">
        {direction === 'up' ? '↑' : '↓'}
      </MetricDeltaIcon>
      <span aria-hidden="true">{value}</span>
    </MetricDeltaRoot>
  );
}

MetricDelta.displayName = 'MetricDelta';

function IssueSeverityChart({
  codeScope,
  issues,
  metric,
}: Readonly<{
  codeScope: CodeScope;
  issues: ReadonlyArray<SeverityDatum>;
  metric: QualityMetricData;
}>) {
  const total = issues.reduce((sum, { count }) => sum + count, 0);
  const radius = 56;
  const centerX = 96;
  const centerY = 92;
  const circumference = 2 * Math.PI * radius;
  let cumulativeFraction = 0;
  const segments = issues.map((item) => {
    const fraction = total === 0 ? 0 : item.count / total;
    const segment = {
      ...item,
      dashLength: fraction * circumference,
      dashOffset: -cumulativeFraction * circumference,
      fraction,
      startFraction: cumulativeFraction,
    };
    cumulativeFraction += fraction;
    return segment;
  });
  const dominantSegment = segments.reduce((dominant, segment) =>
    segment.count > dominant.count ? segment : dominant,
  );
  const dominantAngle =
    (dominantSegment.startFraction + dominantSegment.fraction / 2) * Math.PI * 2 - Math.PI / 2;
  const calloutDirection = Math.cos(dominantAngle) >= 0 ? 1 : -1;
  const calloutStart = {
    x: centerX + Math.cos(dominantAngle) * radius,
    y: centerY + Math.sin(dominantAngle) * radius,
  };
  const calloutElbow = {
    x: centerX + Math.cos(dominantAngle) * (radius + 14),
    y: centerY + Math.sin(dominantAngle) * (radius + 14),
  };
  const calloutEndX = Math.min(Math.max(calloutElbow.x + calloutDirection * 30, 48), 212);
  const ariaLabel = `Open ${CODE_SCOPE_LABELS[codeScope].toLowerCase()} ${metric.label.toLowerCase()} issues by severity: ${issues
    .map(({ count, label }) => `${label} ${count}`)
    .join(', ')}`;
  const titleId = `issue-severity-chart-${metric.key}`;

  return (
    <IssueSeveritySection aria-labelledby={titleId}>
      <TrendHeader>
        <TrendTitle id={titleId}>Open issues by severity</TrendTitle>
      </TrendHeader>

      <SeverityDonutLayout>
        <SeverityDonutVisual>
          <SeverityDonutSvg aria-label={ariaLabel} role="img" viewBox="0 0 260 190">
            <circle
              aria-hidden="true"
              cx={centerX}
              cy={centerY}
              fill="none"
              r={radius}
              stroke={cssVar('color-background-neutral-subtle-default')}
              strokeWidth="28"
            />
            {segments.map(({ dashLength, dashOffset, severity }) =>
              dashLength > 0 ? (
                <circle
                  aria-hidden="true"
                  cx={centerX}
                  cy={centerY}
                  fill="none"
                  key={severity}
                  r={radius}
                  stroke={ISSUE_SEVERITY_COLORS[severity]}
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  strokeWidth="28"
                  transform={`rotate(-90 ${centerX} ${centerY})`}
                />
              ) : null,
            )}

            {total > 0 && (
              <>
                <path
                  aria-hidden="true"
                  d={`M ${calloutStart.x} ${calloutStart.y} L ${calloutElbow.x} ${calloutElbow.y} L ${calloutEndX} ${calloutElbow.y}`}
                  fill="none"
                  stroke={cssVar('color-border-strong')}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <SeverityDonutPercentage
                  aria-hidden="true"
                  dominantBaseline="middle"
                  textAnchor={calloutDirection > 0 ? 'start' : 'end'}
                  x={calloutEndX + calloutDirection * 4}
                  y={calloutElbow.y}>
                  {Math.round(dominantSegment.fraction * 100)}%
                </SeverityDonutPercentage>
              </>
            )}
          </SeverityDonutSvg>

          <SeverityDonutCenter aria-hidden="true">
            <strong>{total}</strong>
            <span>{total === 1 ? 'open issue' : 'open issues'}</span>
          </SeverityDonutCenter>
        </SeverityDonutVisual>

        <SeverityLegend aria-label="Severity breakdown">
          {segments.map(({ count, fraction, label, severity }) => (
            <SeverityLegendItem key={severity}>
              <IssueSeverityIcon severity={severity} />
              <SeverityLegendLabel>{label}</SeverityLegendLabel>
              <SeverityLegendValue>
                {count}
                {count > 0 && <span> · {Math.round(fraction * 100)}%</span>}
              </SeverityLegendValue>
            </SeverityLegendItem>
          ))}
        </SeverityLegend>
      </SeverityDonutLayout>
    </IssueSeveritySection>
  );
}

IssueSeverityChart.displayName = 'IssueSeverityChart';

function IssuesTable({
  codeScope,
  issues,
  metric,
}: Readonly<{
  codeScope: CodeScope;
  issues: ReadonlyArray<TopIssue>;
  metric: QualityMetricData;
}>) {
  const issueGroupLabel =
    metric.key === 'security-hotspots'
      ? 'security hotspots'
      : `${metric.label.toLowerCase()} issues`;

  return (
    <SecurityIssuesTableCard size={CardSize.Medium}>
      <Card.Header hasDivider title={`Top ${issueGroupLabel} · ${CODE_SCOPE_LABELS[codeScope]}`} />
      <Card.Body insetContent>
        <SecurityIssuesTableRoot
          ariaLabel={`Top ${CODE_SCOPE_LABELS[codeScope].toLowerCase()} ${issueGroupLabel} by severity`}
          gridTemplate="minmax(18rem, 1.6fr) 10rem 7.5rem minmax(10rem, 0.8fr) 10rem"
          variety={TableVariety.Ghost}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell label="Issue" />
              <Table.ColumnHeaderCell label="Impact" />
              <Table.ColumnHeaderCell label="Attribute" />
              <Table.ColumnHeaderCell label="Tags" />
              <Table.ColumnHeaderCell label="Assignee" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.rule}>
                <Table.RowHeaderCell content={issue.message} />
                <SecurityIssueImpactCell>
                  <IssueImpact
                    attribute={metric.label}
                    severity={issue.severity}
                    severityLabel={issue.severityLabel}
                  />
                </SecurityIssueImpactCell>
                <Table.Cell>
                  <SecurityIssueAttribute>{issue.attribute}</SecurityIssueAttribute>
                </Table.Cell>
                <Table.Cell css={{ justifyContent: 'flex-start' }}>
                  <SecurityIssueTags>
                    {issue.tags.map((tag) => (
                      <SecurityIssueTag key={tag} variety={BadgeVariety.Neutral}>
                        {tag}
                      </SecurityIssueTag>
                    ))}
                  </SecurityIssueTags>
                </Table.Cell>
                <Table.Cell>
                  <SecurityIssueAssignee>{issue.assignee}</SecurityIssueAssignee>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </SecurityIssuesTableRoot>
      </Card.Body>
    </SecurityIssuesTableCard>
  );
}

IssuesTable.displayName = 'IssuesTable';

function QualityTrendChart({
  metric,
  rangeKey,
}: Readonly<{ metric: QualityMetricData; rangeKey: ChartRangeKey }>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const range = CHART_RANGES[rangeKey];
  const chartValues = metric.chartValues[rangeKey];
  const width = 720;
  const height = 190;
  const paddingTop = 12;
  const paddingBottom = 24;
  const baseline = height - paddingBottom;
  const chartHeight = baseline - paddingTop;
  const maximum = Math.max(...chartValues, 1);
  const axisMaximum = Math.max(4, Math.ceil(maximum / 2) * 2);
  const coordinates = chartValues.map((value, index) => ({
    x: ((index + 0.5) / chartValues.length) * width,
    y: paddingTop + ((axisMaximum - value) / axisMaximum) * chartHeight,
  }));
  const points = coordinates.map(({ x, y }) => `${x},${y}`).join(' ');
  const areaPath = `M ${coordinates[0].x},${baseline} L ${points} L ${coordinates.at(-1)?.x ?? width},${baseline} Z`;
  const activePoint = activeIndex === null ? undefined : coordinates[activeIndex];
  const activeValue = activeIndex === null ? undefined : chartValues[activeIndex];
  const activeLabel = activeIndex === null ? undefined : range.axisLabels[activeIndex];

  return (
    <TrendChartFigure>
      <TrendChartPlot>
        <TrendYAxisLabels aria-hidden="true">
          <span>{axisMaximum}</span>
          <span>{axisMaximum / 2}</span>
          <span>0</span>
        </TrendYAxisLabels>

        <TrendChartViewport>
          <TrendChartSvg
            aria-label={`${metric.chartLabel}, ${range.description.toLowerCase()}. Focus a date to inspect its value.`}
            role="group"
            viewBox={`0 0 ${width} ${height}`}>
            {[0, 1, 2].map((index) => {
              const y = paddingTop + (index / 2) * chartHeight;

              return (
                <line
                  key={index}
                  stroke={cssVar('color-border-weaker')}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="0"
                  x2={width}
                  y1={y}
                  y2={y}
                />
              );
            })}

            <path d={areaPath} fill={cssVar('color-feature-surface-default')} />
            <polyline
              fill="none"
              points={points}
              stroke={cssVar('color-feature-solid-default')}
              strokeLinejoin="round"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {activePoint && (
              <line
                aria-hidden="true"
                stroke={cssVar('color-feature-border')}
                strokeDasharray="3 3"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1={activePoint.x}
                x2={activePoint.x}
                y1={paddingTop}
                y2={baseline}
              />
            )}

            {coordinates.map(({ x, y }, index) => {
              const axisLabel = range.axisLabels[index];
              const value = chartValues[index];
              const isActive = index === activeIndex;

              return (
                <TrendChartPoint
                  aria-label={`${axisLabel.ariaLabel}: ${value} ${metric.chartValueLabel}`}
                  key={axisLabel.ariaLabel}
                  onBlur={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  role="img"
                  tabIndex={0}>
                  <circle aria-hidden="true" cx={x} cy={y} fill="transparent" r="12" />
                  {isActive && (
                    <circle
                      aria-hidden="true"
                      cx={x}
                      cy={y}
                      fill={cssVar('color-feature-surface-default')}
                      r="8"
                    />
                  )}
                  <circle
                    aria-hidden="true"
                    cx={x}
                    cy={y}
                    fill={
                      isActive
                        ? cssVar('color-feature-solid-hover')
                        : cssVar('color-surface-default')
                    }
                    r={isActive ? 4 : 3}
                    stroke={cssVar('color-feature-solid-default')}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </TrendChartPoint>
              );
            })}
          </TrendChartSvg>

          {activePoint && activeLabel && activeValue !== undefined && (
            <TrendTooltip
              $horizontalPlacement={
                activeIndex === 0
                  ? 'start'
                  : activeIndex === chartValues.length - 1
                    ? 'end'
                    : 'center'
              }
              $verticalPlacement={activePoint.y < 64 ? 'below' : 'above'}
              aria-hidden="true"
              role="tooltip"
              style={{
                left: `${(activePoint.x / width) * 100}%`,
                top: `${(activePoint.y / height) * 100}%`,
              }}>
              <TrendTooltipValue>
                {activeValue} {metric.chartValueLabel}
              </TrendTooltipValue>
              <TrendTooltipMonth>{activeLabel.ariaLabel}</TrendTooltipMonth>
            </TrendTooltip>
          )}
        </TrendChartViewport>
      </TrendChartPlot>

      <TrendAxisLabels $columnCount={range.axisLabels.length} aria-label={range.description}>
        {range.axisLabels.map(({ ariaLabel, label }) => (
          <span aria-label={ariaLabel} key={ariaLabel}>
            {label}
          </span>
        ))}
      </TrendAxisLabels>
    </TrendChartFigure>
  );
}

QualityTrendChart.displayName = 'QualityTrendChart';

const OverviewPageContent = styled(Layout.PageContent)`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-300')};
  padding-block: ${cssVar('dimension-space-300')};
`;

OverviewPageContent.displayName = 'OverviewPageContent';

const SectionGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  min-width: 0;
`;

SectionGroup.displayName = 'SectionGroup';

const CodeScopeToolbar = styled.section`
  display: flex;
  align-items: center;
`;

CodeScopeToolbar.displayName = 'CodeScopeToolbar';

const DashboardControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-150')};
`;

DashboardControls.displayName = 'DashboardControls';

const CompactPageHeaderDescription = styled(Layout.PageHeader.Description)`
  margin-top: calc(-1 * ${cssVar('dimension-space-100')});
`;

CompactPageHeaderDescription.displayName = 'CompactPageHeaderDescription';

const OverviewMetricGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-200')};

  @media (max-width: 60rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 34rem) {
    grid-template-columns: 1fr;
  }
`;

OverviewMetricGrid.displayName = 'OverviewMetricGrid';

const OverviewMetricCard = styled(Card)`
  width: 100%;
  height: auto;
  min-width: 0;
  background-color: ${cssVar('color-surface-default')};

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }
`;

OverviewMetricCard.displayName = 'OverviewMetricCard';

const OverviewMetricNavigationArrow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${cssVar('color-text-subtle')};
  opacity: 0;
  transform: translateX(-${cssVar('dimension-space-50')});
  transition:
    opacity 160ms ease-out,
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
`;

OverviewMetricNavigationArrow.displayName = 'OverviewMetricNavigationArrow';

const OverviewMetricNavigationLink = styled(Link)`
  display: block;
  width: 100%;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  border-radius: ${cssVar('border-radius-300')};

  &:hover,
  &:focus-visible {
    color: inherit;
    text-decoration: none;
  }

  &:hover .overview-metric-card,
  &:focus-visible .overview-metric-card {
    border-color: ${cssVar('color-border-bold')};
    box-shadow: ${cssVar('shadow-attached')};
  }

  &:hover [data-navigation-arrow],
  &:focus-visible [data-navigation-arrow] {
    opacity: 1;
    transform: translateX(0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-navigation-arrow] {
      transform: none;
      transition: none;
    }
  }
`;

OverviewMetricNavigationLink.displayName = 'OverviewMetricNavigationLink';

const OverviewMetric = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
  min-height: ${cssVar('dimension-space-600')};
`;

OverviewMetric.displayName = 'OverviewMetric';

const OverviewMetricLabel = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
`;

OverviewMetricLabel.displayName = 'OverviewMetricLabel';

const OverviewMetricValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  min-width: 0;
`;

OverviewMetricValueRow.displayName = 'OverviewMetricValueRow';

const OverviewMetricValue = styled.strong`
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
  font-variant-numeric: tabular-nums;
`;

OverviewMetricValue.displayName = 'OverviewMetricValue';

const OverviewMetricIndicatorSlot = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  font-variant-numeric: tabular-nums;
`;

OverviewMetricIndicatorSlot.displayName = 'OverviewMetricIndicatorSlot';

const METRIC_DELTA_BACKGROUND: Record<MetricDeltaTone, string> = {
  danger: cssVar('color-background-danger-weak-active'),
  success: cssVar('color-background-success-weak-active'),
};

const MetricDeltaRoot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  white-space: nowrap;
`;

MetricDeltaRoot.displayName = 'MetricDeltaRoot';

const MetricDeltaIcon = styled.span<{ $tone: MetricDeltaTone }>`
  display: inline-flex;
  flex: 0 0 ${cssVar('dimension-width-200')};
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-200')};
  height: ${cssVar('dimension-width-200')};
  background-color: ${({ $tone }) => METRIC_DELTA_BACKGROUND[$tone]};
  border-radius: ${cssVar('border-radius-full')};
  font-size: ${cssVar('font-size-10')};
  font-weight: ${cssVar('font-weight-semi-bold')};
  line-height: 1;
`;

MetricDeltaIcon.displayName = 'MetricDeltaIcon';

const OverviewPassedIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-200')};
  height: ${cssVar('dimension-width-200')};
`;

OverviewPassedIndicator.displayName = 'OverviewPassedIndicator';

const OverviewSurfaceCard = styled(Card)`
  width: 100%;
  height: auto;
  min-width: 0;
  background-color: ${cssVar('color-surface-default')};

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }
`;

OverviewSurfaceCard.displayName = 'OverviewSurfaceCard';

const QualityMetricTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  @media (max-width: 60rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 34rem) {
    grid-template-columns: 1fr;
  }
`;

QualityMetricTabs.displayName = 'QualityMetricTabs';

const QualityMetricTab = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
  padding: ${cssVar('dimension-space-200')};

  color: ${cssVar('color-text-subtle')};
  font: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;

  & + & {
    border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weaker')};
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: calc(-1 * ${cssVar('border-width-default')});
    left: 0;
    height: ${cssVar('focus-border-width-default')};
    content: '';
    background-color: transparent;
    border-radius: ${cssVar('border-radius-full')};
  }

  &:hover {
    color: ${cssVar('color-text-strong')};
    background-color: ${cssVar('navigation-item-colors-background-hover')};
  }

  &:active {
    background-color: ${cssVar('navigation-item-colors-background-pressed')};
  }

  &:focus-visible {
    outline: ${cssVar('focus-border-width-default')} solid ${cssVar('color-focus-default')};
    outline-offset: calc(-1 * ${cssVar('focus-border-width-default')});
  }

  &[aria-selected='true'] {
    color: ${cssVar('color-text-strong')};
    background-color: ${cssVar('color-roles-support-white')};

    &::after {
      background-color: ${cssVar('color-roles-support-black')};
    }
  }

  html[data-echoes-theme='dark'] &[aria-selected='true'] {
    background-color: ${cssVar('color-background-selected-weak-default')};

    &::after {
      background-color: ${cssVar('color-background-selected-bold-default')};
    }
  }

  @media (max-width: 60rem) {
    border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weaker')};

    &:nth-of-type(odd) {
      border-left: 0;
    }
  }

  @media (max-width: 34rem) {
    border-left: 0;
  }
`;

QualityMetricTab.displayName = 'QualityMetricTab';

const QualityMetricTabLabel = styled.span`
  display: block;
  max-width: 100%;
  overflow: hidden;
  color: inherit;
  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

QualityMetricTabLabel.displayName = 'QualityMetricTabLabel';

const QualityMetricTabRating = styled.span`
  display: inline-flex;
  align-items: center;
`;

QualityMetricTabRating.displayName = 'QualityMetricTabRating';

const QualityMetricRatingBadge = styled(RatingBadge)`
  border-radius: ${cssVar('border-radius-200')};
`;

QualityMetricRatingBadge.displayName = 'QualityMetricRatingBadge';

const QualityMetricDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  min-width: 0;
`;

QualityMetricDetail.displayName = 'QualityMetricDetail';

const SupportingMetricGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  box-sizing: border-box;
  margin: 0;
  padding: ${cssVar('dimension-space-250')} ${cssVar('dimension-space-200')};

  @media (max-width: 60rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: ${cssVar('dimension-space-250')};
  }

  @media (max-width: 34rem) {
    grid-template-columns: 1fr;
  }
`;

SupportingMetricGrid.displayName = 'SupportingMetricGrid';

const SupportingMetric = styled.div`
  min-width: 0;

  & + & {
    padding-left: ${cssVar('dimension-space-200')};
    border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weaker')};
  }

  @media (max-width: 60rem) {
    &:nth-of-type(odd) {
      padding-left: 0;
      border-left: 0;
    }
  }

  @media (max-width: 34rem) {
    padding-left: 0;
    border-left: 0;
  }
`;

SupportingMetric.displayName = 'SupportingMetric';

const SupportingMetricLabel = styled.dt`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
  margin: 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
`;

SupportingMetricLabel.displayName = 'SupportingMetricLabel';

const SupportingMetricLabelText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

SupportingMetricLabelText.displayName = 'SupportingMetricLabelText';

const SupportingMetricValue = styled.dd`
  margin: ${cssVar('dimension-space-50')} 0 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
  font-variant-numeric: tabular-nums;
`;

SupportingMetricValue.displayName = 'SupportingMetricValue';

const TrendSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-200')};

  @media (max-width: 60rem) {
    grid-template-columns: 1fr;
  }
`;

TrendSection.displayName = 'TrendSection';

const TrendPanel = styled.section`
  min-width: 0;
`;

TrendPanel.displayName = 'TrendPanel';

const TrendHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};

  @media (max-width: 34rem) {
    flex-direction: column;
  }
`;

TrendHeader.displayName = 'TrendHeader';

const TrendTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

TrendTitle.displayName = 'TrendTitle';

const TrendTotal = styled.strong`
  display: block;
  flex: 0 0 auto;
  margin-top: ${cssVar('dimension-space-50')};
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
  font-variant-numeric: tabular-nums;
`;

TrendTotal.displayName = 'TrendTotal';

const TrendRangeSelect = styled(Select)`
  margin-left: auto;
  min-width: 7.5rem;
`;

TrendRangeSelect.displayName = 'TrendRangeSelect';

const TrendChartFigure = styled.figure`
  margin: ${cssVar('dimension-space-200')} 0 0;
`;

TrendChartFigure.displayName = 'TrendChartFigure';

const TrendChartPlot = styled.div`
  display: grid;
  grid-template-columns: ${cssVar('dimension-width-300')} minmax(0, 1fr);
  gap: ${cssVar('dimension-space-100')};
`;

TrendChartPlot.displayName = 'TrendChartPlot';

const TrendYAxisLabels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 0.75rem 1.5rem;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

TrendYAxisLabels.displayName = 'TrendYAxisLabels';

const TrendChartViewport = styled.div`
  position: relative;
  min-width: 0;
`;

TrendChartViewport.displayName = 'TrendChartViewport';

const TrendChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 72 / 19;
  overflow: visible;
`;

TrendChartSvg.displayName = 'TrendChartSvg';

const TrendChartPoint = styled.g`
  cursor: crosshair;
  outline: none;
`;

TrendChartPoint.displayName = 'TrendChartPoint';

type TrendTooltipPlacement = 'above' | 'below';
type TrendTooltipHorizontalPlacement = 'center' | 'end' | 'start';

const TREND_TOOLTIP_HORIZONTAL_TRANSFORM: Record<TrendTooltipHorizontalPlacement, string> = {
  center: '-50%',
  end: '-100%',
  start: '0',
};

const TrendTooltip = styled.div<{
  $horizontalPlacement: TrendTooltipHorizontalPlacement;
  $verticalPlacement: TrendTooltipPlacement;
}>`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-25')};
  min-width: 7.5rem;
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};
  pointer-events: none;
  color: ${cssVar('color-text-strong')};
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-feature-border')};
  border-radius: ${cssVar('border-radius-200')};
  box-shadow: ${cssVar('shadow-anchored')};
  transform: translate(
    ${({ $horizontalPlacement }) => TREND_TOOLTIP_HORIZONTAL_TRANSFORM[$horizontalPlacement]},
    ${({ $verticalPlacement }) =>
      $verticalPlacement === 'above' ? 'calc(-100% - 0.625rem)' : '0.625rem'}
  );
`;

TrendTooltip.displayName = 'TrendTooltip';

const TrendTooltipValue = styled.strong`
  font: ${cssVar('typography-text-small-semi-bold')};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

TrendTooltipValue.displayName = 'TrendTooltipValue';

const TrendTooltipMonth = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

TrendTooltipMonth.displayName = 'TrendTooltipMonth';

const TrendAxisLabels = styled.figcaption<{ $columnCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columnCount }) => $columnCount}, minmax(0, 1fr));
  gap: 0;
  margin-left: calc(${cssVar('dimension-width-300')} + ${cssVar('dimension-space-100')});
  margin-top: ${cssVar('dimension-space-50')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-align: center;
`;

TrendAxisLabels.displayName = 'TrendAxisLabels';

const IssueSeveritySection = styled.section`
  min-width: 0;
`;

IssueSeveritySection.displayName = 'IssueSeveritySection';

const SeverityDonutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) minmax(8rem, 0.7fr);
  align-items: center;
  gap: ${cssVar('dimension-space-200')};
  margin-top: ${cssVar('dimension-space-200')};

  @media (max-width: 34rem) {
    grid-template-columns: 1fr;
  }
`;

SeverityDonutLayout.displayName = 'SeverityDonutLayout';

const SeverityDonutVisual = styled.div`
  position: relative;
  width: min(100%, 16.25rem);
`;

SeverityDonutVisual.displayName = 'SeverityDonutVisual';

const SeverityDonutSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`;

SeverityDonutSvg.displayName = 'SeverityDonutSvg';

const SeverityDonutPercentage = styled.text`
  fill: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-semi-bold')};
  font-variant-numeric: tabular-nums;
`;

SeverityDonutPercentage.displayName = 'SeverityDonutPercentage';

const SeverityDonutCenter = styled.div`
  position: absolute;
  top: 48.5%;
  left: 36.9%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  pointer-events: none;
  transform: translate(-50%, -50%);

  strong {
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-heading-large')};
    font-variant-numeric: tabular-nums;
  }
`;

SeverityDonutCenter.displayName = 'SeverityDonutCenter';

const SeverityLegend = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`;

SeverityLegend.displayName = 'SeverityLegend';

const SeverityLegendItem = styled.li`
  display: grid;
  grid-template-columns: ${cssVar('dimension-width-150')} minmax(0, 1fr) auto;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
`;

SeverityLegendItem.displayName = 'SeverityLegendItem';

const SeverityLegendLabel = styled.span`
  overflow: hidden;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

SeverityLegendLabel.displayName = 'SeverityLegendLabel';

const SeverityLegendValue = styled.strong`
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-small-semi-bold')};
  text-align: right;
  font-variant-numeric: tabular-nums;

  span {
    color: ${cssVar('color-text-subtle')};
    font-weight: ${cssVar('font-weight-regular')};
  }
`;

SeverityLegendValue.displayName = 'SeverityLegendValue';

const SecurityIssuesTableCard = styled(Card)`
  width: 100%;
  height: auto;
  min-width: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }
`;

SecurityIssuesTableCard.displayName = 'SecurityIssuesTableCard';

const SecurityIssuesTableRoot = styled(Table)`
  width: 100%;
  min-width: 0;
  border-radius: 0;

  th,
  td {
    min-width: 0;
  }
`;

SecurityIssuesTableRoot.displayName = 'SecurityIssuesTableRoot';

const SecurityIssueImpactCell = styled(Table.Cell)`
  justify-content: flex-start;
`;

SecurityIssueImpactCell.displayName = 'SecurityIssueImpactCell';

const SecurityIssueAttribute = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;
`;

SecurityIssueAttribute.displayName = 'SecurityIssueAttribute';

const SecurityIssueTags = styled.span`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
  overflow: hidden;
`;

SecurityIssueTags.displayName = 'SecurityIssueTags';

const SecurityIssueTag = styled(Badge)`
  && {
    --badge-height: ${cssVar('dimension-height-600')};
    --badge-color: ${cssVar('color-text-subtle')};
    --badge-background-color: ${cssVar('color-surface-default')};
    --badge-border-color: ${cssVar('color-border-subtle')};

    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    border: ${cssVar('border-width-default')} solid ${cssVar('color-border-subtle')};
    border-radius: ${cssVar('border-radius-full')};
    outline: none;
    text-overflow: ellipsis;
  }
`;

SecurityIssueTag.displayName = 'SecurityIssueTag';

const SecurityIssueAssignee = styled.span`
  display: block;
  min-width: 0;
  overflow: hidden;
  color: ${cssVar('color-text-default')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

SecurityIssueAssignee.displayName = 'SecurityIssueAssignee';

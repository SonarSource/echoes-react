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
  Card,
  CardSize,
  cssVar,
  FormFieldWidth,
  IconBranch,
  IconX,
  Layout,
  LinkStandalone,
  RatingBadge,
  RatingBadgeRating,
  Select,
} from '../../src';
import { ProjectShell } from './ProductShell';

const meta: Meta = {
  title: 'Playground/Summary',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProjectSummary: Story = {
  render: () => <SummaryPage />,
};

type CodeScope = 'new' | 'overall';
type ProjectBranch = 'develop' | 'main' | 'release/4.3';

const CODE_SCOPE_TABS: ReadonlyArray<{ label: string; value: CodeScope }> = [
  { label: 'Overall code', value: 'overall' },
  { label: 'New code', value: 'new' },
];

const BRANCH_OPTIONS = [
  { label: 'main (default)', value: 'main' },
  { label: 'develop', value: 'develop' },
  { label: 'release/4.3', value: 'release/4.3' },
];

interface SummaryData {
  coverage: number;
  coverageDetail: string;
  duplications: number;
  duplicationsDetail: string;
  failedConditions: number;
  qualityMetrics: ReadonlyArray<QualityMetricData>;
  totalConditions: number;
}

interface QualityMetricData {
  description: string;
  name: string;
  rating: `${RatingBadgeRating}`;
  result: string;
}

const SUMMARY_DATA: Record<CodeScope, SummaryData> = {
  overall: {
    coverage: 82.4,
    coverageDetail: '1.2k lines to cover',
    duplications: 0,
    duplicationsDetail: 'No duplicated blocks',
    failedConditions: 2,
    qualityMetrics: [
      {
        description: 'No vulnerabilities detected',
        name: 'Security',
        rating: RatingBadgeRating.A,
        result: '0 open issues',
      },
      {
        description: 'No bugs detected',
        name: 'Reliability',
        rating: RatingBadgeRating.A,
        result: '0 open issues',
      },
      {
        description: 'Small remediation effort',
        name: 'Maintainability',
        rating: RatingBadgeRating.A,
        result: '5 open issues',
      },
    ],
    totalConditions: 4,
  },
  new: {
    coverage: 94.2,
    coverageDetail: '86 new lines to cover',
    duplications: 0,
    duplicationsDetail: 'No duplication on new code',
    failedConditions: 1,
    qualityMetrics: [
      {
        description: 'No new vulnerabilities',
        name: 'Security',
        rating: RatingBadgeRating.A,
        result: '0 new issues',
      },
      {
        description: 'No new bugs',
        name: 'Reliability',
        rating: RatingBadgeRating.A,
        result: '0 new issues',
      },
      {
        description: 'No new maintainability issues',
        name: 'Maintainability',
        rating: RatingBadgeRating.A,
        result: '0 new issues',
      },
    ],
    totalConditions: 3,
  },
};

function SummaryPage() {
  const [branch, setBranch] = useState<ProjectBranch>('main');
  const [scope, setScope] = useState<CodeScope>('overall');
  const summary = SUMMARY_DATA[scope];

  return (
    <ProjectShell activeItem="summary">
      <Layout.PageGrid width="default">
        <Layout.PageHeader
          breadcrumbs={
            <Layout.PageHeader.Breadcrumbs
              items={[
                { linkElement: 'Sonar-UX-Testing', to: '/organization' },
                { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/projects' },
                {
                  linkElement: 'AI Eval Journey Visualization',
                  to: '/projects/ai-eval-journey-viz',
                },
                { linkElement: 'Summary' },
              ]}
            />
          }
          title={
            <Layout.PageHeader.Title
              headingLevel="h1"
              suffix={
                <BranchSelectWrapper>
                  <BranchSelect
                    ariaLabel="Change branch"
                    data={BRANCH_OPTIONS}
                    isNotClearable
                    onChange={(value) => setBranch(value as ProjectBranch)}
                    optionComponent={BranchOption}
                    value={branch}
                    valueIcon={<BranchIcon />}
                    width={FormFieldWidth.Small}
                  />
                  <BranchSelectValue aria-hidden="true">
                    <span>{branch}</span>
                    {branch === 'main' && <BranchSelectDefault>(default)</BranchSelectDefault>}
                  </BranchSelectValue>
                </BranchSelectWrapper>
              }>
              Summary
            </Layout.PageHeader.Title>
          }
        />

        <SummaryPageContent>
          <SummaryLayout>
            <SummaryLeftColumn>
              <QualityGateCard size={CardSize.Medium}>
                <Card.Header hasDivider title="Quality gate" />
                <Card.Body>
                  <QualityGateLayout>
                    <QualityGateState>
                      <QualityGateIcon aria-hidden>
                        <IconX />
                      </QualityGateIcon>
                      <div>
                        <QualityGateTitle>Failed</QualityGateTitle>
                        <QualityGateDescription>
                          {summary.failedConditions} of {summary.totalConditions} quality gate
                          conditions failed for {scope === 'overall' ? 'overall code' : 'new code'}.
                        </QualityGateDescription>
                      </div>
                    </QualityGateState>
                  </QualityGateLayout>
                </Card.Body>
              </QualityGateCard>

              <AnalysisCard size={CardSize.Medium}>
                <Card.Body>
                  <AnalysisPanel aria-labelledby="latest-analysis-title">
                    <AnalysisTitle id="latest-analysis-title">Latest analysis</AnalysisTitle>
                    <AnalysisMetadata aria-label="Latest analysis metadata">
                      <span>{branch}</span>
                      <span aria-hidden="true">•</span>
                      <span>Analyzed successfully 2 hours ago</span>
                    </AnalysisMetadata>

                    <AnalysisDetails>
                      <div>
                        <dt>Status</dt>
                        <dd>Successful</dd>
                      </div>
                      <div>
                        <dt>Branch</dt>
                        <dd>{branch}</dd>
                      </div>
                      <div>
                        <dt>Version</dt>
                        <dd>4.3.0</dd>
                      </div>
                      <div>
                        <dt>Language</dt>
                        <dd>TypeScript</dd>
                      </div>
                      <div>
                        <dt>Lines of code</dt>
                        <dd>550</dd>
                      </div>
                    </AnalysisDetails>

                    <AnalysisLink to="/activity">View analysis activity</AnalysisLink>
                  </AnalysisPanel>
                </Card.Body>
              </AnalysisCard>
            </SummaryLeftColumn>

            <SummaryAnalysisCard size={CardSize.Medium}>
              <SummaryAnalysisHeader
                hasDivider
                title={<ScopeTabs onChange={setScope} selected={scope} />}
              />
              <Card.Body insetContent>
                <SummaryMain
                  aria-labelledby={`summary-${scope}-tab`}
                  id="summary-scope-panel"
                  role="tabpanel">
                  <SummarySection aria-labelledby="software-quality-title">
                    <SectionHeader>
                      <div>
                        <SectionTitle id="software-quality-title">Software quality</SectionTitle>
                        <SectionDescription>
                          Ratings and open issues for {scope === 'overall' ? 'overall' : 'new'}{' '}
                          code.
                        </SectionDescription>
                      </div>
                      <LinkStandalone to="/project-issues">View issues</LinkStandalone>
                    </SectionHeader>

                    <QualityMetricList>
                      {summary.qualityMetrics.map((metric) => (
                        <QualityMetric key={metric.name} metric={metric} />
                      ))}
                    </QualityMetricList>
                  </SummarySection>

                  <SummarySection aria-labelledby="coverage-duplications-title">
                    <SectionHeader>
                      <div>
                        <SectionTitle id="coverage-duplications-title">
                          Coverage and duplications
                        </SectionTitle>
                        <SectionDescription>
                          Test coverage and repeated code in the selected scope.
                        </SectionDescription>
                      </div>
                      <LinkStandalone to="/measures">View measures</LinkStandalone>
                    </SectionHeader>

                    <MeasureList>
                      <MeasureRow
                        detail={summary.coverageDetail}
                        label="Coverage"
                        value={summary.coverage}
                      />
                      <MeasureRow
                        detail={summary.duplicationsDetail}
                        label="Duplications"
                        value={summary.duplications}
                      />
                    </MeasureList>
                  </SummarySection>
                </SummaryMain>
              </Card.Body>
            </SummaryAnalysisCard>
          </SummaryLayout>
        </SummaryPageContent>
      </Layout.PageGrid>
    </ProjectShell>
  );
}

SummaryPage.displayName = 'SummaryPage';

function QualityMetric({ metric }: Readonly<{ metric: QualityMetricData }>) {
  return (
    <QualityMetricItem>
      <QualityMetricIdentity>
        <SummaryRatingBadge
          ariaLabel={`${metric.name} rating ${metric.rating}`}
          rating={metric.rating}
          size="md"
        />
        <div>
          <QualityMetricName>{metric.name}</QualityMetricName>
          <QualityMetricDescription>{metric.description}</QualityMetricDescription>
        </div>
      </QualityMetricIdentity>
      <QualityMetricResult>{metric.result}</QualityMetricResult>
    </QualityMetricItem>
  );
}

QualityMetric.displayName = 'QualityMetric';

function MeasureRow({
  detail,
  label,
  value,
}: Readonly<{ detail: string; label: string; value: number }>) {
  return (
    <MeasureItem>
      <MeasureHeader>
        <div>
          <MeasureLabel>{label}</MeasureLabel>
          <MeasureDetail>{detail}</MeasureDetail>
        </div>
        <MeasureValue>{value.toFixed(1)}%</MeasureValue>
      </MeasureHeader>
      <MeasureTrack
        aria-label={`${label} ${value.toFixed(1)} percent`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        role="progressbar">
        <MeasureFill $value={value} />
      </MeasureTrack>
    </MeasureItem>
  );
}

MeasureRow.displayName = 'MeasureRow';

function ScopeTabs({
  onChange,
  selected,
}: Readonly<{ onChange: (scope: CodeScope) => void; selected: CodeScope }>) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextScope: CodeScope | undefined;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      nextScope = selected === 'overall' ? 'new' : 'overall';
    } else if (event.key === 'Home') {
      nextScope = 'overall';
    } else if (event.key === 'End') {
      nextScope = 'new';
    }

    if (nextScope) {
      event.preventDefault();
      const nextTab = event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(
        `[data-scope="${nextScope}"]`,
      );
      onChange(nextScope);
      nextTab?.focus();
    }
  }

  return (
    <ScopeTabList aria-label="Code scope" role="tablist">
      {CODE_SCOPE_TABS.map(({ label, value }) => (
        <ScopeTab
          aria-controls="summary-scope-panel"
          aria-selected={selected === value}
          data-scope={value}
          id={`summary-${value}-tab`}
          key={value}
          onClick={() => onChange(value)}
          onKeyDown={handleKeyDown}
          role="tab"
          tabIndex={selected === value ? 0 : -1}
          type="button">
          {label}
        </ScopeTab>
      ))}
    </ScopeTabList>
  );
}

ScopeTabs.displayName = 'ScopeTabs';

function BranchOption({ label, value }: Readonly<{ label: string; value: string }>) {
  if (value === 'main') {
    return (
      <span>
        main<BranchSelectDefault>(default)</BranchSelectDefault>
      </span>
    );
  }

  return <span>{label}</span>;
}

BranchOption.displayName = 'BranchOption';

const BranchSelectWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  margin-inline-start: ${cssVar('dimension-space-100')};
`;

BranchSelectWrapper.displayName = 'BranchSelectWrapper';

const BranchIcon = styled(IconBranch)`
  font-size: ${cssVar('font-size-30')};
`;

BranchIcon.displayName = 'BranchIcon';

const BranchSelect = styled(Select)`
  min-width: 0;

  .echoes-select-input {
    height: ${cssVar('dimension-height-800')};
    min-height: ${cssVar('dimension-height-800')};
    padding-block: ${cssVar('dimension-space-75')};

    color: transparent;
    font: ${cssVar('typography-text-small-regular')};
  }
`;

BranchSelect.displayName = 'BranchSelect';

const BranchSelectValue = styled.span`
  position: absolute;
  top: 0;
  right: ${cssVar('dimension-space-300')};
  left: ${cssVar('dimension-space-400')};

  display: flex;
  align-items: center;
  height: ${cssVar('dimension-height-800')};
  overflow: hidden;

  color: ${cssVar('input-colors-foreground-default')};
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;

  pointer-events: none;
`;

BranchSelectValue.displayName = 'BranchSelectValue';

const BranchSelectDefault = styled.span`
  margin-inline-start: ${cssVar('dimension-space-50')};
  color: ${cssVar('color-text-subtle')};
`;

BranchSelectDefault.displayName = 'BranchSelectDefault';

const SummaryPageContent = styled(Layout.PageContent)`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-300')};
  padding-block: ${cssVar('dimension-space-300')};
`;

SummaryPageContent.displayName = 'SummaryPageContent';

const ScopeTabList = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${cssVar('dimension-space-50')};
`;

ScopeTabList.displayName = 'ScopeTabList';

const ScopeTab = styled.button`
  --scope-tab-selected-border-width: calc(
    ${cssVar('focus-border-width-default')} + ${cssVar('border-width-default')}
  );

  appearance: none;
  box-sizing: border-box;
  margin-bottom: calc(${cssVar('border-width-default')} * -1);
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}
    calc(${cssVar('dimension-space-100')} - var(--scope-tab-selected-border-width));

  color: ${cssVar('navigation-item-colors-foreground-default')};
  font: ${cssVar('typography-text-default-semi-bold')};

  background: ${cssVar('navigation-item-colors-background-default')};
  border: 0;
  border-bottom: var(--scope-tab-selected-border-width) solid transparent;
  border-radius: ${cssVar('border-radius-200')} ${cssVar('border-radius-200')} 0 0;
  cursor: pointer;

  &:hover {
    background: ${cssVar('navigation-item-colors-background-hover')};
  }

  &:active {
    background: ${cssVar('navigation-item-colors-background-pressed')};
  }

  &:focus-visible {
    outline: ${cssVar('navigation-item-colors-focus-ring')} solid
      ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &[aria-selected='true'] {
    color: ${cssVar('navigation-item-colors-foreground-selected')};
    border-bottom-color: ${cssVar('navigation-item-colors-foreground-selected')};
  }
`;

ScopeTab.displayName = 'ScopeTab';

const SummaryLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(17rem, 20rem) minmax(0, 1fr);
  gap: ${cssVar('dimension-space-300')};
  align-items: start;

  @media (max-width: 70rem) {
    grid-template-columns: 1fr;
  }
`;

SummaryLayout.displayName = 'SummaryLayout';

const SummaryLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  min-width: 0;
`;

SummaryLeftColumn.displayName = 'SummaryLeftColumn';

const SummaryAnalysisCard = styled(Card)`
  height: auto;
  min-width: 0;
`;

SummaryAnalysisCard.displayName = 'SummaryAnalysisCard';

const SummaryAnalysisHeader = styled(Card.Header)`
  padding-top: ${cssVar('dimension-space-100')};
  padding-bottom: 0;
`;

SummaryAnalysisHeader.displayName = 'SummaryAnalysisHeader';

const QualityGateCard = styled(Card)`
  height: auto;
  min-width: 0;
`;

QualityGateCard.displayName = 'QualityGateCard';

const QualityGateLayout = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-300')};
`;

QualityGateLayout.displayName = 'QualityGateLayout';

const QualityGateState = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  min-width: 0;
`;

QualityGateState.displayName = 'QualityGateState';

const QualityGateIcon = styled.span`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  box-sizing: border-box;
  width: ${cssVar('dimension-width-700')};
  height: ${cssVar('dimension-width-700')};
  color: ${cssVar('color-status-danger-foreground')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-status-danger-foreground')};
  border-radius: 50%;
  font-size: ${cssVar('font-size-50')};
`;

QualityGateIcon.displayName = 'QualityGateIcon';

const QualityGateTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
`;

QualityGateTitle.displayName = 'QualityGateTitle';

const QualityGateDescription = styled.p`
  margin: ${cssVar('dimension-space-25')} 0 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
`;

QualityGateDescription.displayName = 'QualityGateDescription';

const SummaryMain = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0 ${cssVar('dimension-space-200')} ${cssVar('dimension-space-200')};
`;

SummaryMain.displayName = 'SummaryMain';

const SummarySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  min-width: 0;
  padding-block: ${cssVar('dimension-space-250')};

  & + & {
    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  &:last-of-type {
    padding-bottom: 0;
  }
`;

SummarySection.displayName = 'SummarySection';

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};
`;

SectionHeader.displayName = 'SectionHeader';

const SectionTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

SectionTitle.displayName = 'SectionTitle';

const SectionDescription = styled.p`
  margin: ${cssVar('dimension-space-25')} 0 0;
  max-width: 70ch;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

SectionDescription.displayName = 'SectionDescription';

const QualityMetricList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

QualityMetricList.displayName = 'QualityMetricList';

const QualityMetricItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-300')};
  padding-block: ${cssVar('dimension-space-150')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

QualityMetricItem.displayName = 'QualityMetricItem';

const QualityMetricIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-width: 0;
`;

QualityMetricIdentity.displayName = 'QualityMetricIdentity';

const SummaryRatingBadge = styled(RatingBadge)`
  flex: 0 0 auto;
  border-radius: ${cssVar('border-radius-200')};
`;

SummaryRatingBadge.displayName = 'SummaryRatingBadge';

const QualityMetricName = styled.h3`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

QualityMetricName.displayName = 'QualityMetricName';

const QualityMetricDescription = styled.p`
  margin: ${cssVar('dimension-space-25')} 0 0;
  overflow: hidden;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

QualityMetricDescription.displayName = 'QualityMetricDescription';

const QualityMetricResult = styled.span`
  flex: 0 0 auto;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-semi-bold')};
  font-variant-numeric: tabular-nums;
`;

QualityMetricResult.displayName = 'QualityMetricResult';

const MeasureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-250')};
`;

MeasureList.displayName = 'MeasureList';

const MeasureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
`;

MeasureItem.displayName = 'MeasureItem';

const MeasureHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};
`;

MeasureHeader.displayName = 'MeasureHeader';

const MeasureLabel = styled.h3`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

MeasureLabel.displayName = 'MeasureLabel';

const MeasureDetail = styled.p`
  margin: ${cssVar('dimension-space-25')} 0 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

MeasureDetail.displayName = 'MeasureDetail';

const MeasureValue = styled.strong`
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
  font-variant-numeric: tabular-nums;
`;

MeasureValue.displayName = 'MeasureValue';

const MeasureTrack = styled.div`
  height: ${cssVar('dimension-height-100')};
  overflow: hidden;
  background-color: ${cssVar('color-background-neutral-subtle-default')};
  border-radius: ${cssVar('border-radius-full')};
`;

MeasureTrack.displayName = 'MeasureTrack';

const MeasureFill = styled.span<{ $value: number }>`
  display: block;
  width: ${({ $value }) => `${$value}%`};
  min-width: ${({ $value }) => ($value > 0 ? cssVar('dimension-width-100') : 0)};
  height: 100%;
  background-color: ${cssVar('color-feature-solid-default')};
  border-radius: inherit;
`;

MeasureFill.displayName = 'MeasureFill';

const AnalysisCard = styled(Card)`
  height: auto;
  min-width: 0;
`;

AnalysisCard.displayName = 'AnalysisCard';

const AnalysisPanel = styled.section`
  min-width: 0;
`;

AnalysisPanel.displayName = 'AnalysisPanel';

const AnalysisTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

AnalysisTitle.displayName = 'AnalysisTitle';

const AnalysisMetadata = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  margin: ${cssVar('dimension-space-50')} 0 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  text-wrap: pretty;
`;

AnalysisMetadata.displayName = 'AnalysisMetadata';

const AnalysisDetails = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  margin: ${cssVar('dimension-space-250')} 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${cssVar('dimension-space-200')};
  }

  dt {
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-small-regular')};
  }

  dd {
    margin: 0;
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-small-medium')};
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
`;

AnalysisDetails.displayName = 'AnalysisDetails';

const AnalysisLink = styled(LinkStandalone)`
  display: inline-flex;
`;

AnalysisLink.displayName = 'AnalysisLink';

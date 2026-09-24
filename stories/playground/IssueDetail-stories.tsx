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
  ButtonSize,
  ButtonVariety,
  cssVar,
  FormFieldWidth,
  IconArrowLeft,
  IconCopy,
  IconLinkExternal,
  IconSeverityBlocker,
  IconVulnerability,
  Layout,
  LinkStandalone,
  Select,
  ToggleButtonGroup,
} from '../../src';
import { ProductContentHeader, ProjectShell } from './ProductShell';

const meta: Meta = {
  title: 'Playground/Issue Detail',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProjectIssue: Story = {
  render: () => <IssueDetailPage />,
};

type IssueTab = 'fix' | 'issue' | 'why';
type ProjectBranch = 'canary' | 'main' | 'release/4.3';

const BRANCH_OPTIONS = [
  { label: 'canary', value: 'canary' },
  { label: 'main', value: 'main' },
  { label: 'release/4.3', value: 'release/4.3' },
];

const STATUS_OPTIONS = [
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
];

const ASSIGNEE_OPTIONS = [
  { label: 'Not assigned', value: 'unassigned' },
  { label: 'M. Dupont', value: 'm-dupont' },
  { label: 'J. Kim', value: 'j-kim' },
];

const TAB_CONTENT: Record<IssueTab, { body: string; title: string }> = {
  issue: {
    body: 'The workflow interpolates a caller-controlled input directly into a shell run block on line 190.',
    title: 'Where is the issue?',
  },
  why: {
    body: 'An attacker can provide shell syntax through inputs.afterBuild and execute unintended commands in the workflow runner.',
    title: 'Why is this an issue?',
  },
  fix: {
    body: 'Assign the input to an environment variable and reference the quoted variable from the run block instead of interpolating the expression.',
    title: 'How can I fix it?',
  },
};

function IssueDetailPage() {
  const [assignee, setAssignee] = useState('unassigned');
  const [branch, setBranch] = useState<ProjectBranch>('canary');
  const [copyLabel, setCopyLabel] = useState('Copy AI prompt');
  const [status, setStatus] = useState('confirmed');
  const [tab, setTab] = useState<IssueTab>('issue');
  const tabContent = TAB_CONTENT[tab];

  async function copyAiPrompt() {
    const prompt = [
      'Fix this Sonar issue:',
      'Change this workflow to not use user-controlled data directly in a run block.',
      'File: .github/workflows/build_reusable.yml',
      'Line: 190',
      'Rule: githubactions:S7630',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(prompt);
      setCopyLabel('Copied');
      window.setTimeout(() => setCopyLabel('Copy AI prompt'), 1600);
    } catch {
      setCopyLabel('Copy failed');
      window.setTimeout(() => setCopyLabel('Copy AI prompt'), 1600);
    }
  }

  return (
    <ProjectShell activeItem="issues">
      <ProductContentHeader
        breadcrumbs={
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Sonar-UX-Testing', to: '/organization' },
              { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/projects' },
              { linkElement: 'AI Eval Journey Visualization', to: '/projects/ai-eval-journey-viz' },
              { linkElement: 'Issues', to: '/project-issues' },
              { linkElement: 'S7630' },
            ]}
          />
        }
        title={
          <Layout.ContentHeader.Title
            headingLevel="h1"
            suffix={
              <BranchSelect
                ariaLabel="Change branch"
                data={BRANCH_OPTIONS}
                isNotClearable
                onChange={(value) => setBranch(value as ProjectBranch)}
                value={branch}
                width={FormFieldWidth.Small}
              />
            }>
            Issues
          </Layout.ContentHeader.Title>
        }
      />

      <Layout.PageGrid width="fluid">
        <IssueDetailPageContent>
          <IssueInformationPanel aria-labelledby="issue-title">
            <BackLink to="/project-issues">
              <IconArrowLeft />
              Back to issues
            </BackLink>

            <ClassificationRow aria-label="Issue classification">
              <Badge variety={BadgeVariety.Info}>Intentionality</Badge>
              <Badge variety={BadgeVariety.Neutral}>Not complete</Badge>
            </ClassificationRow>

            <IssueTitle id="issue-title">
              Change this workflow to not use user-controlled data directly in a run block.
            </IssueTitle>

            <RuleDescription>
              GitHub Actions should not be vulnerable to script injections.{' '}
              <LinkStandalone to="/rules/githubactions:S7630">githubactions:S7630</LinkStandalone>
            </RuleDescription>

            <ImpactBlock>
              <ImpactLabel>Software qualities impacted</ImpactLabel>
              <ImpactBadges>
                <Badge variety={BadgeVariety.Danger}>Security</Badge>
                <Badge IconLeft={IconSeverityBlocker} variety={BadgeVariety.Danger}>
                  Blocker
                </Badge>
              </ImpactBadges>
            </ImpactBlock>

            <IssueActions>
              <Button
                onClick={copyAiPrompt}
                prefix={<IconCopy />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                {copyLabel}
              </Button>
            </IssueActions>

            <ControlGrid>
              <ControlField>
                <ControlLabel htmlFor="issue-status-select" id="issue-status-label">
                  Status
                </ControlLabel>
                <Select
                  ariaLabelledBy="issue-status-label"
                  data={STATUS_OPTIONS}
                  id="issue-status-select"
                  isNotClearable
                  onChange={(value) => setStatus(value ?? 'confirmed')}
                  value={status}
                  width={FormFieldWidth.Full}
                />
              </ControlField>
              <ControlField>
                <ControlLabel htmlFor="issue-assignee-select" id="issue-assignee-label">
                  Assignee
                </ControlLabel>
                <Select
                  ariaLabelledBy="issue-assignee-label"
                  data={ASSIGNEE_OPTIONS}
                  id="issue-assignee-select"
                  isNotClearable
                  onChange={(value) => setAssignee(value ?? 'unassigned')}
                  value={assignee}
                  width={FormFieldWidth.Full}
                />
              </ControlField>
            </ControlGrid>

            <IssueType>
              <IconVulnerability />
              Vulnerability
            </IssueType>

            <IssueFacts>
              <div>
                <dt>Tags</dt>
                <dd>
                  <FactBadges>
                    <Badge variety={BadgeVariety.Neutral}>cwe</Badge>
                    <Badge variety={BadgeVariety.Neutral}>github-actions</Badge>
                    <Badge variety={BadgeVariety.Neutral}>injection</Badge>
                  </FactBadges>
                </dd>
              </div>
              <div>
                <dt>Line affected</dt>
                <dd>L190</dd>
              </div>
              <div>
                <dt>Effort</dt>
                <dd>1h</dd>
              </div>
              <div>
                <dt>Introduced</dt>
                <dd>3 years ago</dd>
              </div>
              <div>
                <dt>File</dt>
                <dd>.github/workflows/build_reusable.yml</dd>
              </div>
            </IssueFacts>

            <IssueTabs
              onChange={(value) => setTab(value as IssueTab)}
              options={[
                { label: 'Issue', value: 'issue' },
                { label: 'Why', value: 'why' },
                { label: 'How to fix', value: 'fix' },
              ]}
              selected={tab}
            />

            <IssueExplanation aria-live="polite">
              <IssueExplanationTitle>{tabContent.title}</IssueExplanationTitle>
              <p>{tabContent.body}</p>
            </IssueExplanation>
          </IssueInformationPanel>

          <CodeViewerPanel aria-labelledby="code-viewer-title">
            <CodeViewerHeader>
              <div>
                <CodeViewerTitle id="code-viewer-title">
                  .github/workflows/build_reusable.yml
                </CodeViewerTitle>
                <CodeViewerContext>{branch} · Lines 187–200 · Issue on line 190</CodeViewerContext>
              </div>
              <Button
                prefix={<IconLinkExternal />}
                size={ButtonSize.Medium}
                variety={ButtonVariety.Default}>
                Open in IDE
              </Button>
            </CodeViewerHeader>

            <CodeCanvas aria-label="Source code containing the issue" role="list">
              <CodeLine number={187}>
                <SyntaxComment># Calculate build timing data</SyntaxComment>
              </CodeLine>
              <CodeLine number={188}>
                {'- '}
                <SyntaxKeyword>run:</SyntaxKeyword>
                {' turbo run get-test-timings -- --build '}
                {'$'}
                {'{{ github.sha }}'}
              </CodeLine>
              <CodeLine number={189}>{'  '}</CodeLine>
              <CodeLine isIssue number={190}>
                {'- '}
                <SyntaxKeyword>run:</SyntaxKeyword>
                {' /bin/bash -c "'}
                <UnsafeExpression>${'{{ inputs.afterBuild }}'}</UnsafeExpression>
                {'"'}
              </CodeLine>

              <InlineIssueCallout role="note">
                <IconVulnerability />
                <div>
                  <strong>
                    Change this workflow to not use user-controlled data directly in a run block.
                  </strong>
                  <span>Line 190 · githubactions:S7630 · Blocker</span>
                </div>
              </InlineIssueCallout>

              <CodeLine number={191}>
                {'  '}
                <SyntaxKeyword>timeout-minutes:</SyntaxKeyword> {'$'}
                {'{{ inputs.timeout_minutes }}'}
              </CodeLine>
              <CodeLine number={192}>{'  '}</CodeLine>
              <CodeLine number={193}>
                {'- '}
                <SyntaxKeyword>name:</SyntaxKeyword>
                {' Upload artifact'}
              </CodeLine>
              <CodeLine number={194}>
                {'  '}
                <SyntaxKeyword>uses:</SyntaxKeyword>
                {' actions/upload-artifact@v4'}
              </CodeLine>
              <CodeLine number={195}>
                {'  '}
                <SyntaxKeyword>with:</SyntaxKeyword>
              </CodeLine>
              <CodeLine number={196}>
                {'    '}
                <SyntaxKeyword>name:</SyntaxKeyword>
                {' turbo-run-summary-'}
                {'$'}
                {'{{ steps.var.outputs.input_step_key }}'}
              </CodeLine>
              <CodeLine number={197}>
                {'    '}
                <SyntaxKeyword>path:</SyntaxKeyword>
                {' .turbo/runs'}
              </CodeLine>
              <CodeLine number={198}>
                {'    '}
                <SyntaxKeyword>if-no-files-found:</SyntaxKeyword>
                {' ignore'}
              </CodeLine>
              <CodeLine number={199}>{'  '}</CodeLine>
              <CodeLine number={200}>
                {'- '}
                <SyntaxKeyword>name:</SyntaxKeyword>
                {' Upload bundle analyzer artifacts'}
              </CodeLine>
            </CodeCanvas>
          </CodeViewerPanel>
        </IssueDetailPageContent>
      </Layout.PageGrid>
    </ProjectShell>
  );
}

IssueDetailPage.displayName = 'IssueDetailPage';

function CodeLine({
  children,
  isIssue = false,
  number,
}: Readonly<{ children: ReactNode; isIssue?: boolean; number: number }>) {
  return (
    <CodeLineRow $isIssue={isIssue} role="listitem">
      <LineNumber aria-hidden>{number}</LineNumber>
      <CodeContent>{children}</CodeContent>
    </CodeLineRow>
  );
}

CodeLine.displayName = 'CodeLine';

const BranchSelect = styled(Select)`
  min-width: 0;
`;

BranchSelect.displayName = 'BranchSelect';

const IssueDetailPageContent = styled(Layout.PageContent)`
  display: grid;
  grid-template-columns: minmax(22rem, 28rem) minmax(0, 1fr);
  min-height: 0;
  padding: 0;

  @media (max-width: 70rem) {
    grid-template-columns: minmax(20rem, 24rem) minmax(36rem, 1fr);
  }
`;

IssueDetailPageContent.displayName = 'IssueDetailPageContent';

const IssueInformationPanel = styled.aside`
  min-width: 0;
  overflow-y: auto;
  padding: ${cssVar('dimension-space-300')};
  background-color: ${cssVar('color-surface-default')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssueInformationPanel.displayName = 'IssueInformationPanel';

const BackLink = styled(LinkStandalone)`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  margin-bottom: ${cssVar('dimension-space-250')};
`;

BackLink.displayName = 'BackLink';

const ClassificationRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-50')};
  margin-bottom: ${cssVar('dimension-space-150')};
`;

ClassificationRow.displayName = 'ClassificationRow';

const IssueTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
  text-wrap: balance;
`;

IssueTitle.displayName = 'IssueTitle';

const RuleDescription = styled.p`
  margin: ${cssVar('dimension-space-150')} 0 0;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
  text-wrap: pretty;
`;

RuleDescription.displayName = 'RuleDescription';

const ImpactBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-75')};
  margin-top: ${cssVar('dimension-space-250')};
`;

ImpactBlock.displayName = 'ImpactBlock';

const ImpactLabel = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

ImpactLabel.displayName = 'ImpactLabel';

const ImpactBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-75')};
`;

ImpactBadges.displayName = 'ImpactBadges';

const IssueActions = styled.div`
  display: flex;
  margin-top: ${cssVar('dimension-space-250')};
`;

IssueActions.displayName = 'IssueActions';

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${cssVar('dimension-space-150')};
  margin-top: ${cssVar('dimension-space-300')};
  padding-top: ${cssVar('dimension-space-250')};
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

ControlGrid.displayName = 'ControlGrid';

const ControlField = styled.div`
  min-width: 0;
`;

ControlField.displayName = 'ControlField';

const ControlLabel = styled.label`
  display: block;
  margin-bottom: ${cssVar('dimension-space-75')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-semi-bold')};
`;

ControlLabel.displayName = 'ControlLabel';

const IssueType = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
  margin-top: ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

IssueType.displayName = 'IssueType';

const IssueFacts = styled.dl`
  margin: ${cssVar('dimension-space-300')} 0 0;
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  > div {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: ${cssVar('dimension-space-150')};
    padding-block: ${cssVar('dimension-space-150')};
    border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  dt {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
  }

  dd {
    min-width: 0;
    margin: 0;
    overflow-wrap: anywhere;
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-small-medium')};
  }
`;

IssueFacts.displayName = 'IssueFacts';

const FactBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-50')};
`;

FactBadges.displayName = 'FactBadges';

const IssueTabs = styled(ToggleButtonGroup)`
  display: flex;
  width: 100%;
  margin-top: ${cssVar('dimension-space-300')};

  > button {
    flex: 1;
    min-width: 0;
  }
`;

IssueTabs.displayName = 'IssueTabs';

const IssueExplanation = styled.section`
  margin-top: ${cssVar('dimension-space-200')};
  padding: ${cssVar('dimension-space-200')};
  background-color: ${cssVar('color-background-neutral-subtle-default')};
  border-radius: ${cssVar('border-radius-300')};

  p {
    margin: ${cssVar('dimension-space-75')} 0 0;
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-small-regular')};
    text-wrap: pretty;
  }
`;

IssueExplanation.displayName = 'IssueExplanation';

const IssueExplanationTitle = styled.h3`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

IssueExplanationTitle.displayName = 'IssueExplanationTitle';

const CodeViewerPanel = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
`;

CodeViewerPanel.displayName = 'CodeViewerPanel';

const CodeViewerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};
  padding: ${cssVar('dimension-space-200')} ${cssVar('dimension-space-300')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

CodeViewerHeader.displayName = 'CodeViewerHeader';

const CodeViewerTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

CodeViewerTitle.displayName = 'CodeViewerTitle';

const CodeViewerContext = styled.p`
  margin: ${cssVar('dimension-space-25')} 0 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

CodeViewerContext.displayName = 'CodeViewerContext';

const CodeCanvas = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding-block: ${cssVar('dimension-space-150')};
  background-color: ${cssVar('color-surface-default')};
  font: ${cssVar('typography-code-default')};
`;

CodeCanvas.displayName = 'CodeCanvas';

const CodeLineRow = styled.div<{ $isIssue: boolean }>`
  display: grid;
  grid-template-columns: ${cssVar('dimension-width-800')} minmax(max-content, 1fr);
  min-width: max-content;
  background-color: ${({ $isIssue }) =>
    $isIssue ? cssVar('badge-colors-danger-weak-default') : 'transparent'};
`;

CodeLineRow.displayName = 'CodeLineRow';

const LineNumber = styled.span`
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-subtle')};
  text-align: right;
  user-select: none;
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

LineNumber.displayName = 'LineNumber';

const CodeContent = styled.code`
  display: block;
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-default')};
  white-space: pre;
`;

CodeContent.displayName = 'CodeContent';

const SyntaxKeyword = styled.span`
  color: ${cssVar('color-feature-solid-default')};
  font: ${cssVar('typography-code-highlight')};
`;

SyntaxKeyword.displayName = 'SyntaxKeyword';

const SyntaxComment = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-code-comment')};
`;

SyntaxComment.displayName = 'SyntaxComment';

const UnsafeExpression = styled.span`
  color: ${cssVar('color-status-danger-foreground')};
  font: ${cssVar('typography-code-highlight')};
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${cssVar('color-status-danger-foreground')};
  text-underline-offset: ${cssVar('dimension-space-50')};
`;

UnsafeExpression.displayName = 'UnsafeExpression';

const InlineIssueCallout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${cssVar('dimension-space-100')};
  margin: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-300')}
    ${cssVar('dimension-space-150')}
    calc(${cssVar('dimension-width-800')} + ${cssVar('dimension-space-200')});
  padding: ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-default')};
  background-color: ${cssVar('badge-colors-danger-weak-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('badge-colors-danger-weak-border')};
  border-radius: ${cssVar('border-radius-300')};

  > span {
    flex: 0 0 auto;
    color: ${cssVar('color-status-danger-foreground')};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-50')};
  }

  strong {
    font: ${cssVar('typography-text-default-semi-bold')};
  }

  div > span {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
  }
`;

InlineIssueCallout.displayName = 'InlineIssueCallout';

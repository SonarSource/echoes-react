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
  Fragment,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import {
  Badge,
  BadgeVariety,
  Button,
  ButtonIcon,
  ButtonSize,
  ButtonVariety,
  cssVar,
  HeadingSize,
  IconArrowLeft,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCopy,
  IconExpand,
  IconSparkle,
  Layout,
  LinkStandalone,
  Select,
  SelectHighlight,
  ToggleButtonGroup,
} from '../../src';
import { IssueImpact } from './IssueImpact';
import { IssueCodeSyntax } from './IssueCodeSyntax';
import {
  IssueCodeCollapseButton,
  getIssueLocations,
  type IssueCodeLine,
  IssueLocationNavigator,
} from './IssueLocationNavigation';
import { readIssueNavigationData } from './IssueNavigationState';
import { type IssueSeverity } from './IssueSeverityColors';
import { IssueSeverityIcon } from './IssueSeverityIcon';
import {
  ISSUES_STORY_URL,
  navigateToPlaygroundStory,
  ProductGlobalNavigationBreadcrumbs,
  ProjectShell,
} from './ProductShell';

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

type IssueTab = 'activity' | 'fix' | 'why';

interface IssueDetail {
  attribute: string;
  code: ReadonlyArray<IssueCodeLine>;
  effort: string;
  file: string;
  fix: string;
  introduced: string;
  key: string;
  line: number;
  message: string;
  rule: string;
  ruleDescription: string;
  severity: IssueSeverity;
  severityLabel: string;
  tags: ReadonlyArray<string>;
  type: 'Maintainability' | 'Reliability' | 'Security';
  where: string;
  why: string;
}

interface IssueCodeFile {
  code: ReadonlyArray<IssueCodeLine>;
  file: string;
  isPrimary: boolean;
  line: number;
}

const STATUS_OPTIONS = [
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
];

const ASSIGNEE_OPTIONS = [
  { label: 'Not assigned', value: 'unassigned' },
  { label: 'M. Dupont', value: 'm-dupont' },
  { label: 'A. Martin', value: 'a-martin' },
  { label: 'J. Kim', value: 'j-kim' },
];

const ISSUE_TABS: Array<{ label: string; value: IssueTab }> = [
  { label: 'Why', value: 'why' },
  { label: 'How to fix', value: 'fix' },
  { label: 'Activity', value: 'activity' },
];

const FEATURED_ISSUES: ReadonlyArray<IssueDetail> = [
  {
    attribute: 'Complete',
    code: [
      { content: 'async function refreshIssue(issue: Issue) {', number: 294 },
      { content: '  try {', number: 295 },
      { content: '    await updateIssue(issue);', number: 296 },
      { content: "    announce('Issue updated');", number: 297 },
      { content: '} catch (error) {', number: 298 },
      { content: '  // The error is silently ignored.', number: 299 },
      { content: '}', number: 300 },
      { content: 'return issue;', number: 301 },
      { content: '}', number: 302 },
    ],
    effort: '15 min',
    file: 'src/components/issues/IssueList.tsx',
    fix: 'Handle the caught error, report it to the caller, or remove the catch block so the failure can propagate.',
    introduced: '6 months ago',
    key: 'S6551',
    line: 298,
    message: "Handle this exception or don't catch it at all.",
    rule: 'typescript:S6551',
    ruleDescription: 'Exceptions should not be ignored.',
    severity: 'blocker',
    severityLabel: 'Blocker',
    tags: ['error-handling', 'cwe', 'typescript'],
    type: 'Reliability',
    where:
      'The catch block on line 298 absorbs every failure from updateIssue without handling or rethrowing it.',
    why: 'Silently ignored failures leave the issue list in an unknown state and prevent callers from recovering or informing the user.',
  },
  {
    attribute: 'Focused',
    code: [
      { content: 'function groupIssues(issues: Issue[]) {', number: 81 },
      { content: '  return issues.reduce((groups, issue) => {', number: 82 },
      { content: '    if (issue.status === "open") {', number: 83 },
      { content: '      if (issue.assignee) {', number: 84 },
      { content: '        if (issue.severity === "high") {', number: 85 },
      { content: '          groups.priority.push(issue);', number: 86 },
      { content: '        }', number: 87 },
      { content: '      }', number: 88 },
      { content: '    }', number: 89 },
      { content: '    return groups;', number: 90 },
    ],
    effort: '45 min',
    file: 'src/components/issues/groupIssues.ts',
    fix: 'Extract the priority decision into small named predicates and use early returns to flatten the control flow.',
    introduced: '2 months ago',
    key: 'S3776',
    line: 84,
    message: 'Refactor this function to reduce its Cognitive Complexity from 24 to 15.',
    rule: 'typescript:S3776',
    ruleDescription: 'Cognitive Complexity should not be too high.',
    severity: 'high',
    severityLabel: 'High',
    tags: ['complexity', 'brain-overload'],
    type: 'Maintainability',
    where: 'Nested conditions beginning on line 84 make groupIssues harder to scan and extend.',
    why: 'High cognitive complexity increases review time and makes future behavior changes more error-prone.',
  },
  {
    attribute: 'Intentionality',
    code: [
      { content: 'export function matchesPath(value: string) {', number: 44 },
      { content: '  const normalized = value.trim();', number: 45 },
      { content: '  const pattern = /^(a+)+$/;', number: 46 },
      { content: '  return pattern.test(normalized);', number: 47 },
      { content: '}', number: 48 },
      { content: '', number: 49 },
      { content: 'export function filterPaths(paths: string[]) {', number: 50 },
      { content: '  return paths.filter(matchesPath);', number: 51 },
    ],
    effort: '30 min',
    file: 'src/api/issues/pathMatcher.ts',
    fix: 'Replace the nested quantified group with a linear expression or cap the input before applying the pattern.',
    introduced: '3 weeks ago',
    key: 'S5852',
    line: 46,
    message: 'Make sure this regular expression cannot lead to catastrophic backtracking.',
    rule: 'typescript:S5852',
    ruleDescription: 'Regular expressions should not be vulnerable to denial of service.',
    severity: 'high',
    severityLabel: 'High',
    tags: ['regex', 'security', 'dos'],
    type: 'Security',
    where: 'The nested quantifier in the pattern on line 46 can revisit the same input many times.',
    why: 'A crafted string can make the expression consume excessive CPU and block request processing.',
  },
  {
    attribute: 'Complete',
    code: [
      { content: 'export function ClearFiltersButton({ onClear }: Props) {', number: 129 },
      { content: '  return (', number: 130 },
      { content: '    <button onClick={onClear}>', number: 131 },
      { content: '      <IconX />', number: 132 },
      { content: '    </button>', number: 133 },
      { content: '  );', number: 134 },
      { content: '}', number: 135 },
    ],
    effort: '10 min',
    file: 'src/components/filters/ClearFiltersButton.tsx',
    fix: 'Add a concise accessible name such as aria-label="Clear filters" to the icon-only button.',
    introduced: '12 days ago',
    key: 'S6759',
    line: 131,
    message: 'Provide an accessible name for this interactive element.',
    rule: 'typescript:S6759',
    ruleDescription: 'Interactive elements should have accessible names.',
    severity: 'medium',
    severityLabel: 'Medium',
    tags: ['accessibility', 'react'],
    type: 'Reliability',
    where: 'The icon-only button on line 131 has no text alternative for assistive technology.',
    why: 'Screen reader users cannot determine what the control does before activating it.',
  },
  {
    attribute: 'Intentionality',
    code: [
      { content: '- name: Run consumer build', number: 187 },
      { content: '  shell: bash', number: 188 },
      { content: '  env:', number: 189 },
      { content: `    BUILD_TARGET: \${{ inputs.afterBuild }}`, number: 190 },
      { content: `  run: /bin/bash -c "\${{ inputs.afterBuild }}"`, number: 191 },
      { content: `  timeout-minutes: \${{ inputs.timeout_minutes }}`, number: 192 },
      { content: '', number: 193 },
      { content: '- name: Upload artifact', number: 194 },
      { content: '  uses: actions/upload-artifact@v4', number: 195 },
    ],
    effort: '1 h',
    file: '.github/workflows/build_reusable.yml',
    fix: 'Assign the input to an environment variable and reference the quoted variable from the run block.',
    introduced: '3 years ago',
    key: 'S7630',
    line: 191,
    message: 'Change this workflow to not use user-controlled data directly in a run block.',
    rule: 'githubactions:S7630',
    ruleDescription: 'GitHub Actions should not be vulnerable to script injections.',
    severity: 'blocker',
    severityLabel: 'Blocker',
    tags: ['github-actions', 'injection', 'cwe'],
    type: 'Security',
    where:
      'The workflow interpolates a caller-controlled input directly into a shell run block on line 191.',
    why: 'An attacker can supply shell syntax through inputs.afterBuild and execute unintended commands in the workflow runner.',
  },
];

const ISSUE_QUEUE: ReadonlyArray<IssueDetail> = Array.from({ length: 6 }, (_, index) => {
  const issue = FEATURED_ISSUES[index % FEATURED_ISSUES.length];

  return index < FEATURED_ISSUES.length
    ? issue
    : {
        ...issue,
        key: `${issue.key}-${index + 1}`,
      };
});

function groupIssuesByFile(issues: ReadonlyArray<IssueDetail>) {
  const groups = new Map<string, IssueDetail[]>();

  issues.forEach((issue) => {
    const fileIssues = groups.get(issue.file) ?? [];
    fileIssues.push(issue);
    groups.set(issue.file, fileIssues);
  });

  return Array.from(groups, ([file, fileIssues]) => ({ file, issues: fileIssues }));
}

function getIssueCodeFiles(
  issue: IssueDetail,
  currentLocation: Pick<IssueCodeFile, 'code' | 'file' | 'line'>,
): ReadonlyArray<IssueCodeFile> {
  const relatedLine = 40 + (issue.line % 24);
  const testLine = 18 + (issue.line % 12);

  return [
    { ...currentLocation, isPrimary: true },
    {
      code: [
        { content: 'export function buildIssueContext(issue: Issue) {', number: relatedLine - 2 },
        { content: '  const source = issue.primaryLocation;', number: relatedLine - 1 },
        { content: '  return analyzeSource(source);', number: relatedLine },
        { content: '}', number: relatedLine + 1 },
      ],
      file: 'src/services/issues/issueContext.ts',
      isPrimary: false,
      line: relatedLine,
    },
    {
      code: [
        { content: "it('reports the issue location', () => {", number: testLine - 2 },
        { content: '  const result = analyzeFixture();', number: testLine - 1 },
        { content: `  expect(result.rule).toBe('${issue.rule}');`, number: testLine },
        { content: '});', number: testLine + 1 },
      ],
      file: 'src/components/issues/IssueList.test.tsx',
      isPrimary: false,
      line: testLine,
    },
  ];
}

function getTabContent(issue: IssueDetail, tab: IssueTab) {
  switch (tab) {
    case 'why':
      return { body: issue.why, title: 'Why is this an issue?' };
    case 'fix':
      return { body: issue.fix, title: 'How can I fix it?' };
    case 'activity':
      return {
        body: `This issue was introduced ${issue.introduced} and is still open. No comments or status changes have been recorded yet.`,
        title: 'Activity',
      };
  }
}

function DetailedWhyContent() {
  return (
    <IssueLongForm>
      <p>
        OS command injections occur when applications build command lines from untrusted data before
        executing them with a system shell.
      </p>
      <p>
        In that case, an attacker can tamper with the command line construction and force the
        execution of unexpected commands. This can lead to the compromise of the underlying
        operating system.
      </p>

      <section>
        <h4>What is the potential impact?</h4>
        <p>
          An attacker exploiting an OS command injection vulnerability will be able to execute
          arbitrary commands on the underlying operating system.
        </p>
        <p>
          The impact depends on the access control measures taken on the target system OS. In the
          worst-case scenario, the process runs with root privileges, and therefore any OS commands
          or programs may be affected.
        </p>
        <p>
          Below are some real-world scenarios that illustrate some impacts of an attacker exploiting
          the vulnerability.
        </p>
      </section>

      <section>
        <h4>Denial of service and data leaks</h4>
        <p>
          In this scenario, the attack aims to disrupt the organization’s activities and profit from
          data leaks.
        </p>
        <p>An attacker could, for example:</p>
        <ul>
          <li>download the internal server’s data, most likely to sell it</li>
          <li>modify data, send malware</li>
          <li>stop services or exhaust resources (with fork bombs for example)</li>
        </ul>
        <p>
          This threat is particularly insidious if the attacked organization does not maintain a
          disaster recovery plan (DRP).
        </p>
      </section>

      <section>
        <h4>Root privilege escalation and pivot</h4>
        <p>
          In this scenario, the attacker can do everything described in the previous section. The
          difference is that the attacker also manages to elevate their privileges to an
          administrative level and attacks other servers.
        </p>
        <p>
          Here, the impact depends on how much the target company focuses on its Defense In Depth.
          For example, the entire infrastructure can be compromised by a combination of OS
          injections and misconfiguration of:
        </p>
        <ul>
          <li>Docker or Kubernetes clusters</li>
          <li>cloud services</li>
          <li>network firewalls and routing</li>
          <li>OS access control</li>
        </ul>
      </section>
    </IssueLongForm>
  );
}

DetailedWhyContent.displayName = 'DetailedWhyContent';

function JiraLogo() {
  return (
    <JiraLogoMark aria-hidden="true" viewBox="0 0 16 16">
      <path d="M14.4152 1H7.67347C7.67347 1.80713 7.99411 2.58121 8.56484 3.15194C9.13557 3.72267 9.90964 4.0433 10.7168 4.0433H11.9587V5.24237C11.9598 6.92161 13.3208 8.28266 15 8.28376V1.58484C15 1.26193 14.7382 1 14.4152 1Z" />
      <path d="M11.0794 4.35914H4.33775C4.33879 6.03837 5.69978 7.39942 7.37908 7.40052H8.62098V8.60343C8.62311 10.2827 9.98504 11.6428 11.6643 11.6428V4.94409C11.6643 4.62107 11.4024 4.35914 11.0794 4.35914Z" />
      <path d="M7.74168 7.71635H1C1 9.39713 2.36258 10.7597 4.0433 10.7597H5.28909V11.9587C5.29019 13.6364 6.64882 14.9968 8.32658 15V8.30125C8.32658 7.97823 8.0647 7.71635 7.74168 7.71635Z" />
    </JiraLogoMark>
  );
}

JiraLogo.displayName = 'JiraLogo';

function getAssigneeValue(assignee?: string) {
  switch (assignee) {
    case 'A. Martin':
      return 'a-martin';
    case 'J. Kim':
      return 'j-kim';
    case 'M. Dupont':
      return 'm-dupont';
    default:
      return 'unassigned';
  }
}

function handleIssuesNavigation(event: MouseEvent<HTMLElement>) {
  navigateToPlaygroundStory(event, ISSUES_STORY_URL);
}

function IssueDetailPage() {
  const navigatedIssue = readIssueNavigationData();
  const initialIssue = navigatedIssue ?? FEATURED_ISSUES[0];
  const issueQueue: ReadonlyArray<IssueDetail> = ISSUE_QUEUE.map((issue) =>
    issue.key === initialIssue.key ? initialIssue : issue,
  );
  const issueGroups = groupIssuesByFile(issueQueue);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueDetail>(initialIssue);
  const [assignee, setAssignee] = useState(() => getAssigneeValue(navigatedIssue?.assignee));
  const [aiFixLabel, setAiFixLabel] = useState('Generate AI fix');
  const [codePaneWidth, setCodePaneWidth] = useState<number>();
  const [collapsedCodeFiles, setCollapsedCodeFiles] = useState<ReadonlyArray<string>>([]);
  const [copyLabel, setCopyLabel] = useState('Copy AI prompt');
  const [jiraLabel, setJiraLabel] = useState('Push to Jira');
  const [isIssueNavigatorCollapsed, setIsIssueNavigatorCollapsed] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [status, setStatus] = useState(navigatedIssue?.status ?? 'open');
  const [tab, setTab] = useState<IssueTab>('why');
  const [visitedIssueKeys, setVisitedIssueKeys] = useState<ReadonlyArray<string>>([
    initialIssue.key,
  ]);
  const tabContent = getTabContent(selectedIssue, tab);
  const issueLocations = getIssueLocations(selectedIssue);
  const currentLocation = issueLocations[locationIndex] ?? issueLocations[0];
  const issueCodeFiles = getIssueCodeFiles(selectedIssue, currentLocation);
  const codePaneWidthBounds = getCodePaneWidthBounds();
  const effectiveCodePaneWidth = codePaneWidth ?? getDefaultCodePaneWidth();

  function getDefaultCodePaneWidth() {
    const workspaceWidth = workspaceRef.current?.getBoundingClientRect().width ?? window.innerWidth;
    const issueNavigatorWidth =
      workspaceRef.current
        ?.querySelector<HTMLElement>('aside[aria-label="Issues in this analysis"]')
        ?.getBoundingClientRect().width ?? 288;

    return Math.round((workspaceWidth - issueNavigatorWidth) / 2);
  }

  function getCodePaneWidthBounds() {
    const workspaceWidth = workspaceRef.current?.getBoundingClientRect().width ?? window.innerWidth;
    const minWidth = Math.min(360, Math.max(300, workspaceWidth - 720));

    return {
      maxWidth: Math.max(minWidth, workspaceWidth - 680),
      minWidth,
    };
  }

  function clampCodePaneWidth(width: number) {
    const { maxWidth, minWidth } = getCodePaneWidthBounds();

    return Math.round(Math.min(Math.max(width, minWidth), maxWidth));
  }

  function resizeCodePane(clientX: number) {
    const workspaceRight = workspaceRef.current?.getBoundingClientRect().right ?? window.innerWidth;

    setCodePaneWidth(clampCodePaneWidth(workspaceRight - clientX));
  }

  function handleCodePaneResizePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleCodePaneResizePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      resizeCodePane(event.clientX);
    }
  }

  function handleCodePaneResizePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleCodePaneResizeKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let nextWidth: number | undefined;
    const { maxWidth, minWidth } = getCodePaneWidthBounds();

    if (event.key === 'ArrowLeft') {
      nextWidth = effectiveCodePaneWidth + 32;
    } else if (event.key === 'ArrowRight') {
      nextWidth = effectiveCodePaneWidth - 32;
    } else if (event.key === 'Home') {
      nextWidth = minWidth;
    } else if (event.key === 'End') {
      nextWidth = maxWidth;
    }

    if (nextWidth === undefined) {
      return;
    }

    event.preventDefault();
    setCodePaneWidth(clampCodePaneWidth(nextWidth));
  }

  function selectIssue(issue: IssueDetail) {
    setSelectedIssue(issue);
    setVisitedIssueKeys((visitedKeys) =>
      visitedKeys.includes(issue.key) ? visitedKeys : [...visitedKeys, issue.key],
    );
    setAssignee('unassigned');
    setStatus('open');
    setTab('why');
    setLocationIndex(0);
    setCollapsedCodeFiles([]);
  }

  function toggleCodeFile(file: string) {
    setCollapsedCodeFiles((collapsedFiles) =>
      collapsedFiles.includes(file)
        ? collapsedFiles.filter((collapsedFile) => collapsedFile !== file)
        : [...collapsedFiles, file],
    );
  }

  async function copyAiPrompt() {
    const prompt = [
      'Fix this Sonar issue:',
      selectedIssue.message,
      `File: ${currentLocation.file}`,
      `Line: ${currentLocation.line}`,
      `Rule: ${selectedIssue.rule}`,
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

  function pushToJira() {
    setJiraLabel('Pushed to Jira');
    window.setTimeout(() => setJiraLabel('Push to Jira'), 1600);
  }

  function generateAiFix() {
    setAiFixLabel('Generating…');
    window.setTimeout(() => setAiFixLabel('Generate AI fix'), 1600);
  }

  return (
    <ProjectShell
      activeItem="issues"
      globalNavigationPrimary={
        <ProductGlobalNavigationBreadcrumbs>
          <BackLink onClick={handleIssuesNavigation} to={ISSUES_STORY_URL}>
            <IconArrowLeft />
            Back to issues
          </BackLink>
        </ProductGlobalNavigationBreadcrumbs>
      }
      isSidebarHidden>
      <DeepWorkPageGrid width="fluid">
        <IssueDetailPageContent
          $codePaneWidth={codePaneWidth}
          $isIssueNavigatorCollapsed={isIssueNavigatorCollapsed}
          ref={workspaceRef}>
          <IssueNavigator aria-label="Issues in this analysis">
            {isIssueNavigatorCollapsed ? (
              <IssueNavigatorCollapsedControls>
                <ButtonIcon
                  Icon={IconChevronRight}
                  ariaLabel="Expand issue sidebar"
                  onClick={() => setIsIssueNavigatorCollapsed(false)}
                  size={ButtonSize.Medium}
                  variety={ButtonVariety.DefaultGhost}
                />
              </IssueNavigatorCollapsedControls>
            ) : (
              <>
                <IssueNavigatorHeader>
                  <IssueNavigatorHeading>
                    <h2>Issues</h2>
                    <IssueNavigatorHeaderActions>
                      <span>{issueQueue.length}</span>
                      <ButtonIcon
                        Icon={IconChevronLeft}
                        ariaLabel="Collapse issue sidebar"
                        onClick={() => setIsIssueNavigatorCollapsed(true)}
                        size={ButtonSize.Medium}
                        variety={ButtonVariety.DefaultGhost}
                      />
                    </IssueNavigatorHeaderActions>
                  </IssueNavigatorHeading>
                </IssueNavigatorHeader>

                <IssueNavigatorGroups>
                  {issueGroups.map((group, groupIndex) => {
                    const headingId = `issue-file-group-${groupIndex}`;

                    return (
                      <IssueNavigatorFileGroup aria-labelledby={headingId} key={group.file}>
                        <IssueNavigatorFileHeader>
                          <h3 id={headingId} title={group.file}>
                            {group.file}
                          </h3>
                          <span>{group.issues.length}</span>
                        </IssueNavigatorFileHeader>
                        <IssueNavigatorList>
                          {group.issues.map((issue) => {
                            const isSelected = issue.key === selectedIssue.key;

                            return (
                              <li key={issue.key}>
                                <IssueNavigatorItem
                                  aria-current={isSelected ? 'true' : undefined}
                                  onClick={() => selectIssue(issue)}
                                  type="button">
                                  <IssueNavigatorItemTop>
                                    <IssueNavigatorSeverity>
                                      <IssueSeverityIcon severity={issue.severity} />
                                      {issue.severityLabel}
                                    </IssueNavigatorSeverity>
                                    <span>{issue.type}</span>
                                  </IssueNavigatorItemTop>
                                  <IssueNavigatorMessage
                                    $isVisited={visitedIssueKeys.includes(issue.key)}>
                                    {issue.message}
                                  </IssueNavigatorMessage>
                                  <IssueNavigatorLocation>L{issue.line}</IssueNavigatorLocation>
                                </IssueNavigatorItem>
                              </li>
                            );
                          })}
                        </IssueNavigatorList>
                      </IssueNavigatorFileGroup>
                    );
                  })}
                </IssueNavigatorGroups>
              </>
            )}
          </IssueNavigator>

          <IssueAnalysis aria-labelledby="issue-title">
            <IssueAnalysisScrollArea>
              <IssueSummary>
                <InternalPageHeader
                  description={
                    <Layout.PageHeader.Description>
                      {selectedIssue.ruleDescription}{' '}
                      <LinkStandalone to={`/rules/${selectedIssue.rule}`}>
                        {selectedIssue.rule}
                      </LinkStandalone>
                    </Layout.PageHeader.Description>
                  }
                  metadata={
                    <IssueHeaderMetadata>
                      <IssueImpact
                        attribute={selectedIssue.type}
                        severity={selectedIssue.severity}
                        severityLabel={selectedIssue.severityLabel}
                      />
                    </IssueHeaderMetadata>
                  }
                  title={
                    <IssueHeaderTitle
                      headingLevel="h2"
                      headingSize={HeadingSize.ExtraLarge}
                      suffix={
                        <IssueHeaderActions>
                          <ButtonIcon
                            Icon={IconCopy}
                            ariaLabel={copyLabel}
                            onClick={copyAiPrompt}
                            size={ButtonSize.Medium}
                            tooltipContent={copyLabel}
                            variety={ButtonVariety.DefaultGhost}
                          />
                          <Button
                            onClick={pushToJira}
                            prefix={<JiraLogo />}
                            size={ButtonSize.Medium}
                            variety={ButtonVariety.Default}>
                            {jiraLabel}
                          </Button>
                          <Button
                            onClick={generateAiFix}
                            prefix={<IconSparkle />}
                            size={ButtonSize.Medium}
                            variety={ButtonVariety.Primary}>
                            {aiFixLabel}
                          </Button>
                        </IssueHeaderActions>
                      }>
                      <span id="issue-title">{selectedIssue.message}</span>
                    </IssueHeaderTitle>
                  }
                />
              </IssueSummary>

              <IssueManagementBar aria-label="Issue management">
                <ControlField>
                  <InteractiveControlLabel htmlFor="issue-status-select" id="issue-status-label">
                    Status
                    <IconChevronDown />
                  </InteractiveControlLabel>
                  <MetadataSelect
                    ariaLabelledBy="issue-status-label"
                    data={STATUS_OPTIONS}
                    highlight={SelectHighlight.Ghost}
                    id="issue-status-select"
                    isNotClearable
                    onChange={(value) => setStatus(value ?? 'open')}
                    value={status}
                  />
                </ControlField>
                <ControlField>
                  <InteractiveControlLabel
                    htmlFor="issue-assignee-select"
                    id="issue-assignee-label">
                    Assignee
                    <IconChevronDown />
                  </InteractiveControlLabel>
                  <MetadataSelect
                    ariaLabelledBy="issue-assignee-label"
                    data={ASSIGNEE_OPTIONS}
                    highlight={SelectHighlight.Ghost}
                    id="issue-assignee-select"
                    isNotClearable
                    onChange={(value) => setAssignee(value ?? 'unassigned')}
                    value={assignee}
                  />
                </ControlField>
                <IssueMetadataItem>
                  <IssueMetadataLabel>Effort</IssueMetadataLabel>
                  <IssueMetadataValue>{selectedIssue.effort}</IssueMetadataValue>
                </IssueMetadataItem>
                <IssueMetadataItem>
                  <IssueMetadataLabel>Introduced</IssueMetadataLabel>
                  <IssueMetadataValue>{selectedIssue.introduced}</IssueMetadataValue>
                </IssueMetadataItem>
              </IssueManagementBar>

              <IssueWorkArea>
                <IssueContextPanel>
                  <IssueToggleControls>
                    <ToggleButtonGroup
                      onChange={(value) => setTab(value as IssueTab)}
                      options={ISSUE_TABS}
                      selected={tab}
                    />
                  </IssueToggleControls>

                  <IssueTabPanel id="issue-detail-panel">
                    <IssueExplanationTitle aria-live="polite">
                      {tabContent.title}
                    </IssueExplanationTitle>
                    {tab === 'why' && selectedIssue.key.startsWith('S6551') ? (
                      <DetailedWhyContent />
                    ) : (
                      <IssueExplanationBody>{tabContent.body}</IssueExplanationBody>
                    )}

                    {tab === 'activity' && (
                      <ActivityList aria-label="Issue activity">
                        <li>
                          <strong>Issue opened</strong>
                          <span>{selectedIssue.introduced}</span>
                        </li>
                        <li>
                          <strong>Assigned to M. Dupont</strong>
                          <span>2 hours ago</span>
                        </li>
                      </ActivityList>
                    )}

                    {tab !== 'activity' && (
                      <AnalysisFacts>
                        <div>
                          <dt>Rule</dt>
                          <dd>
                            <LinkStandalone to={`/rules/${selectedIssue.rule}`}>
                              {selectedIssue.rule}
                            </LinkStandalone>
                          </dd>
                        </div>
                        <div>
                          <dt>Tags</dt>
                          <dd>
                            <FactBadges>
                              {selectedIssue.tags.map((tag) => (
                                <Badge key={tag} variety={BadgeVariety.Neutral}>
                                  {tag}
                                </Badge>
                              ))}
                            </FactBadges>
                          </dd>
                        </div>
                      </AnalysisFacts>
                    )}
                  </IssueTabPanel>
                </IssueContextPanel>
              </IssueWorkArea>
            </IssueAnalysisScrollArea>
          </IssueAnalysis>

          <CodeWorkspace aria-label="Issue source code">
            <CodePaneResizeHandle
              aria-label="Resize code viewer"
              aria-orientation="vertical"
              aria-valuemax={codePaneWidthBounds.maxWidth}
              aria-valuemin={codePaneWidthBounds.minWidth}
              aria-valuenow={effectiveCodePaneWidth}
              onKeyDown={handleCodePaneResizeKeyDown}
              onPointerCancel={handleCodePaneResizePointerEnd}
              onPointerDown={handleCodePaneResizePointerDown}
              onPointerMove={handleCodePaneResizePointerMove}
              onPointerUp={handleCodePaneResizePointerEnd}
              role="separator"
              tabIndex={0}
            />
            <CodeViewerPanel aria-labelledby="code-locations-title">
              <CodeWorkspaceHeader>
                <h2 id="code-locations-title">Code locations</h2>
                <span>{issueCodeFiles.length} files</span>
              </CodeWorkspaceHeader>

              <CodeCardsList>
                {issueCodeFiles.map((codeFile, fileIndex) => {
                  const isExpanded = !collapsedCodeFiles.includes(codeFile.file);
                  const titleId = `code-viewer-title-${fileIndex}`;

                  return (
                    <CodeViewerCard aria-labelledby={titleId} key={codeFile.file}>
                      <CodeViewerHeader>
                        <CodeViewerHeaderMain>
                          <IssueCodeCollapseButton
                            isExpanded={isExpanded}
                            onToggle={() => toggleCodeFile(codeFile.file)}
                          />
                          <CodeViewerFile>
                            <CodeViewerTitle id={titleId}>{codeFile.file}</CodeViewerTitle>
                          </CodeViewerFile>
                        </CodeViewerHeaderMain>
                        <CodeViewerHeaderActions>
                          {codeFile.isPrimary && (
                            <IssueLocationNavigator
                              currentIndex={locationIndex}
                              onNext={() =>
                                setLocationIndex((index) =>
                                  Math.min(index + 1, issueLocations.length - 1),
                                )
                              }
                              onPrevious={() => setLocationIndex((index) => Math.max(index - 1, 0))}
                              total={issueLocations.length}
                            />
                          )}
                          <ButtonIcon
                            Icon={IconExpand}
                            ariaLabel={`Expand code viewer for ${codeFile.file}`}
                            size={ButtonSize.Medium}
                            variety={ButtonVariety.DefaultGhost}
                          />
                        </CodeViewerHeaderActions>
                      </CodeViewerHeader>

                      {isExpanded && (
                        <CodeCanvas aria-label={`Source code in ${codeFile.file}`} role="region">
                          {codeFile.code.map((line) => {
                            const isIssue = line.number === codeFile.line;

                            return (
                              <Fragment key={line.number}>
                                <CodeLine isIssue={isIssue} number={line.number}>
                                  {isIssue ? (
                                    <>
                                      <UnsafeExpression>
                                        <IssueCodeSyntax code={line.content} />
                                      </UnsafeExpression>
                                      {codeFile.isPrimary && (
                                        <IssueNumberMarker
                                          aria-label={`Issue ${locationIndex + 1}`}>
                                          {locationIndex + 1}
                                        </IssueNumberMarker>
                                      )}
                                    </>
                                  ) : (
                                    <IssueCodeSyntax code={line.content} />
                                  )}
                                </CodeLine>
                                {isIssue && codeFile.isPrimary && (
                                  <InlineIssueCallout role="note">
                                    <IssueSeverityIcon severity={selectedIssue.severity} />
                                    <InlineIssueCalloutText>
                                      <strong>{selectedIssue.message}</strong>
                                      <span>
                                        Line {codeFile.line} · {selectedIssue.rule} ·{' '}
                                        {selectedIssue.severityLabel}
                                      </span>
                                    </InlineIssueCalloutText>
                                  </InlineIssueCallout>
                                )}
                              </Fragment>
                            );
                          })}
                        </CodeCanvas>
                      )}
                    </CodeViewerCard>
                  );
                })}
              </CodeCardsList>
            </CodeViewerPanel>
          </CodeWorkspace>
        </IssueDetailPageContent>
      </DeepWorkPageGrid>
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
    <CodeLineRow $isIssue={isIssue}>
      <LineNumber $isIssue={isIssue} aria-hidden>
        {number}
      </LineNumber>
      <CodeContent>{children}</CodeContent>
    </CodeLineRow>
  );
}

CodeLine.displayName = 'CodeLine';

const DeepWorkPageGrid = styled(Layout.PageGrid)`
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

DeepWorkPageGrid.displayName = 'DeepWorkPageGrid';

const IssueDetailPageContent = styled(Layout.PageContent)<{
  $codePaneWidth?: number;
  $isIssueNavigatorCollapsed: boolean;
}>`
  display: grid;
  grid-template-columns:
    ${({ $isIssueNavigatorCollapsed }) =>
      $isIssueNavigatorCollapsed ? cssVar('layout-sidebar-navigation-sizes-width-closed') : '18rem'}
    minmax(20rem, 1fr)
    ${({ $codePaneWidth }) =>
      $codePaneWidth === undefined ? 'minmax(20rem, 1fr)' : `${$codePaneWidth}px`};
  min-width: 0;
  min-height: 0;
  height: calc(100vh - ${cssVar('layout-global-navigation-sizes-height-default')});
  padding: 0;
  overflow: hidden;

  @media (max-width: 64rem) {
    grid-template-columns:
      ${({ $isIssueNavigatorCollapsed }) =>
        $isIssueNavigatorCollapsed
          ? cssVar('layout-sidebar-navigation-sizes-width-closed')
          : '16rem'}
      minmax(0, 1fr);
    grid-template-rows: minmax(32rem, 1fr) 28rem;
  }
`;

IssueDetailPageContent.displayName = 'IssueDetailPageContent';

const BackLink = styled(LinkStandalone)`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
`;

BackLink.displayName = 'BackLink';

const IssueNavigator = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssueNavigator.displayName = 'IssueNavigator';

const IssueNavigatorHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-200')};
  background-color: ${cssVar('color-surface-default')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssueNavigatorHeader.displayName = 'IssueNavigatorHeader';

const IssueNavigatorCollapsedControls = styled.div`
  display: flex;
  justify-content: center;
  padding-block: ${cssVar('dimension-space-150')};
`;

IssueNavigatorCollapsedControls.displayName = 'IssueNavigatorCollapsedControls';

const IssueNavigatorHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-100')};

  h2 {
    margin: 0;
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-heading-medium')};
  }

  span {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-medium')};
    font-variant-numeric: tabular-nums;
  }
`;

IssueNavigatorHeading.displayName = 'IssueNavigatorHeading';

const IssueNavigatorHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
`;

IssueNavigatorHeaderActions.displayName = 'IssueNavigatorHeaderActions';

const IssueNavigatorGroups = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  padding: ${cssVar('dimension-space-75')} 0;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

IssueNavigatorGroups.displayName = 'IssueNavigatorGroups';

const IssueNavigatorFileGroup = styled.section`
  min-width: 0;
`;

IssueNavigatorFileGroup.displayName = 'IssueNavigatorFileGroup';

const IssueNavigatorFileHeader = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-100')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};
  background-color: ${cssVar('color-surface-default')};
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  h3 {
    margin: 0;
    overflow: hidden;
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
    font-family: ${cssVar('font-family-mono')};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    flex: 0 0 auto;
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
    font-variant-numeric: tabular-nums;
  }
`;

IssueNavigatorFileHeader.displayName = 'IssueNavigatorFileHeader';

const IssueNavigatorList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

IssueNavigatorList.displayName = 'IssueNavigatorList';

const IssueNavigatorItem = styled.button`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${cssVar('dimension-space-75')};
  min-width: 0;
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-default')};
  text-align: left;
  cursor: pointer;
  background-color: transparent;
  border: 0;

  &:hover {
    background-color: ${cssVar('navigation-item-colors-background-hover')};
  }

  &:active {
    background-color: ${cssVar('navigation-item-colors-background-pressed')};
  }

  &:focus-visible {
    outline: ${cssVar('focus-border-width-default')} solid ${cssVar('color-focus-default')};
    outline-offset: calc(-1 * ${cssVar('focus-border-width-default')});
  }

  &[aria-current='true'] {
    background-color: ${cssVar('navigation-item-colors-background-selected')};
  }
`;

IssueNavigatorItem.displayName = 'IssueNavigatorItem';

const IssueNavigatorItemTop = styled.span`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-100')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

IssueNavigatorItemTop.displayName = 'IssueNavigatorItemTop';

const IssueNavigatorSeverity = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-semi-bold')};
`;

IssueNavigatorSeverity.displayName = 'IssueNavigatorSeverity';

const IssueNavigatorMessage = styled.span<{ $isVisited: boolean }>`
  display: block;
  width: 100%;
  overflow: hidden;
  color: ${cssVar('color-text-strong')};
  font: ${({ $isVisited }) =>
    cssVar($isVisited ? 'typography-text-small-regular' : 'typography-text-small-semi-bold')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

IssueNavigatorMessage.displayName = 'IssueNavigatorMessage';

const IssueNavigatorLocation = styled.span`
  display: block;
  width: 100%;
  overflow: hidden;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  font-family: ${cssVar('font-family-mono')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

IssueNavigatorLocation.displayName = 'IssueNavigatorLocation';

const IssueAnalysis = styled.main`
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
`;

IssueAnalysis.displayName = 'IssueAnalysis';

const IssueAnalysisScrollArea = styled.div`
  height: 100%;
  padding: ${cssVar('dimension-space-250')};
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

IssueAnalysisScrollArea.displayName = 'IssueAnalysisScrollArea';

const IssueSummary = styled.section`
  width: 100%;
  max-width: 70ch;
  min-width: 0;
  margin-inline: auto;
`;

IssueSummary.displayName = 'IssueSummary';

const InternalPageHeader = styled(Layout.PageHeader)`
  grid-area: auto;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: 'main';
  min-width: 0;
  padding: 0;
  background-color: transparent;
`;

InternalPageHeader.displayName = 'InternalPageHeader';

const IssueHeaderMetadata = styled(Layout.PageHeader.Metadata)`
  order: -1;
`;

IssueHeaderMetadata.displayName = 'IssueHeaderMetadata';

const IssueHeaderTitle = styled(Layout.PageHeader.Title)`
  width: 100%;
  min-width: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-150')};

  > h2 {
    flex: 1 1 20rem;
    min-width: 0;
  }
`;

IssueHeaderTitle.displayName = 'IssueHeaderTitle';

const IssueHeaderActions = styled(Layout.PageHeader.Actions)`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
`;

IssueHeaderActions.displayName = 'IssueHeaderActions';

const JiraLogoMark = styled.svg`
  width: ${cssVar('dimension-height-400')};
  height: ${cssVar('dimension-height-400')};
  color: ${cssVar('color-text-info')};
  fill: currentColor;
`;

JiraLogoMark.displayName = 'JiraLogoMark';

const FactBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-50')};
`;

FactBadges.displayName = 'FactBadges';

const IssueManagementBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  width: 100%;
  max-width: 70ch;
  align-items: flex-start;
  gap: ${cssVar('dimension-space-200')};
  margin: ${cssVar('dimension-space-200')} auto 0;
  padding-block: ${cssVar('dimension-space-150')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssueManagementBar.displayName = 'IssueManagementBar';

const ControlField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
`;

ControlField.displayName = 'ControlField';

const ControlLabel = styled.label`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

ControlLabel.displayName = 'ControlLabel';

const InteractiveControlLabel = styled(ControlLabel)`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: ${cssVar('dimension-space-25')};
  cursor: pointer;
`;

InteractiveControlLabel.displayName = 'InteractiveControlLabel';

const MetadataSelect = styled(Select)`
  && .echoes-select-wrapper[data-with-right-section] .echoes-select-input {
    padding-right: 0;
  }

  && .echoes-select-input {
    height: auto;
    min-height: 0;
    padding: 0;
    color: ${cssVar('color-text-default')};
    background-color: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;

    &:hover {
      color: ${cssVar('color-text-strong')};
      background-color: transparent;
      text-decoration: underline;
      text-underline-offset: ${cssVar('dimension-space-25')};
    }

    &:focus,
    &:focus-visible {
      border-color: transparent;
      border-radius: ${cssVar('border-radius-200')};
      outline-offset: ${cssVar('focus-border-offset-default')};
    }
  }

  && .echoes-select-input-section[data-position='right'] {
    display: none;
  }
`;

MetadataSelect.displayName = 'MetadataSelect';

const IssueMetadataItem = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
`;

IssueMetadataItem.displayName = 'IssueMetadataItem';

const IssueMetadataLabel = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-semi-bold')};
`;

IssueMetadataLabel.displayName = 'IssueMetadataLabel';

const IssueMetadataValue = styled.span`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
`;

IssueMetadataValue.displayName = 'IssueMetadataValue';

const IssueWorkArea = styled.div`
  min-width: 0;
`;

IssueWorkArea.displayName = 'IssueWorkArea';

const IssueContextPanel = styled.section`
  min-width: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
`;

IssueContextPanel.displayName = 'IssueContextPanel';

const IssueToggleControls = styled.div`
  display: flex;
  width: 100%;
  max-width: 70ch;
  min-width: 0;
  justify-content: flex-start;
  margin-inline: auto;
  padding-block: ${cssVar('dimension-space-100')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssueToggleControls.displayName = 'IssueToggleControls';

const IssueTabPanel = styled.div`
  width: 100%;
  max-width: 70ch;
  min-height: 20rem;
  margin-inline: auto;
  padding: ${cssVar('dimension-space-250')} 0;
`;

IssueTabPanel.displayName = 'IssueTabPanel';

const IssueExplanationTitle = styled.h3`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

IssueExplanationTitle.displayName = 'IssueExplanationTitle';

const IssueExplanationBody = styled.p`
  max-width: 65ch;
  margin: ${cssVar('dimension-space-100')} 0 0;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
  text-wrap: pretty;
`;

IssueExplanationBody.displayName = 'IssueExplanationBody';

const IssueLongForm = styled.div`
  display: flex;
  max-width: 70ch;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  margin-top: ${cssVar('dimension-space-100')};
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};

  section {
    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-100')};
    margin-top: ${cssVar('dimension-space-150')};
  }

  h4,
  p,
  ul {
    margin: 0;
  }

  h4 {
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-heading-small')};
    text-wrap: balance;
  }

  p,
  li {
    text-wrap: pretty;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-50')};
    padding-left: ${cssVar('dimension-space-300')};
  }
`;

IssueLongForm.displayName = 'IssueLongForm';

const AnalysisFacts = styled.dl`
  display: flex;
  flex-direction: column;
  max-width: 65ch;
  margin: ${cssVar('dimension-space-300')} 0 0;
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  > div {
    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-50')};
    padding-block: ${cssVar('dimension-space-150')};
    border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  dt {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-default-semi-bold')};
  }

  dd {
    margin: 0;
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-default-regular')};
  }
`;

AnalysisFacts.displayName = 'AnalysisFacts';

const ActivityList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  margin: ${cssVar('dimension-space-200')} 0 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-25')};
    padding: ${cssVar('dimension-space-150')};
    background-color: ${cssVar('color-background-neutral-subtle-default')};
    border-radius: ${cssVar('border-radius-200')};
  }

  strong {
    color: ${cssVar('color-text-default')};
    font: ${cssVar('typography-text-small-semi-bold')};
  }

  span {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
  }
`;

ActivityList.displayName = 'ActivityList';

const CodeWorkspace = styled.aside`
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  @media (max-width: 64rem) {
    grid-column: 1 / -1;
    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
    border-left: 0;
  }
`;

CodeWorkspace.displayName = 'CodeWorkspace';

const CodePaneResizeHandle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: ${cssVar('dimension-width-300')};
  touch-action: none;
  cursor: col-resize;

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${cssVar('border-width-default')};
    background-color: transparent;
    content: '';
    transition: background-color 100ms ease-out;
  }

  &:hover::after,
  &:focus-visible::after {
    background-color: ${cssVar('color-focus-default')};
  }

  &:focus-visible {
    outline: none;
  }

  @media (max-width: 64rem) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`;

CodePaneResizeHandle.displayName = 'CodePaneResizeHandle';

const CodeViewerPanel = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

CodeViewerPanel.displayName = 'CodeViewerPanel';

const CodeWorkspaceHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: baseline;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-200')};
  background-color: ${cssVar('color-surface-default')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  h2 {
    margin: 0;
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-heading-small')};
  }

  span {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
    font-variant-numeric: tabular-nums;
  }
`;

CodeWorkspaceHeader.displayName = 'CodeWorkspaceHeader';

const CodeCardsList = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  min-height: 0;
  padding: ${cssVar('dimension-space-150')};
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

CodeCardsList.displayName = 'CodeCardsList';

const CodeViewerCard = styled.section`
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-300')};
`;

CodeViewerCard.displayName = 'CodeViewerCard';

const CodeViewerHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};
  padding: ${cssVar('dimension-space-75')} ${cssVar('dimension-space-200')};
  background-color: ${cssVar('color-surface-subtle')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

CodeViewerHeader.displayName = 'CodeViewerHeader';

const CodeViewerHeaderMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  min-width: 0;
`;

CodeViewerHeaderMain.displayName = 'CodeViewerHeaderMain';

const CodeViewerHeaderActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
`;

CodeViewerHeaderActions.displayName = 'CodeViewerHeaderActions';

const CodeViewerFile = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

CodeViewerFile.displayName = 'CodeViewerFile';

const CodeViewerTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

CodeViewerTitle.displayName = 'CodeViewerTitle';

const CodeCanvas = styled.div`
  max-height: 26rem;
  overflow: auto;
  padding-block: ${cssVar('dimension-space-150')};
  background-color: ${cssVar('color-surface-default')};
  font: ${cssVar('typography-code-default')};
  scrollbar-gutter: stable;
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

const LineNumber = styled.span<{ $isIssue: boolean }>`
  &&&& {
    font-family: ${cssVar('font-family-mono')};
  }

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-subtle')};
  text-align: right;
  user-select: none;
  border-right: ${({ $isIssue }) =>
    $isIssue
      ? `calc(${cssVar('focus-border-width-default')} + ${cssVar('border-width-default')})`
      : cssVar('border-width-default')}
    solid
    ${({ $isIssue }) => cssVar($isIssue ? 'color-border-danger-default' : 'color-border-weak')};
`;

LineNumber.displayName = 'LineNumber';

const CodeContent = styled.code`
  &&&&,
  &&&& * {
    font-family: ${cssVar('font-family-mono')};
  }

  display: block;
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-default')};
  background-color: transparent;
  white-space: pre;
`;

CodeContent.displayName = 'CodeContent';

const UnsafeExpression = styled.span`
  color: ${cssVar('color-status-danger-foreground')};
  font: ${cssVar('typography-code-highlight')};
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${cssVar('color-status-danger-foreground')};
  text-underline-offset: ${cssVar('dimension-space-50')};

  [data-code-token] {
    color: inherit;
  }
`;

UnsafeExpression.displayName = 'UnsafeExpression';

const IssueNumberMarker = styled.span`
  display: inline-flex;
  box-sizing: border-box;
  width: ${cssVar('dimension-height-500')};
  height: ${cssVar('dimension-height-500')};
  align-items: center;
  justify-content: center;
  margin-inline-start: ${cssVar('dimension-space-100')};
  color: ${cssVar('badge-colors-danger-weak-foreground')};
  background-color: ${cssVar('badge-colors-danger-weak-pressed')};
  border-radius: ${cssVar('border-radius-200')};
  font: ${cssVar('typography-text-small-semi-bold')};
  font-variant-numeric: tabular-nums;
  vertical-align: middle;
`;

IssueNumberMarker.displayName = 'IssueNumberMarker';

const InlineIssueCallout = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: ${cssVar('dimension-space-100')};
  min-width: 22rem;
  margin: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-200')}
    ${cssVar('dimension-space-150')}
    calc(${cssVar('dimension-width-800')} + ${cssVar('dimension-space-200')});
  padding: ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-default')};
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('badge-colors-danger-weak-border')};
  border-radius: ${cssVar('border-radius-300')};
`;

InlineIssueCallout.displayName = 'InlineIssueCallout';

const InlineIssueCalloutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;

  strong {
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-text-default-semi-bold')};
  }

  span {
    color: ${cssVar('color-text-subtle')};
    font: ${cssVar('typography-text-small-regular')};
  }
`;

InlineIssueCalloutText.displayName = 'InlineIssueCalloutText';

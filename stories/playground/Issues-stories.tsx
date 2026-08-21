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
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  Badge,
  BadgeCounter,
  BadgeVariety,
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSize,
  ButtonVariety,
  Card,
  CardSize,
  cssVar,
  FilterDropdown,
  FilterDropdownTrigger,
  FilterTag,
  FormFieldWidth,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCopy,
  IconDataTable,
  IconDirectory,
  IconInfo,
  IconSeverityBlocker,
  IconSeverityHigh,
  IconSeverityLow,
  IconSeverityMedium,
  IconSparkle,
  Layout,
  LinkStandalone,
  Pagination,
  Popover,
  Select,
  Table,
  TableVariety,
  Text,
  Tooltip,
  Toolbar,
  ToggleButtonGroup,
} from '../../src';
import { ProductGlobalNavigationBreadcrumbs, ProductShell } from './ProductShell';

const meta: Meta = {
  title: 'Playground/Issues',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CodeIssues: Story = {
  render: () => <IssuesPage />,
};

type IssueSeverity = 'blocker' | 'high' | 'info' | 'low' | 'medium';
type IssueStatus = 'confirmed' | 'open';
type IssueImportance = 'all' | 'most-important';
type IssueTableView = 'grouped' | 'list';
type IssueCopyFeedbackStatus = 'copied' | 'error';

interface Issue {
  assignee: string;
  file: string;
  key: string;
  message: string;
  rule: string;
  severity: IssueSeverity;
  status: IssueStatus;
  tags: ReadonlyArray<string>;
  type: 'Maintainability' | 'Reliability' | 'Security';
}

interface IssueFileGroup {
  file: string;
  issues: Array<Issue>;
}

const BASE_ISSUES: ReadonlyArray<Issue> = [
  {
    assignee: 'M. Dupont',
    file: 'src/components/issues/IssueList.tsx',
    key: 'S6551',
    message: "Handle this exception or don't catch it at all.",
    rule: 'typescript:S6551',
    severity: 'blocker',
    status: 'open',
    tags: ['error-handling', 'cwe', 'bug', 'exceptions', 'reliability', 'typescript'],
    type: 'Reliability',
  },
  {
    assignee: 'Unassigned',
    file: 'src/components/issues/IssueList.tsx',
    key: 'S3776',
    message: 'Refactor this function to reduce its Cognitive Complexity from 24 to 15.',
    rule: 'typescript:S3776',
    severity: 'high',
    status: 'confirmed',
    tags: ['complexity'],
    type: 'Maintainability',
  },
  {
    assignee: 'A. Martin',
    file: 'src/components/issues/IssueList.tsx',
    key: 'S6480',
    message: 'Memoize this context provider value to avoid unnecessary renders.',
    rule: 'typescript:S6480',
    severity: 'medium',
    status: 'open',
    tags: ['react', 'performance'],
    type: 'Maintainability',
  },
  {
    assignee: 'M. Dupont',
    file: 'src/api/issues/fetchIssues.ts',
    key: 'S5852',
    message: 'Make sure this regular expression cannot lead to catastrophic backtracking.',
    rule: 'typescript:S5852',
    severity: 'high',
    status: 'open',
    tags: ['regex', 'security'],
    type: 'Security',
  },
  {
    assignee: 'J. Kim',
    file: 'src/api/issues/fetchIssues.ts',
    key: 'S4325',
    message: 'Remove this unnecessary type assertion.',
    rule: 'typescript:S4325',
    severity: 'info',
    status: 'confirmed',
    tags: ['typescript'],
    type: 'Maintainability',
  },
  {
    assignee: 'Unassigned',
    file: 'src/components/filters/FilterPanel.tsx',
    key: 'S6759',
    message: 'Provide an accessible name for this interactive element.',
    rule: 'typescript:S6759',
    severity: 'medium',
    status: 'open',
    tags: ['accessibility'],
    type: 'Reliability',
  },
  {
    assignee: 'A. Martin',
    file: 'src/hooks/useIssueFilters.ts',
    key: 'S1128',
    message: 'Remove this redundant boolean literal.',
    rule: 'typescript:S1128',
    severity: 'info',
    status: 'open',
    tags: ['redundant'],
    type: 'Maintainability',
  },
  {
    assignee: 'Unassigned',
    file: 'src/services/notifications.ts',
    key: 'S1481',
    message: 'Handle this rejected promise or remove the rejection handler.',
    rule: 'typescript:S1481',
    severity: 'blocker',
    status: 'confirmed',
    tags: ['async', 'error-handling'],
    type: 'Reliability',
  },
  {
    assignee: 'J. Kim',
    file: 'src/components/filters/FilterPanel.tsx',
    key: 'S2201',
    message: 'Use a direct comparison instead of comparing serialized objects.',
    rule: 'typescript:S2201',
    severity: 'medium',
    status: 'open',
    tags: ['performance'],
    type: 'Reliability',
  },
  {
    assignee: 'M. Dupont',
    file: 'src/hooks/useIssueFilters.ts',
    key: 'S2814',
    message: 'Prefer includes() over checking the result of indexOf().',
    rule: 'typescript:S2814',
    severity: 'low',
    status: 'confirmed',
    tags: ['convention'],
    type: 'Maintainability',
  },
  {
    assignee: 'A. Martin',
    file: 'src/components/projects/ProjectCard.tsx',
    key: 'S3358',
    message: 'Extract this nested conditional operation into an independent statement.',
    rule: 'typescript:S3358',
    severity: 'medium',
    status: 'open',
    tags: ['readability'],
    type: 'Maintainability',
  },
  {
    assignee: 'Unassigned',
    file: 'src/api/permissions/updatePermission.ts',
    key: 'S3516',
    message: 'Refactor this condition so it does not always evaluate to true.',
    rule: 'typescript:S3516',
    severity: 'high',
    status: 'open',
    tags: ['logic'],
    type: 'Reliability',
  },
  {
    assignee: 'J. Kim',
    file: 'src/services/notifications.ts',
    key: 'S4144',
    message: 'Update this function so its implementation is not identical to another one.',
    rule: 'typescript:S4144',
    severity: 'medium',
    status: 'confirmed',
    tags: ['duplication'],
    type: 'Maintainability',
  },
  {
    assignee: 'M. Dupont',
    file: 'src/api/permissions/updatePermission.ts',
    key: 'S4784',
    message: 'Validate this permission before applying the requested update.',
    rule: 'typescript:S4784',
    severity: 'high',
    status: 'open',
    tags: ['authorization', 'security'],
    type: 'Security',
  },
  {
    assignee: 'A. Martin',
    file: 'src/components/projects/ProjectCard.tsx',
    key: 'S6772',
    message: 'Add visible text for users who cannot perceive this icon.',
    rule: 'typescript:S6772',
    severity: 'medium',
    status: 'confirmed',
    tags: ['accessibility'],
    type: 'Reliability',
  },
];

const ISSUE_EXPANSION_TEMPLATES: ReadonlyArray<Omit<Issue, 'assignee' | 'file' | 'key'>> = [
  {
    message: 'Remove this commented-out code.',
    rule: 'typescript:S125',
    severity: 'low',
    status: 'open',
    tags: ['cleanup'],
    type: 'Maintainability',
  },
  {
    message: 'Use a more specific type than `any`.',
    rule: 'typescript:S6006',
    severity: 'medium',
    status: 'confirmed',
    tags: ['typescript', 'type-safety'],
    type: 'Maintainability',
  },
  {
    message: 'Either remove this useless object instantiation or use it.',
    rule: 'typescript:S3984',
    severity: 'low',
    status: 'open',
    tags: ['dead-code'],
    type: 'Maintainability',
  },
  {
    message: 'Move this array sort operation to a separate statement.',
    rule: 'typescript:S4043',
    severity: 'medium',
    status: 'confirmed',
    tags: ['clarity', 'readability'],
    type: 'Maintainability',
  },
  {
    message: 'Make sure this access is safe when the value is undefined.',
    rule: 'typescript:S2259',
    severity: 'high',
    status: 'open',
    tags: ['null-dereference', 'bug'],
    type: 'Reliability',
  },
  {
    message: 'Validate this user-controlled value before using it.',
    rule: 'typescript:S5131',
    severity: 'blocker',
    status: 'open',
    tags: ['injection', 'security'],
    type: 'Security',
  },
  {
    message: 'Replace this duplicated string literal with a constant.',
    rule: 'typescript:S1192',
    severity: 'info',
    status: 'confirmed',
    tags: ['duplication'],
    type: 'Maintainability',
  },
  {
    message: 'Use a non-blocking alternative to this synchronous call.',
    rule: 'typescript:S4738',
    severity: 'medium',
    status: 'open',
    tags: ['performance', 'async'],
    type: 'Reliability',
  },
];

const ISSUES_PER_FILE_TARGETS = [8, 7, 9, 8, 7, 9, 8] as const;
const SAMPLE_ASSIGNEES = ['Unassigned', 'M. Dupont', 'A. Martin', 'J. Kim'] as const;

const ISSUES = expandIssueFileGroups(BASE_ISSUES);

const ISSUE_PAGE_PATH_PREFIXES = ['', 'apps/portal/', 'apps/admin/'] as const;
const FILE_GROUPS_PER_PAGE = new Set(ISSUES.map((issue) => issue.file)).size;
const ISSUES_PER_PAGE = ISSUES.length;
const MAX_VISIBLE_TAGS = 3;
const REMEDIATION_AGENT_ASSIGNEE = 'Remediation agent';

const PAGINATED_ISSUES = ISSUE_PAGE_PATH_PREFIXES.flatMap((pathPrefix, pageIndex) =>
  ISSUES.map((issue) => ({
    ...issue,
    file: `${pathPrefix}${issue.file}`,
    key: pageIndex === 0 ? issue.key : `${issue.key}-${pageIndex + 1}`,
  })),
);

function expandIssueFileGroups(issues: ReadonlyArray<Issue>): Array<Issue> {
  return groupIssuesByFile(issues).flatMap((group, groupIndex) => {
    const targetIssueCount = ISSUES_PER_FILE_TARGETS[groupIndex % ISSUES_PER_FILE_TARGETS.length];
    const generatedIssues = Array.from(
      { length: Math.max(0, targetIssueCount - group.issues.length) },
      (_, generatedIndex): Issue => ({
        ...ISSUE_EXPANSION_TEMPLATES[
          (groupIndex + generatedIndex) % ISSUE_EXPANSION_TEMPLATES.length
        ],
        assignee: SAMPLE_ASSIGNEES[(groupIndex + generatedIndex) % SAMPLE_ASSIGNEES.length],
        file: group.file,
        key: `S${7000 + groupIndex * 100 + generatedIndex}`,
      }),
    );

    return [...group.issues, ...generatedIssues];
  });
}

const SEVERITY_OPTIONS = [
  { label: 'All severities', value: 'all' },
  { label: 'Blocker', prefix: <IssueSeverityIcon severity="blocker" />, value: 'blocker' },
  { label: 'High', prefix: <IssueSeverityIcon severity="high" />, value: 'high' },
  { label: 'Medium', prefix: <IssueSeverityIcon severity="medium" />, value: 'medium' },
  { label: 'Low', prefix: <IssueSeverityIcon severity="low" />, value: 'low' },
  { label: 'Info', prefix: <IssueSeverityIcon severity="info" />, value: 'info' },
];

const STATUS_FILTER_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Confirmed', value: 'confirmed' },
];

const ISSUE_STATUS_OPTIONS = [
  { label: 'Open', value: 'open' },
  { label: 'Confirmed', value: 'confirmed' },
];

const ASSIGNEE_OPTIONS = [
  { label: 'Unassigned', value: 'Unassigned' },
  { label: 'M. Dupont', value: 'M. Dupont' },
  { label: 'A. Martin', value: 'A. Martin' },
  { label: 'J. Kim', value: 'J. Kim' },
  { label: REMEDIATION_AGENT_ASSIGNEE, value: REMEDIATION_AGENT_ASSIGNEE },
];

const MORE_FILTER_CATEGORIES = [
  {
    isMultiSelect: true,
    items: [
      { label: 'Maintainability', value: 'type:Maintainability' },
      { label: 'Reliability', value: 'type:Reliability' },
      { label: 'Security', value: 'type:Security' },
    ],
    label: 'Issue type',
  },
  {
    isMultiSelect: true,
    isSearchable: true,
    items: ASSIGNEE_OPTIONS.map(({ label, value }) => ({
      label,
      value: `assignee:${value}`,
    })),
    label: 'Assignee',
  },
];

const ISSUE_FILTER_LABELS = new Map(
  MORE_FILTER_CATEGORIES.flatMap((category) =>
    category.items.map((item) => [item.value, `${category.label}: ${item.label}`] as const),
  ),
);

function IssuesPage() {
  const [collapsedFiles, setCollapsedFiles] = useState(() => new Set<string>());
  const [copyPromptFeedback, setCopyPromptFeedback] = useState<{
    issueKey: string;
    status: IssueCopyFeedbackStatus;
  } | null>(null);
  const [bulkCopyFeedback, setBulkCopyFeedback] = useState<IssueCopyFeedbackStatus | null>(null);
  const [issues, setIssues] = useState<Array<Issue>>(() => [...PAGINATED_ISSUES]);
  const [importance, setImportance] = useState<IssueImportance>('all');
  const [page, setPage] = useState(1);
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(() => new Set<string>());
  const [severity, setSeverity] = useState<string | null>('all');
  const [status, setStatus] = useState<string | null>('all');
  const [tableView, setTableView] = useState<IssueTableView>('grouped');

  const mostImpactIssueCount = useMemo(
    () => issues.filter((issue) => ['blocker', 'high'].includes(issue.severity)).length,
    [issues],
  );

  const filteredIssues = useMemo(() => {
    const typeFilters = moreFilters
      .filter((value) => value.startsWith('type:'))
      .map((value) => value.slice('type:'.length));
    const assigneeFilters = moreFilters
      .filter((value) => value.startsWith('assignee:'))
      .map((value) => value.slice('assignee:'.length));

    return issues.filter(
      (issue) =>
        (importance === 'all' || ['blocker', 'high'].includes(issue.severity)) &&
        (severity === 'all' || issue.severity === severity) &&
        (status === 'all' || issue.status === status) &&
        (typeFilters.length === 0 || typeFilters.includes(issue.type)) &&
        (assigneeFilters.length === 0 || assigneeFilters.includes(issue.assignee)),
    );
  }, [importance, issues, moreFilters, severity, status]);

  const filteredFileGroups = useMemo(() => groupIssuesByFile(filteredIssues), [filteredIssues]);
  const totalPages = Math.max(
    1,
    Math.ceil(
      tableView === 'grouped'
        ? filteredFileGroups.length / FILE_GROUPS_PER_PAGE
        : filteredIssues.length / ISSUES_PER_PAGE,
    ),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleFileGroups = filteredFileGroups.slice(
    (currentPage - 1) * FILE_GROUPS_PER_PAGE,
    currentPage * FILE_GROUPS_PER_PAGE,
  );
  const visibleIssues =
    tableView === 'grouped'
      ? visibleFileGroups.flatMap((group) => group.issues)
      : filteredIssues.slice((currentPage - 1) * ISSUES_PER_PAGE, currentPage * ISSUES_PER_PAGE);
  const selectedFilteredIssueCount = filteredIssues.filter((issue) =>
    selectedKeys.has(issue.key),
  ).length;

  const allVisibleSelected =
    visibleIssues.length > 0 && visibleIssues.every((issue) => selectedKeys.has(issue.key));
  const someVisibleSelected = visibleIssues.some((issue) => selectedKeys.has(issue.key));
  const selectionState = allVisibleSelected ? true : someVisibleSelected ? 'indeterminate' : false;

  const filterTags = [
    ...(importance === 'most-important'
      ? [
          <FilterTag
            key="importance"
            labelDismiss="Remove impact filter"
            onDismiss={() => {
              setImportance('all');
              setPage(1);
            }}>
            Most impact
          </FilterTag>,
        ]
      : []),
    ...(severity !== null && severity !== 'all'
      ? [
          <FilterTag
            key="severity"
            labelDismiss="Remove severity filter"
            onDismiss={() => {
              setSeverity('all');
              setPage(1);
            }}>
            {`Severity: ${capitalize(severity)}`}
          </FilterTag>,
        ]
      : []),
    ...(status !== null && status !== 'all'
      ? [
          <FilterTag
            key="status"
            labelDismiss="Remove status filter"
            onDismiss={() => {
              setStatus('all');
              setPage(1);
            }}>
            {`Status: ${capitalize(status)}`}
          </FilterTag>,
        ]
      : []),
    ...moreFilters.map((value) => (
      <FilterTag
        key={value}
        labelDismiss={`Remove ${ISSUE_FILTER_LABELS.get(value) ?? value} filter`}
        onDismiss={() => {
          setMoreFilters((current) => current.filter((filter) => filter !== value));
          setPage(1);
        }}>
        {ISSUE_FILTER_LABELS.get(value) ?? value}
      </FilterTag>
    )),
  ];

  useEffect(() => {
    if (copyPromptFeedback === null) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopyPromptFeedback(null), 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copyPromptFeedback]);

  useEffect(() => {
    if (bulkCopyFeedback === null) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setBulkCopyFeedback(null), 2000);

    return () => window.clearTimeout(timeoutId);
  }, [bulkCopyFeedback]);

  function toggleIssue(issueKey: string) {
    setSelectedKeys((current) => {
      const next = new Set(current);

      if (next.has(issueKey)) {
        next.delete(issueKey);
      } else {
        next.add(issueKey);
      }

      return next;
    });
  }

  function toggleFileGroup(file: string) {
    setCollapsedFiles((current) => {
      const next = new Set(current);

      if (next.has(file)) {
        next.delete(file);
      } else {
        next.add(file);
      }

      return next;
    });
  }

  function toggleFileIssues(fileIssues: ReadonlyArray<Issue>) {
    setSelectedKeys((current) => {
      const next = new Set(current);
      const allFileIssuesSelected = fileIssues.every((issue) => current.has(issue.key));

      for (const issue of fileIssues) {
        if (allFileIssuesSelected) {
          next.delete(issue.key);
        } else {
          next.add(issue.key);
        }
      }

      return next;
    });
  }

  function toggleVisibleIssues() {
    setSelectedKeys((current) => {
      const next = new Set(current);

      for (const issue of visibleIssues) {
        if (selectionState === true) {
          next.delete(issue.key);
        } else {
          next.add(issue.key);
        }
      }

      return next;
    });
  }

  function updateIssue(issueKey: string, changes: Partial<Pick<Issue, 'assignee' | 'status'>>) {
    setIssues((current) =>
      current.map((issue) => (issue.key === issueKey ? { ...issue, ...changes } : issue)),
    );
  }

  function updateIssueStatus(issueKey: string, value: string | null) {
    if (value === 'confirmed' || value === 'open') {
      updateIssue(issueKey, { status: value });
    }
  }

  function assignSelectedIssuesToAgent() {
    setIssues((current) =>
      current.map((issue) =>
        selectedKeys.has(issue.key) ? { ...issue, assignee: REMEDIATION_AGENT_ASSIGNEE } : issue,
      ),
    );
  }

  async function copySelectedIssuePrompts() {
    const selectedIssues = issues.filter((issue) => selectedKeys.has(issue.key));

    try {
      await navigator.clipboard.writeText(getSelectedIssuesAiPrompt(selectedIssues));
      setBulkCopyFeedback('copied');
    } catch {
      setBulkCopyFeedback('error');
    }
  }

  async function copyIssuePrompt(issue: Issue) {
    try {
      await navigator.clipboard.writeText(getIssueAiPrompt(issue));
      setCopyPromptFeedback({ issueKey: issue.key, status: 'copied' });
    } catch {
      setCopyPromptFeedback({ issueKey: issue.key, status: 'error' });
    }
  }

  function renderIssueRow(issue: Issue, isGrouped: boolean) {
    const promptFeedbackStatus =
      copyPromptFeedback?.issueKey === issue.key ? copyPromptFeedback.status : null;

    return (
      <Table.Row key={issue.key} selected={selectedKeys.has(issue.key)}>
        <Table.CellCheckbox
          ariaLabel={`Select ${issue.key}`}
          cellClassName={isGrouped ? 'issue-checkbox issue-checkbox-grouped' : 'issue-checkbox'}
          checked={selectedKeys.has(issue.key)}
          onCheck={() => toggleIssue(issue.key)}
        />
        <Table.Cell className={isGrouped ? 'issue-column issue-column-grouped' : 'issue-column'}>
          <IssueCellContent>
            <IssueTitleRow>
              <IssueTitleLink title={issue.message} to={`/organization/issues/${issue.key}`}>
                {issue.message}
              </IssueTitleLink>
              <CopyPromptButton
                Icon={promptFeedbackStatus === 'copied' ? IconCheck : IconCopy}
                ariaLabel={
                  promptFeedbackStatus === 'copied'
                    ? `AI prompt copied for ${issue.key}`
                    : promptFeedbackStatus === 'error'
                      ? `Could not copy AI prompt for ${issue.key}`
                      : `Copy AI prompt for ${issue.key}`
                }
                onClick={() => copyIssuePrompt(issue)}
                size={ButtonSize.Medium}
                tooltipContent={
                  promptFeedbackStatus === 'copied'
                    ? 'AI prompt copied'
                    : promptFeedbackStatus === 'error'
                      ? 'Could not copy AI prompt'
                      : 'Copy AI prompt'
                }
                tooltipOptions={promptFeedbackStatus === null ? {} : { isOpen: true }}
                variety={ButtonVariety.DefaultGhost}
              />
            </IssueTitleRow>
            {!isGrouped && (
              <IssueFilePath isSubtle size="small">
                {issue.file}
              </IssueFilePath>
            )}
          </IssueCellContent>
        </Table.Cell>
        <Table.Cell className="impact-column">
          <IssueImpact>
            <IssueSeverityIcon severity={issue.severity} />
            <IssueImpactLabel>{capitalize(issue.severity)}</IssueImpactLabel>
            <IssueImpactDivider aria-hidden="true" />
            <IssueImpactAttribute>{issue.type}</IssueImpactAttribute>
          </IssueImpact>
        </Table.Cell>
        <Table.Cell className="attribute-column">
          <IssueAttribute>{getIssueAttribute(issue)}</IssueAttribute>
        </Table.Cell>
        <Table.Cell className="tags-column">
          <IssueTagsList issueKey={issue.key} tags={issue.tags} />
        </Table.Cell>
        <Table.Cell className="status-column">
          <InlineSelect
            ariaLabel={`Set status for ${issue.key}`}
            data={ISSUE_STATUS_OPTIONS}
            hasDropdownAutoWidth
            isNotClearable
            onChange={(value) => updateIssueStatus(issue.key, value)}
            value={issue.status}
            width={FormFieldWidth.Full}
          />
        </Table.Cell>
        <Table.Cell className="assignee-column">
          <AssigneeControlGroup aria-label={`Assignment actions for ${issue.key}`} role="group">
            <InlineSelect
              ariaLabel={`Assign ${issue.key}`}
              data={ASSIGNEE_OPTIONS}
              hasDropdownAutoWidth
              isNotClearable
              onChange={(value) =>
                updateIssue(issue.key, {
                  assignee: value ?? 'Unassigned',
                })
              }
              value={issue.assignee}
              valueIcon={
                issue.assignee === REMEDIATION_AGENT_ASSIGNEE ? <IconSparkle /> : undefined
              }
              width={FormFieldWidth.Full}
            />
            <ButtonIcon
              Icon={issue.assignee === REMEDIATION_AGENT_ASSIGNEE ? IconCheck : IconSparkle}
              ariaLabel={
                issue.assignee === REMEDIATION_AGENT_ASSIGNEE
                  ? `Remediation agent assigned to ${issue.key}`
                  : `Assign ${issue.key} to ${REMEDIATION_AGENT_ASSIGNEE}`
              }
              isDisabled={issue.assignee === REMEDIATION_AGENT_ASSIGNEE}
              onClick={() =>
                updateIssue(issue.key, {
                  assignee: REMEDIATION_AGENT_ASSIGNEE,
                })
              }
              size={ButtonSize.Medium}
              tooltipContent={false}
              variety={ButtonVariety.Default}
            />
          </AssigneeControlGroup>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <ProductShell
      activeItem="issues"
      globalNavigationPrimary={
        <ProductGlobalNavigationBreadcrumbs>
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Sonar-UX-Testing', to: '/organization' },
              { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/issues' },
              { linkElement: 'Issues' },
            ]}
          />
        </ProductGlobalNavigationBreadcrumbs>
      }>
      <Layout.PageGrid width="fluid">
        <Layout.PageHeader
          title={<Layout.PageHeader.Title headingLevel="h1">Issues</Layout.PageHeader.Title>}
        />

        <Layout.PageContent>
          <Toolbar
            ariaLabel="Filter issues"
            datasetControls={
              <IssuesViewControls aria-label="Issue table view" role="group">
                <IssuesViewButtonGroup isCombined>
                  <ButtonIcon
                    Icon={IconDataTable}
                    ariaLabel={tableView === 'list' ? 'List view selected' : 'Show list view'}
                    className={tableView === 'list' ? 'selected' : undefined}
                    onClick={() => {
                      setTableView('list');
                      setPage(1);
                    }}
                    size={ButtonSize.Large}
                    tooltipContent={tableView === 'list' ? 'List view (selected)' : 'List view'}
                    variety={ButtonVariety.Default}
                  />
                  <ButtonIcon
                    Icon={IconDirectory}
                    ariaLabel={
                      tableView === 'grouped' ? 'Grouped view selected' : 'Show grouped view'
                    }
                    className={tableView === 'grouped' ? 'selected' : undefined}
                    onClick={() => {
                      setTableView('grouped');
                      setPage(1);
                    }}
                    size={ButtonSize.Large}
                    tooltipContent={
                      tableView === 'grouped' ? 'Grouped view (selected)' : 'Grouped view'
                    }
                    variety={ButtonVariety.Default}
                  />
                </IssuesViewButtonGroup>
              </IssuesViewControls>
            }
            filterControls={
              <>
                <ToggleButtonGroup
                  onChange={(value) => {
                    setImportance(value as IssueImportance);
                    setPage(1);
                  }}
                  options={[
                    { label: 'All', value: 'all' },
                    {
                      label: 'Most impact',
                      suffix: <MostImpactBadgeCounter value={mostImpactIssueCount} />,
                      value: 'most-important',
                    },
                  ]}
                  selected={importance}
                />

                <ToolbarSelect
                  ariaLabel="Filter issues by severity"
                  data={SEVERITY_OPTIONS}
                  isNotClearable
                  onChange={(value) => {
                    setPage(1);
                    setSeverity(value);
                  }}
                  value={severity}
                  valueIcon={getSeverityFilterIcon(severity)}
                  width={FormFieldWidth.Small}
                />

                <ToolbarSelect
                  ariaLabel="Filter issues by status"
                  data={STATUS_FILTER_OPTIONS}
                  isNotClearable
                  onChange={(value) => {
                    setPage(1);
                    setStatus(value);
                  }}
                  value={status}
                  width={FormFieldWidth.Small}
                />

                <FilterDropdown
                  categories={MORE_FILTER_CATEGORIES}
                  onApply={(values) => {
                    setMoreFilters(values);
                    setPage(1);
                  }}
                  onClear={() => {
                    setMoreFilters([]);
                    setPage(1);
                  }}
                  selectedValues={moreFilters}>
                  <FilterDropdownTrigger selectedCount={moreFilters.length} size={ButtonSize.Large}>
                    More filters
                  </FilterDropdownTrigger>
                </FilterDropdown>
              </>
            }
            filterTags={filterTags}
            onClearAll={() => {
              setImportance('all');
              setSeverity('all');
              setStatus('all');
              setMoreFilters([]);
              setPage(1);
            }}
          />

          <IssuesTableCard size={CardSize.Small}>
            <Card.Body insetContent>
              <TableScroller>
                <CompactIssuesTable
                  ariaLabel="Issues in code"
                  gridTemplate="min-content minmax(22rem, 32rem) max-content 8rem minmax(12rem, 1fr) 8rem 10rem"
                  variety={TableVariety.Ghost}>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCellCheckbox
                        ariaLabel="Select all visible issues"
                        checked={selectionState}
                        onCheck={toggleVisibleIssues}
                      />
                      <Table.ColumnHeaderCell
                        label={
                          selectedKeys.size > 0 ? (
                            <IssueHeaderBulkActions>
                              <span>{selectedKeys.size} selected</span>
                              <IssueHeaderActionGroup>
                                <Button size={ButtonSize.Medium} variety={ButtonVariety.Default}>
                                  Change
                                </Button>
                                <Button
                                  onClick={assignSelectedIssuesToAgent}
                                  prefix={<IconSparkle />}
                                  size={ButtonSize.Medium}
                                  variety={ButtonVariety.Default}>
                                  Assign to agent
                                </Button>
                                <Tooltip
                                  content={
                                    bulkCopyFeedback === 'copied'
                                      ? 'AI prompt copied'
                                      : bulkCopyFeedback === 'error'
                                        ? 'Could not copy AI prompt'
                                        : 'Copy prompts for selected issues'
                                  }
                                  isOpen={bulkCopyFeedback === null ? undefined : true}>
                                  <Button
                                    onClick={copySelectedIssuePrompts}
                                    prefix={
                                      bulkCopyFeedback === 'copied' ? <IconCheck /> : <IconCopy />
                                    }
                                    size={ButtonSize.Medium}
                                    variety={ButtonVariety.Default}>
                                    Copy AI prompt
                                  </Button>
                                </Tooltip>
                              </IssueHeaderActionGroup>
                            </IssueHeaderBulkActions>
                          ) : (
                            'Issue'
                          )
                        }
                      />
                      <Table.ColumnHeaderCell label="Impact" />
                      <Table.ColumnHeaderCell className="attribute-column" label="Attribute" />
                      <Table.ColumnHeaderCell className="tags-column" label="Tags" />
                      <Table.ColumnHeaderCell className="status-column" label="Status" />
                      <Table.ColumnHeaderCell className="assignee-column" label="Assignee" />
                    </Table.Row>
                  </Table.Header>

                  {tableView === 'list' && (
                    <Table.Body>
                      {visibleIssues.map((issue) => renderIssueRow(issue, false))}
                    </Table.Body>
                  )}

                  {tableView === 'grouped' &&
                    visibleFileGroups.map((fileGroup) => {
                      const isCollapsed = collapsedFiles.has(fileGroup.file);
                      const issueRowsId = getFileGroupRowsId(fileGroup.file);
                      const issueCountLabel = `${fileGroup.issues.length} ${
                        fileGroup.issues.length === 1 ? 'issue' : 'issues'
                      }`;

                      return (
                        <Fragment key={fileGroup.file}>
                          <Table.Body>
                            <Table.Row className="file-group-row">
                              <Table.CellCheckbox
                                ariaLabel={`Select all issues in ${fileGroup.file}`}
                                cellClassName="file-group-checkbox"
                                checked={getFileGroupSelectionState(fileGroup.issues, selectedKeys)}
                                onCheck={() => toggleFileIssues(fileGroup.issues)}
                              />
                              <FileGroupHeaderCell className="file-group-header" colSpan={6}>
                                <FileGroupDisclosure
                                  aria-controls={issueRowsId}
                                  aria-expanded={!isCollapsed}
                                  onClick={() => toggleFileGroup(fileGroup.file)}
                                  type="button">
                                  {isCollapsed ? <IconChevronRight /> : <IconChevronDown />}
                                  <FileGroupPath title={fileGroup.file}>
                                    {fileGroup.file}
                                  </FileGroupPath>
                                  <FileGroupMeta>({issueCountLabel})</FileGroupMeta>
                                </FileGroupDisclosure>
                              </FileGroupHeaderCell>
                            </Table.Row>
                          </Table.Body>

                          <FileGroupIssueRows hidden={isCollapsed} id={issueRowsId}>
                            {fileGroup.issues.map((issue) => renderIssueRow(issue, true))}
                          </FileGroupIssueRows>
                        </Fragment>
                      );
                    })}
                </CompactIssuesTable>
              </TableScroller>
            </Card.Body>
          </IssuesTableCard>

          {filteredIssues.length > 0 && (
            <PaginationFooter>
              <IssuesSummary aria-live="polite">
                {selectedFilteredIssueCount} of {filteredIssues.length} row(s) selected
              </IssuesSummary>
              <Pagination onChange={setPage} page={currentPage} totalPages={totalPages} />
            </PaginationFooter>
          )}

          {filteredIssues.length === 0 && (
            <NoResults role="status">
              <NoResultsTitle>No issues match these filters</NoResultsTitle>
              <Text isSubtle>Choose another importance, severity, or status.</Text>
            </NoResults>
          )}
        </Layout.PageContent>
      </Layout.PageGrid>
    </ProductShell>
  );
}

IssuesPage.displayName = 'IssuesPage';

function groupIssuesByFile(issues: ReadonlyArray<Issue>): Array<IssueFileGroup> {
  const groupedIssues = new Map<string, Array<Issue>>();

  for (const issue of issues) {
    const fileIssues = groupedIssues.get(issue.file) ?? [];
    fileIssues.push(issue);
    groupedIssues.set(issue.file, fileIssues);
  }

  return Array.from(groupedIssues, ([file, fileIssues]) => ({
    file,
    issues: fileIssues,
  }));
}

function IssueTagsList({
  issueKey,
  tags,
}: Readonly<{ issueKey: string; tags: ReadonlyArray<string> }>) {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = tags.slice(MAX_VISIBLE_TAGS);

  return (
    <IssueTags>
      {visibleTags.map((tag) => (
        <IssueTagPill key={tag} variety={BadgeVariety.Neutral}>
          {tag}
        </IssueTagPill>
      ))}

      {hiddenTags.length > 0 && (
        <Popover
          extraContent={
            <PopoverTags>
              {hiddenTags.map((tag) => (
                <IssueTagPill key={tag} variety={BadgeVariety.Neutral}>
                  {tag}
                </IssueTagPill>
              ))}
            </PopoverTags>
          }
          title={`${hiddenTags.length} more ${hiddenTags.length === 1 ? 'tag' : 'tags'}`}>
          <IssueTagPill
            ariaLabel={`Show ${hiddenTags.length} more tags for ${issueKey}`}
            isInteractive
            variety={BadgeVariety.Neutral}>
            +{hiddenTags.length}
          </IssueTagPill>
        </Popover>
      )}
    </IssueTags>
  );
}

IssueTagsList.displayName = 'IssueTagsList';

function getFileGroupSelectionState(
  issues: ReadonlyArray<Issue>,
  selectedKeys: ReadonlySet<string>,
): boolean | 'indeterminate' {
  const selectedIssueCount = issues.filter((issue) => selectedKeys.has(issue.key)).length;

  if (selectedIssueCount === issues.length) {
    return true;
  }

  return selectedIssueCount > 0 ? 'indeterminate' : false;
}

function getFileGroupRowsId(file: string) {
  return `issues-file-group-${file.replace(/[^a-z0-9]+/gi, '-').toLocaleLowerCase()}`;
}

function capitalize(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}

function getSeverityFilterIcon(value: string | null) {
  switch (value) {
    case 'blocker':
    case 'high':
    case 'info':
    case 'low':
    case 'medium':
      return <IssueSeverityIcon severity={value} />;
    default:
      return undefined;
  }
}

function getIssueAttribute(issue: Issue) {
  switch (issue.type) {
    case 'Maintainability':
      return 'Adaptability';
    case 'Reliability':
      return 'Responsibility';
    case 'Security':
      return 'Intentionality';
  }
}

function getIssueAiPrompt(issue: Issue) {
  return [
    'Fix this Sonar issue with the smallest safe code change.',
    '',
    `Issue: ${issue.message}`,
    `File: ${issue.file}`,
    `Rule: ${issue.rule}`,
    `Issue key: ${issue.key}`,
    '',
    'Explain the root cause, implement the fix, and include relevant tests.',
  ].join('\n');
}

function getSelectedIssuesAiPrompt(issues: ReadonlyArray<Issue>) {
  return [
    `Fix these ${issues.length} Sonar issues with the smallest safe code changes.`,
    ...issues.flatMap((issue, index) => [
      '',
      `${index + 1}. ${issue.message}`,
      `File: ${issue.file}`,
      `Rule: ${issue.rule}`,
      `Issue key: ${issue.key}`,
    ]),
    '',
    'Explain each root cause, implement the fixes, and include relevant tests.',
  ].join('\n');
}

const ToolbarSelect = styled(Select)`
  min-width: 0;
`;

ToolbarSelect.displayName = 'ToolbarSelect';

const IssuesViewControls = styled.span`
  display: inline-flex;
`;

IssuesViewControls.displayName = 'IssuesViewControls';

const IssuesViewButtonGroup = styled(ButtonGroup)`
  .selected {
    --button-background: ${cssVar('color-background-neutral-bolder-default')};
    --button-background-active: ${cssVar('color-background-neutral-subtle-active')};
    --button-background-focus: ${cssVar('color-background-neutral-bolder-default')};
    --button-background-hover: ${cssVar('color-background-neutral-bolder-default')};
    --button-border-color-hover: ${cssVar('color-border-bold')};
  }
`;

IssuesViewButtonGroup.displayName = 'IssuesViewButtonGroup';

const MostImpactBadgeCounter = styled(BadgeCounter)`
  && {
    --badge-counter-background-color: ${cssVar('color-background-neutral-subtle-active')};
  }

  font-variant-numeric: tabular-nums;
`;

MostImpactBadgeCounter.displayName = 'MostImpactBadgeCounter';

const InlineSelect = styled(Select)`
  min-width: 0;
  width: 100%;

  && .echoes-select-input {
    height: ${cssVar('dimension-height-800')};
    min-height: ${cssVar('dimension-height-800')};
    padding-block: ${cssVar('dimension-space-50')};
  }
`;

InlineSelect.displayName = 'InlineSelect';

const AssigneeControlGroup = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  width: 100%;

  > :first-child {
    flex: 1 1 auto;
    min-width: 0;
  }

  .echoes-select-input {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > button {
    flex: 0 0 auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:focus,
    &:focus-visible {
      outline-offset: -2px;
    }
  }
`;

AssigneeControlGroup.displayName = 'AssigneeControlGroup';

const FileGroupHeaderCell = styled(Table.Cell)`
  && {
    grid-column: span 6;
    min-width: 0;
    padding: 0;
  }
`;

FileGroupHeaderCell.displayName = 'FileGroupHeaderCell';

const FileGroupDisclosure = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  width: 100%;
  height: 100%;
  min-width: 0;
  padding-inline: ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-default')};
  cursor: pointer;

  > [aria-hidden='true'] {
    flex: 0 0 ${cssVar('dimension-width-200')};
    width: ${cssVar('dimension-width-200')};
    height: ${cssVar('dimension-height-400')};
    font-size: ${cssVar('font-size-30')};
    line-height: ${cssVar('dimension-height-400')};
    color: ${cssVar('color-icon-subtle')};
  }

  &:hover {
    background-color: ${cssVar('color-background-neutral-subtle-hover')};
  }

  &:focus-visible {
    border-radius: ${cssVar('border-radius-200')};
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
    z-index: 1;
  }
`;

FileGroupDisclosure.displayName = 'FileGroupDisclosure';

const FileGroupPath = styled.span`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-semi-bold')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

FileGroupPath.displayName = 'FileGroupPath';

const FileGroupMeta = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;
`;

FileGroupMeta.displayName = 'FileGroupMeta';

const FileGroupIssueRows = styled(Table.Body)`
  &[hidden] {
    display: none;
  }
`;

FileGroupIssueRows.displayName = 'FileGroupIssueRows';

const IssueImpact = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};

  box-sizing: border-box;
  min-height: ${cssVar('dimension-height-600')};
  padding: 0 ${cssVar('dimension-space-100')};

  color: ${cssVar('color-text-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-full')};
  font: ${cssVar('typography-text-small-medium')};
  white-space: nowrap;
`;

IssueImpact.displayName = 'IssueImpact';

const ISSUE_SEVERITY_ICON_COLORS: Record<IssueSeverity, string> = {
  blocker: cssVar('color-status-danger-solid-default'),
  high: cssVar('color-data-viz-severity-high'),
  medium: cssVar('color-data-viz-categorical-5'),
  low: cssVar('color-border-bolder'),
  info: cssVar('color-data-viz-categorical-1'),
};

const ISSUE_SEVERITY_ICONS = {
  blocker: IconSeverityBlocker,
  high: IconSeverityHigh,
  medium: IconSeverityMedium,
  low: IconSeverityLow,
  info: IconInfo,
};

const IssueSeverityIconContainer = styled.span<{ $severity: IssueSeverity }>`
  display: inline-flex;
  flex: 0 0 ${cssVar('dimension-width-150')};
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-150')};
  height: ${cssVar('dimension-width-150')};
  color: ${({ $severity }) => ISSUE_SEVERITY_ICON_COLORS[$severity]};

  > span {
    width: ${cssVar('dimension-width-150')};
    height: ${cssVar('dimension-width-150')};
    font-size: ${cssVar('dimension-width-150')};
    line-height: ${cssVar('dimension-width-150')};
  }
`;

IssueSeverityIconContainer.displayName = 'IssueSeverityIconContainer';

function IssueSeverityIcon({ severity }: Readonly<{ severity: IssueSeverity }>) {
  const SeverityIcon = ISSUE_SEVERITY_ICONS[severity];

  return (
    <IssueSeverityIconContainer $severity={severity} aria-hidden="true">
      <SeverityIcon />
    </IssueSeverityIconContainer>
  );
}

IssueSeverityIcon.displayName = 'IssueSeverityIcon';

const IssueImpactLabel = styled.span`
  color: ${cssVar('color-text-default')};
`;

IssueImpactLabel.displayName = 'IssueImpactLabel';

const IssueImpactDivider = styled.span`
  align-self: stretch;
  width: ${cssVar('border-width-default')};
  margin-block: ${cssVar('dimension-space-75')};
  background-color: ${cssVar('color-border-weak')};
`;

IssueImpactDivider.displayName = 'IssueImpactDivider';

const IssueImpactAttribute = styled.span`
  color: ${cssVar('color-text-subtle')};
`;

IssueImpactAttribute.displayName = 'IssueImpactAttribute';

const IssueAttribute = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;
`;

IssueAttribute.displayName = 'IssueAttribute';

const IssueTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
  overflow: hidden;
`;

IssueTags.displayName = 'IssueTags';

const IssueCellContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

IssueCellContent.displayName = 'IssueCellContent';

const IssueTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
  width: 100%;
`;

IssueTitleRow.displayName = 'IssueTitleRow';

const CopyPromptButton = styled(ButtonIcon)`
  flex: 0 0 auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 100ms ease-out;

  .issue-column:hover &,
  .issue-column:focus-within &,
  &:focus-visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

CopyPromptButton.displayName = 'CopyPromptButton';

const IssueTitleLink = styled(LinkStandalone)`
  flex: 1;
  min-width: 0;
`;

IssueTitleLink.displayName = 'IssueTitleLink';

const IssueFilePath = styled(Text)`
  padding-left: 0;
`;

IssueFilePath.displayName = 'IssueFilePath';

const IssueTagPill = styled(Badge)`
  && {
    --badge-height: ${cssVar('dimension-height-600')};
    --badge-color: ${cssVar('color-text-subtle')};
    --badge-background-color: ${cssVar('color-surface-default')};
    --badge-border-color: ${cssVar('color-border-subtle')};
    --badge-interactive-backgroud-color-focus: ${cssVar('color-surface-default')};
    --badge-interactive-backgroud-color-hover: ${cssVar('color-background-neutral-subtle-hover')};
    --badge-interactive-backgroud-color-active: ${cssVar('color-background-neutral-subtle-active')};

    box-sizing: border-box;
    border: ${cssVar('border-width-default')} solid ${cssVar('color-border-subtle')};
    border-radius: ${cssVar('border-radius-full')};
    color: ${cssVar('color-text-subtle')};
    outline: none;
    padding-inline: ${cssVar('dimension-space-75')};
  }
`;

IssueTagPill.displayName = 'IssueTagPill';

const PopoverTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-75')};
`;

PopoverTags.displayName = 'PopoverTags';

const IssuesSummary = styled.span`
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-default-regular')};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

IssuesSummary.displayName = 'IssuesSummary';

const IssueHeaderBulkActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-150')};
  width: 100%;
`;

IssueHeaderBulkActions.displayName = 'IssueHeaderBulkActions';

const IssueHeaderActionGroup = styled(ButtonGroup)`
  flex: 0 0 auto;
`;

IssueHeaderActionGroup.displayName = 'IssueHeaderActionGroup';

const IssuesTableCard = styled(Card)`
  height: auto;
  min-width: 0;
  overflow: hidden;
`;

IssuesTableCard.displayName = 'IssuesTableCard';

const PaginationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${cssVar('dimension-space-200')};
`;

PaginationFooter.displayName = 'PaginationFooter';

const TableScroller = styled.div`
  min-width: 0;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
`;

TableScroller.displayName = 'TableScroller';

const CompactIssuesTable = styled(Table)`
  min-width: 60rem;
  width: 100%;
  border-radius: 0;

  thead th {
    background-color: ${cssVar('color-surface-subtle')};
  }

  th,
  td {
    height: calc(
      ${cssVar('table-sizes-row-min-width-default')} - ${cssVar('border-width-default')}
    );
    min-height: calc(
      ${cssVar('table-sizes-row-min-width-default')} - ${cssVar('border-width-default')}
    );
    padding: ${cssVar('dimension-space-75')} ${cssVar('dimension-space-150')};
  }

  .issue-column-grouped {
    position: relative;
    min-width: 0;
    padding-left: ${cssVar('dimension-space-400')};

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: ${cssVar('dimension-space-250')};
      width: ${cssVar('border-width-default')};
      background-color: ${cssVar('color-border-weaker')};
      content: '';
    }
  }

  .issue-checkbox-grouped > span {
    position: relative;
    left: ${cssVar('dimension-space-250')};
  }

  .issue-column > div {
    min-width: 0;
    overflow: hidden;
  }

  .issue-column a {
    display: block;
    width: 100%;
    overflow: hidden;
    font: ${cssVar('typography-text-default-regular')};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .impact-column {
    justify-content: flex-start;
  }

  .attribute-column,
  .tags-column {
    justify-content: flex-start;
  }

  @media (max-width: 78rem) {
    min-width: 48rem;

    && {
      grid-template-columns: min-content minmax(18rem, 1fr) max-content 8rem;
    }

    .assignee-column,
    .attribute-column,
    .tags-column {
      display: none;
    }

    && .file-group-header {
      grid-column: span 3;
    }
  }
`;

CompactIssuesTable.displayName = 'CompactIssuesTable';

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
  padding: ${cssVar('dimension-space-600')} ${cssVar('dimension-space-200')};
  text-align: center;
`;

NoResults.displayName = 'NoResults';

const NoResultsTitle = styled.h2`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-large-semi-bold')};
`;

NoResultsTitle.displayName = 'NoResultsTitle';

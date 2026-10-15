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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Fragment,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  IconLinkExternal,
  IconSparkle,
  IconX,
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
import { IssueImpact } from './IssueImpact';
import { IssueCodeSyntax } from './IssueCodeSyntax';
import {
  getIssueLocations,
  type IssueCodeLine,
  IssueCodeCollapseButton,
  IssueLocationNavigator,
} from './IssueLocationNavigation';
import { writeIssueNavigationData } from './IssueNavigationState';
import { type IssueSeverity } from './IssueSeverityColors';
import { IssueSeverityIcon } from './IssueSeverityIcon';
import {
  ISSUE_DETAIL_STORY_URL,
  navigateToPlaygroundStory,
  ProductGlobalNavigationBreadcrumbs,
  ProductShell,
} from './ProductShell';
import { flattenFilterSelection, groupFilterSelection } from './FilterSelection';

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

type IssueStatus = 'confirmed' | 'open';
type IssueImportance = 'all' | 'most-important';
type IssueCopyFeedbackStatus = 'copied' | 'error';
type IssuePreviewTab = 'activity' | 'fix' | 'where' | 'why';

interface Issue {
  assignee: string;
  description: string;
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

interface IssuePreviewDetails {
  code: ReadonlyArray<IssueCodeLine>;
  effort: string;
  fix: string;
  introduced: string;
  line: number;
  where: string;
  why: string;
}

const ISSUE_PREVIEW_TABS: ReadonlyArray<{ key: IssuePreviewTab; label: string }> = [
  { key: 'where', label: 'Where' },
  { key: 'why', label: 'Why' },
  { key: 'fix', label: 'Fix' },
  { key: 'activity', label: 'Activity' },
];

const ISSUE_PREVIEW_DEFAULT_WIDTH = 640;
const ISSUE_PREVIEW_MIN_WIDTH = 480;
const ISSUE_PREVIEW_RESIZE_STEP = 32;
const ISSUES_TABLE_MIN_WIDTH = 360;

const BASE_ISSUES: ReadonlyArray<Issue> = [
  {
    assignee: 'M. Dupont',
    description: 'Exceptions should not be ignored',
    file: 'src/components/issues/IssueList.tsx',
    key: 'S6551',
    message: "Handle this exception or don't catch it at all.",
    rule: 'javascript:S2486',
    severity: 'blocker',
    status: 'open',
    tags: ['error-handling', 'cwe', 'bug', 'exceptions', 'reliability', 'typescript'],
    type: 'Reliability',
  },
  {
    assignee: 'Unassigned',
    description: 'Cognitive Complexity of functions should not be too high',
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
    description: 'Context provider values should be memoized',
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
    description: 'Regular expressions should not be vulnerable to denial of service',
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
    description: 'Type assertions should not be redundant',
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
    description: 'Interactive elements should have accessible names',
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
    description: 'Boolean literals should not be redundant',
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
    description: 'Promises should not be rejected without handling',
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
    description: 'Objects should be compared directly',
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
    description: 'includes() should be preferred over indexOf()',
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
    description: 'Ternary operators should not be nested',
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
    description: 'Conditions should not always evaluate to the same result',
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
    description: 'Functions should not have identical implementations',
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
    description: 'Permissions should be validated before updates',
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
    description: 'Icons should have accessible text',
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
    description: 'Sections of code should not be commented out',
    message: 'Remove this commented-out code.',
    rule: 'typescript:S125',
    severity: 'low',
    status: 'open',
    tags: ['cleanup'],
    type: 'Maintainability',
  },
  {
    description: 'The any type should not be used',
    message: 'Use a more specific type than `any`.',
    rule: 'typescript:S6006',
    severity: 'medium',
    status: 'confirmed',
    tags: ['typescript', 'type-safety'],
    type: 'Maintainability',
  },
  {
    description: 'Objects should not be instantiated without being used',
    message: 'Either remove this useless object instantiation or use it.',
    rule: 'typescript:S3984',
    severity: 'low',
    status: 'open',
    tags: ['dead-code'],
    type: 'Maintainability',
  },
  {
    description: 'Array-mutating methods should not be used in expressions',
    message: 'Move this array sort operation to a separate statement.',
    rule: 'typescript:S4043',
    severity: 'medium',
    status: 'confirmed',
    tags: ['clarity', 'readability'],
    type: 'Maintainability',
  },
  {
    description: 'Null pointers should not be dereferenced',
    message: 'Make sure this access is safe when the value is undefined.',
    rule: 'typescript:S2259',
    severity: 'high',
    status: 'open',
    tags: ['null-dereference', 'bug'],
    type: 'Reliability',
  },
  {
    description: 'User-controlled data should be validated',
    message: 'Validate this user-controlled value before using it.',
    rule: 'typescript:S5131',
    severity: 'blocker',
    status: 'open',
    tags: ['injection', 'security'],
    type: 'Security',
  },
  {
    description: 'String literals should not be duplicated',
    message: 'Replace this duplicated string literal with a constant.',
    rule: 'typescript:S1192',
    severity: 'info',
    status: 'confirmed',
    tags: ['duplication'],
    type: 'Maintainability',
  },
  {
    description: 'Synchronous calls should not block asynchronous flows',
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
    id: 'type',
    isMultiSelect: true,
    items: [
      { label: 'Maintainability', value: 'type:Maintainability' },
      { label: 'Reliability', value: 'type:Reliability' },
      { label: 'Security', value: 'type:Security' },
    ],
    label: 'Issue type',
  },
  {
    id: 'assignee',
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
  const issuesWorkspaceRef = useRef<HTMLDivElement>(null);
  const [collapsedFiles, setCollapsedFiles] = useState(() => new Set<string>());
  const [copyPromptFeedback, setCopyPromptFeedback] = useState<{
    issueKey: string;
    status: IssueCopyFeedbackStatus;
  } | null>(null);
  const [bulkCopyFeedback, setBulkCopyFeedback] = useState<IssueCopyFeedbackStatus | null>(null);
  const [issues, setIssues] = useState<Array<Issue>>(() => [...PAGINATED_ISSUES]);
  const [importance, setImportance] = useState<IssueImportance>('all');
  const [isIssuePreviewOpen, setIsIssuePreviewOpen] = useState(false);
  const [isIssuePreviewResizing, setIsIssuePreviewResizing] = useState(false);
  const [page, setPage] = useState(1);
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const [previewIssueKey, setPreviewIssueKey] = useState(PAGINATED_ISSUES[0].key);
  const [previewWidth, setPreviewWidth] = useState(ISSUE_PREVIEW_DEFAULT_WIDTH);
  const [previewTab, setPreviewTab] = useState<IssuePreviewTab>('where');
  const [selectedKeys, setSelectedKeys] = useState(() => new Set<string>());
  const [severity, setSeverity] = useState<string | null>('all');
  const [status, setStatus] = useState<string | null>('all');
  const previewIssue = issues.find((issue) => issue.key === previewIssueKey) ?? issues[0];

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
  const totalPages = Math.max(1, Math.ceil(filteredFileGroups.length / FILE_GROUPS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visibleFileGroups = filteredFileGroups.slice(
    (currentPage - 1) * FILE_GROUPS_PER_PAGE,
    currentPage * FILE_GROUPS_PER_PAGE,
  );
  const visibleIssues = visibleFileGroups.flatMap((group) => group.issues);
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

  useEffect(() => {
    if (!isIssuePreviewOpen) {
      return undefined;
    }

    function closePreviewWithEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsIssuePreviewOpen(false);
      }
    }

    window.addEventListener('keydown', closePreviewWithEscape);

    return () => window.removeEventListener('keydown', closePreviewWithEscape);
  }, [isIssuePreviewOpen]);

  function openIssuePreview(issueKey: string) {
    setPreviewIssueKey(issueKey);
    setPreviewTab('where');
    setPreviewWidth((currentWidth) => clampIssuePreviewWidth(currentWidth));
    setIsIssuePreviewOpen(true);
  }

  function getIssuePreviewWidthBounds() {
    const workspaceWidth =
      issuesWorkspaceRef.current?.getBoundingClientRect().width ?? window.innerWidth;
    const minWidth = Math.min(
      ISSUE_PREVIEW_MIN_WIDTH,
      Math.max(ISSUES_TABLE_MIN_WIDTH, workspaceWidth - ISSUES_TABLE_MIN_WIDTH),
    );

    return {
      maxWidth: Math.max(minWidth, workspaceWidth - ISSUES_TABLE_MIN_WIDTH),
      minWidth,
    };
  }

  function clampIssuePreviewWidth(width: number) {
    const { maxWidth, minWidth } = getIssuePreviewWidthBounds();

    return Math.round(Math.min(Math.max(width, minWidth), maxWidth));
  }

  function resizeIssuePreview(clientX: number) {
    const workspaceRight =
      issuesWorkspaceRef.current?.getBoundingClientRect().right ?? window.innerWidth;

    setPreviewWidth(clampIssuePreviewWidth(workspaceRight - clientX));
  }

  function handleIssuePreviewResizePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsIssuePreviewResizing(true);
  }

  function handleIssuePreviewResizePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      resizeIssuePreview(event.clientX);
    }
  }

  function handleIssuePreviewResizePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsIssuePreviewResizing(false);
  }

  function handleIssuePreviewResizeKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let nextWidth: number | undefined;
    const { maxWidth, minWidth } = getIssuePreviewWidthBounds();

    if (event.key === 'ArrowLeft') {
      nextWidth = previewWidth + ISSUE_PREVIEW_RESIZE_STEP;
    } else if (event.key === 'ArrowRight') {
      nextWidth = previewWidth - ISSUE_PREVIEW_RESIZE_STEP;
    } else if (event.key === 'Home') {
      nextWidth = minWidth;
    } else if (event.key === 'End') {
      nextWidth = maxWidth;
    }

    if (nextWidth === undefined) {
      return;
    }

    event.preventDefault();
    setPreviewWidth(clampIssuePreviewWidth(nextWidth));
  }

  function openFullIssuePage(event: MouseEvent<HTMLElement>) {
    const details = getIssuePreviewDetails(previewIssue);

    writeIssueNavigationData({
      assignee: previewIssue.assignee,
      attribute: getIssueAttribute(previewIssue),
      code: details.code,
      effort: details.effort,
      file: previewIssue.file,
      fix: details.fix,
      introduced: details.introduced,
      key: previewIssue.key,
      line: details.line,
      message: previewIssue.message,
      rule: previewIssue.rule,
      ruleDescription: previewIssue.description,
      severity: previewIssue.severity,
      severityLabel: capitalize(previewIssue.severity),
      status: previewIssue.status,
      tags: previewIssue.tags,
      type: previewIssue.type,
      where: details.where,
      why: details.why,
    });
    navigateToPlaygroundStory(event, ISSUE_DETAIL_STORY_URL);
  }

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

  function renderIssueRow(issue: Issue) {
    const promptFeedbackStatus =
      copyPromptFeedback?.issueKey === issue.key ? copyPromptFeedback.status : null;

    return (
      <Table.Row
        className={
          isIssuePreviewOpen && previewIssueKey === issue.key ? 'issue-previewed' : undefined
        }
        key={issue.key}
        selected={selectedKeys.has(issue.key)}>
        <Table.CellCheckbox
          ariaLabel={`Select ${issue.key}`}
          cellClassName="issue-checkbox issue-checkbox-grouped"
          checked={selectedKeys.has(issue.key)}
          onCheck={() => toggleIssue(issue.key)}
        />
        <Table.Cell className="issue-column issue-column-grouped">
          <IssueCellContent>
            <IssueTitleRow>
              <IssueTitleButton
                aria-controls="issue-preview-drawer"
                aria-expanded={isIssuePreviewOpen && previewIssueKey === issue.key}
                onClick={() => openIssuePreview(issue.key)}
                title={issue.message}
                type="button">
                {issue.message}
              </IssueTitleButton>
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
          </IssueCellContent>
        </Table.Cell>
        <Table.Cell className="impact-column">
          <IssueImpact
            attribute={issue.type}
            severity={issue.severity}
            severityLabel={capitalize(issue.severity)}
          />
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

  const previewWidthBounds = getIssuePreviewWidthBounds();

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
      <IssuesSplitView
        $isPreviewOpen={isIssuePreviewOpen}
        $isResizing={isIssuePreviewResizing}
        $previewWidth={previewWidth}
        ref={issuesWorkspaceRef}>
        <Layout.PageGrid width="fluid">
          <Layout.PageHeader
            title={<Layout.PageHeader.Title headingLevel="h1">Issues</Layout.PageHeader.Title>}
          />

          <Layout.PageContent>
            <Toolbar
              ariaLabel="Filter issues"
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
                      setMoreFilters(flattenFilterSelection(values));
                      setPage(1);
                    }}
                    onClear={() => {
                      setMoreFilters([]);
                      setPage(1);
                    }}
                    selectedValues={groupFilterSelection(moreFilters)}>
                    <FilterDropdownTrigger
                      selectedCount={moreFilters.length}
                      size={ButtonSize.Large}>
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
                    $isPreviewOpen={isIssuePreviewOpen}
                    ariaLabel="Issues in code"
                    gridTemplate={
                      isIssuePreviewOpen
                        ? 'min-content minmax(0, 1fr) max-content'
                        : 'min-content minmax(22rem, 32rem) max-content 8rem minmax(12rem, 1fr) 8rem 10rem'
                    }
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

                    {visibleFileGroups.map((fileGroup) => {
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
                              <FileGroupHeaderCell
                                $isPreviewOpen={isIssuePreviewOpen}
                                className="file-group-header"
                                colSpan={6}>
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
                            {fileGroup.issues.map((issue) => renderIssueRow(issue))}
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

        <IssuePreviewPanel
          copyFeedbackStatus={
            copyPromptFeedback?.issueKey === previewIssue.key ? copyPromptFeedback.status : null
          }
          isOpen={isIssuePreviewOpen}
          issue={previewIssue}
          onClose={() => setIsIssuePreviewOpen(false)}
          onCopyPrompt={() => copyIssuePrompt(previewIssue)}
          onOpenFullPage={openFullIssuePage}
          onResizeKeyDown={handleIssuePreviewResizeKeyDown}
          onResizePointerCancel={handleIssuePreviewResizePointerEnd}
          onResizePointerDown={handleIssuePreviewResizePointerDown}
          onResizePointerMove={handleIssuePreviewResizePointerMove}
          onResizePointerUp={handleIssuePreviewResizePointerEnd}
          onTabChange={setPreviewTab}
          resizeMaxWidth={previewWidthBounds.maxWidth}
          resizeMinWidth={previewWidthBounds.minWidth}
          resizeWidth={previewWidth}
          selectedTab={previewTab}
        />
      </IssuesSplitView>
    </ProductShell>
  );
}

IssuesPage.displayName = 'IssuesPage';

interface IssuePreviewPanelProps {
  copyFeedbackStatus: IssueCopyFeedbackStatus | null;
  isOpen: boolean;
  issue: Issue;
  onClose: () => void;
  onCopyPrompt: () => void;
  onOpenFullPage: (event: MouseEvent<HTMLElement>) => void;
  onResizeKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onResizePointerCancel: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onResizePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onResizePointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onResizePointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onTabChange: (tab: IssuePreviewTab) => void;
  resizeMaxWidth: number;
  resizeMinWidth: number;
  resizeWidth: number;
  selectedTab: IssuePreviewTab;
}

function IssuePreviewPanel({
  copyFeedbackStatus,
  isOpen,
  issue,
  onClose,
  onCopyPrompt,
  onOpenFullPage,
  onResizeKeyDown,
  onResizePointerCancel,
  onResizePointerDown,
  onResizePointerMove,
  onResizePointerUp,
  onTabChange,
  resizeMaxWidth,
  resizeMinWidth,
  resizeWidth,
  selectedTab,
}: Readonly<IssuePreviewPanelProps>) {
  const details = getIssuePreviewDetails(issue);
  const tabContent = getIssuePreviewTabContent(issue, details, selectedTab);
  const [isCodeExpanded, setIsCodeExpanded] = useState(true);
  const [locationIndex, setLocationIndex] = useState(0);
  const issueLocations = getIssueLocations({
    code: details.code,
    file: issue.file,
    key: issue.key,
    line: details.line,
  });
  const currentLocation = issueLocations[locationIndex] ?? issueLocations[0];

  useEffect(() => {
    setIsCodeExpanded(true);
    setLocationIndex(0);
  }, [issue.key]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, key: IssuePreviewTab) {
    const currentIndex = ISSUE_PREVIEW_TABS.findIndex((item) => item.key === key);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % ISSUE_PREVIEW_TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + ISSUE_PREVIEW_TABS.length) % ISSUE_PREVIEW_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = ISSUE_PREVIEW_TABS.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    const nextTab = ISSUE_PREVIEW_TABS[nextIndex].key;
    onTabChange(nextTab);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-preview-tab="${nextTab}"]`)
      ?.focus();
  }

  return (
    <IssuePreviewDrawer
      $isOpen={isOpen}
      aria-hidden={!isOpen}
      aria-labelledby="issue-preview-title"
      id="issue-preview-drawer"
      inert={!isOpen}>
      <IssuePreviewResizeHandle
        aria-controls="issue-preview-drawer"
        aria-label="Resize issue details"
        aria-orientation="vertical"
        aria-valuemax={resizeMaxWidth}
        aria-valuemin={resizeMinWidth}
        aria-valuenow={resizeWidth}
        onKeyDown={onResizeKeyDown}
        onPointerCancel={onResizePointerCancel}
        onPointerDown={onResizePointerDown}
        onPointerMove={onResizePointerMove}
        onPointerUp={onResizePointerUp}
        role="separator"
        tabIndex={isOpen ? 0 : -1}
      />
      <IssuePreviewHeader>
        <IssuePreviewTitleRow>
          <div>
            <IssuePreviewTitle id="issue-preview-title">{issue.message}</IssuePreviewTitle>
            <IssuePreviewRule>
              {issue.description} ·{' '}
              <LinkStandalone enableOpenInNewTab isDiscreet to={getIssueRuleUrl(issue.rule)}>
                {issue.rule}
              </LinkStandalone>
            </IssuePreviewRule>
          </div>
          <IssuePreviewTitleActions>
            <ButtonIcon
              Icon={IconLinkExternal}
              ariaLabel="Open full page"
              onClick={onOpenFullPage}
              size={ButtonSize.Medium}
              to={ISSUE_DETAIL_STORY_URL}
              tooltipContent="Open full page"
              variety={ButtonVariety.DefaultGhost}
            />
            <ButtonIcon
              Icon={IconX}
              ariaLabel="Close issue preview"
              onClick={onClose}
              size={ButtonSize.Medium}
              tooltipContent="Close issue preview"
              variety={ButtonVariety.DefaultGhost}
            />
          </IssuePreviewTitleActions>
        </IssuePreviewTitleRow>

        <IssuePreviewHeaderMeta>
          <IssueImpact
            attribute={issue.type}
            severity={issue.severity}
            severityLabel={capitalize(issue.severity)}
          />
          <IssuePreviewMetadataText>
            {details.effort} effort · {details.introduced}
          </IssuePreviewMetadataText>
        </IssuePreviewHeaderMeta>
      </IssuePreviewHeader>

      <IssuePreviewBody>
        <IssuePreviewMain>
          <IssuePreviewTabList aria-label="Issue preview details" role="tablist">
            {ISSUE_PREVIEW_TABS.map((item) => {
              const isSelected = item.key === selectedTab;

              return (
                <IssuePreviewTabButton
                  aria-controls="issue-preview-tab-panel"
                  aria-selected={isSelected}
                  data-preview-tab={item.key}
                  id={`issue-preview-tab-${item.key}`}
                  key={item.key}
                  onClick={() => onTabChange(item.key)}
                  onKeyDown={(event) => handleTabKeyDown(event, item.key)}
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  type="button">
                  {item.label}
                </IssuePreviewTabButton>
              );
            })}
          </IssuePreviewTabList>

          {selectedTab === 'where' ? (
            <IssuePreviewCodePanel
              aria-labelledby="issue-preview-tab-where"
              id="issue-preview-tab-panel"
              role="tabpanel">
              <IssuePreviewCodeHeader>
                <IssuePreviewCodeHeaderMain>
                  <IssueCodeCollapseButton
                    isExpanded={isCodeExpanded}
                    onToggle={() => setIsCodeExpanded((isExpanded) => !isExpanded)}
                  />
                  <IssuePreviewCodeFile>
                    <IssuePreviewCodeTitle title={currentLocation.file}>
                      {currentLocation.file}
                    </IssuePreviewCodeTitle>
                  </IssuePreviewCodeFile>
                  <IssuePreviewOpenIdeButton
                    className="issue-preview-open-ide"
                    prefix={<IconLinkExternal />}
                    size={ButtonSize.Medium}
                    variety={ButtonVariety.Default}>
                    Open in IDE
                  </IssuePreviewOpenIdeButton>
                </IssuePreviewCodeHeaderMain>
                <IssueLocationNavigator
                  currentIndex={locationIndex}
                  onNext={() =>
                    setLocationIndex((index) => Math.min(index + 1, issueLocations.length - 1))
                  }
                  onPrevious={() => setLocationIndex((index) => Math.max(index - 1, 0))}
                  total={issueLocations.length}
                />
              </IssuePreviewCodeHeader>
              {isCodeExpanded && (
                <IssuePreviewCodeCanvas aria-label="Source code containing the issue" role="region">
                  {currentLocation.code.map((line) => {
                    const isIssue = line.number === currentLocation.line;

                    return (
                      <Fragment key={line.number}>
                        <IssuePreviewCodeRow $isIssue={isIssue}>
                          <IssuePreviewLineNumber aria-hidden>{line.number}</IssuePreviewLineNumber>
                          <IssuePreviewCode>
                            {isIssue ? (
                              <span className="issue-expression">
                                <IssueCodeSyntax code={line.content} />
                              </span>
                            ) : (
                              <IssueCodeSyntax code={line.content} />
                            )}
                          </IssuePreviewCode>
                        </IssuePreviewCodeRow>
                        {isIssue && (
                          <IssuePreviewCodeCallout role="note">
                            <strong>{issue.message}</strong>
                            <Button
                              onClick={onCopyPrompt}
                              prefix={
                                copyFeedbackStatus === 'copied' ? <IconCheck /> : <IconSparkle />
                              }
                              size={ButtonSize.Medium}
                              variety={ButtonVariety.Primary}>
                              {copyFeedbackStatus === 'copied'
                                ? 'Prompt copied'
                                : copyFeedbackStatus === 'error'
                                  ? 'Try again'
                                  : 'Generate AI fix'}
                            </Button>
                          </IssuePreviewCodeCallout>
                        )}
                      </Fragment>
                    );
                  })}
                </IssuePreviewCodeCanvas>
              )}
            </IssuePreviewCodePanel>
          ) : (
            <IssuePreviewTextPanel
              aria-labelledby={`issue-preview-tab-${selectedTab}`}
              id="issue-preview-tab-panel"
              role="tabpanel">
              <IssuePreviewTextTitle>{tabContent.title}</IssuePreviewTextTitle>
              <IssuePreviewTextBody>{tabContent.body}</IssuePreviewTextBody>
            </IssuePreviewTextPanel>
          )}
        </IssuePreviewMain>
      </IssuePreviewBody>
    </IssuePreviewDrawer>
  );
}

IssuePreviewPanel.displayName = 'IssuePreviewPanel';

function getIssuePreviewDetails(issue: Issue): IssuePreviewDetails {
  const numericKey = Number.parseInt(issue.key.replace(/\D/g, '').slice(-4), 10) || 1;
  const line = issue.key.startsWith('S6551') ? 298 : 40 + (numericKey % 240);
  const effortBySeverity: Record<IssueSeverity, string> = {
    blocker: '45 min',
    high: '30 min',
    medium: '20 min',
    low: '10 min',
    info: '5 min',
  };

  if (issue.key.startsWith('S6551')) {
    return {
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
      fix: 'Handle the caught error, report it to the caller, or remove the catch block so the failure can propagate.',
      introduced: '6 months ago',
      line,
      where:
        'The catch block absorbs every failure from updateIssue without handling or rethrowing it.',
      why: 'Silently ignored failures leave the issue list in an unknown state and prevent callers from recovering.',
    };
  }

  return {
    code: [
      { content: 'export function analyzeIssue(issue: Issue) {', number: line - 3 },
      { content: '  const context = getIssueContext(issue);', number: line - 2 },
      { content: '  if (context.isRelevant) {', number: line - 1 },
      { content: '    return evaluateIssue(context);', number: line },
      { content: '  }', number: line + 1 },
      { content: '  return undefined;', number: line + 2 },
      { content: '}', number: line + 3 },
    ],
    effort: effortBySeverity[issue.severity],
    fix: `Update the implementation around line ${line} so it follows the ${issue.rule} rule without changing unrelated behavior.`,
    introduced: `${(numericKey % 11) + 1} weeks ago`,
    line,
    where: `The highlighted expression on line ${line} is where ${issue.rule} is raised.`,
    why: `${issue.message} Leaving it unresolved can make this code harder to maintain or trust.`,
  };
}

function getIssuePreviewTabContent(
  issue: Issue,
  details: IssuePreviewDetails,
  tab: IssuePreviewTab,
) {
  switch (tab) {
    case 'where':
      return { body: details.where, title: 'Where is the issue?' };
    case 'why':
      return { body: details.why, title: 'Why is this an issue?' };
    case 'fix':
      return { body: details.fix, title: 'How can I fix it?' };
    case 'activity':
      return {
        body: `This issue was introduced ${details.introduced}. It is currently ${issue.status} and assigned to ${issue.assignee}.`,
        title: 'Activity',
      };
  }
}

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

function getIssueRuleUrl(rule: string) {
  const encodedRule = encodeURIComponent(rule);

  return `https://sonarcloud.io/organizations/sonar-cx-testing/rules?open=${encodedRule}&rule_key=${encodedRule}`;
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
    `Description: ${issue.description}`,
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
      `Description: ${issue.description}`,
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

const MostImpactBadgeCounter = styled(BadgeCounter)`
  &&&& {
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

const FileGroupHeaderCell = styled(Table.Cell)<{ $isPreviewOpen: boolean }>`
  &&&& {
    grid-column: span ${({ $isPreviewOpen }) => ($isPreviewOpen ? 2 : 6)};
    min-width: 0;
    padding: 0;
  }

  @media (max-width: 78rem) {
    &&&& {
      grid-column: span ${({ $isPreviewOpen }) => ($isPreviewOpen ? 2 : 3)};
    }
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

const IssueTitleButton = styled.button`
  all: unset;
  display: block;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    border-radius: ${cssVar('border-radius-100')};
    outline: ${cssVar('focus-border-width-default')} solid ${cssVar('color-focus-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }
`;

IssueTitleButton.displayName = 'IssueTitleButton';

const IssuesSplitView = styled.div<{
  $isPreviewOpen: boolean;
  $isResizing: boolean;
  $previewWidth: number;
}>`
  grid-area: page;
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    ${({ $isPreviewOpen, $previewWidth }) => ($isPreviewOpen ? `${$previewWidth}px` : '0px')};
  grid-template-areas: 'page preview';
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  transition: grid-template-columns 200ms cubic-bezier(0.2, 0, 0, 1);

  ${({ $isResizing }) =>
    $isResizing &&
    css`
      cursor: col-resize;
      transition: none;
      user-select: none;
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

IssuesSplitView.displayName = 'IssuesSplitView';

const IssuePreviewDrawer = styled.aside<{ $isOpen: boolean }>`
  grid-area: preview;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  width: 100%;
  overflow: hidden;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  background-color: ${cssVar('color-surface-default')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  transition: visibility 0s linear ${({ $isOpen }) => ($isOpen ? '0ms' : '200ms')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

IssuePreviewDrawer.displayName = 'IssuePreviewDrawer';

const IssuePreviewResizeHandle = styled.div`
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
`;

IssuePreviewResizeHandle.displayName = 'IssuePreviewResizeHandle';

const IssuePreviewHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-250')};
  background-color: ${cssVar('color-surface-default')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssuePreviewHeader.displayName = 'IssuePreviewHeader';

const IssuePreviewTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-200')};
  min-width: 0;

  > div {
    min-width: 0;
  }
`;

IssuePreviewTitleRow.displayName = 'IssuePreviewTitleRow';

const IssuePreviewTitleActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
`;

IssuePreviewTitleActions.displayName = 'IssuePreviewTitleActions';

const IssuePreviewRule = styled.p`
  margin: ${cssVar('dimension-space-75')} 0 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
`;

IssuePreviewRule.displayName = 'IssuePreviewRule';

const IssuePreviewTitle = styled.h2`
  max-width: 42rem;
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-large')};
  text-wrap: balance;
`;

IssuePreviewTitle.displayName = 'IssuePreviewTitle';

const IssuePreviewHeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
`;

IssuePreviewHeaderMeta.displayName = 'IssuePreviewHeaderMeta';

const IssuePreviewMetadataText = styled.span`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-regular')};
  font-variant-numeric: tabular-nums;
`;

IssuePreviewMetadataText.displayName = 'IssuePreviewMetadataText';

const IssuePreviewBody = styled.div`
  display: block;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
`;

IssuePreviewBody.displayName = 'IssuePreviewBody';

const IssuePreviewMain = styled.div`
  height: 100%;
  min-width: 0;
  overflow-y: auto;
`;

IssuePreviewMain.displayName = 'IssuePreviewMain';

const IssuePreviewTabList = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  background-color: ${cssVar('color-surface-default')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
`;

IssuePreviewTabList.displayName = 'IssuePreviewTabList';

const IssuePreviewTabButton = styled.button`
  flex: 1;
  min-width: 0;
  padding: ${cssVar('dimension-space-150')};
  color: ${cssVar('navigation-item-colors-foreground-subtle')};
  font: ${cssVar('typography-text-small-semi-bold')};
  cursor: pointer;
  background-color: ${cssVar('navigation-item-colors-background-default')};
  border: 0;
  border-bottom: ${cssVar('focus-border-width-default')} solid transparent;

  &:hover {
    color: ${cssVar('navigation-item-colors-foreground-selected')};
    background-color: ${cssVar('navigation-item-colors-background-hover')};
  }

  &:active {
    background-color: ${cssVar('navigation-item-colors-background-pressed')};
  }

  &:focus-visible {
    outline: ${cssVar('focus-border-width-default')} solid
      ${cssVar('navigation-item-colors-focus-ring')};
    outline-offset: calc(-1 * ${cssVar('focus-border-width-default')});
  }

  &[aria-selected='true'] {
    color: ${cssVar('navigation-item-colors-foreground-selected')};
    background-color: ${cssVar('navigation-item-colors-background-selected')};
    border-bottom-color: ${cssVar('navigation-item-colors-foreground-selected')};
  }
`;

IssuePreviewTabButton.displayName = 'IssuePreviewTabButton';

const IssuePreviewCodePanel = styled.section`
  padding: 0;
`;

IssuePreviewCodePanel.displayName = 'IssuePreviewCodePanel';

const IssuePreviewCodeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-200')};
  background-color: ${cssVar('color-surface-subtle')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  > div {
    min-width: 0;
  }
`;

IssuePreviewCodeHeader.displayName = 'IssuePreviewCodeHeader';

const IssuePreviewCodeHeaderMain = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  min-width: 0;

  &:focus-within {
    h3 {
      text-decoration: underline;
      text-underline-offset: ${cssVar('dimension-space-50')};
    }

    .issue-preview-open-ide {
      opacity: 1;
      pointer-events: auto;
      transform: translate(0, -50%);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      h3 {
        text-decoration: underline;
        text-underline-offset: ${cssVar('dimension-space-50')};
      }

      .issue-preview-open-ide {
        opacity: 1;
        pointer-events: auto;
        transform: translate(0, -50%);
      }
    }
  }
`;

IssuePreviewCodeHeaderMain.displayName = 'IssuePreviewCodeHeaderMain';

const IssuePreviewOpenIdeButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transform: translate(${cssVar('dimension-space-50')}, -50%);
  transition:
    opacity 140ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 140ms cubic-bezier(0.23, 1, 0.32, 1);

  &:focus-visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(0, -50%);
  }

  @media (prefers-reduced-motion: reduce) {
    transform: translate(0, -50%);
    transition: none;
  }
`;

IssuePreviewOpenIdeButton.displayName = 'IssuePreviewOpenIdeButton';

const IssuePreviewCodeFile = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

IssuePreviewCodeFile.displayName = 'IssuePreviewCodeFile';

const IssuePreviewCodeTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

IssuePreviewCodeTitle.displayName = 'IssuePreviewCodeTitle';

const IssuePreviewCodeCanvas = styled.div`
  overflow-x: auto;
  padding-block: ${cssVar('dimension-space-100')};
  background-color: ${cssVar('color-surface-default')};
  font: ${cssVar('typography-code-default')};
`;

IssuePreviewCodeCanvas.displayName = 'IssuePreviewCodeCanvas';

const IssuePreviewCodeRow = styled.div<{ $isIssue: boolean }>`
  display: grid;
  grid-template-columns: ${cssVar('dimension-width-600')} minmax(max-content, 1fr);
  min-width: max-content;
  background-color: ${({ $isIssue }) =>
    $isIssue ? cssVar('badge-colors-danger-weak-default') : 'transparent'};
`;

IssuePreviewCodeRow.displayName = 'IssuePreviewCodeRow';

const IssuePreviewLineNumber = styled.span`
  &&&& {
    font-family: ${cssVar('font-family-mono')};
  }

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-100')};
  color: ${cssVar('color-text-info')};
  text-align: right;
  user-select: none;
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weaker')};
`;

IssuePreviewLineNumber.displayName = 'IssuePreviewLineNumber';

const IssuePreviewCode = styled.code`
  &&&& {
    font-family: ${cssVar('font-family-mono')};
  }

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};
  color: ${cssVar('color-text-default')};
  white-space: pre;

  &&&& .issue-expression {
    font-family: ${cssVar('font-family-mono')};
    color: ${cssVar('color-status-danger-foreground')};
    background-color: ${cssVar('badge-colors-danger-weak-default')};
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: ${cssVar('color-status-danger-foreground')};
    text-underline-offset: ${cssVar('dimension-space-50')};

    [data-code-token] {
      color: inherit;
    }
  }
`;

IssuePreviewCode.displayName = 'IssuePreviewCode';

const IssuePreviewCodeCallout = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-width: 26rem;
  margin: 0 0 0 ${cssVar('dimension-width-600')};
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-default')};
  background-color: ${cssVar('badge-colors-danger-weak-default')};

  > strong {
    min-width: 0;
    color: ${cssVar('color-text-strong')};
    font: ${cssVar('typography-text-default-semi-bold')};
    text-wrap: pretty;
  }
`;

IssuePreviewCodeCallout.displayName = 'IssuePreviewCodeCallout';

const IssuePreviewTextPanel = styled.section`
  padding: ${cssVar('dimension-space-250')};
`;

IssuePreviewTextPanel.displayName = 'IssuePreviewTextPanel';

const IssuePreviewTextTitle = styled.h3`
  margin: 0;
  color: ${cssVar('color-text-strong')};
  font: ${cssVar('typography-heading-medium')};
`;

IssuePreviewTextTitle.displayName = 'IssuePreviewTextTitle';

const IssuePreviewTextBody = styled.p`
  max-width: 65ch;
  margin: ${cssVar('dimension-space-100')} 0 0;
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};
  text-wrap: pretty;
`;

IssuePreviewTextBody.displayName = 'IssuePreviewTextBody';

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

const CompactIssuesTable = styled(Table)<{ $isPreviewOpen: boolean }>`
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

  .issue-previewed > td {
    background-color: ${cssVar('issue-row-colors-background-selected')};
  }

  .issue-previewed:hover > td {
    background-color: ${cssVar('issue-row-colors-background-selected-hover')};
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

  ${({ $isPreviewOpen }) =>
    $isPreviewOpen &&
    css`
      && {
        grid-template-columns: min-content minmax(0, 1fr) max-content;
        min-width: 0;
      }

      .assignee-column,
      .attribute-column,
      .status-column,
      .tags-column {
        display: none;
      }

      && .file-group-header {
        grid-column: span 2;
      }
    `}
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

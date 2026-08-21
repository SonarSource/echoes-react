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
import { useMemo, useState } from 'react';
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
  DropdownMenu,
  DropdownMenuAlign,
  EmptyState,
  FilterDropdown,
  FilterDropdownTrigger,
  FilterTag,
  FormFieldWidth,
  IconCheck,
  IconMoreVertical,
  IconSearch,
  IconStar,
  IconX,
  Layout,
  RatingBadge,
  RatingBadgeRating,
  SearchInput,
  SearchInputWidth,
  Select,
  Table,
  TableVariety,
  Text,
  Tooltip,
  Toolbar,
  ToggleButtonGroup,
} from '../../src';
import { GitHubLogo } from './GitHubLogo';
import {
  ProductGlobalNavigationBreadcrumbs,
  ProductPageDescription,
  ProductShell,
} from './ProductShell';

const meta: Meta = {
  title: 'Playground/Projects',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const OrganizationProjects: Story = {
  render: () => <ProjectsPage />,
};

type Project = {
  analysis: string;
  coverage: string;
  dependencyRisks: number;
  duplications: string;
  gate: 'passed' | 'failed';
  githubUrl: string;
  language: string;
  lines: string;
  maintainability: `${RatingBadgeRating}`;
  maintainabilityIssues: number;
  name: string;
  reliability: `${RatingBadgeRating}`;
  reliabilityIssues: number;
  security: `${RatingBadgeRating}`;
  securityIssues: number;
  highlights?: ProjectHighlight[];
};

type ProjectHighlight = 'New' | 'Public';

type MetricTone = 'danger' | 'neutral' | 'success' | 'warning';

type ProjectPerspective = 'new' | 'overall';

type ProjectSortColumn =
  | 'analysis'
  | 'coverage'
  | 'dependencyRisks'
  | 'duplications'
  | 'gate'
  | 'maintainability'
  | 'name'
  | 'reliability'
  | 'security';

type ProjectSorting = {
  column: ProjectSortColumn;
  direction: 'asc' | 'desc';
};

const FEATURED_PROJECTS: Project[] = [
  {
    analysis: '14 Aug 2026, 14:45',
    coverage: '78.4%',
    dependencyRisks: 15,
    duplications: '36.1%',
    gate: 'failed',
    githubUrl: 'https://github.com/SonarSource/issues-list',
    language: 'TypeScript, CSS',
    lines: '22k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 48,
    name: 'issues-list',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 13,
    security: RatingBadgeRating.C,
    securityIssues: 1,
  },
  {
    analysis: '13 Aug 2026, 17:40',
    coverage: '—',
    dependencyRisks: 0,
    duplications: '0.0%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/ai-eval-journey-visualization',
    language: 'HTML',
    lines: '295',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 0,
    name: 'AI Eval Journey Visualization',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 0,
    security: RatingBadgeRating.A,
    securityIssues: 0,
  },
  {
    analysis: '12 Aug 2026, 18:14',
    coverage: '63.9%',
    dependencyRisks: 23,
    duplications: '53.2%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/hunter-agent',
    language: 'TypeScript, CSS',
    lines: '16k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 27,
    name: 'hunter-agent',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 4,
    security: RatingBadgeRating.C,
    securityIssues: 2,
  },
  {
    analysis: '21 Jul 2026, 21:25',
    coverage: '88.6%',
    dependencyRisks: 4,
    duplications: '4.8%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/sara-v2-poc-new',
    language: 'TypeScript, CSS',
    lines: '10k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 8,
    name: 'sara-v2-poc-new',
    reliability: RatingBadgeRating.B,
    reliabilityIssues: 6,
    security: RatingBadgeRating.A,
    securityIssues: 0,
  },
  {
    analysis: '18 Aug 2026, 09:32',
    coverage: '91.6%',
    dependencyRisks: 2,
    duplications: '1.4%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/echoes-react',
    language: 'TypeScript',
    lines: '42k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 5,
    name: 'echoes-react',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 0,
    security: RatingBadgeRating.A,
    securityIssues: 0,
  },
  {
    analysis: '17 Aug 2026, 16:08',
    coverage: '76.2%',
    dependencyRisks: 8,
    duplications: '12.4%',
    gate: 'failed',
    githubUrl: 'https://github.com/SonarSource/sonarcloud-webapp',
    language: 'TypeScript, CSS',
    lines: '480k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 132,
    name: 'sonarcloud-webapp',
    reliability: RatingBadgeRating.C,
    reliabilityIssues: 18,
    security: RatingBadgeRating.B,
    securityIssues: 3,
  },
  {
    analysis: '16 Aug 2026, 11:20',
    coverage: '86.9%',
    dependencyRisks: 3,
    duplications: '4.1%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/billing-service',
    language: 'Java',
    lines: '81k',
    maintainability: RatingBadgeRating.B,
    maintainabilityIssues: 24,
    name: 'billing-service',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 1,
    security: RatingBadgeRating.A,
    securityIssues: 0,
  },
  {
    analysis: '15 Aug 2026, 08:55',
    coverage: '94.1%',
    dependencyRisks: 0,
    duplications: '2.2%',
    gate: 'passed',
    githubUrl: 'https://github.com/SonarSource/developer-portal',
    language: 'TypeScript, MDX',
    lines: '64k',
    maintainability: RatingBadgeRating.A,
    maintainabilityIssues: 3,
    name: 'developer-portal',
    reliability: RatingBadgeRating.A,
    reliabilityIssues: 0,
    security: RatingBadgeRating.A,
    securityIssues: 0,
  },
];

const ADDITIONAL_PROJECT_SEEDS = [
  ['sonarqube', 'Java, TypeScript', '11 Aug 2026, 15:42'],
  ['sonar-scanner-cli', 'Java', '10 Aug 2026, 12:18'],
  ['sonar-java', 'Java', '9 Aug 2026, 10:06'],
  ['sonar-js', 'TypeScript', '8 Aug 2026, 17:31'],
  ['sonar-python', 'Python', '7 Aug 2026, 09:24'],
  ['sonar-dotnet', 'C#', '6 Aug 2026, 14:53'],
  ['sonar-go', 'Go', '5 Aug 2026, 11:47'],
  ['sonar-rust', 'Rust', '4 Aug 2026, 16:12'],
  ['sonar-kotlin', 'Kotlin', '3 Aug 2026, 08:39'],
  ['sonar-php', 'PHP', '2 Aug 2026, 13:05'],
  ['sonar-html', 'Java, HTML', '1 Aug 2026, 18:22'],
  ['sonarlint-vscode', 'TypeScript', '31 Jul 2026, 15:16'],
  ['sonarlint-intellij', 'Java, Kotlin', '30 Jul 2026, 10:41'],
  ['sonarlint-visualstudio', 'C#', '29 Jul 2026, 17:03'],
  ['sonar-custom-plugin', 'Java', '28 Jul 2026, 12:35'],
  ['analysis-cache-service', 'Go', '27 Jul 2026, 09:58'],
  ['quality-gate-monitor', 'TypeScript, CSS', '26 Jul 2026, 14:27'],
] as const;

const PROJECT_RATING_CYCLE = [
  RatingBadgeRating.A,
  RatingBadgeRating.A,
  RatingBadgeRating.B,
  RatingBadgeRating.C,
] as const;

const ADDITIONAL_PROJECTS: Project[] = ADDITIONAL_PROJECT_SEEDS.map(
  ([name, language, analysis], index) => ({
    analysis,
    coverage: index === 6 ? '—' : `${(72 + ((index * 7) % 25)).toFixed(1)}%`,
    dependencyRisks: (index * 3) % 19,
    duplications: `${((index * 1.7) % 14).toFixed(1)}%`,
    gate: index % 5 === 0 ? 'failed' : 'passed',
    githubUrl: `https://github.com/SonarSource/${name}`,
    language,
    lines: `${18 + index * 11}k`,
    maintainability: PROJECT_RATING_CYCLE[index % PROJECT_RATING_CYCLE.length],
    maintainabilityIssues: 3 + index * 7,
    name,
    reliability: PROJECT_RATING_CYCLE[(index + 1) % PROJECT_RATING_CYCLE.length],
    reliabilityIssues: (index * 3) % 17,
    security: PROJECT_RATING_CYCLE[(index + 2) % PROJECT_RATING_CYCLE.length],
    securityIssues: index % 6,
  }),
);

const PROJECT_HIGHLIGHTS = new Map<string, ProjectHighlight[]>([
  ['echoes-react', ['Public']],
  ['hunter-agent', ['New', 'Public']],
  ['issues-list', ['New']],
  ['quality-gate-monitor', ['New']],
  ['sonarqube', ['Public']],
]);

const PROJECTS: Project[] = [...FEATURED_PROJECTS, ...ADDITIONAL_PROJECTS].map((project) => ({
  ...project,
  highlights: PROJECT_HIGHLIGHTS.get(project.name),
}));

const QUALITY_GATE_OPTIONS = [
  { label: 'All quality gates', value: 'all' },
  { label: 'Passed', value: 'passed' },
  { label: 'Failed', value: 'failed' },
];

const RATING_FILTERS = [
  RatingBadgeRating.A,
  RatingBadgeRating.B,
  RatingBadgeRating.C,
  RatingBadgeRating.D,
  RatingBadgeRating.E,
].map((rating) => ({
  label: rating,
  value: rating,
}));

const MORE_FILTER_CATEGORIES = [
  {
    isMultiSelect: true,
    items: RATING_FILTERS.map(({ label, value }) => ({
      label,
      value: `security:${value}`,
    })),
    label: 'Security rating',
  },
  {
    isMultiSelect: true,
    items: RATING_FILTERS.map(({ label, value }) => ({
      label,
      value: `reliability:${value}`,
    })),
    label: 'Reliability rating',
  },
  {
    isMultiSelect: true,
    items: RATING_FILTERS.map(({ label, value }) => ({
      label,
      value: `maintainability:${value}`,
    })),
    label: 'Maintainability rating',
  },
  {
    isMultiSelect: true,
    items: RATING_FILTERS.map(({ label, value }) => ({
      label,
      value: `dependency:${value}`,
    })),
    label: 'Dependency risks rating',
  },
  {
    isMultiSelect: true,
    items: [
      { label: '90% and above', value: 'coverage:90-plus' },
      { label: '80–89.9%', value: 'coverage:80-90' },
      { label: '60–79.9%', value: 'coverage:60-80' },
      { label: 'Below 60%', value: 'coverage:below-60' },
      { label: 'No coverage', value: 'coverage:none' },
    ],
    label: 'Coverage',
  },
  {
    isMultiSelect: true,
    items: [
      { label: 'Low (≤ 5%)', value: 'duplications:low' },
      { label: 'Medium (> 5–15%)', value: 'duplications:medium' },
      { label: 'High (> 15%)', value: 'duplications:high' },
    ],
    label: 'Duplications',
  },
  {
    isMultiSelect: true,
    items: [
      { label: 'Last 7 days', value: 'analysis:last-7-days' },
      { label: 'Last 30 days', value: 'analysis:last-30-days' },
      { label: 'Older than 30 days', value: 'analysis:older' },
    ],
    label: 'Last analysis',
  },
];

const FILTER_LABELS = new Map(
  MORE_FILTER_CATEGORIES.flatMap((category) =>
    category.items.map((item) => [item.value, `${category.label}: ${item.label}`] as const),
  ),
);

const FILTER_REFERENCE_DATE = Date.parse('20 Aug 2026, 23:59');
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function getSelectedFilterValues(filters: string[], prefix: string) {
  const filterPrefix = `${prefix}:`;

  return filters
    .filter((value) => value.startsWith(filterPrefix))
    .map((value) => value.slice(filterPrefix.length));
}

function matchesRatingFilter(selectedRatings: string[], rating: `${RatingBadgeRating}`) {
  return selectedRatings.length === 0 || selectedRatings.includes(rating);
}

function matchesCoverageFilter(selectedRanges: string[], value: number | null) {
  return (
    selectedRanges.length === 0 ||
    selectedRanges.some((range) => {
      switch (range) {
        case '90-plus':
          return value !== null && value >= 90;
        case '80-90':
          return value !== null && value >= 80 && value < 90;
        case '60-80':
          return value !== null && value >= 60 && value < 80;
        case 'below-60':
          return value !== null && value < 60;
        case 'none':
          return value === null;
        default:
          return false;
      }
    })
  );
}

function matchesDuplicationsFilter(selectedRanges: string[], value: number) {
  return (
    selectedRanges.length === 0 ||
    selectedRanges.some((range) => {
      switch (range) {
        case 'low':
          return value <= 5;
        case 'medium':
          return value > 5 && value <= 15;
        case 'high':
          return value > 15;
        default:
          return false;
      }
    })
  );
}

function matchesAnalysisFilter(selectedRanges: string[], analysis: string) {
  const ageInDays = (FILTER_REFERENCE_DATE - Date.parse(analysis)) / MILLISECONDS_PER_DAY;

  return (
    selectedRanges.length === 0 ||
    selectedRanges.some((range) => {
      switch (range) {
        case 'last-7-days':
          return ageInDays <= 7;
        case 'last-30-days':
          return ageInDays > 7 && ageInDays <= 30;
        case 'older':
          return ageInDays > 30;
        default:
          return false;
      }
    })
  );
}

function compareProjects(first: Project, second: Project, sorting: ProjectSorting) {
  const firstValue = getProjectSortValue(first, sorting.column);
  const secondValue = getProjectSortValue(second, sorting.column);

  if (firstValue === null || secondValue === null) {
    if (firstValue === secondValue) {
      return first.name.localeCompare(second.name);
    }

    return firstValue === null ? 1 : -1;
  }

  const comparison =
    typeof firstValue === 'number' && typeof secondValue === 'number'
      ? firstValue - secondValue
      : String(firstValue).localeCompare(String(secondValue));
  const directedComparison = sorting.direction === 'asc' ? comparison : -comparison;

  return directedComparison || first.name.localeCompare(second.name);
}

function getProjectSortValue(project: Project, column: ProjectSortColumn): number | string | null {
  switch (column) {
    case 'analysis':
      return Date.parse(project.analysis);
    case 'coverage':
      return project.coverage === '—' ? null : Number.parseFloat(project.coverage);
    case 'dependencyRisks':
      return project.dependencyRisks;
    case 'duplications':
      return Number.parseFloat(project.duplications);
    case 'gate':
      return project.gate;
    case 'maintainability':
      return `${project.maintainability}:${String(project.maintainabilityIssues).padStart(6, '0')}`;
    case 'name':
      return project.name;
    case 'reliability':
      return `${project.reliability}:${String(project.reliabilityIssues).padStart(6, '0')}`;
    case 'security':
      return `${project.security}:${String(project.securityIssues).padStart(6, '0')}`;
  }
}

function parsePercentage(value: string) {
  return value === '—' ? null : Number.parseFloat(value);
}

function getCoverageTone(value: number | null): MetricTone {
  if (value === null) {
    return 'neutral';
  }

  if (value >= 80) {
    return 'success';
  }

  return value >= 60 ? 'warning' : 'danger';
}

function getDuplicationsTone(value: number): MetricTone {
  if (value <= 5) {
    return 'success';
  }

  return value <= 15 ? 'warning' : 'danger';
}

function getDependencyRiskRating(value: number): `${RatingBadgeRating}` {
  if (value === 0) {
    return RatingBadgeRating.A;
  }

  if (value <= 3) {
    return RatingBadgeRating.B;
  }

  if (value <= 10) {
    return RatingBadgeRating.C;
  }

  return value <= 20 ? RatingBadgeRating.D : RatingBadgeRating.E;
}

function getProjectSeed(projectName: string) {
  return [...projectName].reduce((seed, character) => seed + character.charCodeAt(0), 0) % 7;
}

function getNewCodeIssueCount(totalIssues: number, seed: number, offset: number) {
  if (totalIssues === 0) {
    return 0;
  }

  return Math.round(totalIssues / (4 + ((seed + offset) % 3)));
}

function getRatingForIssueCount(
  issueCount: number,
  thresholds: Readonly<{ a: number; b: number; c: number; d: number }>,
): `${RatingBadgeRating}` {
  if (issueCount <= thresholds.a) {
    return RatingBadgeRating.A;
  }

  if (issueCount <= thresholds.b) {
    return RatingBadgeRating.B;
  }

  if (issueCount <= thresholds.c) {
    return RatingBadgeRating.C;
  }

  return issueCount <= thresholds.d ? RatingBadgeRating.D : RatingBadgeRating.E;
}

function isFailingRating(rating: `${RatingBadgeRating}`) {
  return rating === RatingBadgeRating.D || rating === RatingBadgeRating.E;
}

function getNewCodeProject(project: Project): Project {
  const seed = getProjectSeed(project.name);
  const securityIssues = getNewCodeIssueCount(project.securityIssues, seed, 0);
  const reliabilityIssues = getNewCodeIssueCount(project.reliabilityIssues, seed, 1);
  const maintainabilityIssues = getNewCodeIssueCount(project.maintainabilityIssues, seed, 2);
  const dependencyRisks = getNewCodeIssueCount(project.dependencyRisks, seed, 3);
  const security = getRatingForIssueCount(securityIssues, { a: 0, b: 1, c: 2, d: 3 });
  const reliability = getRatingForIssueCount(reliabilityIssues, { a: 0, b: 2, c: 5, d: 10 });
  const maintainability = getRatingForIssueCount(maintainabilityIssues, {
    a: 5,
    b: 15,
    c: 30,
    d: 60,
  });
  const coverageValue = parsePercentage(project.coverage);
  const coverage =
    coverageValue === null
      ? '—'
      : `${Math.min(100, Math.max(0, coverageValue + (seed - 2) * 1.5)).toFixed(1)}%`;
  const duplicationsValue = (parsePercentage(project.duplications) ?? 0) * 0.35 + (seed % 4) * 0.4;
  const duplications = `${Math.min(100, duplicationsValue).toFixed(1)}%`;
  const dependencyRating = getDependencyRiskRating(dependencyRisks);
  const gate =
    coverageValue !== null &&
    parsePercentage(coverage) !== null &&
    Number.parseFloat(coverage) >= 80 &&
    duplicationsValue <= 5 &&
    !isFailingRating(security) &&
    !isFailingRating(reliability) &&
    !isFailingRating(maintainability) &&
    dependencyRating !== RatingBadgeRating.E
      ? 'passed'
      : 'failed';

  return {
    ...project,
    coverage,
    dependencyRisks,
    duplications,
    gate,
    maintainability,
    maintainabilityIssues,
    reliability,
    reliabilityIssues,
    security,
    securityIssues,
  };
}

function ProjectPercentageMetric({
  label,
  tone,
  value,
}: Readonly<{ label: string; tone: MetricTone; value: number | null }>) {
  const displayValue = value === null ? '—' : `${value.toFixed(1)}%`;

  return (
    <PercentageMetric aria-label={`${label} ${displayValue}`}>
      <PercentageRing $tone={tone} $value={value ?? 0} aria-hidden />
      <span aria-hidden>{displayValue}</span>
    </PercentageMetric>
  );
}

function ProjectNameLink({ project }: Readonly<{ project: Project }>) {
  return (
    <ProjectLink href={`/projects/${project.name}`}>
      <ProjectName>
        <ProjectNameText>{project.name}</ProjectNameText>
        {project.highlights?.map((highlight) => (
          <ProjectHighlightBadge key={highlight} variety={BadgeVariety.Neutral}>
            {highlight}
          </ProjectHighlightBadge>
        ))}
      </ProjectName>
    </ProjectLink>
  );
}

function ProjectsPage() {
  const [deletedProjects, setDeletedProjects] = useState(() => new Set<string>());
  const [favorites, setFavorites] = useState(() => new Set<string>(['issues-list']));
  const [gate, setGate] = useState<string | null>('all');
  const [isTableScrolled, setIsTableScrolled] = useState(false);
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const [perspective, setPerspective] = useState<ProjectPerspective>('overall');
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState<ProjectSorting>({
    column: 'analysis',
    direction: 'desc',
  });

  const projects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const securityFilters = getSelectedFilterValues(moreFilters, 'security');
    const reliabilityFilters = getSelectedFilterValues(moreFilters, 'reliability');
    const maintainabilityFilters = getSelectedFilterValues(moreFilters, 'maintainability');
    const dependencyFilters = getSelectedFilterValues(moreFilters, 'dependency');
    const coverageFilters = getSelectedFilterValues(moreFilters, 'coverage');
    const duplicationsFilters = getSelectedFilterValues(moreFilters, 'duplications');
    const analysisFilters = getSelectedFilterValues(moreFilters, 'analysis');

    const perspectiveProjects = perspective === 'new' ? PROJECTS.map(getNewCodeProject) : PROJECTS;

    const filtered = perspectiveProjects.filter((project) => {
      const matchesQuery = `${project.name} ${project.language}`
        .toLocaleLowerCase()
        .includes(normalizedQuery);
      const coverage = parsePercentage(project.coverage);
      const duplications = parsePercentage(project.duplications) ?? 0;

      return (
        !deletedProjects.has(project.name) &&
        matchesQuery &&
        matchesRatingFilter(securityFilters, project.security) &&
        matchesRatingFilter(reliabilityFilters, project.reliability) &&
        matchesRatingFilter(maintainabilityFilters, project.maintainability) &&
        matchesRatingFilter(dependencyFilters, getDependencyRiskRating(project.dependencyRisks)) &&
        matchesCoverageFilter(coverageFilters, coverage) &&
        matchesDuplicationsFilter(duplicationsFilters, duplications) &&
        matchesAnalysisFilter(analysisFilters, project.analysis) &&
        (gate === 'all' || project.gate === gate)
      );
    });

    return [...filtered].sort((first, second) => compareProjects(first, second, sorting));
  }, [deletedProjects, gate, moreFilters, perspective, query, sorting]);

  function toggleSorting(column: ProjectSortColumn) {
    setSorting((current) => ({
      column,
      direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function getSortDirection(column: ProjectSortColumn) {
    return sorting.column === column ? sorting.direction : undefined;
  }

  function toggleFavorite(projectName: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(projectName)) {
        next.delete(projectName);
      } else {
        next.add(projectName);
      }
      return next;
    });
  }

  function deleteProject(projectName: string) {
    setDeletedProjects((current) => new Set(current).add(projectName));
  }

  function changePerspective(value: string) {
    if (value === 'new' || value === 'overall') {
      setPerspective(value);
    }
  }

  return (
    <ProductShell
      activeItem="projects"
      globalNavigationPrimary={
        <ProductGlobalNavigationBreadcrumbs>
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Sonar-UX-Testing', to: '/organization' },
              { linkElement: 'Sonar-UX-Testing-Org', to: '/organization/projects' },
              { linkElement: 'Projects' },
            ]}
          />
        </ProductGlobalNavigationBreadcrumbs>
      }>
      <Layout.PageGrid width="fluid">
        <Layout.PageHeader
          actions={
            <Layout.PageHeader.Actions>
              <Button
                size={ButtonSize.Medium}
                to="https://github.com/SonarSource/echoes-react"
                variety={ButtonVariety.Default}>
                View on GitHub
              </Button>
              <Button size={ButtonSize.Medium} variety={ButtonVariety.Primary}>
                Create project
              </Button>
            </Layout.PageHeader.Actions>
          }
          description={
            <ProductPageDescription>
              Review the health and latest analysis of every project in your organization.
            </ProductPageDescription>
          }
          title={<Layout.PageHeader.Title headingLevel="h1">Projects</Layout.PageHeader.Title>}
        />

        <ProjectsPageContent>
          <Toolbar
            ariaLabel="Filter and sort projects"
            datasetControls={
              <ProjectCount aria-live="polite">{projects.length} projects</ProjectCount>
            }
            filterControls={
              <>
                <ToggleButtonGroup
                  onChange={changePerspective}
                  options={[
                    { label: 'Overall code', value: 'overall' },
                    { label: 'New code', value: 'new' },
                  ]}
                  selected={perspective}
                />

                <ToolbarSelect
                  ariaLabel="Filter projects by quality gate"
                  data={QUALITY_GATE_OPTIONS}
                  isNotClearable
                  onChange={setGate}
                  value={gate}
                  width={FormFieldWidth.Small}
                />

                <FilterDropdown
                  categories={MORE_FILTER_CATEGORIES}
                  onApply={setMoreFilters}
                  onClear={() => setMoreFilters([])}
                  selectedValues={moreFilters}>
                  <FilterDropdownTrigger selectedCount={moreFilters.length} size={ButtonSize.Large}>
                    More filters
                  </FilterDropdownTrigger>
                </FilterDropdown>
              </>
            }
            filterTags={moreFilters.map((value) => (
              <FilterTag
                key={value}
                onDismiss={() =>
                  setMoreFilters((current) => current.filter((filter) => filter !== value))
                }>
                {FILTER_LABELS.get(value) ?? value}
              </FilterTag>
            ))}
            onClearAll={() => setMoreFilters([])}
            searchInput={
              <SearchInput
                ariaLabel="Search projects"
                onChange={setQuery}
                placeholderLabel="Search projects"
                value={query}
                width={SearchInputWidth.Medium}
              />
            }
          />

          {projects.length > 0 ? (
            <ProjectsTableCard size={CardSize.Small}>
              <Card.Body insetContent>
                <TableScroller
                  data-is-scrolled={isTableScrolled}
                  onScroll={(event) => setIsTableScrolled(event.currentTarget.scrollLeft > 0)}>
                  <CompactProjectsTable
                    ariaLabel="Organization projects"
                    gridTemplate="var(--favorite-column-width) var(--github-column-width) var(--project-column-width) repeat(7, var(--metric-column-width)) var(--analysis-column-width) min-content"
                    variety={TableVariety.Ghost}>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell
                          aria-label="Favorite project"
                          className="favorite-column"
                        />
                        <Table.ColumnHeaderCell
                          aria-label="GitHub repository"
                          className="github-column"
                        />
                        <Table.ColumnHeaderCell
                          className="project-column"
                          label="Project"
                          onSort={() => toggleSorting('name')}
                          sortDirection={getSortDirection('name')}
                        />
                        <Table.ColumnHeaderCell
                          className="gate-column metric-column"
                          label="Quality gate"
                          onSort={() => toggleSorting('gate')}
                          sortDirection={getSortDirection('gate')}
                        />
                        <Table.ColumnHeaderCell
                          className="metric-column"
                          label="Security"
                          onSort={() => toggleSorting('security')}
                          sortDirection={getSortDirection('security')}
                        />
                        <Table.ColumnHeaderCell
                          className="metric-column reliability-column"
                          label="Reliability"
                          onSort={() => toggleSorting('reliability')}
                          sortDirection={getSortDirection('reliability')}
                        />
                        <Table.ColumnHeaderCell
                          className="maintainability-column metric-column"
                          label="Maintainability"
                          onSort={() => toggleSorting('maintainability')}
                          sortDirection={getSortDirection('maintainability')}
                        />
                        <Table.ColumnHeaderCell
                          className="dependency-column metric-column"
                          label="Dependency risks"
                          onSort={() => toggleSorting('dependencyRisks')}
                          sortDirection={getSortDirection('dependencyRisks')}
                        />
                        <Table.ColumnHeaderCell
                          className="coverage-column metric-column"
                          label="Coverage"
                          onSort={() => toggleSorting('coverage')}
                          sortDirection={getSortDirection('coverage')}
                        />
                        <Table.ColumnHeaderCell
                          className="duplications-column metric-column"
                          label="Duplications"
                          onSort={() => toggleSorting('duplications')}
                          sortDirection={getSortDirection('duplications')}
                        />
                        <Table.ColumnHeaderCell
                          className="analysis-column"
                          label="Last analysis"
                          onSort={() => toggleSorting('analysis')}
                          sortDirection={getSortDirection('analysis')}
                        />
                        <Table.ColumnHeaderCell aria-label="Actions" className="actions-column" />
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {projects.map((project) => {
                        const coverage = parsePercentage(project.coverage);
                        const duplications = parsePercentage(project.duplications) ?? 0;
                        const isFavorite = favorites.has(project.name);

                        return (
                          <Table.Row key={project.name}>
                            <Table.Cell className="favorite-column">
                              <FavoriteButtonIcon
                                $isFavorite={isFavorite}
                                Icon={IconStar}
                                ariaLabel={
                                  isFavorite
                                    ? `Remove ${project.name} from favorites`
                                    : `Add ${project.name} to favorites`
                                }
                                isIconFilled={isFavorite}
                                onClick={() => toggleFavorite(project.name)}
                                size={ButtonSize.Medium}
                                variety={ButtonVariety.DefaultGhost}
                              />
                            </Table.Cell>
                            <Table.Cell className="github-column">
                              <Tooltip content={`Open ${project.name} on GitHub`}>
                                <GitHubProjectLink
                                  aria-label={`Open ${project.name} on GitHub`}
                                  href={project.githubUrl}
                                  rel="noreferrer"
                                  target="_blank">
                                  <GitHubLogo />
                                </GitHubProjectLink>
                              </Tooltip>
                            </Table.Cell>
                            <Table.Cell className="project-column">
                              <ProjectNameLink project={project} />
                            </Table.Cell>
                            <Table.Cell className="gate-column metric-column">
                              <QualityGateBadge
                                $gate={project.gate}
                                IconLeft={project.gate === 'passed' ? IconCheck : IconX}
                                ariaLabel={`Quality gate ${project.gate}`}
                                variety={BadgeVariety.Neutral}>
                                {project.gate === 'passed' ? 'Passed' : 'Failed'}
                              </QualityGateBadge>
                            </Table.Cell>
                            <Table.CellText
                              className="metric-column rating-column"
                              content={String(project.securityIssues)}
                              icon={<RatingBadge rating={project.security} size="sm" />}
                            />
                            <Table.CellText
                              className="metric-column rating-column reliability-column"
                              content={String(project.reliabilityIssues)}
                              icon={<RatingBadge rating={project.reliability} size="sm" />}
                            />
                            <Table.CellText
                              className="maintainability-column metric-column rating-column"
                              content={String(project.maintainabilityIssues)}
                              icon={<RatingBadge rating={project.maintainability} size="sm" />}
                            />
                            <Table.CellText
                              className="dependency-column metric-column rating-column"
                              content={String(project.dependencyRisks)}
                              icon={
                                <RatingBadge
                                  rating={getDependencyRiskRating(project.dependencyRisks)}
                                  size="sm"
                                />
                              }
                            />
                            <Table.Cell className="coverage-column metric-column">
                              <ProjectPercentageMetric
                                label="Coverage"
                                tone={getCoverageTone(coverage)}
                                value={coverage}
                              />
                            </Table.Cell>
                            <Table.Cell className="duplications-column metric-column">
                              <ProjectPercentageMetric
                                label="Duplications"
                                tone={getDuplicationsTone(duplications)}
                                value={duplications}
                              />
                            </Table.Cell>
                            <Table.CellText
                              className="analysis-column"
                              content={project.analysis}
                            />
                            <Table.Cell className="actions-column">
                              <DropdownMenu
                                align={DropdownMenuAlign.End}
                                items={
                                  <DropdownMenu.ItemButtonDestructive
                                    onClick={() => deleteProject(project.name)}>
                                    Delete project
                                  </DropdownMenu.ItemButtonDestructive>
                                }>
                                <ButtonIcon
                                  Icon={IconMoreVertical}
                                  ariaLabel={`Actions for ${project.name}`}
                                  size={ButtonSize.Medium}
                                  tooltipContent={false}
                                  variety={ButtonVariety.DefaultGhost}
                                />
                              </DropdownMenu>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </CompactProjectsTable>
                </TableScroller>
              </Card.Body>
            </ProjectsTableCard>
          ) : (
            <ProjectEmptyState
              graphic={<IconSearch />}
              text="Adjust the search, quality gate, or project filters to see results."
              title="No projects match these filters"
            />
          )}
        </ProjectsPageContent>
      </Layout.PageGrid>
    </ProductShell>
  );
}

const ToolbarSelect = styled(Select)`
  min-width: 0;
`;

ToolbarSelect.displayName = 'ToolbarSelect';

const ProjectCount = styled(Text)`
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

ProjectCount.displayName = 'ProjectCount';

const QualityGateBadge = styled(Badge)<{ $gate: Project['gate'] }>`
  && {
    --badge-color: ${cssVar('color-text-default')};
    --badge-background-color: transparent;
    --badge-border-color: transparent;
    --badge-padding: 0;

    align-items: center;
    gap: ${cssVar('dimension-space-50')};
    height: auto;
    font-weight: ${cssVar('font-weight-regular')};
  }

  > [aria-hidden='true'] {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    box-sizing: border-box;
    width: ${cssVar('dimension-width-200')};
    height: ${cssVar('dimension-width-200')};
    color: ${({ $gate }) =>
      cssVar(
        $gate === 'passed' ? 'color-status-success-foreground' : 'color-status-danger-foreground',
      )};
    background-color: transparent;
    border: ${cssVar('border-width-default')} solid
      ${({ $gate }) =>
        cssVar(
          $gate === 'passed' ? 'color-status-success-foreground' : 'color-status-danger-foreground',
        )};
    border-radius: 50%;
    font-size: ${cssVar('font-size-10')};
    line-height: 1;
    font-variation-settings: 'wght' 600;
  }
`;

QualityGateBadge.displayName = 'QualityGateBadge';

const GitHubProjectLink = styled.a`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${cssVar('sizes-buttons-medium')};
  height: ${cssVar('sizes-buttons-medium')};
  color: ${cssVar('button-colors-foreground-secondary')};
  background-color: ${cssVar('button-colors-background-secondary-default')};
  border: ${cssVar('button-colors-border-secondary')} solid ${cssVar('border-width-default')};
  border-radius: ${cssVar('border-radius-200')};
  box-shadow: ${cssVar('shadow-resting')};

  &:hover {
    background-color: ${cssVar('button-colors-background-secondary-hover')};
    border-color: ${cssVar('button-colors-border-secondary-hover')};
  }

  &:focus-visible {
    outline: ${cssVar('button-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }
`;

GitHubProjectLink.displayName = 'GitHubProjectLink';

const FavoriteButtonIcon = styled(ButtonIcon)<{ $isFavorite: boolean }>`
  && {
    --button-color: ${({ $isFavorite }) =>
      cssVar($isFavorite ? 'ratings-colors-border-rating-c-default' : 'color-icon-subtle')};

    transition-property: color;
    transition-duration: 120ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);

    &:hover,
    &:focus-visible {
      --button-color: ${({ $isFavorite }) =>
        cssVar($isFavorite ? 'ratings-colors-border-rating-c-default' : 'color-icon-default')};
    }
  }
`;

FavoriteButtonIcon.displayName = 'FavoriteButtonIcon';

const ProjectName = styled.span`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
  min-width: 0;
  max-width: 100%;
`;

ProjectName.displayName = 'ProjectName';

const ProjectNameText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ProjectNameText.displayName = 'ProjectNameText';

const ProjectHighlightBadge = styled(Badge)`
  flex: 0 0 auto;
`;

ProjectHighlightBadge.displayName = 'ProjectHighlightBadge';

const ProjectLink = styled.a`
  display: inline-flex;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  color: ${cssVar('link-colors-default-default')};
  text-decoration-line: ${cssVar('text-decoration-none')};

  &:hover,
  &:active,
  &:visited {
    color: ${cssVar('link-colors-default-default')};
    text-decoration-line: ${cssVar('text-decoration-none')};
  }

  &:focus-visible {
    outline: ${cssVar('link-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }
`;

ProjectLink.displayName = 'ProjectLink';

const METRIC_TONE_COLORS: Record<MetricTone, string> = {
  danger: cssVar('color-status-danger-foreground'),
  neutral: cssVar('color-icon-subtle'),
  success: cssVar('color-status-success-foreground'),
  warning: cssVar('color-status-warning-foreground'),
};

const PercentageMetric = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

PercentageMetric.displayName = 'PercentageMetric';

const PercentageRing = styled.span<{ $tone: MetricTone; $value: number }>`
  position: relative;
  flex: 0 0 auto;
  width: ${cssVar('dimension-width-300')};
  height: ${cssVar('dimension-width-300')};
  background: conic-gradient(
    ${cssVar('color-border-default')} ${({ $value }) => Math.min(Math.max($value, 0), 100)}%,
    ${cssVar('color-background-neutral-subtle-default')} 0
  );
  border-radius: ${cssVar('border-radius-full')};

  &::before,
  &::after {
    position: absolute;
    content: '';
    border-radius: ${cssVar('border-radius-full')};
  }

  &::before {
    inset: ${cssVar('dimension-space-50')};
    background-color: ${cssVar('color-surface-default')};
  }

  &::after {
    top: 50%;
    left: 50%;
    width: ${cssVar('dimension-width-75')};
    height: ${cssVar('dimension-width-75')};
    background-color: ${({ $tone }) => METRIC_TONE_COLORS[$tone]};
    transform: translate(-50%, -50%);
  }
`;

PercentageRing.displayName = 'PercentageRing';

const ProjectsPageContent = styled(Layout.PageContent)`
  min-width: 0;
  overflow-x: hidden;
`;

ProjectsPageContent.displayName = 'ProjectsPageContent';

const ProjectsTableCard = styled(Card)`
  height: auto;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

ProjectsTableCard.displayName = 'ProjectsTableCard';

const TableScroller = styled.div`
  display: block;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;

  &[data-is-scrolled='true'] .project-column {
    box-shadow: 10px 0 14px -12px ${cssVar('bottom-scroll-colors-shadow-gradient')};
  }
`;

TableScroller.displayName = 'TableScroller';

const CompactProjectsTable = styled(Table)`
  --favorite-column-width: 3rem;
  --github-column-width: 3.5rem;
  --project-column-width: 18rem;
  --metric-column-width: 9rem;
  --analysis-column-width: 11rem;

  min-width: 72rem;
  width: 100%;
  border-radius: 0;

  thead th {
    background-color: ${cssVar('color-surface-subtle')};
  }

  thead th > button [aria-hidden='true'] {
    font-size: ${cssVar('font-size-10')};
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

  .project-column {
    position: sticky;
    left: calc(var(--favorite-column-width) + var(--github-column-width));
    z-index: 2;

    min-width: 0;
    overflow: hidden;
    justify-content: flex-start;
    padding-left: ${cssVar('dimension-space-50')};
  }

  .project-column > div,
  .project-column > div > a,
  .project-column > div > span {
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .github-column {
    position: sticky;
    left: var(--favorite-column-width);
    z-index: 2;

    justify-content: flex-start;
    padding-right: ${cssVar('dimension-space-50')};
  }

  .favorite-column {
    position: sticky;
    left: 0;
    z-index: 2;

    justify-content: center;
    padding-inline: ${cssVar('dimension-space-50')};
  }

  tbody .favorite-column,
  tbody .github-column,
  tbody .project-column {
    background-color: ${cssVar('color-surface-default')};
  }

  tbody tr:hover:not(.selected) .favorite-column,
  tbody tr:hover:not(.selected) .github-column,
  tbody tr:hover:not(.selected) .project-column {
    background-color: ${cssVar('issue-row-colors-background-hover')};
  }

  tbody tr.selected .favorite-column,
  tbody tr.selected .github-column,
  tbody tr.selected .project-column {
    background-color: ${cssVar('issue-row-colors-background-selected')};
  }

  tbody tr:hover.selected .favorite-column,
  tbody tr:hover.selected .github-column,
  tbody tr:hover.selected .project-column {
    background-color: ${cssVar('issue-row-colors-background-selected-hover')};
  }

  thead .favorite-column,
  thead .github-column,
  thead .project-column {
    z-index: 3;
  }

  .gate-column {
    justify-content: flex-start;
  }

  .metric-column {
    min-width: 0;
  }

  .analysis-column {
    white-space: nowrap;
  }

  .rating-column {
    justify-content: flex-start;
    color: ${cssVar('color-text-default')};
  }

  .actions-column {
    justify-content: flex-end;
  }

  td:not(.project-column) {
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 78rem) {
    min-width: 52rem;

    && {
      grid-template-columns:
        var(--favorite-column-width) var(--github-column-width) var(--project-column-width)
        repeat(5, var(--metric-column-width)) min-content;
    }

    .analysis-column,
    .dependency-column,
    .maintainability-column {
      display: none;
    }
  }

  @media (max-width: 55rem) {
    min-width: 40rem;

    && {
      grid-template-columns:
        var(--favorite-column-width) var(--github-column-width) var(--project-column-width)
        repeat(3, var(--metric-column-width)) min-content;
    }

    .duplications-column,
    .reliability-column {
      display: none;
    }
  }
`;

CompactProjectsTable.displayName = 'CompactProjectsTable';

const ProjectEmptyState = styled(EmptyState)`
  align-self: center;
  min-height: 12rem;
  padding: ${cssVar('dimension-space-300')};
`;

ProjectEmptyState.displayName = 'ProjectEmptyState';

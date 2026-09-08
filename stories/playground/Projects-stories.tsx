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
  LinkStandalone,
  RatingBadge,
  RatingBadgeRating,
  SearchInput,
  SearchInputWidth,
  Select,
  Text,
  Toolbar,
  ToggleButtonGroup,
} from '../../src';
import { GitHubLogo } from './GitHubLogo';
import {
  ProductGlobalNavigationBreadcrumbs,
  ProductPageDescription,
  ProductShell,
} from './ProductShell';
import {
  getCoverageTone,
  getDuplicationsTone,
  ProjectPercentageMetric,
} from './ProjectPercentageMetric';

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

const PROJECT_CARD_METRIC_LABELS = [
  'Security',
  'Reliability',
  'Maintainability',
  'Dependency risks',
  'Coverage',
  'Duplications',
];

type ProjectPerspective = 'new' | 'overall';

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

function parsePercentage(value: string) {
  return value === '—' ? null : Number.parseFloat(value);
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

function ProjectNameLink({ project }: Readonly<{ project: Project }>) {
  return (
    <ProjectName>
      <ProjectLink to={`/projects/${project.name}`}>
        <ProjectNameText>{project.name}</ProjectNameText>
      </ProjectLink>
      {project.highlights?.map((highlight) => (
        <ProjectHighlightBadge key={highlight} variety={BadgeVariety.Neutral}>
          {highlight}
        </ProjectHighlightBadge>
      ))}
    </ProjectName>
  );
}

function ProjectCardView({
  isFavorite,
  onDelete,
  onToggleFavorite,
  project,
}: Readonly<{
  isFavorite: boolean;
  onDelete: VoidFunction;
  onToggleFavorite: VoidFunction;
  project: Project;
}>) {
  const coverage = parsePercentage(project.coverage);
  const duplications = parsePercentage(project.duplications) ?? 0;
  const ratings = [
    {
      label: 'Security',
      rating: project.security,
      issueCount: project.securityIssues,
    },
    {
      label: 'Reliability',
      rating: project.reliability,
      issueCount: project.reliabilityIssues,
    },
    {
      label: 'Maintainability',
      rating: project.maintainability,
      issueCount: project.maintainabilityIssues,
    },
    {
      label: 'Dependency risks',
      rating: getDependencyRiskRating(project.dependencyRisks),
      issueCount: project.dependencyRisks,
    },
  ];

  return (
    <ProjectListItem>
      <ProjectCardLayout>
        <ProjectCardIdentity>
          <ButtonIcon
            Icon={GitHubLogo}
            ariaLabel={`Open ${project.name} on GitHub`}
            enableOpenInNewTab
            size={ButtonSize.Medium}
            to={project.githubUrl}
            tooltipContent={`Open ${project.name} on GitHub`}
            variety={ButtonVariety.DefaultGhost}
          />
          <ProjectNameLink project={project} />
          <ProjectCardMetadata>
            <span>{project.language}</span>
            <span aria-hidden="true">•</span>
            <span>{project.lines} lines</span>
            <span aria-hidden="true">•</span>
            <span>Last analysis {project.analysis}</span>
            <span aria-hidden="true">•</span>
            <QualityGateBadge
              $gate={project.gate}
              $isSubtle
              IconLeft={project.gate === 'passed' ? IconCheck : IconX}
              ariaLabel={`Quality gate ${project.gate}`}
              variety={BadgeVariety.Neutral}>
              {project.gate === 'passed' ? 'Passed' : 'Failed'}
            </QualityGateBadge>
          </ProjectCardMetadata>
        </ProjectCardIdentity>

        <ProjectCardMetrics>
          {ratings.map(({ issueCount, label, rating }) => (
            <ProjectCardMetric key={label}>
              <GroupedRatingBadge
                ariaLabel={`${label} rating ${rating}, ${issueCount} issues`}
                rating={rating}
                size="sm"
              />
            </ProjectCardMetric>
          ))}

          <ProjectCardMetric>
            <ProjectPercentageMetric
              label="Coverage"
              tone={getCoverageTone(coverage)}
              value={coverage}
            />
          </ProjectCardMetric>

          <ProjectCardMetric>
            <ProjectPercentageMetric
              label="Duplications"
              tone={getDuplicationsTone(duplications)}
              value={duplications}
            />
          </ProjectCardMetric>
        </ProjectCardMetrics>

        <ProjectCardActions>
          <FavoriteButtonIcon
            $isFavorite={isFavorite}
            Icon={IconStar}
            ariaLabel={
              isFavorite
                ? `Remove ${project.name} from favorites`
                : `Add ${project.name} to favorites`
            }
            isIconFilled={isFavorite}
            onClick={onToggleFavorite}
            size={ButtonSize.Medium}
            variety={ButtonVariety.DefaultGhost}
          />
          <DropdownMenu
            align={DropdownMenuAlign.End}
            items={
              <DropdownMenu.ItemButtonDestructive onClick={onDelete}>
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
        </ProjectCardActions>
      </ProjectCardLayout>
    </ProjectListItem>
  );
}

ProjectCardView.displayName = 'ProjectCardView';

function ProjectsPage() {
  const [deletedProjects, setDeletedProjects] = useState(() => new Set<string>());
  const [favorites, setFavorites] = useState(() => new Set<string>(['issues-list']));
  const [gate, setGate] = useState<string | null>('all');
  const [moreFilters, setMoreFilters] = useState<string[]>([]);
  const [perspective, setPerspective] = useState<ProjectPerspective>('overall');
  const [query, setQuery] = useState('');

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

    return [...filtered].sort(
      (first, second) =>
        Date.parse(second.analysis) - Date.parse(first.analysis) ||
        first.name.localeCompare(second.name),
    );
  }, [deletedProjects, gate, moreFilters, perspective, query]);

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
            <ProjectsCardListCard size={CardSize.Small}>
              <ProjectsCardListHeader>
                <ProjectCardProjectHeading>Project</ProjectCardProjectHeading>
                <ProjectCardMetricHeadings>
                  {PROJECT_CARD_METRIC_LABELS.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </ProjectCardMetricHeadings>
                <span aria-hidden="true" />
              </ProjectsCardListHeader>
              <Card.Body insetContent>
                <ProjectsCardList aria-label="Organization projects">
                  {projects.map((project) => (
                    <ProjectCardView
                      isFavorite={favorites.has(project.name)}
                      key={project.name}
                      onDelete={() => deleteProject(project.name)}
                      onToggleFavorite={() => toggleFavorite(project.name)}
                      project={project}
                    />
                  ))}
                </ProjectsCardList>
              </Card.Body>
            </ProjectsCardListCard>
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

const ProjectsCardListCard = styled(Card)`
  --project-card-actions-width: calc(
    ${cssVar('sizes-buttons-medium')} + ${cssVar('sizes-buttons-medium')} +
      ${cssVar('dimension-space-25')}
  );

  height: auto;
  min-width: 0;
  overflow: hidden;

  html[data-echoes-theme='light'] & {
    background-color: ${cssVar('color-roles-support-white')};
  }
`;

ProjectsCardListCard.displayName = 'ProjectsCardListCard';

const PROJECT_CARD_LAYOUT_COLUMNS =
  'minmax(0, 0.75fr) minmax(34rem, 1.25fr) var(--project-card-actions-width)';

const PROJECT_CARD_METRIC_COLUMNS =
  'repeat(4, minmax(5rem, 1fr)) repeat(2, minmax(5rem, max-content))';

const ProjectsCardListHeader = styled.header`
  display: grid;
  grid-template-columns: ${PROJECT_CARD_LAYOUT_COLUMNS};
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-200')};
  color: ${cssVar('color-text-subtle')};
  background-color: ${cssVar('color-surface-subtle')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  font: ${cssVar('typography-text-small-medium')};
`;

ProjectsCardListHeader.displayName = 'ProjectsCardListHeader';

const ProjectCardProjectHeading = styled.span`
  padding-inline-start: calc(${cssVar('sizes-buttons-medium')} + ${cssVar('dimension-space-75')});
`;

ProjectCardProjectHeading.displayName = 'ProjectCardProjectHeading';

const ProjectCardMetricHeadings = styled.div`
  display: grid;
  grid-template-columns: ${PROJECT_CARD_METRIC_COLUMNS};
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-width: 0;
  text-align: center;

  > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

ProjectCardMetricHeadings.displayName = 'ProjectCardMetricHeadings';

const ProjectsCardList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

ProjectsCardList.displayName = 'ProjectsCardList';

const ProjectListItem = styled.li`
  padding: ${cssVar('dimension-space-150')};

  & + & {
    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }
`;

ProjectListItem.displayName = 'ProjectListItem';

const ProjectCardLayout = styled.article`
  display: grid;
  grid-template-columns: ${PROJECT_CARD_LAYOUT_COLUMNS};
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-width: 0;
  height: 100%;
`;

ProjectCardLayout.displayName = 'ProjectCardLayout';

const ProjectCardIdentity = styled.div`
  display: grid;
  grid-template-columns: ${cssVar('sizes-buttons-medium')} minmax(0, 1fr);
  align-items: center;
  column-gap: ${cssVar('dimension-space-75')};
  row-gap: ${cssVar('dimension-space-50')};
  min-width: 0;
`;

ProjectCardIdentity.displayName = 'ProjectCardIdentity';

const ProjectCardMetadata = styled.span`
  display: flex;
  grid-column: 2;
  flex-wrap: wrap;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  min-width: 0;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-regular')};
  font-variant-numeric: tabular-nums;
`;

ProjectCardMetadata.displayName = 'ProjectCardMetadata';

const ProjectCardActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-25')};
`;

ProjectCardActions.displayName = 'ProjectCardActions';

const ProjectCardMetrics = styled.footer`
  display: grid;
  grid-template-columns: ${PROJECT_CARD_METRIC_COLUMNS};
  align-items: center;
  gap: ${cssVar('dimension-space-150')};
  min-width: 0;
`;

ProjectCardMetrics.displayName = 'ProjectCardMetrics';

const ProjectCardMetric = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

ProjectCardMetric.displayName = 'ProjectCardMetric';

const GroupedRatingBadge = styled(RatingBadge)`
  position: relative;
  flex: 0 0 auto;
  width: ${cssVar('dimension-width-300')};
  height: ${cssVar('dimension-width-300')};
  border-radius: ${cssVar('border-radius-200')};
`;

GroupedRatingBadge.displayName = 'GroupedRatingBadge';

const QualityGateBadge = styled(Badge)<{ $gate: Project['gate']; $isSubtle?: boolean }>`
  && {
    --badge-color: ${({ $isSubtle }) =>
      cssVar($isSubtle ? 'color-text-subtle' : 'color-text-default')};
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

const ProjectLink = styled(LinkStandalone)`
  display: inline-flex;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  font: ${cssVar('typography-text-large-regular')};
  font-weight: ${cssVar('font-weight-medium')};
`;

ProjectLink.displayName = 'ProjectLink';

const ProjectsPageContent = styled(Layout.PageContent)`
  min-width: 0;
  overflow-x: hidden;
`;

ProjectsPageContent.displayName = 'ProjectsPageContent';

const ProjectEmptyState = styled(EmptyState)`
  align-self: center;
  min-height: 12rem;
  padding: ${cssVar('dimension-space-300')};
`;

ProjectEmptyState.displayName = 'ProjectEmptyState';

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

import { Ref, useCallback, useMemo, useRef, useState } from 'react';
import {
  FilterDropdownCategory,
  IndicatorDuplication,
  IndicatorDuplicationRating,
  IndicatorSize,
  RatingBadge,
  RatingBadgeRating,
  RatingBadgeSize,
} from '../../src';

const SECURITY_ITEMS = [
  {
    label: '≥ 0 info issues',
    value: 'security-a',
    suffix: '88',
    prefix: <RatingBadge rating={RatingBadgeRating.A} size={RatingBadgeSize.ExtraSmall} />,
  },
  {
    label: '≥ 1 low issue',
    value: 'security-b',
    suffix: '0',
    prefix: <RatingBadge rating={RatingBadgeRating.B} size={RatingBadgeSize.ExtraSmall} />,
  },
  {
    label: '≥ 1 medium issue',
    value: 'security-c',
    suffix: '0',
    prefix: <RatingBadge rating={RatingBadgeRating.C} size={RatingBadgeSize.ExtraSmall} />,
  },
  {
    label: '≥ 1 high issue',
    value: 'security-d',
    suffix: '0',
    prefix: <RatingBadge rating={RatingBadgeRating.D} size={RatingBadgeSize.ExtraSmall} />,
  },
  {
    label: '≥ 1 blocker issue',
    value: 'security-e',
    suffix: '0',
    prefix: <RatingBadge rating={RatingBadgeRating.E} size={RatingBadgeSize.ExtraSmall} />,
  },
];

const DUPLICATION_ITEMS = [
  {
    label: '< 3%',
    value: 'duplication-lt-3',
    suffix: '88',
    prefix: (
      <IndicatorDuplication rating={IndicatorDuplicationRating.A} size={IndicatorSize.Small} />
    ),
  },
  {
    label: '3% - 5%',
    value: 'duplication-3-5',
    suffix: '0',
    prefix: (
      <IndicatorDuplication rating={IndicatorDuplicationRating.B} size={IndicatorSize.Small} />
    ),
  },
  {
    label: '5% - 10%',
    value: 'duplication-5-10',
    suffix: '0',
    prefix: (
      <IndicatorDuplication rating={IndicatorDuplicationRating.C} size={IndicatorSize.Small} />
    ),
  },
  {
    label: '10% - 20%',
    value: 'duplication-10-20',
    suffix: '0',
    prefix: (
      <IndicatorDuplication rating={IndicatorDuplicationRating.D} size={IndicatorSize.Small} />
    ),
  },
  {
    label: '> 20%',
    value: 'duplication-gt-20',
    suffix: '0',
    prefix: (
      <IndicatorDuplication rating={IndicatorDuplicationRating.E} size={IndicatorSize.Small} />
    ),
  },
  {
    label: 'No data',
    value: 'duplication-no-data',
    suffix: '8',
    prefix: <IndicatorDuplication rating={undefined} size={IndicatorSize.Small} />,
  },
];

const TYPE_ITEMS = [
  { label: 'Project', value: 'project', suffix: '42' },
  { label: 'Application', value: 'application', suffix: '17' },
];

const ALL_ASSIGNEE_ITEMS = [
  { label: 'Alice Martin', value: 'alice' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Carol Williams', value: 'carol' },
  { label: 'David Brown', value: 'david' },
  { label: 'Eve Davis', value: 'eve' },
  { label: 'Frank Miller', value: 'frank' },
  { label: 'Grace Wilson', value: 'grace' },
  { label: 'Hank Moore', value: 'hank' },
  { label: 'Iris Taylor', value: 'iris' },
  { label: 'Jack Anderson', value: 'jack' },
];

export const ALL_FILTER_ITEMS = [
  ...SECURITY_ITEMS,
  ...DUPLICATION_ITEMS,
  ...TYPE_ITEMS,
  ...ALL_ASSIGNEE_ITEMS,
];

const CATEGORIZED_ITEMS: Array<{
  category: string;
  items: Array<{ label: string; value: string }>;
}> = [
  { category: 'Security', items: SECURITY_ITEMS },
  { category: 'Duplications', items: DUPLICATION_ITEMS },
  { category: 'Type', items: TYPE_ITEMS },
  { category: 'Assignee', items: ALL_ASSIGNEE_ITEMS },
];

export const FILTER_TAG_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIZED_ITEMS.flatMap(({ category, items }) =>
    items.map(({ value, label }) => [value, `${category}: ${label}`]),
  ),
);

function randomDelay(minMs: number, maxMs: number) {
  return Math.random() * (maxMs - minMs) + minMs;
}

function withRandomCounts<T extends { label: string; value: string }>(
  items: T[],
): (T & { suffix: string })[] {
  return items.map((item) => ({
    ...item,
    suffix: (Math.floor(Math.random() * 99) + 1).toString(),
  }));
}

function DateRangeContent({ ref }: Readonly<{ ref?: Ref<HTMLInputElement> }>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <p style={{ margin: 0 }}>
        This is a custom component rendered inside the right panel. Arrow keys navigate between
        panels; interaction within is managed by the consumer.
      </p>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {'From'}
        <input ref={ref} type="date" />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {'To'}
        <input type="date" />
      </label>
    </div>
  );
}

/**
 * Builds the shared category set used by filter stories:
 * - Duplication: multi-select, sync items with duplication indicator prefix
 * - Type: single-select, sync items
 * - Status: multi-select, client-side search, sync items
 * - Assignee: multi-select, async items, server-side search
 * - Date Range: custom content
 */
export function useFilterDropdownCategories() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [assigneeItems, setAssigneeItems] = useState<FilterDropdownCategory['items']>(undefined);

  const handleCategorySelect = useCallback(
    (label: string) => {
      if (label === 'Assignee' && assigneeItems === undefined) {
        setTimeout(
          () => setAssigneeItems(withRandomCounts(ALL_ASSIGNEE_ITEMS)),
          randomDelay(1000, 3000),
        );
      }
    },
    [assigneeItems],
  );

  const handleAssigneeSearch = useCallback((query: string) => {
    setTimeout(() => {
      const matched = ALL_ASSIGNEE_ITEMS.filter(
        (item) => !query || item.label.toLowerCase().includes(query.toLowerCase()),
      );
      setAssigneeItems(withRandomCounts(matched));
    }, 500);
  }, []);

  const categories = useMemo<FilterDropdownCategory[]>(
    () => [
      { isMultiSelect: true, label: 'Security', items: SECURITY_ITEMS },
      { isMultiSelect: true, label: 'Duplications', items: DUPLICATION_ITEMS },
      { isMultiSelect: false, label: 'Type', items: TYPE_ITEMS },
      {
        isMultiSelect: true,
        isSearchable: true,
        items: assigneeItems,
        label: 'Assignee',
        labelSearchPlaceholder: 'Search assignees…',
        onSearch: handleAssigneeSearch,
      },
      {
        content: <DateRangeContent ref={dateInputRef} />,
        onFocusContent: () => {
          dateInputRef.current?.focus();
        },
        label: 'Date Range',
      },
    ],
    [assigneeItems, handleAssigneeSearch],
  );

  return { categories, onCategorySelect: handleCategorySelect };
}

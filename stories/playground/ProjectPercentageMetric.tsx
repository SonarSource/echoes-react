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
import { cssVar } from '../../src';

type MetricTone = 'danger' | 'neutral' | 'success' | 'warning';

export function getCoverageTone(value: number | null): MetricTone {
  if (value === null) {
    return 'neutral';
  }

  if (value >= 80) {
    return 'success';
  }

  return value >= 60 ? 'warning' : 'danger';
}

export function getDuplicationsTone(value: number): MetricTone {
  if (value <= 5) {
    return 'success';
  }

  return value <= 15 ? 'warning' : 'danger';
}

export function ProjectPercentageMetric({
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

ProjectPercentageMetric.displayName = 'ProjectPercentageMetric';

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

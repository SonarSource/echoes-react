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
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonSize,
  ButtonVariety,
  cssVar,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from '../../src';

export interface IssueCodeLine {
  content: string;
  number: number;
}

export interface IssueLocation {
  code: ReadonlyArray<IssueCodeLine>;
  file: string;
  line: number;
}

interface IssueLocationSource extends IssueLocation {
  key: string;
}

const RELATED_LOCATION_LINE_OFFSETS = [24, 48, 72] as const;

export function getIssueLocations({ code, file, line }: IssueLocationSource) {
  const primaryLocation = { code, file, line };
  const relatedLocations = RELATED_LOCATION_LINE_OFFSETS.map((offset) => ({
    code: code.map((codeLine) => ({ ...codeLine, number: codeLine.number + offset })),
    file,
    line: line + offset,
  }));

  return [primaryLocation, ...relatedLocations];
}

interface IssueCodeCollapseButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function IssueCodeCollapseButton({
  isExpanded,
  onToggle,
}: Readonly<IssueCodeCollapseButtonProps>) {
  return (
    <ButtonIcon
      Icon={isExpanded ? IconChevronDown : IconChevronRight}
      ariaLabel={isExpanded ? 'Collapse code viewer' : 'Expand code viewer'}
      onClick={onToggle}
      size={ButtonSize.Large}
      variety={ButtonVariety.DefaultGhost}
    />
  );
}

IssueCodeCollapseButton.displayName = 'IssueCodeCollapseButton';

interface IssueLocationNavigatorProps {
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
}

export function IssueLocationNavigator({
  currentIndex,
  onNext,
  onPrevious,
  total,
}: Readonly<IssueLocationNavigatorProps>) {
  if (total <= 1) {
    return null;
  }

  return (
    <LocationNavigator aria-label="Issues in this file" role="group">
      <LocationCounter aria-atomic="true" aria-live="polite">
        Issue {currentIndex + 1} of {total}
      </LocationCounter>
      <ButtonGroup isCombined>
        <Button
          ariaLabel="Previous issue"
          isDisabled={currentIndex === 0}
          onClick={onPrevious}
          prefix={<IconChevronLeft />}
          size={ButtonSize.Medium}
          variety={ButtonVariety.Default}>
          Prev
        </Button>
        <Button
          ariaLabel="Next issue"
          isDisabled={currentIndex === total - 1}
          onClick={onNext}
          size={ButtonSize.Medium}
          suffix={<IconChevronRight />}
          variety={ButtonVariety.Default}>
          Next
        </Button>
      </ButtonGroup>
    </LocationNavigator>
  );
}

IssueLocationNavigator.displayName = 'IssueLocationNavigator';

const LocationNavigator = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
`;

LocationNavigator.displayName = 'LocationNavigator';

const LocationCounter = styled.span`
  min-width: 6.5rem;
  color: ${cssVar('color-text-subtle')};
  font: ${cssVar('typography-text-small-medium')};
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
`;

LocationCounter.displayName = 'LocationCounter';

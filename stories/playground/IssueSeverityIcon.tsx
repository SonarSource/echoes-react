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
  cssVar,
  IconInfo,
  IconSeverityBlocker,
  IconSeverityHigh,
  IconSeverityLow,
  IconSeverityMedium,
} from '../../src';
import { ISSUE_SEVERITY_COLORS, type IssueSeverity } from './IssueSeverityColors';

const ISSUE_SEVERITY_ICONS = {
  blocker: IconSeverityBlocker,
  high: IconSeverityHigh,
  medium: IconSeverityMedium,
  low: IconSeverityLow,
  info: IconInfo,
};

export function IssueSeverityIcon({ severity }: Readonly<{ severity: IssueSeverity }>) {
  const SeverityIcon = ISSUE_SEVERITY_ICONS[severity];

  return (
    <IssueSeverityIconContainer $severity={severity} aria-hidden="true">
      <SeverityIcon />
    </IssueSeverityIconContainer>
  );
}

IssueSeverityIcon.displayName = 'IssueSeverityIcon';

const IssueSeverityIconContainer = styled.span<{ $severity: IssueSeverity }>`
  display: inline-flex;
  flex: 0 0 ${cssVar('dimension-width-150')};
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-150')};
  height: ${cssVar('dimension-width-150')};
  color: ${({ $severity }) => ISSUE_SEVERITY_COLORS[$severity]};

  > span {
    width: ${cssVar('dimension-width-150')};
    height: ${cssVar('dimension-width-150')};
    font-size: ${cssVar('dimension-width-150')};
    line-height: ${cssVar('dimension-width-150')};
  }
`;

IssueSeverityIconContainer.displayName = 'IssueSeverityIconContainer';

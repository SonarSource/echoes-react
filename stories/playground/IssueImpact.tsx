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
import { type IssueSeverity } from './IssueSeverityColors';
import { IssueSeverityIcon } from './IssueSeverityIcon';

export function IssueImpact({
  attribute,
  severity,
  severityLabel,
}: Readonly<{ attribute: string; severity: IssueSeverity; severityLabel: string }>) {
  return (
    <IssueImpactRoot>
      <IssueSeverityIcon severity={severity} />
      <IssueImpactLabel>{severityLabel}</IssueImpactLabel>
      <IssueImpactDivider aria-hidden="true" />
      <IssueImpactAttribute>{attribute}</IssueImpactAttribute>
    </IssueImpactRoot>
  );
}

IssueImpact.displayName = 'IssueImpact';

const IssueImpactRoot = styled.div`
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

IssueImpactRoot.displayName = 'IssueImpactRoot';

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

/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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
import { cssVar } from '~utils/design-tokens';
import { Divider } from '../../divider';
import { PageHeaderArea } from './HeaderTypes';

export const StyledPageHeaderCallout = styled.div`
  grid-area: ${PageHeaderArea.callout};

  margin-bottom: ${cssVar('dimension-space-300')};
`;
StyledPageHeaderCallout.displayName = 'StyledPageHeaderCallout';

export const StyledPageHeaderBreadcrumbs = styled.div`
  grid-area: ${PageHeaderArea.breadcrumbs};

  margin-bottom: ${cssVar('dimension-space-200')};
`;
StyledPageHeaderBreadcrumbs.displayName = 'StyledPageHeaderBreadcrumbs';

export const StyledPageHeaderBottom = styled.div`
  grid-area: ${PageHeaderArea.nav};

  white-space: nowrap;

  margin-top: ${cssVar('dimension-space-300')};
`;

StyledPageHeaderBottom.displayName = 'StyledPageHeaderBottom';

export const StyledPageHeaderMain = styled.div`
  grid-area: ${PageHeaderArea.main};

  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  margin-right: ${cssVar('dimension-space-100')};
`;
StyledPageHeaderMain.displayName = 'StyledPageHeaderMain';

export const StyledPageHeaderActions = styled.div`
  grid-area: ${PageHeaderArea.actions};

  display: flex;
  gap: ${cssVar('dimension-space-100')};
  white-space: nowrap;
`;
StyledPageHeaderActions.displayName = 'StyledPageHeaderActions';

export const StyledDivider = styled(Divider)`
  grid-area: ${PageHeaderArea.divider};
  margin-top: ${cssVar('dimension-space-300')};
`;
StyledDivider.displayName = 'StyledDivider';

export const StyledDividerWithOverlap = styled(StyledDivider)`
  margin-top: -1px;
`;
StyledDividerWithOverlap.displayName = 'StyledDividerWithOverlap';

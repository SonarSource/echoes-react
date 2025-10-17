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
import { forwardRef } from 'react';
import { cssVar } from '~utils/design-tokens';
import { ContentGridArea } from '../../LayoutTypes';
import { StyledHeaderBase } from '../common/HeaderBase';
import { StyledDivider, StyledDividerWithOverlap } from '../common/HeaderStyles';
import { HeaderProps } from '../common/HeaderTypes';

/**
 * A flexible content header component that displays a title, optional metadata, description,
 * breadcrumbs, actions and navigation.
 */
export const ContentHeaderRoot = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { hasDivider, navigation, ...rest } = props;
  return (
    <StyledContentHeader>
      <StyledHeaderBase {...rest} hasDivider={false} navigation={navigation} ref={ref} />
      {navigation && <StyledDividerWithOverlap />}
      {hasDivider && !navigation && <StyledDivider />}
    </StyledContentHeader>
  );
});
ContentHeaderRoot.displayName = 'ContentHeader';

const StyledContentHeader = styled.div`
  grid-area: ${ContentGridArea.header};

  background-color: ${cssVar('color-surface-default')};
`;
StyledContentHeader.displayName = 'StyledContentHeader';

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
import { forwardRef, useContext, useLayoutEffect } from 'react';
import { cssVar } from '~utils/design-tokens';
import { ContentGridScrollContext } from '../../LayoutSlots';
import { ContentGridArea } from '../../LayoutTypes';
import { StyledHeaderBase } from '../common/HeaderBase';
import { StyledDivider, StyledDividerWithOverlap } from '../common/HeaderStyles';
import { HeaderProps } from '../common/HeaderTypes';

/**
 * A flexible content header component that displays a title, optional metadata, description,
 * breadcrumbs, actions and navigation.
 */
export interface ContentHeaderProps extends HeaderProps {
  /**
   * Scrolls this header with PageGrid instead of keeping it fixed above the page.
   * @defaultValue false
   */
  scrollFirst?: boolean;
}

export const ContentHeaderRoot = forwardRef<HTMLDivElement, ContentHeaderProps>((props, ref) => {
  const { hasDivider, navigation, scrollFirst, ...rest } = props;
  const setScrollFirst = useContext(ContentGridScrollContext);

  useLayoutEffect(() => {
    if (!scrollFirst || !setScrollFirst) {
      return undefined;
    }

    setScrollFirst(true);
    return () => setScrollFirst(false);
  }, [scrollFirst, setScrollFirst]);
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

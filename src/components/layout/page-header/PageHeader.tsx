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
import { forwardRef, ReactNode } from 'react';
import { cssVar } from '~utils/design-tokens';
import { Divider } from '../../divider';
import { PageGridArea } from '../LayoutTypes';

export interface PageHeaderProps {
  /**
   * Action elements (e.g. a set of <Button>s) to display on the right side of the header.
   * Use <PageHeader.Actions> to wrap them.
   */
  actions?: ReactNode;
  /**
   * Breadcrumb navigation elements to display above the title.
   * Use <PageHeader.Breadcrumbs> to wrap them.
   */
  breadcrumbs?: ReactNode;
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  /**
   * Description text to display below the title. Use <PageHeader.Description> to wrap it.
   */
  description?: ReactNode;
  /**
   * Whether to show a divider line at the bottom of the header
   * @default false
   */
  hasDivider?: boolean;
  /**
   * Metadata elements to display below the title. Use <PageHeader.Metadata> to wrap them.
   */
  metadata?: ReactNode;
  /**
   * Navigation elements to display at the bottom. Use <PageHeader.Navigation> to wrap them.
   */
  navigation?: ReactNode;
  /**
   * The main title content (required). Use <PageHeader.Title> to wrap it.
   */
  title: ReactNode;
}

/**
 * A flexible page header component that displays a title, optional metadata, description,
 * breadcrumbs, and actions. Can optionally include a divider, and <PageHeader.Navigation> elements
 * as children.
 */
export const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderProps>((props, ref) => {
  const { actions, breadcrumbs, description, hasDivider, metadata, navigation, title, ...rest } =
    props;

  return (
    <StyledPageHeader ref={ref} {...rest}>
      <StyledPageHeaderTop>
        {breadcrumbs}

        <StyledPageHeaderMain>
          <StyledPageHeaderMainLeft>
            {title}

            {metadata}

            {description}
          </StyledPageHeaderMainLeft>

          {actions && <StyledPageHeaderMainRight>{actions}</StyledPageHeaderMainRight>}
        </StyledPageHeaderMain>
      </StyledPageHeaderTop>

      {(hasDivider || navigation) && (
        <StyledPageHeaderBottom>
          {navigation}

          {navigation ? <StyledDividerWithOverlap /> : <Divider />}
        </StyledPageHeaderBottom>
      )}
    </StyledPageHeader>
  );
});

PageHeaderRoot.displayName = 'PageHeader';

const StyledPageHeader = styled.div`
  grid-area: ${PageGridArea.header};

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${cssVar('dimension-space-300')};

  padding-top: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};
`;

StyledPageHeader.displayName = 'StyledPageHeader';

const StyledPageHeaderTop = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
`;

StyledPageHeaderTop.displayName = 'StyledPageHeaderTop';

const StyledPageHeaderBottom = styled.div`
  white-space: nowrap;
  width: 100%;
`;

StyledPageHeaderBottom.displayName = 'StyledPageHeaderBottom';

const StyledPageHeaderMain = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  justify-content: space-between;
`;

StyledPageHeaderMain.displayName = 'StyledPageHeaderMain';

const StyledPageHeaderMainLeft = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
`;

StyledPageHeaderMainLeft.displayName = 'StyledPageHeaderMainLeft';

const StyledPageHeaderMainRight = styled.div`
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  white-space: nowrap;
`;

StyledPageHeaderMainRight.displayName = 'StyledPageHeaderMainRight';

const StyledDividerWithOverlap = styled(Divider)`
  margin-top: -1px;
`;

StyledDividerWithOverlap.displayName = 'StyledDividerWithOverlap';

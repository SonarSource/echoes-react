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
import { forwardRef, PropsWithChildren, ReactNode } from 'react';

import { cssVar } from '~utils/design-tokens';
import { Heading } from '../typography';

export interface PageHeaderTitleProps {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  /**
   * Content (e.g. a ButtonIcon) to display before the title
   */
  prefix?: ReactNode;
  /**
   * Content (e.g. a ButtonIcon) to display after the title
   */
  suffix?: ReactNode;
}

/**
 * Displays the main title in the page header. The title is rendered as an h1 heading
 * and can optionally include prefix and suffix elements.
 */
export const PageHeaderTitle = forwardRef<HTMLDivElement, PropsWithChildren<PageHeaderTitleProps>>(
  (props, ref) => {
    const { children, prefix, suffix, ...rest } = props;

    return (
      <StyledPageHeaderTitle ref={ref} {...rest}>
        {prefix}

        <Heading as="h1">{children}</Heading>

        {suffix}
      </StyledPageHeaderTitle>
    );
  },
);

PageHeaderTitle.displayName = 'PageHeaderTitle';

const StyledPageHeaderTitle = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-50')};
`;

StyledPageHeaderTitle.displayName = 'StyledPageHeaderTitle';

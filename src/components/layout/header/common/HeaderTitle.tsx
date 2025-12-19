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
import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { cssVar } from '~utils/design-tokens';
import { Heading, HeadingProps } from '../../../typography';

export interface ContentHeaderTitleProps {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  /**
   * The heading tag to use for the title itself
   */
  headingLevel?: HeadingProps['as'];
  /**
   * The size of the heading for the title
   */
  headingSize?: HeadingProps['size'];
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
 * Displays the main title in the content header. The title is rendered as a heading (h2 by default)
 * and can optionally include prefix and suffix elements.
 */
export const ContentHeaderTitle = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ContentHeaderTitleProps>
>((props, ref) => <HeaderTitle headingLevel="h2" {...props} ref={ref} />);
ContentHeaderTitle.displayName = 'ContentHeaderTitle';

const StyledPageHeaderTitle = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-50')};
`;

StyledPageHeaderTitle.displayName = 'StyledPageHeaderTitle';

export interface PageHeaderTitleProps extends ContentHeaderTitleProps {}

/**
 * Displays the main title in the page header. The title is rendered as a heading (h1 by default)
 * and can optionally include prefix and suffix elements.
 */
export const PageHeaderTitle = forwardRef<HTMLDivElement, PropsWithChildren<PageHeaderTitleProps>>(
  (props, ref) => <HeaderTitle {...props} ref={ref} />,
);
PageHeaderTitle.displayName = 'PageHeaderTitle';

const HeaderTitle = forwardRef<HTMLDivElement, PropsWithChildren<PageHeaderTitleProps>>(
  (props, ref) => {
    const { children, headingLevel = 'h1', headingSize, prefix, suffix, ...rest } = props;

    return (
      <StyledPageHeaderTitle ref={ref} {...rest}>
        {prefix}

        <Heading as={headingLevel} size={headingSize}>
          {children}
        </Heading>

        {suffix}
      </StyledPageHeaderTitle>
    );
  },
);
HeaderTitle.displayName = 'HeaderTitle';

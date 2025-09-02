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
import { forwardRef, PropsWithChildren } from 'react';
import { cssVar } from '~utils/design-tokens';
import { Text } from '../../typography';

export interface PageHeaderMetadataProps {
  /**
   * Additional CSS class name(s)
   */
  className?: string;
}

/**
 * Displays metadata information in the page header, below the title.
 * Content is automatically styled as "subtle" text in a div.
 */
export const PageHeaderMetadata = forwardRef<
  HTMLDivElement,
  PropsWithChildren<PageHeaderMetadataProps>
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <StyledPageHeaderMetadata as="div" isSubtle ref={ref} {...rest}>
      {children}
    </StyledPageHeaderMetadata>
  );
});

PageHeaderMetadata.displayName = 'PageHeaderMetadata';

const StyledPageHeaderMetadata = styled(Text)`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
`;

StyledPageHeaderMetadata.displayName = 'StyledPageHeaderMetadata';

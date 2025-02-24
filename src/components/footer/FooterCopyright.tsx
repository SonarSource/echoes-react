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

export interface FooterCopyrightProps {
  className?: string;
  children: React.ReactNode;
}

export const FooterCopyright = forwardRef<HTMLDivElement, Readonly<FooterCopyrightProps>>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <StyledFooterCopyright ref={ref} {...rest}>
        {children}
      </StyledFooterCopyright>
    );
  },
);

FooterCopyright.displayName = 'FooterCopyright';

const StyledFooterCopyright = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  max-width: var(--echoes-sizes-typography-max-width-default)

  font-family: var(--echoes-font-family-sans);
  font-size: var(--echoes-font-size-10);
  line-height: var(--echoes-line-height-10);
  letter-spacing: var(--echoes-letter-spacing-default);
`;
StyledFooterCopyright.displayName = 'StyledFooterCopyright';

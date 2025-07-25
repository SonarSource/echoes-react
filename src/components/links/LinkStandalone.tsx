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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { LinkBaseStyled } from './LinkBaseStyled';
import { LinkStandaloneProps } from './LinkTypes';

import { cssVar } from '~utils/design-tokens';

const LinkStandaloneBase = forwardRef<HTMLAnchorElement, LinkStandaloneProps>((props, ref) => {
  const { children, iconLeft, ...linkProps } = props;

  return (
    <LinkBaseStyled {...linkProps} ref={ref}>
      {iconLeft}

      {children}
    </LinkBaseStyled>
  );
});

LinkStandaloneBase.displayName = 'LinkStandaloneBase';

export const LinkStandalone = styled(LinkStandaloneBase)`
  text-decoration-line: ${cssVar('text-decoration-none')};

  &:hover,
  &:focus,
  &:active {
    color: var(--color);
    text-decoration-color: var(--color);
  }

  &:hover {
    text-decoration-line: ${cssVar('text-decoration-underline')};
  }

  ${({ iconLeft }) =>
    iconLeft &&
    css`
      & > svg,
      & > img {
        margin-right: ${cssVar('dimension-space-50')};
      }
    `};
`;

LinkStandalone.displayName = 'LinkStandalone';

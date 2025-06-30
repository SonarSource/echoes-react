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
import { LinkStandalone } from '../links';
import { LinkBaseProps } from '../links/LinkTypes';
import { RatingBadge, RatingBadgeProps } from './RatingBadge';

export type RatingBadgeLinkProps = Omit<LinkBaseProps, 'children' | 'highlight'> & RatingBadgeProps;

export const RatingBadgeLink = forwardRef<HTMLAnchorElement, RatingBadgeLinkProps>(
  ({ className, rating, size, style, ...linkProps }, ref) => (
    <LinkStandaloneStyled ref={ref} {...linkProps}>
      <RatingBadge {...{ className, rating, size, style }} />
    </LinkStandaloneStyled>
  ),
);

RatingBadgeLink.displayName = 'RatingBadgeLink';

const LinkStandaloneStyled = styled(LinkStandalone)`
  & div:hover {
    text-decoration-line: var(--echoes-text-decoration-underline);
  }

  &:focus-visible {
    outline: none; // remove the one from LinkBaseStyled

    & div {
      outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
      outline-offset: var(--echoes-focus-border-offset-default);
    }
  }
`;

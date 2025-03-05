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
import { truncate } from '~common/helpers/styles';
import { LinkHighlight } from '../links';
import { LinkStandalone, LinkStandaloneProps } from '../links/LinkStandalone';

export interface BreadcrumbLinkProps extends Omit<LinkStandaloneProps, 'children'> {
  hasEllipsis?: boolean;
  linkElement: React.ReactNode;
}

const BreadcrumbLinkContainer = styled.span`
  max-width: var(--echoes-sizes-breadcrumbs-max-width-default);

  ${truncate}
`;

const BreadcrumbLinkBase = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>((props, ref) => {
  const { hasEllipsis, linkElement, ...linkProps } = props;

  const title = hasEllipsis ? (linkElement as string) : undefined;

  const Link = (
    <LinkStandalone {...linkProps} highlight={LinkHighlight.Subdued} ref={ref} title={title}>
      {linkElement}
    </LinkStandalone>
  );

  return hasEllipsis ? <BreadcrumbLinkContainer>{Link}</BreadcrumbLinkContainer> : Link;
});

BreadcrumbLinkBase.displayName = 'BreadcrumbLinkBase';

export const BreadcrumbLink = styled(BreadcrumbLinkBase)`
  font: var(--echoes-typography-text-small-regular);
  white-space: nowrap;
`;

BreadcrumbLink.displayName = 'BreadcrumbLink';

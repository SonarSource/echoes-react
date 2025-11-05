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

import { ReactNode } from 'react';
import { LinkBaseProps, LinkStandaloneBaseProps } from '../links/LinkTypes';

export interface BreadcrumbLinkProps
  extends LinkStandaloneBaseProps,
    Omit<LinkBaseProps, 'children'> {
  hasEllipsis?: boolean;
  linkElement: ReactNode;
}

export type BreadcrumbItemWithOptionalTo = Omit<BreadcrumbLinkProps, 'to'> & {
  to?: BreadcrumbLinkProps['to'];
};

export type BreadcrumbsItems =
  | [...BreadcrumbLinkProps[], BreadcrumbItemWithOptionalTo]
  | BreadcrumbLinkProps[];

export interface BreadcrumbsProps {
  className?: string;
  /**
   * A list of breadcrumb props. The last item can (and probably should, in most cases) omit the `to` prop, it will not be a link anyway.
   */
  items: BreadcrumbsItems;
}

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
import React, { forwardRef } from 'react';
import { IconSlash } from '../icons';
import { BreadcrumbLink, BreadcrumbLinkProps } from './BreadcrumbLink';

import { cssVar } from '~utils/design-tokens';

export interface BreadcrumbsProps {
  className?: string;
  items: BreadcrumbLinkProps[];
}

const BreadcrumbsBase = forwardRef<HTMLDivElement, BreadcrumbsProps>((props, ref) => {
  const { items, ...rest } = props;

  return (
    <div ref={ref} {...rest}>
      {items.map((item, index) => (
        <React.Fragment key={`${index}-${item.to.toString()}`}>
          {index > 0 && <IconSlash color="echoes-color-icon-subtle" />}

          {index === items.length - 1 ? (
            <span className={item.className}>{item.linkElement}</span>
          ) : (
            <BreadcrumbLink {...item} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

BreadcrumbsBase.displayName = 'BreadcrumbsBase';

export const Breadcrumbs = styled(BreadcrumbsBase)`
  display: flex;
  flex-wrap: wrap;
  font: ${cssVar('typography-text-small-regular')};
  gap: ${cssVar('dimension-space-75')};
  max-width: 100%;
`;

Breadcrumbs.displayName = 'Breadcrumbs';

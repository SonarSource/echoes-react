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
import { BreadcrumbLink as BreadcrumbLinkComponent, BreadcrumbLinkProps } from './BreadcrumbLink';

interface Props {
  children: React.ReactElement<BreadcrumbLinkProps, typeof BreadcrumbLinkComponent>[];
}

const BreadcrumbListBase = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children: breadcrumbLinks, ...rest } = props;

  return (
    <div ref={ref} {...rest}>
      {breadcrumbLinks.map((BreadcrumbLink, index) => (
        <React.Fragment key={crypto.randomUUID()}>
          {Boolean(index) && <IconSlash color="echoes-color-icon-subdued" />}

          {React.cloneElement(BreadcrumbLink, {
            ...(index === breadcrumbLinks.length - 1 ? { isChild: true } : {}),
          })}
        </React.Fragment>
      ))}
    </div>
  );
});

BreadcrumbListBase.displayName = 'BreadcrumbListBase';

export const BreadcrumbList = styled(BreadcrumbListBase)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--echoes-dimension-space-75);
  max-width: 100%;
`;

BreadcrumbList.displayName = 'BreadcrumbList';

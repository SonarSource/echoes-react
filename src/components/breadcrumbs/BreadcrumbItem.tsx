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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, PropsWithChildren } from 'react';
import { truncate } from '~common/helpers/styles';
import { cssVar } from '~utils/design-tokens';
import { BreadcrumbItemWithOptionalTo } from './BreadcrumbTypes';

export function BreadcrumbItemBase(props: PropsWithChildren<{ hasEllipsis?: boolean }>) {
  const { hasEllipsis, children } = props;

  if (hasEllipsis) {
    return <BreadcrumbEllipsisContainer>{children}</BreadcrumbEllipsisContainer>;
  }
  return children;
}
BreadcrumbItemBase.displayName = 'BreadcrumbItemBase';

export const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemWithOptionalTo>(
  (props, ref) => {
    const { className, hasEllipsis, linkElement } = props;

    const title = hasEllipsis ? (linkElement as string) : undefined;

    return (
      <BreadcrumbItemBase hasEllipsis={hasEllipsis}>
        <span className={className} ref={ref} title={title}>
          {linkElement}
        </span>
      </BreadcrumbItemBase>
    );
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbEllipsisContainer = styled.span`
  max-width: ${cssVar('sizes-breadcrumbs-max-width-default')};

  ${truncate}
`;
BreadcrumbEllipsisContainer.displayName = 'BreadcrumbEllipsisContainer';

export const breadcrumbItemStyle = css`
  font: ${cssVar('typography-text-small-regular')};
  white-space: nowrap;
`;

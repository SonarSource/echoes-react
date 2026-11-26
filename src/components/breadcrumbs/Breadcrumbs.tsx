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
import { useIntl } from 'react-intl';
import { toHref } from '~common/router/RouterUtils';
import { cssVar } from '~utils/design-tokens';
import { IconSlash } from '../icons';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbLinkProps, BreadcrumbsProps } from './BreadcrumbTypes';

/**
 * A breadcrumb trail, rendered as a `nav` landmark containing an ordered list of links.
 * The last item represents the current page and is not a link.
 */
export function Breadcrumbs(props: BreadcrumbsProps) {
  const { ariaLabel, items, ref, ...restProps } = props;

  const intl = useIntl();

  const defaultAriaLabel = intl.formatMessage({
    id: 'breadcrumbs.label',
    defaultMessage: 'Breadcrumb',
    description: 'ARIA-label for the breadcrumb navigation landmark',
  });

  return (
    <BreadcrumbsNav aria-label={ariaLabel ?? defaultAriaLabel} ref={ref} {...restProps}>
      <BreadcrumbsList>
        {items.map((item, index) => (
          <BreadcrumbsListItem key={`${index}-${item.to ? toHref(item.to) : ''}`}>
            {index > 0 && <IconSlash color="echoes-color-icon-subtle" />}

            {index === items.length - 1 ? (
              <BreadcrumbItem {...item} />
            ) : (
              <BreadcrumbLink {...(item as BreadcrumbLinkProps)} />
            )}
          </BreadcrumbsListItem>
        ))}
      </BreadcrumbsList>
    </BreadcrumbsNav>
  );
}

Breadcrumbs.displayName = 'Breadcrumbs';

const BreadcrumbsNav = styled.nav`
  max-width: 100%;
`;
BreadcrumbsNav.displayName = 'BreadcrumbsNav';

const BreadcrumbsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  font: ${cssVar('typography-text-small-regular')};
  gap: ${cssVar('dimension-space-75')};
  list-style: none;
  margin: 0;
  max-width: 100%;
  padding: 0;
`;
BreadcrumbsList.displayName = 'BreadcrumbsList';

const BreadcrumbsListItem = styled.li`
  align-items: center;
  display: inline-flex;
  gap: ${cssVar('dimension-space-75')};
  min-width: 0;
`;
BreadcrumbsListItem.displayName = 'BreadcrumbsListItem';

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

import { forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { LinkStandalone } from '../links/LinkStandalone';
import { LinkStandaloneProps } from '../links/LinkTypes';
import { Text } from '../typography';
import { StyledContentWrapper, StyledTableCell } from './TableStyles';

export type TableCellLinkProps = LinkStandaloneProps & {
  cellClassName?: string;
  description?: TextNode;
};

export const TableCellLink = forwardRef<HTMLAnchorElement, TableCellLinkProps>((props, ref) => {
  const { cellClassName, description, children, ...linkProps } = props;

  return (
    <StyledTableCell className={cellClassName} css={{ justifyContent: 'left' }}>
      <StyledContentWrapper>
        <LinkStandalone {...linkProps} ref={ref}>
          {children}
        </LinkStandalone>

        {isDefined(description) && (
          <Text isSubdued size="small">
            {description}
          </Text>
        )}
      </StyledContentWrapper>
    </StyledTableCell>
  );
});

TableCellLink.displayName = 'TableCellLink';

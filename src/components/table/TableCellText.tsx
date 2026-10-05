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
import { forwardRef, ReactNode, useRef } from 'react';
import { truncate } from '~common/helpers/styles';
import { isDefined } from '~common/helpers/types';
import { useIsOverflow } from '~common/helpers/useIsOverflow';
import { TextNode } from '~types/utils';
import { Tooltip } from '../tooltip';
import { Text } from '../typography';
import { StyledContentWrapper, StyledTableCell } from './TableStyles';

export interface TableCellTextProps {
  className?: string;
  content: TextNode;
  description?: TextNode;
  icon?: ReactNode;
  isTruncated?: boolean;
}

export const TableCellText = forwardRef<HTMLTableCellElement, TableCellTextProps>((props, ref) => {
  const { className, content, description, icon, isTruncated, ...radixProps } = props;

  return (
    <StyledTableCell
      className={className}
      css={{ justifyContent: 'start' }}
      ref={ref}
      {...radixProps}>
      {icon}

      <StyledContentWrapper>
        {isTruncated ? <TableCellTruncatedText content={content} /> : content}

        {isDefined(description) && (
          <Text isSubtle size="small">
            {description}
          </Text>
        )}
      </StyledContentWrapper>
    </StyledTableCell>
  );
});

TableCellText.displayName = 'TableCellText';

/** @internal */
function TableCellTruncatedText({ content }: Readonly<{ content: TextNode }>) {
  const contentRef = useRef<HTMLSpanElement>(null);
  const [isOverflow] = useIsOverflow(contentRef, [content]);

  return (
    <Tooltip content={isOverflow ? content : undefined}>
      <StyledTruncatedSpan ref={contentRef} tabIndex={isOverflow ? 0 : undefined}>
        {content}
      </StyledTruncatedSpan>
    </Tooltip>
  );
}

TableCellTruncatedText.displayName = 'TableCellTruncatedText';

const StyledTruncatedSpan = styled.span`
  display: block;
  width: 100%;
  min-width: 0;

  ${truncate}
`;
StyledTruncatedSpan.displayName = 'StyledTruncatedSpan';

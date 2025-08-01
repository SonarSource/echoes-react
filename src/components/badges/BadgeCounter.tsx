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
import { cssVar } from '~utils/design-tokens';

export interface BadgeCounterProps {
  className?: string;
  /**
   * Specifies the content of the BadgeCounter.
   * Type string is possible, to allow for use cases like `23+`
   */
  value: number | string;
}

export const BadgeCounter = forwardRef<HTMLSpanElement, BadgeCounterProps>(
  ({ value, ...otherProps }, ref) => {
    return (
      <BadgeCounterStyled {...otherProps} ref={ref}>
        {value}
      </BadgeCounterStyled>
    );
  },
);

BadgeCounter.displayName = 'BadgeCounter';

const BadgeCounterStyled = styled.span`
  display: inline-block;
  height: ${cssVar('line-height-10')};

  border-radius: ${cssVar('border-radius-full')};
  padding: ${cssVar('dimension-space-0')} ${cssVar('dimension-space-50')};

  font: ${cssVar('typography-text-small-semi-bold')};
  color: ${cssVar('color-text-default')};

  background-color: ${cssVar('color-background-neutral-bolder-default')};
`;
BadgeCounterStyled.displayName = 'BadgeCounterStyled';

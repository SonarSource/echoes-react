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
import React from 'react';
import { CardSize } from './CardRoot';

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  insetContent?: boolean;
  size?: CardSize;
}

const paddingMap = {
  [CardSize.Small]: 'var(--echoes-dimension-space-150)',
  [CardSize.Medium]: 'var(--echoes-dimension-space-200)',
  [CardSize.Large]: 'var(--echoes-dimension-space-300)',
};

export const CardBody = React.forwardRef<HTMLDivElement, Readonly<CardBodyProps>>(
  ({ children, className, insetContent = false, size = CardSize.Medium }, ref) => {
    return (
      <StyledBody className={className} insetContent={insetContent} ref={ref} size={size}>
        {children}
      </StyledBody>
    );
  },
);

CardBody.displayName = 'CardBody';

const StyledBody = styled.div<{ size: CardSize; insetContent: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  padding: ${(props) => (props.insetContent ? '0' : paddingMap[props.size])};
`;

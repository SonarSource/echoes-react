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
import { CardSize, useCardContext } from './CardRoot';
import { BODY_PADDING_MAP } from './CardStyles';

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  insetContent?: boolean;
}

export const CardBody = React.forwardRef<HTMLDivElement, Readonly<CardBodyProps>>(
  ({ children, className, insetContent = false }, ref) => {
    const size = useCardContext();

    return (
      <CardBodyStyled className={className} insetContent={insetContent} ref={ref} size={size}>
        {children}
      </CardBodyStyled>
    );
  },
);

CardBody.displayName = 'CardBody';

const CardBodyStyled = styled.div<{ size: CardSize; insetContent: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.insetContent ? '0' : BODY_PADDING_MAP[props.size])};
  width: 100%;
`;

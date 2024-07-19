/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { ReactNode } from 'react';
import { ButtonIconStyled, ButtonStyled } from './ButtonStyles';

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  isCombined?: boolean;
}

export function ButtonGroup({
  children,
  className,
  isCombined = false,
}: Readonly<ButtonGroupProps>) {
  if (isCombined) {
    return <StyledCombinedButtonGroup className={className}>{children}</StyledCombinedButtonGroup>;
  }

  return <StyledButtonGroup className={className}>{children}</StyledButtonGroup>;
}

const StyledButtonGroup = styled.span`
  align-items: center;
  display: flex;
  gap: var(--echoes-dimension-space-100);
`;

const StyledCombinedButtonGroup = styled(StyledButtonGroup)`
  gap: 0;

  & ${ButtonStyled}, ${ButtonIconStyled} {
    :focus,
    :focus-visible {
      outline-offset: -2px;
    }

    :first-of-type {
      border-bottom-right-radius: 0;
      border-right: none;
      border-top-right-radius: 0;
    }

    :not(:first-of-type):not(:last-of-type) {
      border-radius: 0;
      border-right: none;
    }

    :last-of-type {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;

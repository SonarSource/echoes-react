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

export enum DividerOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export interface DividerProps {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Optional text to display in the middle of the divider
   */
  text?: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Optional ARIA role. If not provided, no role will be applied.
   * For semantic separation, 'separator' is recommended.
   */
  role?: string;

  /**
   * Optional data-testid for testing
   */
  'data-testid'?: string;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = DividerOrientation.Horizontal,
      className = '',
      role = 'separator',
      'data-testid': dataTestId,
      text,
      ...props
    },
    ref,
  ) => {
    if (!text) {
      return (
        <StyledDivider
          aria-orientation={orientation}
          className={className}
          data-testid={dataTestId}
          orientation={orientation}
          ref={ref}
          role={role}
          {...props}
        />
      );
    }
    // With text, render a container with the text in the middle
    return (
      <DividerContainer
        aria-orientation={orientation}
        className={className}
        data-testid={dataTestId}
        orientation={orientation}
        ref={ref}
        role={role}
        {...props}>
        <DividerLine orientation={orientation} />
        <DividerText orientation={orientation}>{text}</DividerText>
        <DividerLine orientation={orientation} />
      </DividerContainer>
    );
  },
);

const StyledDivider = styled.hr<{ orientation: DividerOrientation }>`
  border: none;
  margin: 0;
  background-color: var(--echoes-color-border-weak);

  ${({ orientation }) =>
    orientation === DividerOrientation.Horizontal
      ? `
        height: 1px;
        width: 100%;
        margin: var(--echoes-dimension-space-150) 0;
      `
      : `
        width: 1px;
        height: 100%;
        min-height: 60px;
        margin: 0 var(--echoes-dimension-space-150);
        display: inline-block;
      `}
`;

const DividerContainer = styled.div<{ orientation: DividerOrientation }>`
  display: flex;
  align-items: center;
  margin: ${({ orientation }) =>
    orientation === DividerOrientation.Horizontal
      ? 'var(--echoes-dimension-space-100) 0'
      : '0 var(--echoes-dimension-space-100)'};

  ${({ orientation }) =>
    orientation === DividerOrientation.Vertical
      ? `
        flex-direction: column;
        height: 100%;
        min-height: 60px;
        width: auto;
      `
      : `
        width: 100%;
      `}
`;

const DividerLine = styled.div<{ orientation: DividerOrientation }>`
  flex-grow: 1;
  background-color: var(--echoes-color-border-weak);

  ${({ orientation }) =>
    orientation === DividerOrientation.Horizontal
      ? `
        height: 1px;
      `
      : `
        width: 1px;
        height: 100%;
      `}
`;

const DividerText = styled.span<{ orientation: DividerOrientation }>`
  padding: ${({ orientation }) =>
    orientation === DividerOrientation.Horizontal
      ? '0 var(--echoes-dimension-space-25)'
      : 'var(--echoes-dimension-space-25) 0'};
  font-weight: var(--echoes-font-weight-regular);
  line-height: var(--echoes-line-height-10);
  max-width: var(--echoes-sizes-typography-max-width-default);
  font-size: var(--echoes-font-size-10);
  white-space: nowrap;
`;

Divider.displayName = 'Divider';

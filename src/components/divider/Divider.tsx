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
import { AriaRole, forwardRef } from 'react';

export interface DividerProps {
  /**
   * Whether the divider is vertical
   * @default false
   */
  isVertical?: boolean;

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
  role?: AriaRole;

  /**
   * Optional data-testid for testing
   */
  'data-testid'?: string;
}

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, Readonly<DividerProps>>(
  (
    {
      isVertical = false,
      className,
      role = 'separator',
      'data-testid': dataTestId,
      text,
      ...props
    },
    ref,
  ) => {
    const ariaOrientation = isVertical ? 'vertical' : 'horizontal';
    if (!text) {
      return (
        <StyledDivider
          aria-orientation={ariaOrientation}
          className={className}
          data-testid={dataTestId}
          isVertical={isVertical}
          ref={ref as React.Ref<HTMLHRElement>}
          role={role}
          {...props}
        />
      );
    }
    return (
      <DividerContainer
        aria-orientation={ariaOrientation}
        className={className}
        data-testid={dataTestId}
        isVertical={isVertical}
        ref={ref}
        role={role}
        {...props}>
        <DividerLine isVertical={isVertical} />
        <DividerText isVertical={isVertical}>{text}</DividerText>
        <DividerLine isVertical={isVertical} />
      </DividerContainer>
    );
  },
);

const StyledDivider = styled.hr<{ isVertical: boolean }>`
  border: none;
  margin: 0;
  background-color: var(--echoes-color-border-weak);

  ${({ isVertical }) =>
    !isVertical
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

const DividerContainer = styled.div<{ isVertical: boolean }>`
  display: flex;
  align-items: center;
  margin: ${({ isVertical }) =>
    !isVertical ? 'var(--echoes-dimension-space-100) 0' : '0 var(--echoes-dimension-space-100)'};

  ${({ isVertical }) =>
    isVertical
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

const DividerLine = styled.div<{ isVertical: boolean }>`
  flex-grow: 1;
  background-color: var(--echoes-color-border-weak);

  ${({ isVertical }) =>
    !isVertical
      ? `
        height: 1px;
      `
      : `
        width: 1px;
        height: 100%;
      `}
`;

const DividerText = styled.span<{ isVertical: boolean }>`
  padding: ${({ isVertical }) =>
    !isVertical ? '0 var(--echoes-dimension-space-25)' : 'var(--echoes-dimension-space-25) 0'};
  font-weight: var(--echoes-font-weight-regular);
  line-height: var(--echoes-line-height-10);
  max-width: var(--echoes-sizes-typography-max-width-default);
  font-size: var(--echoes-font-size-10);
  white-space: nowrap;
`;

Divider.displayName = 'Divider';

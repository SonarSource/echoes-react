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

export enum CardSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  size?: CardSize;
}

// Helper function to safely check component displayName
const hasDisplayName = (type: any, name: string): boolean => {
  // Check if it's a React component with a displayName property
  if (typeof type === 'function' && typeof type.displayName === 'string') {
    return type.displayName === name;
  }

  // Check if it's a React.forwardRef component (which has render property)
  if (type && typeof type.render === 'function' && typeof type.displayName === 'string') {
    return type.displayName === name;
  }

  return false;
};

export const CardRoot = React.forwardRef<HTMLDivElement, Readonly<CardProps>>(
  ({ children, className, size = CardSize.Medium }, ref) => {
    // Detect if there's a CardHeader among the children and inject the size prop
    const childrenWithProps = React.Children.map(children, (child) => {
      // Skip null or undefined children
      if (!child || !React.isValidElement(child)) {
        return child;
      }

      const childType = child.type;

      // Check if this is a CardHeader or CardBody component
      if (
        (childType && hasDisplayName(childType, 'CardHeader')) ||
        (childType && hasDisplayName(childType, 'CardBody'))
      ) {
        // Clone the element and inject the size prop
        return React.cloneElement(child, {
          ...child.props,
          size,
        });
      }

      return child;
    });

    return (
      <StyledCard className={className} ref={ref}>
        {childrenWithProps}
      </StyledCard>
    );
  },
);

CardRoot.displayName = 'CardRoot';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 470px;
  border: 1px solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-xsmall);
  box-sizing: border-box;
  width: 100%;
`;

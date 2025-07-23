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
import { forwardRef, ReactNode } from 'react';
import { ButtonIconStyled, ButtonStyled } from './ButtonStyles';

import { cssVar } from '~utils/design-tokens';

export interface ButtonGroupProps {
  /**
   * Button components to be grouped together.
   * Should contain two or more Button or ButtonIcon components.
   */
  children: ReactNode;
  className?: string;
  /**
   * Whether buttons should be visually combined into a single unit (optional).
   * When true, buttons are connected with no gap and shared borders.
   * Default is false, showing buttons with standard spacing.
   */
  isCombined?: boolean;
}

/**
 * A container component that visually combines a group of buttons that are part of the same context,
 * like a set of actions that can be performed on the same element.
 * e.g. Submit and Cancel a modal. A button group can be used on modals, forms, cards, tables, etc...
 *
 * The ButtonGroup component provides two distinct grouping modes: standard spacing for
 * independent buttons, and combined mode where buttons are visually connected as a single
 * unit.
 *
 * **Permitted Content**
 *
 * Should contain Button or ButtonIcon components. The ButtonGroup automatically
 * handles the visual treatment of child buttons based on the selected mode.
 */
export const ButtonGroup = forwardRef<HTMLSpanElement, Readonly<ButtonGroupProps>>(
  ({ isCombined = false, ...props }, ref) =>
    isCombined ? (
      <StyledCombinedButtonGroup {...props} ref={ref} />
    ) : (
      <StyledButtonGroup {...props} ref={ref} />
    ),
);

ButtonGroup.displayName = 'ButtonGroup';

const StyledButtonGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
`;
StyledButtonGroup.displayName = 'StyledButtonGroup';

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
StyledCombinedButtonGroup.displayName = 'StyledCombinedButtonGroup';

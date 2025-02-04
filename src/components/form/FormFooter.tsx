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
import { ButtonGroup } from '../buttons';

export enum FormFooterSide {
  Right = 'right',
  Left = 'left',
}

export interface FormFooterProps {
  /**
   * Buttons to display at the bottom of the Form. They are wrapped in a `ButtonGroup` and aligned to
   * the left of the Form by default.
   */
  children: ReactNode;
  className?: string;
  /**
   * Change the alignment of the buttons to the right or left side of the form (optional)
   */
  side?: `${FormFooterSide}`;
}

export const FormFooter = forwardRef<HTMLDivElement, FormFooterProps>(
  ({ children, side = FormFooterSide.Left, ...rest }, ref) => {
    return (
      <FormFooterWrapper data-side={side}>
        <ButtonGroup ref={ref} {...rest}>
          {children}
        </ButtonGroup>
      </FormFooterWrapper>
    );
  },
);
FormFooter.displayName = 'FormFooter';

const FormFooterWrapper = styled.div`
  order: 3; // Ensure the footer always appear last in the Form even if the dev scramble the order of components
  display: flex;

  &[data-side='right'] {
    justify-content: flex-end;
  }
`;
FormFooterWrapper.displayName = 'FormFooterWrapper';

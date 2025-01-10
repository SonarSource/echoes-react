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
import { type ReactNode, forwardRef } from 'react';
import { Label } from '../typography';

interface Props {
  children: ReactNode;
  /**
   * When true, pointer events will be disabled on the label to prevent
   * activating the form control.
   */
  isDisabled?: boolean;
  /**
   * When true, will display an asterisk to indicate that the field is required.
   */
  isRequired?: boolean;
  /**
   * The ID of the form control that this label is associated with.
   */
  htmlFor?: string;
}

/**
 * @internal
 *
 * A form field may have a label that appears above the form control.
 *
 * **Permitted Parents:**
 *
 * `FormField`
 *
 * **Permitted Content:**
 *
 * Any inline content.
 */
export const FormFieldLabel = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { children, isDisabled = false, isRequired = false, ...rest } = props;

  if (!children) {
    return null;
  }

  return (
    <LabelStyled data-disabled={isDisabled ? '' : undefined} ref={ref} {...rest}>
      {children}
      {isRequired && <RequiredIndicator aria-hidden="true">*</RequiredIndicator>}
    </LabelStyled>
  );
});

FormFieldLabel.displayName = 'FormFieldLabel';

const LabelStyled = styled(Label)`
  inline-size: fit-content;

  &[data-disabled] {
    pointer-events: none;
  }
`;

const RequiredIndicator = styled.span`
  color: var(--echoes-color-text-danger);
  font: var(--echoes-typography-others-label-medium);
  margin-left: var(--echoes-dimension-space-25);
`;

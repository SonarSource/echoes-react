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
import { type JSX, forwardRef } from 'react';
import { Label } from '../typography';

interface Props {
  children: JSX.Element | string;
  isDisabled?: boolean;
  isRequired?: boolean;
  htmlFor: string;
}

export const FormFieldLabel = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { children, isDisabled = false, isRequired = false, ...rest } = props;
  return (
    <StyledLabel data-disabled={isDisabled ? '' : undefined} ref={ref} {...rest}>
      {children}
      {isRequired && <FormFieldLabelRequired>*</FormFieldLabelRequired>}
    </StyledLabel>
  );
});

FormFieldLabel.displayName = 'FormFieldLabel';

export const FormFieldLabelMedium = styled(FormFieldLabel)`
  font: var(--echoes-typography-others-label-medium);
`;

const StyledLabel = styled(Label)`
  display: block;
  grid-area: label;
  width: fit-content;

  &[data-disabled] {
    pointer-events: none;
  }
`;

const FormFieldLabelRequired = styled.span`
  color: var(--echoes-color-text-danger);
  font: var(--echoes-typography-others-label-medium);
  margin-left: var(--echoes-dimension-space-25);
`;

FormFieldLabelRequired.displayName = 'FormFieldLabelRequired';

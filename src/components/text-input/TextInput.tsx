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
import { type ComponentPropsWithRef, forwardRef } from 'react';

import { useFormFieldContext, FormFieldState } from '../form/FormFieldContext';

export type TextInputProps = ComponentPropsWithRef<'input'> & {
  state?: `${FormFieldState}`;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const context = useFormFieldContext();
  const { id = context.id, state = context.state, ...rest } = props;
  return <StyledInput id={id} ref={ref} state={state} {...rest} />;
});

TextInput.displayName = 'TextInput';

const StyledInput = styled.input<{ state: `${FormFieldState}` }>`
  border-color: ${(props) => {
    switch (props.state) {
      case FormFieldState.Error:
        return 'var(--echoes-color-border-danger)';
      case FormFieldState.Success:
        return '#039855';
      default:
        return 'var(--echoes-color-border-bolder)';
    }
  }};
  border-radius: var(--echoes-border-radius-200);
  border-style: solid;
  border-width: 1px;
`;

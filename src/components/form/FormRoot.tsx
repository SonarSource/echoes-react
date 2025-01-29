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
import { FormHTMLAttributes, forwardRef, ReactNode } from 'react';

type FormAttributes = Pick<
  FormHTMLAttributes<HTMLFormElement>,
  'action' | 'method' | 'name' | 'target' | 'onReset' | 'onSubmit' | 'onInvalid'
>;

export interface FormRootProps extends FormAttributes {
  /**
   * The content of the `Form.Root`, only one mandatory `Form.Header`, multiple `Form.Section`
   * and one mandatory `Form.Footer` are allowed.
   */
  children?: ReactNode;
  /**
   * `noValidate` attribute is added by default on the form to not use the browser form validation.
   * Set this prop to `true` to remove the `noValidate` attribute.
   */
  shouldUseBrowserValidation?: boolean;
}

export const FormRoot = forwardRef<HTMLFormElement, FormRootProps>((props, ref) => {
  const { children, shouldUseBrowserValidation = false, ...rest } = props;

  return (
    <FormStyled noValidate={!shouldUseBrowserValidation} ref={ref} {...rest}>
      {children}
    </FormStyled>
  );
});
FormRoot.displayName = 'FormRoot';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-300);
`;
FormStyled.displayName = 'FormStyled';

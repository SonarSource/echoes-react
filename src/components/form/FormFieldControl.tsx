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

interface Props {
  children: ReactNode;
}

/**
 * @internal
 *
 * A form field must have an associated form control.
 *
 * **Permitted Parents:**
 *
 * `FormField`
 *
 * **Permitted Content:**
 *
 * `CheckboxGroup | RadioButtonGroup | Select | Textarea | TextInput`
 */
export const FormFieldControl = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <FormFieldControlStyled ref={ref} {...props} />;
});

FormFieldControl.displayName = 'FormFieldControl';

const FormFieldControlStyled = styled.div``;

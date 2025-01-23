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
  children?: ReactNode;
}

/**
 * @internal
 *
 * A form field may have a message that appears below the form control. They are
 * used to provide help, success and error messages to the user.
 *
 * **Permitted Parents:**
 *
 * `FormField`
 *
 * **Permitted Content:**
 *
 * Any inline content.
 */
export const FormFieldMessage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <FormFieldMessageStyled ref={ref} {...props} />;
});

FormFieldMessage.displayName = 'FormFieldMessage';

const FormFieldMessageStyled = styled.div``;

FormFieldMessageStyled.displayName = 'FormFieldMessageStyled';

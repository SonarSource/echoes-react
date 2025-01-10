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
import { MessageInline, MessageInlineSize, MessageType } from '../messages';
import { HelperText } from '../typography';
import { FormFieldValidation } from './FormTypes';

interface Props {
  children: JSX.Element | string;
  id: string;
  validation?: `${FormFieldValidation}`;
}

export const FormFieldDescription = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, validation = FormFieldValidation.None, ...rest } = props;

  switch (validation) {
    case FormFieldValidation.Invalid:
      return (
        <FormFieldMessageInline
          as="div"
          ref={ref}
          size={MessageInlineSize.Small}
          type={MessageType.Danger}
          {...rest}>
          {children}
        </FormFieldMessageInline>
      );
    case FormFieldValidation.Valid:
      return (
        <FormFieldMessageInline
          as="div"
          ref={ref}
          size={MessageInlineSize.Small}
          type={MessageType.Success}
          {...rest}>
          {children}
        </FormFieldMessageInline>
      );
    case FormFieldValidation.None:
    default:
      return (
        <FormFieldHelperText ref={ref} {...rest}>
          {children}
        </FormFieldHelperText>
      );
  }
});

FormFieldDescription.displayName = 'FormFieldDescription';

const FormFieldHelperText = styled(HelperText)`
  grid-area: description;
`;

FormFieldHelperText.displayName = 'FormFieldHelperText';

const FormFieldMessageInline = styled(MessageInline)`
  grid-area: description;
`;

FormFieldMessageInline.displayName = 'FormFieldMessageInline';

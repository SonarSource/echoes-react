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
import { forwardRef } from 'react';
import { TextNodeOptional } from '~types/utils';
import { PopoverSide } from '../popover';
import { ToggleTip, ToggleTipProps } from '../toggle-tip';
import { Label } from '../typography';

export interface FormFieldLabelProps {
  children?: TextNodeOptional;
  /**
   * The ID of the form control that this label is associated with.
   */
  htmlFor?: string;
  /**
   * The ID of the label (optional).
   */
  id?: string;
  /**
   * When true, will display an asterisk to indicate that the field is required.
   */
  isRequired?: boolean;
  /**
   * The props for a help toggletip showing next to the form field label to provide additional information about the field (optional).
   */
  helpToggletip?: ToggleTipProps;
}

/**
 * A form field may have a label that appears above the form control.
 *
 * **Permitted Parents**
 *
 * `FormField`
 *
 * **Permitted Content**
 *
 * Any phrasing content.
 *
 * @internal
 */
export const FormFieldLabel = forwardRef<HTMLLabelElement, FormFieldLabelProps>((props, ref) => {
  const { children, isRequired = false, helpToggletip, ...rest } = props;

  if (!children) {
    return null;
  }

  return (
    <LabelWrapper>
      <LabelStyled ref={ref} {...rest}>
        {children}
        {isRequired && <RequiredIndicator aria-hidden="true">*</RequiredIndicator>}
      </LabelStyled>
      {helpToggletip && <ToggleTip side={PopoverSide.Right} {...helpToggletip} />}
    </LabelWrapper>
  );
});

FormFieldLabel.displayName = 'FormFieldLabel';

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--echoes-dimension-space-75);

  margin-bottom: var(--echoes-dimension-space-75);
`;
LabelWrapper.displayName = 'LabelWrapper';

const LabelStyled = styled(Label)`
  display: block;
  inline-size: fit-content;

  [data-disabled] & {
    pointer-events: none;
  }
`;

LabelStyled.displayName = 'LabelStyled';

const RequiredIndicator = styled.span`
  color: var(--echoes-color-text-danger);
  font: var(--echoes-typography-others-label-medium);
  margin-left: var(--echoes-dimension-space-25);
`;

RequiredIndicator.displayName = 'RequiredIndicator';

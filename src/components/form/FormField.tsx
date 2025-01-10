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
import { type ComponentProps, forwardRef } from 'react';

/**
 * Used to control the placement of a fom control within a form field.
 */
export enum FormControlPlacement {
  /**
   * Place the form control before the label and description.
   */
  Before = 'before',
  /**
   * Place the form control below the label and description.
   */
  Below = 'below',
  /**
   * Place the form control between the label and description. (default)
   */
  Between = 'between',
}

export type FormFieldProps = ComponentProps<'div'> & {
  /**
   * The placement of the form control within the form field. There are three
   * possible placements:
   *
   * 1. `Before` - Indicates that the form control should be placed before the
   *               label and description. This is used for checkbox controls.
   *
   * 2. `Below` - Indicates that the form control should be placed below the
   *              label and description. This is used for radio group controls.
   *
   * 3. `Between` - Indicates that the form control should be placed between the
   *                label and description. This is the default placement.
   */
  controlPlacement?: `${FormControlPlacement}`;
  /**
   * A form field is a block element by default. If `isInline` is set to `true`,
   * it will render as an inline element.
   */
  isInline?: boolean;
};

/**
 * Acts as a container for a form control.
 *
 * Permitted Content: `FormFieldLabel`, `FormFieldControl`, `FormFieldDescription`
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ controlPlacement = FormControlPlacement.Between, isInline = false, ...props }, ref) => {
    return (
      <StyledFormField
        data-inline={isInline ? '' : undefined}
        data-placement={controlPlacement}
        ref={ref}
        {...props}
      />
    );
  },
);

FormField.displayName = 'FormField';

const StyledFormField = styled.div`
  column-gap: var(--echoes-dimension-space-100);
  display: grid;

  &[data-inline] {
    display: inline-grid;
  }

  &[data-placement='before'] {
    grid-template-areas:
      'control label'
      '.       description';
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }

  &[data-placement='below'] {
    grid-template-areas:
      'label'
      'description'
      'control';
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }

  &[data-placement='between'] {
    grid-template-areas:
      'label'
      'control'
      'description';
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
`;

StyledFormField.displayName = 'StyledFormField';

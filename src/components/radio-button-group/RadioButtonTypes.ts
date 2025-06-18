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

import { ReactNode } from 'react';
import { GroupAlignment } from '~types/GroupAlignment';
import { FormFieldProps, ValidationProps } from '../form/FormField';

type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'width'>;

export interface RadioButtonGroupProps extends ValidationProps, FormFieldPropsSubset {
  onChange?: (value: string) => void;
  options: RadioOption[];

  // Group Props
  alignment?: `${GroupAlignment}`;
  className?: string;
  defaultValue?: string;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  value?: string;
}

/*
 * Related to the explanation below, we require an aria-label if the label is a ReactNode.
 * If the label is a string, we use it directly as a fallback if no aria-label is provided
 */
export type RadioOption = {
  helpText?: ReactNode;
  isDisabled?: boolean;
  value: string;
} & ({ ariaLabel: string; label: ReactNode } | { ariaLabel?: string; label: string });

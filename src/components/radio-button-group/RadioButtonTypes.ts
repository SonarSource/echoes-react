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
  /**
   * Callback fired when the selected radio button changes.
   *
   * @param value - The value of the newly selected radio button.
   */
  onChange?: (value: string) => void;

  /**
   * Array of options to display as radio buttons.
   */
  options: RadioOption[];

  /* == Group Props == */

  /**
   * Defines if the buttons are displayed vertically or horizontally.
   * (default is vertical)
   */
  alignment?: `${GroupAlignment}`;

  /**
   * Additional CSS class names to apply to the group.
   */
  className?: string;

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: string;

  /**
   * The unique identifier for the radio button group.
   */
  id?: string;

  /**
   * Whether the radio button group is disabled.
   */
  isDisabled?: boolean;

  /**
   * Whether selection is required.
   */
  isRequired?: boolean;

  /**
   * The currently selected value (controlled).
   */
  value?: string;
}

/** If label is a ReactNode, ariaLabel is required for accessibility. */
export type RadioOption = {
  /** Optional help text displayed under the option's label. */
  helpText?: ReactNode;

  /** Whether the option is disabled. */
  isDisabled?: boolean;

  /** The unique value associated with this option. */
  value: string;
} & (
  | {
      ariaLabel: string;
      label: ReactNode;
    }
  | {
      ariaLabel?: string;
      label: string;
    }
);

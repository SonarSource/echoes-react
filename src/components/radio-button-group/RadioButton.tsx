/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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

import {
  RadioButtonInput,
  RadioButtonLabelWrapper,
  RadioButtonOptionHelpText,
  RadioButtonOptionLabel,
  RadioButtonOptionWrapper,
  RadioButtonSelectionIndicator,
} from './RadioButtonStyles';
import { RadioOption } from './RadioButtonTypes';

interface InternalRadioButtonProps {
  groupId: string;
  hasError?: boolean;
}

export type RadioButtonProps = RadioOption & InternalRadioButtonProps;

/** Internal component, don't re-export in the index */
export function RadioButton(props: Readonly<RadioButtonProps>) {
  const { ariaLabel, hasError, isDisabled: disabled, groupId, helpText, label, value } = props;

  const id = `${groupId}-${value}`;

  /*
   * Although the HTML spec defines buttons as valid targets for labels,
   * some Screen Readers have issues with those:
   * https://github.com/dequelabs/axe-core/issues/3696#issuecomment-1665575742
   * So here we force an aria-label:
   */
  const inputLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <RadioButtonOptionWrapper>
      <RadioButtonLabelWrapper data-disabled={disabled || undefined}>
        <RadioButtonInput
          aria-label={inputLabel}
          {...(hasError ? { 'data-error': true } : {})}
          disabled={disabled}
          id={id}
          value={value}>
          <RadioButtonSelectionIndicator />
        </RadioButtonInput>
        <RadioButtonOptionLabel htmlFor={id}>{label}</RadioButtonOptionLabel>
      </RadioButtonLabelWrapper>
      {helpText && (
        <RadioButtonOptionHelpText as="span" data-disabled={disabled || undefined}>
          {helpText}
        </RadioButtonOptionHelpText>
      )}
    </RadioButtonOptionWrapper>
  );
}

RadioButton.displayName = 'RadioButton';

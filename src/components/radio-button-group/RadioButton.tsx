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
import * as RadioGroup from '@radix-ui/react-radio-group';
import { HelperText, Label } from '../typography';
import { RadioOption } from './RadioButtonTypes';

import { cssVar } from '~utils/design-tokens';

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
        <RadoiButtonOptionLabel htmlFor={id}>{label}</RadoiButtonOptionLabel>
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

const RadioButtonOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
RadioButtonOptionWrapper.displayName = 'RadioButtonOptionWrapper';

const RadioButtonInput = styled(RadioGroup.Item)`
  appearance: none;
  cursor: pointer;
  background-color: ${cssVar('color-background-utility-transparent')};

  box-sizing: border-box;
  padding: 0;
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-bolder')};
  border-radius: ${cssVar('border-radius-full')};

  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  min-width: ${cssVar('dimension-width-200')};

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &[data-error='true'] {
    border: ${cssVar('border-width-default')} solid ${cssVar('color-border-danger-default')};
  }

  &[data-state='checked'] {
    background-color: ${cssVar('color-background-selected-bold-default')};
    border-color: ${cssVar('color-background-selected-bold-default')};

    &:not(:disabled):hover {
      background-color: ${cssVar('color-background-selected-bold-hover')};
      border-color: ${cssVar('color-background-selected-bold-hover')};
    }
  }

  &:focus,
  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &:disabled {
    cursor: default;
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};
  }
`;
RadioButtonInput.displayName = 'RadioButtonInput';

const RadioButtonSelectionIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;

    box-sizing: border-box;
    height: ${cssVar('dimension-height-150')};
    width: ${cssVar('dimension-width-75')};
    border-radius: ${cssVar('border-radius-full')};

    background-color: ${cssVar('color-icon-on-color')};
  }

  &[data-disabled]::after {
    background-color: ${cssVar('color-icon-disabled')};
  }
`;
RadioButtonSelectionIndicator.displayName = 'RadioButtonSelectionIndicator';

const RadioButtonLabelWrapper = styled.span`
  display: inline-flex;
  gap: ${cssVar('dimension-space-100')};
  align-items: center;
`;
RadioButtonLabelWrapper.displayName = 'RadioButtonLabelWrapper';

const RadoiButtonOptionLabel = styled(Label)`
  font: ${cssVar('typography-others-label-medium')};

  display: block;
  width: 100%;

  cursor: pointer;

  [data-disabled] > & {
    color: ${cssVar('color-text-disabled')};
    cursor: default;
  }
`;
RadoiButtonOptionLabel.displayName = 'OptionLabel';

const RadioButtonOptionHelpText = styled(HelperText)`
  margin-left: calc(${cssVar('dimension-space-200')} + ${cssVar('dimension-space-100')});

  &[data-disabled] {
    color: ${cssVar('color-text-disabled')};
  }
`;
RadioButtonOptionHelpText.displayName = 'RadioButtonOptionHelpText';

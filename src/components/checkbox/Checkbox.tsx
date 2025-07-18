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
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, useCallback, useId } from 'react';
import { PropsWithLabelsAndHelpText } from '~types/utils';
import { FormFieldLabel } from '../form/FormFieldLabel';
import { Spinner } from '../spinner';
import { HelperText } from '../typography';
import { CheckboxIcon } from './CheckboxIcon';

import { cssVar } from '~utils/design-tokens';

interface CheckboxPropsBase {
  checked: boolean | 'indeterminate';
  className?: string;
  hasError?: boolean;
  innerClassName?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  onCheck: (checked: boolean | 'indeterminate', id: string) => void;
  onFocus?: VoidFunction;
  title?: string;
}

export type CheckboxProps = PropsWithLabelsAndHelpText<CheckboxPropsBase>;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    className,
    checked,
    helpText,
    hasError = false,
    id,
    innerClassName,
    isDisabled,
    isLoading = false,
    isRequired = false,
    label,
    onCheck,
    onFocus,
    title,
    ...radixProps
  } = props;

  const defaultId = `${useId()}checkbox`;
  const controlId = id ?? defaultId;

  const handleChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (!isDisabled && !isLoading) {
        onCheck(checked, controlId);
      }
    },
    [controlId, isDisabled, isLoading, onCheck],
  );

  return (
    <CheckboxContainer className={className} data-disabled={isDisabled || undefined}>
      <CheckboxInnerContainer className={innerClassName}>
        <CheckboxSpinner isLoading={isLoading}>
          <CheckboxRoot
            aria-disabled={isDisabled}
            aria-invalid={hasError}
            aria-label={ariaLabel ?? title}
            aria-labelledby={ariaLabelledBy}
            checked={checked}
            id={controlId}
            onCheckedChange={handleChange}
            onFocus={onFocus}
            ref={ref}
            title={title}
            // We only support the error state for unchecked checkboxes for now
            {...(hasError && checked === false ? { 'data-error': true } : {})}
            {...radixProps}>
            <CheckboxIndicator>
              <CheckboxIcon checked={checked} />
            </CheckboxIndicator>
          </CheckboxRoot>
        </CheckboxSpinner>
        {(label || helpText) && (
          <CheckboxLabelWrapper>
            {label && (
              <CheckboxLabel htmlFor={controlId} isRequired={isRequired}>
                {label}
              </CheckboxLabel>
            )}
            {helpText && <HelperText>{helpText}</HelperText>}
          </CheckboxLabelWrapper>
        )}
      </CheckboxInnerContainer>
    </CheckboxContainer>
  );
});
Checkbox.displayName = 'Checkbox';

const CheckboxContainer = styled.span`
  display: inline-flex;
  vertical-align: top;

  &[data-disabled] {
    pointer-events: none;
  }
`;
CheckboxContainer.displayName = 'CheckboxContainer';

const CheckboxInnerContainer = styled.span`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.833rem;
`;
CheckboxInnerContainer.displayName = 'CheckboxInnerContainer';

const CheckboxRoot = styled(RadixCheckbox.Root)`
  color: ${cssVar('color-text-on-color')};
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-bolder')};

  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  border-radius: ${cssVar('border-radius-100')};
  margin: ${cssVar('dimension-space-25')} 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:focus,
  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &[aria-disabled='true'] {
    color: ${cssVar('color-icon-disabled')};
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};

    &[aria-checked='true'],
    &[aria-checked='mixed'] {
      background-color: ${cssVar('color-surface-disabled')};
      border-color: ${cssVar('color-border-disabled')};
    }
  }

  &:not([aria-disabled='true']) {
    &:hover {
      background-color: ${cssVar('color-surface-hover')};
    }

    &[aria-checked='true'],
    &[aria-checked='mixed'] {
      background-color: ${cssVar('color-background-selected-bold-default')};
      border-color: ${cssVar('color-background-selected-bold-default')};

      &:hover {
        background-color: ${cssVar('color-background-selected-bold-hover')};
        border: ${cssVar('color-background-selected-bold-hover')};
      }
    }

    &[data-error] {
      border-color: ${cssVar('color-border-danger-default')};
    }
  }
`;
CheckboxRoot.displayName = 'CheckboxRoot';

const CheckboxSpinner = styled(Spinner)`
  margin: ${cssVar('dimension-space-25')} 0;
`;
CheckboxSpinner.displayName = 'CheckboxSpinner';

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
`;
CheckboxIndicator.displayName = 'CheckboxIndicator';

const CheckboxLabelWrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: ${cssVar('dimension-space-100')};
`;
CheckboxLabelWrapper.displayName = 'CheckboxLabelWrapper';

const CheckboxLabel = styled(FormFieldLabel)`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-others-label-medium')};
`;
CheckboxLabel.displayName = 'CheckboxLabel';

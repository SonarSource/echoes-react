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
import { PropsWithLabels } from '~types/utils';
import { Spinner } from '../spinner';
import { HelperText } from '../typography';
import { CheckboxIcon } from './CheckboxIcon';

interface CheckboxPropsBase {
  checked: boolean | 'indeterminate';
  className?: string;
  hasError?: boolean;
  innerClassName?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onCheck: (checked: boolean | 'indeterminate', id: string) => void;
  onFocus?: VoidFunction;
  title?: string;
}

export type CheckboxProps = PropsWithLabels<CheckboxPropsBase>;

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
    label,
    onCheck,
    onFocus,
    title,
    ...radixProps
  } = props;

  const defaultId = `${useId()}checkbox`;
  const controlId = id ?? defaultId;
  const labelId = `${controlId}-label`;

  const handleChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (!isDisabled && !isLoading) {
        onCheck(checked, controlId);
      }
    },
    [controlId, isDisabled, isLoading, onCheck],
  );

  return (
    <CheckboxContainer className={className} data-disabled={isDisabled}>
      <CheckboxInnerContainer className={innerClassName}>
        <Spinner isLoading={isLoading}>
          <CheckboxRoot
            aria-disabled={isDisabled}
            aria-invalid={hasError}
            aria-label={ariaLabel ?? title}
            aria-labelledby={ariaLabelledBy ?? labelId}
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
        </Spinner>
        {(label || helpText) && (
          <LabelWrapper>
            {label && (
              <Label htmlFor={controlId} id={labelId}>
                {label}
              </Label>
            )}
            {helpText && <HelperText>{helpText}</HelperText>}
          </LabelWrapper>
        )}
      </CheckboxInnerContainer>
    </CheckboxContainer>
  );
});
Checkbox.displayName = 'Checkbox';

const CheckboxContainer = styled.span`
  display: inline-flex;
  vertical-align: top;

  &[data-disabled='true'] {
    pointer-events: none;
  }
`;

const CheckboxInnerContainer = styled.span`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.833rem;
`;

const CheckboxRoot = styled(RadixCheckbox.Root)`
  color: var(--echoes-color-text-on-color);
  background-color: var(--echoes-color-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bolder);

  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
  border-radius: var(--echoes-border-radius-100);
  margin: var(--echoes-dimension-space-25) 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:focus,
  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
  }

  &[aria-disabled='true'] {
    color: var(--echoes-color-icon-disabled);
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-disabled);
      border-color: var(--echoes-color-border-disabled);
    }
  }

  &:not([aria-disabled='true']) {
    &:hover {
      background-color: var(--echoes-color-background-default-hover);
    }

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-selected-bold-default);
      border-color: var(--echoes-color-background-selected-bold-default);

      &:hover {
        background-color: var(--echoes-color-background-selected-bold-hover);
        border: var(--echoes-color-background-selected-bold-hover);
      }
    }

    &[data-error] {
      border-color: var(--echoes-color-border-danger);
    }
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
`;

const LabelWrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: var(--echoes-dimension-space-100);
`;

const Label = styled.label`
  color: var(--echoes-color-text-default);
  font: var(--echoes-typography-others-label-medium);
`;

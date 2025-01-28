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
import { type ReactNode, type RefAttributes, forwardRef, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import { type CheckboxProps, Checkbox } from '../checkbox/Checkbox';
import {
  type ValidationProps,
  FormField,
  FormFieldValidation,
  FormFieldWidth,
} from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';

/**
 *
 */
export const CheckboxGroup: CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (props, ref) => {
    const {
      ariaLabel,
      ariaLabelledBy,
      className,
      direction,
      helpText,
      id,
      isDisabled,
      isRequired,
      label,
      messageInvalid,
      messageValid,
      onChange,
      options,
      validation,
      value,
      width,
    } = props;
    const defaultId = `${useId()}checkbox`;

    const { describedBy, descriptionId, labelId, validationMessageId } = useFormFieldA11y({
      controlId: id ?? defaultId,
      hasDescription: Boolean(helpText),
      hasValidationMessage: Boolean(messageInvalid || messageValid),
    });

    return (
      <FormField
        className={className}
        description={helpText}
        descriptionId={descriptionId}
        isDisabled={isDisabled}
        isRequired={isRequired}
        label={label}
        labelId={labelId}
        messageInvalid={messageInvalid}
        messageValid={messageValid}
        validation={validation}
        validationMessageId={validationMessageId}
        width={width}>
        <CheckboxGroupRoot // NOSONAR
          aria-describedby={describedBy}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? labelId}
          data-direction={direction}
          data-invalid={validation === FormFieldValidation.Invalid}
          ref={ref}
          role="group">
          {options.map((option) => {
            const optionValue = 'value' in option ? option.value : option.label;
            const isChecked = value.includes(optionValue);

            return (
              <Checkbox
                checked={isChecked}
                hasError={validation === FormFieldValidation.Invalid}
                isDisabled={isDisabled}
                key={option.label}
                onCheck={(checkedState) => {
                  if (option.isDisabled) {
                    return;
                  }

                  switch (checkedState) {
                    case true:
                      onChange([...value, optionValue]);
                      break;
                    case false:
                      onChange(value.filter((v) => v !== optionValue));
                      break;
                  }
                }}
                {...option}
              />
            );
          })}
        </CheckboxGroupRoot>
      </FormField>
    );
  },
);

CheckboxGroup.displayName = 'CheckboxGroup';

interface CheckboxGroup {
  <T>(props: CheckboxGroupProps<T>): ReactNode;
  displayName?: string;
}

type CheckboxOption<T = unknown> = Pick<
  CheckboxProps,
  | 'className'
  | 'hasError'
  | 'helpText'
  | 'id'
  | 'innerClassName'
  | 'isDisabled'
  | 'isLoading'
  | 'onFocus'
  | 'title'
> & {
  label: string;
  value?: T;
};

export enum CheckboxGroupDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface CheckboxGroupPropsBase<T> extends RefAttributes<HTMLDivElement>, ValidationProps {
  className?: string;
  direction?: `${CheckboxGroupDirection}`;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange(value: T[]): void;
  options: [CheckboxOption<T>, ...CheckboxOption<T>[]];
  value: T[];
  width?: `${FormFieldWidth}`;
}

export type CheckboxGroupProps<T = unknown> = PropsWithLabels<CheckboxGroupPropsBase<T>>;

const CheckboxGroupRoot = styled.div`
  column-gap: var(--echoes-dimension-space-150);
  display: flex;
  flex-direction: column;
  row-gap: var(--echoes-dimension-space-100);
`;

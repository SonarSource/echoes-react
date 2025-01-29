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
import { type ReactNode, type RefAttributes, forwardRef, useId, useMemo } from 'react';
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
 * A checkbox group allows a user to select multiple items from a list of
 * options. A checkbox group must have at least one option.
 *
 * Each option must have a unique value. If no value is provided for an option,
 * then the option's label will be used as its value.
 *
 * The selected values may appear in any order. Equality is determined using
 * strict equality (`===`).
 *
 * The disabled state and error state will be applied to the entire group.
 * However, the disabled state or error state can be overridden per option.
 *
 * > A checkbox group is a controlled element, it requires a `value` and
 * `onChange` handler.
 *
 * **Permitted Content**
 *
 * None; it's a self closing element.
 *
 * **Permitted Parents**
 *
 * Any element that accepts flow content.
 *
 * **Example**
 *
 * ```tsx
 * <CheckboxGroup
 *   label="Favorite colors"
 *   onChange={setFavoriteColors}
 *   options={[
 *     { label: 'Red' },
 *     { label: 'Green' },
 *     { label: 'Blue' },
 *   ]}
 *   value={favoriteColors}
 * />
 * ```
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
      name,
      onChange,
      options,
      serializeValue = defaultSerializer,
      validation,
      value,
      width,
    } = props;

    const defaultId = `${useId()}checkbox`;

    const { controlId, describedBy, descriptionId, labelId, validationMessageId } =
      useFormFieldA11y({
        controlId: id ?? defaultId,
        hasDescription: Boolean(helpText),
        hasValidationMessage: Boolean(messageInvalid || messageValid),
      });

    const serializedValue = useMemo(() => {
      return name ? value.map(serializeValue) : [];
    }, [name, serializeValue, value]);

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
          id={controlId}
          ref={ref}
          role="group">
          {options.map((option) => {
            const { value: _value, ...rest } = option;
            const optionValue = 'value' in option ? option.value : option.label;

            return (
              <Checkbox
                checked={value.includes(optionValue)}
                hasError={validation === FormFieldValidation.Invalid}
                isDisabled={isDisabled}
                key={option.label}
                onCheck={(checkedState) => {
                  if ('isDisabled' in option ? option.isDisabled : isDisabled) {
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
                {...rest}
              />
            );
          })}
          {Boolean(name) && <input name={name} type="hidden" value={serializedValue} />}
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
  /**
   * The label displayed next to the checkbox.
   */
  label: string;
  /**
   * Explicitly set the value of the checkbox (optional). If not provided, the
   * label is used as the checkbox value.
   */
  value?: T;
};

/**
 * Options for how checkboxes are displayed in a group.
 */
export enum CheckboxGroupDirection {
  /**
   * Display checkboxes in a row.
   */
  Horizontal = 'horizontal',
  /**
   * Display checkboxes in a column.
   */
  Vertical = 'vertical',
}

interface CheckboxGroupPropsBase<T> extends RefAttributes<HTMLDivElement>, ValidationProps {
  /**
   * Add a `class` attribute to the root element (optional).
   */
  className?: string;
  /**
   * The direction the checkboxes are laid out in the group (optional). The default is `vertical`.
   */
  direction?: `${CheckboxGroupDirection}`;
  /**
   * The ID of the element with the role `group` (optional).
   */
  id?: string;
  /**
   * Prevent the user from interacting with the checkboxes (optional).
   */
  isDisabled?: boolean;
  /**
   * When true, an asterisk will be displayed next to the label to indicate that
   * the field is required.
   */
  isRequired?: boolean;
  /**
   * You may provide a name for the group that is used when submitting a form
   * (optional). The value of the field will be a comma separated list of the
   * selected values.
   *
   * If you need to control how the selected values are serialized, you can
   * provide a custom serializer using the `serializeValue` prop.
   */
  name?: string;
  /**
   * Called when the value of the group changes.
   */
  onChange(value: T[]): void;
  /**
   * Defines which checkboxes are available in the group. Each checkbox should
   * have a unique value.
   */
  options: [CheckboxOption<T>, ...CheckboxOption<T>[]];
  /**
   * Provide custom serialization for the selected values (optional). The
   * default behavior is to cast each value to a string.
   */
  serializeValue?: (value: T) => string;
  /**
   * An unordered list of the selected values. The value of each checkbox is
   * assumed to be unique.
   */
  value: T[];
  /**
   * Controls the width of the form field (optional). The default value is
   * `full`, meaning it will take up the full width of its container.
   */
  width?: `${FormFieldWidth}`;
}

export type CheckboxGroupProps<T = unknown> = PropsWithLabels<CheckboxGroupPropsBase<T>>;

const CheckboxGroupRoot = styled.div`
  column-gap: var(--echoes-dimension-space-300);
  display: flex;
  flex-direction: column;
  row-gap: var(--echoes-dimension-space-100);

  &[data-direction='horizontal'] {
    flex-direction: row;
  }
`;

/**
 * Takes an unknown value and coerces it to a string.
 */
const defaultSerializer = (value: unknown) => String(value);

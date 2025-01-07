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
import { type ReactNode, forwardRef, useId, useMemo } from 'react';
import { PropsWithLabels } from '~types/utils';
import { HelperText, Label } from '../typography';
import { FormFieldContext, FormFieldState } from './FormFieldContext';

export type FormFieldProps = {
  children: ReactNode;
  state?: `${FormFieldState}`;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ state = FormFieldState.None, ...props }, ref) => {
    const id = useId();
    const value = useMemo(() => ({ id, state: state as FormFieldState }), [id, state]);

    return (
      <FormFieldContext.Provider value={value}>
        <div ref={ref} {...props} />
      </FormFieldContext.Provider>
    );
  },
);

FormField.displayName = 'FormField';

/*
 * An alternative version that uses props for defining valid "slots". The
 * `children` prop is assumed to be the "form control".
 */

export type WithPropsProps = {
  children: ReactNode;
  label?: ReactNode;
  message?: ReactNode;
  state?: `${FormFieldState}`;
};

export const WithProps = forwardRef<HTMLDivElement, WithPropsProps>(
  ({ children, label, message, state = FormFieldState.None, ...props }, ref) => {
    const id = useId();
    const value = useMemo(() => ({ id, state: state as FormFieldState }), [id, state]);

    return (
      <FormFieldContext.Provider value={value}>
        <div ref={ref} {...props}>
          {label}
          {children}
          {message}
        </div>
      </FormFieldContext.Provider>
    );
  },
);

WithProps.displayName = 'FormField';

/*
 * Following our current api on existing form components
 */

export type CurrentAPIProps = {
  children: JSX.Element;
  state?: `${FormFieldState}`;
  labelError?: JSX.Element | string;
  labelSuccess?: JSX.Element | string;
};

export const CurrentAPI = forwardRef<HTMLDivElement, PropsWithLabels<CurrentAPIProps>>(
  (
    { children, label, labelError, labelSuccess, helpText, state = FormFieldState.None, ...props },
    ref,
  ) => {
    const id = useId();
    const value = useMemo(() => ({ id, state: state as FormFieldState }), [id, state]);

    return (
      <FormFieldContext.Provider value={value}>
        <div ref={ref} {...props}>
          {label && <Label htmlFor="id">{label}</Label>}
          {children}
          {helpText && state === FormFieldState.None && <HelperText>{helpText}</HelperText>}
          {labelError && state === FormFieldState.Error && <ErrorText>{labelError}</ErrorText>}
          {labelSuccess && state === FormFieldState.Success && (
            <SuccessText>{labelSuccess}</SuccessText>
          )}
        </div>
      </FormFieldContext.Provider>
    );
  },
);

CurrentAPI.displayName = 'FormField';

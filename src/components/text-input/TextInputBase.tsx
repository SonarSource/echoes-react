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
import { InputHTMLAttributes } from 'react';
import { TextNodeOptional } from '~types/utils';
import { type ValidationProps, FormFieldProps } from '../form/FormField';

import { cssVar } from '~utils/design-tokens';

type InputEventAttributesSubset =
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
  | 'onInvalid'
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onPointerEnter'
  | 'onPointerLeave';

export type InputEventProps<T> = Pick<InputHTMLAttributes<T>, InputEventAttributesSubset>;

type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'isRequired' | 'width'>;

export interface InputProps extends ValidationProps, FormFieldPropsSubset {
  className?: string;
  helpText?: TextNodeOptional;
  isDisabled?: boolean;
  placeholder?: string;
  value?: string | number;
}

export const InputStyled = styled.input`
  color: ${cssVar('color-text-default')};
  background-color: ${cssVar('form-control-colors-background-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('form-control-colors-border-default')};
  border-radius: ${cssVar('form-control-border-radius-default')};

  font: ${cssVar('typography-text-default-regular')};
  text-overflow: ellipsis;

  box-sizing: border-box;
  width: 100%;
  height: ${cssVar('form-control-sizes-height-default')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};

  &::placeholder {
    color: ${cssVar('color-text-placeholder')};
  }
  &:hover {
    background-color: ${cssVar('form-control-colors-background-hover')};
  }
  &[data-valid] {
    border-color: ${cssVar('color-border-success-default')};
  }
  &[data-error] {
    border-color: ${cssVar('color-border-danger-default')};
  }
  &[data-prefix] {
    padding-left: calc(
      ${cssVar('dimension-space-150')} + ${cssVar('dimension-width-300')} +
        ${cssVar('dimension-space-100')}
    );
  }
  &[data-suffix] {
    padding-right: calc(
      ${cssVar('dimension-space-150')} + ${cssVar('dimension-width-300')} +
        ${cssVar('dimension-space-100')}
    );
  }

  &:active,
  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: ${cssVar('form-control-colors-border-focus')};
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
  }

  &:disabled,
  &:disabled:hover {
    color: ${cssVar('color-text-disabled')};
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};
    outline: none;
    cursor: not-allowed;

    &::placeholder {
      color: ${cssVar('color-text-disabled')};
    }
  }
`;
InputStyled.displayName = 'InputStyled';

export const InputWrapper = styled.div`
  isolation: isolate; // Prevents the z-index changes of elements inside the InputWrapper from affecting layers outside

  position: relative;
  display: flex;
  align-items: center;
`;
InputWrapper.displayName = 'InputWrapper';

const InputIconWrapper = styled.span`
  position: absolute;

  font-size: ${cssVar('font-size-30')};
  color: ${cssVar('form-control-colors-icon-default')};

  &[data-disabled] {
    color: ${cssVar('color-icon-disabled')};
    cursor: not-allowed;
  }
`;
InputIconWrapper.displayName = 'InputIconWrapper';

export const InputPrefix = styled(InputIconWrapper)`
  left: ${cssVar('dimension-space-150')};
`;
InputPrefix.displayName = 'InputPrefix';

export const InputSuffix = styled(InputIconWrapper)`
  right: ${cssVar('dimension-space-150')};
`;
InputSuffix.displayName = 'InputSuffix';

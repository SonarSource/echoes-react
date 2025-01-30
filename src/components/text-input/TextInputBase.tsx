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
import { type ValidationProps, FormFieldWidth } from '../form/FormField';

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

export interface InputProps extends ValidationProps {
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  value?: string | number;
  width?: `${FormFieldWidth}`;
}

export const InputStyled = styled.input`
  color: var(--echoes-color-text-default);
  background-color: var(--echoes-form-control-colors-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-form-control-colors-border-default);
  border-radius: var(--echoes-form-control-border-radius-default);

  font: var(--echoes-typography-text-default-regular);
  text-overflow: ellipsis;

  box-sizing: border-box;
  width: 100%;
  height: var(--echoes-form-control-sizes-height-default);
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-150);

  &::placeholder {
    color: var(--echoes-color-text-placeholder);
  }
  &:hover {
    background-color: var(--echoes-form-control-colors-background-hover);
  }
  &[data-valid] {
    border-color: var(--echoes-color-border-success);
  }
  &[data-error] {
    border-color: var(--echoes-color-border-danger);
  }
  &[data-prefix] {
    padding-left: calc(
      var(--echoes-dimension-space-150) + var(--echoes-dimension-width-300) +
        var(--echoes-dimension-space-100)
    );
  }
  &[data-suffix] {
    padding-right: calc(
      var(--echoes-dimension-space-150) + var(--echoes-dimension-width-300) +
        var(--echoes-dimension-space-100)
    );
  }

  &:active,
  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: var(--echoes-form-control-colors-border-focus);
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
  }

  &:disabled,
  &:disabled:hover {
    color: var(--echoes-color-text-disabled);
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
    outline: none;
    cursor: not-allowed;

    &::placeholder {
      color: var(--echoes-color-text-disabled);
    }
  }
`;
InputStyled.displayName = 'InputStyled';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
InputWrapper.displayName = 'InputWrapper';

const InputIconWrapper = styled.span`
  position: absolute;

  font-size: var(--echoes-font-size-30);
  color: var(--echoes-form-control-colors-icon-default);

  [data-disabled] & {
    color: var(--echoes-color-icon-disabled);
    cursor: not-allowed;
  }
`;
InputIconWrapper.displayName = 'InputIconWrapper';

export const InputPrefix = styled(InputIconWrapper)`
  left: var(--echoes-dimension-space-150);
`;
InputPrefix.displayName = 'InputPrefix';

export const InputSuffix = styled(InputIconWrapper)`
  right: var(--echoes-dimension-space-150);
`;
InputSuffix.displayName = 'InputSuffix';

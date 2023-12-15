/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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
import { useCallback } from 'react';
import { Spinner } from '../spinner';
import { CheckboxIcon } from './CheckboxIcon';

interface Props {
  checked: boolean | 'indeterminate';
  className?: string;

  label?: string;
  ariaLabel?: string;
  title?: string;
  id?: string;

  isDisabled?: boolean;
  isLoading?: boolean;

  onCheck: (checked: boolean | 'indeterminate', id?: string) => void;
  onFocus?: VoidFunction;
}

export function Checkbox(props: Readonly<Props>) {
  const { checked, className, label, ariaLabel, title, id, isDisabled, isLoading = false } = props;
  const { onCheck, onFocus } = props;

  const handleChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (!isDisabled && !isLoading) {
        onCheck(checked, id);
      }
    },
    [isDisabled, isLoading, onCheck, id],
  );

  return (
    <CheckboxContainer
      aria-disabled={isDisabled}
      as={label ? 'label' : 'span'}
      className={className}>
      <Spinner isLoading={isLoading}>
        <CheckboxRoot
          aria-disabled={isDisabled}
          aria-label={ariaLabel ?? title}
          checked={checked}
          id={id}
          onCheckedChange={handleChange}
          onFocus={onFocus}
          title={title}>
          <CheckboxIndicator>
            <CheckboxIcon checked={checked} />
          </CheckboxIndicator>
        </CheckboxRoot>
      </Spinner>
      {label && <Label>{label}</Label>}
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.span`
  display: inline-flex;
  align-items: center;
  vertical-align: text-bottom;

  &[aria-disabled='true'] {
    color: var(--echoes-color-text-disabled);
    pointer-events: none;
  }
`;

const CheckboxRoot = styled(RadixCheckbox.Root)`
  color: var(--echoes-color-text-on-color);
  background-color: var(--echoes-color-background-transparent);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-accent);

  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
  border-radius: var(--echoes-border-radius-100);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &[aria-disabled='true'] {
    color: var(--echoes-color-text-disabled);
    background-color: var(--echoes-color-background-accent-weak-disabled);
    border: var(--echoes-color-border-disabled);

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-accent-default-disabled);
    }

    &:focus,
    &:focus-visible {
      outline: var(--echoes-color-border-disabled) solid 2px;
      outline-offset: var(--echoes-dimension-space-25);
    }
  }

  &:not([aria-disabled='true']) {
    &:focus,
    &:focus-visible {
      outline: var(--echoes-color-border-focus) solid 2px;
      outline-offset: var(--echoes-dimension-space-25);
    }

    &:hover {
      background-color: var(--echoes-color-background-accent-weak);
      border: var(--echoes-border-width-default) solid var(--echoes-color-border-accent);
    }

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-accent-default);

      &:hover {
        background-color: var(--echoes-color-background-accent-default-hover);
        border: var(--echoes-border-width-default) solid
          var(--echoes-color-background-accent-default-hover);
      }
    }
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
`;

const Label = styled.span`
  margin-left: var(--echoes-dimension-space-75);
`;

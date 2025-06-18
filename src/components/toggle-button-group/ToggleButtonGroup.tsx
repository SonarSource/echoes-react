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
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { forwardRef, ReactNode, useCallback } from 'react';

interface ToggleOption {
  label: string;
  value: string;

  iconLeft?: ReactNode;
  suffix?: ReactNode;
}

export interface ToggleButtonGroupProps {
  /**
   * An array of toggle options to be displayed in the group.
   */
  options: ToggleOption[];

  // Group Props
  //=========================================================

  className?: string;

  isDisabled?: boolean;
  /**
   * Callback function triggered when the selected value changes.
   * @param value - The newly selected value.
   */
  onChange: (value: string) => void;

  /**
   * The currently selected value in the toggle button group.
   */
  selected: string;
}

export const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  (props, ref) => {
    const { isDisabled = false, onChange, options, selected, ...additionalProps } = props;

    const handleChange = useCallback(
      (value: string) => {
        if (value) {
          onChange(value);
        }
      },
      [onChange],
    );

    return (
      <StyledRoot
        {...additionalProps}
        disabled={isDisabled}
        onValueChange={handleChange}
        ref={ref}
        type="single"
        value={selected}>
        {options.map((option) => (
          <ToggleButtonItem key={option.value} {...option} />
        ))}
      </StyledRoot>
    );
  },
);

ToggleButtonGroup.displayName = 'ToggleButtonGroup';

interface ToggleButtonItemProps extends ToggleOption {}

function ToggleButtonItem(props: ToggleButtonItemProps) {
  const { value, label, iconLeft, suffix } = props;

  return (
    <StyledItem value={value}>
      <StyledItemInner>
        {iconLeft}
        <StyledItemLabel data-text={label}>{label}</StyledItemLabel>
        {suffix}
      </StyledItemInner>
    </StyledItem>
  );
}

const StyledRoot = styled(RadixToggleGroup.Root)`
  isolation: isolate; // Prevents the z-index changes of the items inside from affecting layers outside the ToggleButtonGroup

  display: inline-flex;
  flex-direction: row;
  align-items: center;

  background-color: var(--echoes-color-background-neutral-weak-default);
  border-radius: var(--echoes-border-radius-200);
`;

const StyledItemInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: var(--echoes-border-radius-200);

  padding: var(--echoes-dimension-space-50) var(--echoes-dimension-space-150);
`;

const StyledItemLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // The following is a hack to force the width to stay constant between active and inactive.
  // It prevents a wobble effect when changing the selection.
  // The way the hack works:
  // We add a hidden copy of the label with the font weight the label has when active.
  // This forces the container to always have the width the semi-bold label requires.
  &::before {
    content: attr(data-text);
    display: block;
    height: 0;
    overflow: hidden;
    font-weight: var(--echoes-font-weight-semi-bold);
    visibility: hidden; // This makes the copy invisible to screen readers as well
  }
`;

const StyledItem = styled(RadixToggleGroup.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;

  font: var(--echoes-typography-text-default-regular);
  color: var(--echoes-color-text-default);

  gap: var(--echoes-dimension-space-50);
  padding: var(--echoes-dimension-space-50);

  background-color: transparent;
  border: var(--echoes-border-width-default) solid transparent;
  border-radius: var(--echoes-border-radius-200);

  cursor: pointer;

  &:hover:not([data-state='on'], :disabled) ${StyledItemInner} {
    background-color: var(--echoes-color-background-neutral-bolder);
  }

  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
    border-radius: var(--echoes-border-radius-200);
    z-index: 1;
  }

  &:disabled {
    color: var(--echoes-color-text-disabled);
    background-color: var(--echoes-color-background-disabled);
    cursor: default;
  }

  &[data-state='on'] {
    background-color: var(--echoes-color-background-default);
    border-color: var(--echoes-color-border-bold);
    border-radius: var(--echoes-border-radius-200);
    font-weight: var(--echoes-font-weight-semi-bold);
    box-shadow: var(--echoes-box-shadow-xsmall);
    cursor: default;
  }

  // Separator is always present but only visible between inactive options
  & + &::before {
    content: '';
    background-color: transparent;
    width: 1px;
    height: 28px;
    margin-left: -6px;
  }

  &:not([data-state='on']) + &:not([data-state='on'])::before {
    background-color: var(--echoes-color-border-weak);
  }
`;

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

  /**
   * Callback function triggered when the selected value changes.
   * @param value - The newly selected value.
   */
  onChange: (value: string) => void;

  /**
   * The currently selected value in the toggle button group.
   * If undefined, no option is selected.
   */
  selected: string | undefined;
}

export const ToggleButtonGroup = forwardRef<HTMLDivElement, ToggleButtonGroupProps>(
  (props, ref) => {
    const { onChange, options, selected } = props;

    const handleChange = useCallback(
      (value: string) => {
        if (value) {
          onChange(value);
        }
      },
      [onChange],
    );

    return (
      <StyledRoot onValueChange={handleChange} ref={ref} type="single" value={selected}>
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
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: var(--echoes-color-background-neutral-weak-default);
  border-radius: var(--echoes-border-radius-200);

  font: var(--echoes-typography-text-default-semi-bold);
  color: var(--echoes-color-text-default);
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

  // This is a hack to force the width to stay constant between active and inactive
  // we add a hidden copy of the label above it that takes the space it would if it were active
  &::before {
    content: attr(data-text);
    display: block;
    height: 0;
    overflow: hidden;
    font-weight: var(--echoes-font-weight-semi-bold);
    visibility: hidden;
  }
`;

const StyledItem = styled(RadixToggleGroup.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;

  font: var(--echoes-typography-text-default-regular);

  gap: var(--echoes-dimension-space-50);
  padding: var(--echoes-dimension-space-50);

  background-color: transparent;
  border: var(--echoes-border-width-default) solid transparent;

  &:hover:not([data-state='on']) ${StyledItemInner} {
    background-color: var(--echoes-color-background-neutral-bolder);
  }

  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
    border-radius: var(--echoes-border-radius-200);
    z-index: 1;
  }

  &[data-state='on'] {
    background-color: var(--echoes-color-background-default);
    border-color: var(--echoes-color-border-bold);
    border-radius: var(--echoes-border-radius-200);
    font-weight: var(--echoes-font-weight-semi-bold);
    box-shadow: var(--echoes-box-shadow-xsmall);
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

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
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';

interface Props {
  onChange?: (value: string) => void;
  options: RadioOption[];

  // Group Props
  defaultValue?: string;
  disabled?: boolean;
  id: string;
  required?: boolean;
  value?: string;
}

export function RadioButtonGroup(props: Readonly<Props>) {
  const { onChange, options, ...groupProps } = props;

  return (
    <RadioGroupWrapper onValueChange={onChange} {...groupProps}>
      {options.map((o) => (
        <RadioButton groupId={groupProps.id} key={o.value} {...o} />
      ))}
    </RadioGroupWrapper>
  );
}

/*
 * Related to the explanation below, we require an aria-label if the label is a ReactNode.
 * If the label is a string, we use it directly as a fallback if no aria-label is provided
 */
type RadioOption = {
  disabled?: boolean;
  value: string;
} & ({ ariaLabel: string; label: ReactNode } | { ariaLabel?: string; label: string });

interface InternalRadioButtonProps {
  groupId: string;
}

type RadioButtonProps = RadioOption & InternalRadioButtonProps;

function RadioButton(props: Readonly<RadioButtonProps>) {
  const { ariaLabel, disabled, groupId, label, value } = props;

  const id = `${groupId}-${value}`;

  /*
   * Although the HTML spec defines buttons as valid targets for labels,
   * some Screen Readers have issues with those:
   * https://github.com/dequelabs/axe-core/issues/3696#issuecomment-1665575742
   * So here we force an aria-label:
   */
  const inputLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <OptionWrapper>
      <Input aria-label={inputLabel} disabled={disabled} id={id} value={value}>
        <SelectionIndicator />
      </Input>
      <Label htmlFor={id} {...(disabled ? { 'data-disabled': true } : {})}>
        {label}
      </Label>
    </OptionWrapper>
  );
}

const RadioGroupWrapper = styled(RadioGroup.Root)``;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: var(--size-spacing-sm) 0;
`;

const Input = styled(RadioGroup.Item)`
  appearance: none;
  cursor: pointer;
  background-color: transparent;

  box-sizing: border-box;
  padding: 0;
  border: 1px solid var(--radio-fg);
  border-radius: 100%;

  height: var(--size-dimension-md);
  width: var(--size-dimension-md);
  min-width: var(--size-dimension-md);

  &:hover,
  &[data-state='checked'] {
    background-color: var(--radio-bg);
  }

  &:focus,
  &:focus-visible {
    background-color: var(--radio-bg);
    outline: var(--radio-bg) solid 4px;
  }

  &:disabled {
    cursor: default;
    background-color: var(--radio-bg-disabled);
    border-color: var(--radio-fg-disabled);
  }
`;

const SelectionIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;

    box-sizing: border-box;
    height: var(--radio-size-indicator);
    width: var(--radio-size-indicator);
    border-radius: 50%;

    background-color: var(--radio-fg);
  }

  &[data-disabled]::after {
    background-color: var(--radio-fg-disabled);
  }
`;

const Label = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
  margin-left: var(--size-spacing-sm);

  [data-disabled] &, /* disabled group */
  &[data-disabled] /* disabled option */ {
    cursor: default;
  }
`;

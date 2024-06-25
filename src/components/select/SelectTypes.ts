/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { Select as MantineSelect, SelectItem as MantineSelectItem } from '@mantine/core';
import { ComponentProps, ReactNode } from 'react';
import { InputSize } from '../../utils/inputs';

type MantineSelectProps = ComponentProps<typeof MantineSelect>;

export enum SelectHighlight {
  Default = 'default',
  Ghost = 'unstyled',
}

export enum SelectOptionType {
  Check = 'check',
  Radio = 'radio',
}

export interface SelectOption extends MantineSelectItem {
  prefix?: ReactNode;
  suffix?: ReactNode;
  helpText?: JSX.Element | string;
}

export interface SelectBaseProps {
  className?: string;
  data: ReadonlyArray<SelectOption>;
  defaultValue?: MantineSelectProps['defaultValue'];
  hasError?: boolean;
  highlight?: SelectHighlight;
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotClearable?: boolean;
  isRequired?: boolean;
  labelError?: MantineSelectProps['error'];
  labelNotFound?: MantineSelectProps['nothingFound'];
  limit?: MantineSelectProps['limit']; // might change for a max height
  name?: MantineSelectProps['name'];
  optionComponent?: MantineSelectProps['itemComponent'];
  optionType?: SelectOptionType;
  onChange: MantineSelectProps['onChange'];
  onOpen?: MantineSelectProps['onDropdownOpen'];
  placeholder?: MantineSelectProps['placeholder'];
  size?: InputSize;
  value: MantineSelectProps['value'];
  valueIcon?: MantineSelectProps['icon'];
}

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
import { ComboboxItem } from '@mantine/core';
import { ReactNode } from 'react';

export enum SelectHighlight {
  Default = 'default',
  Ghost = 'unstyled',
}

export enum SelectOptionType {
  Check = 'check',
  Radio = 'radio',
}

export interface SelectOption extends ComboboxItem {
  prefix?: ReactNode;
  suffix?: ReactNode;
  helpText?: JSX.Element | string;
  group?: never;
}

export interface SelectOptionGroup<T = SelectOption> {
  group: string;
  items: T[];
}

export type SelectData =
  | Array<SelectOption | SelectOptionGroup>
  | ReadonlyArray<SelectOption | SelectOptionGroup>;

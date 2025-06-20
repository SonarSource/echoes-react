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

import { JSX } from 'react';

export type TextNode = JSX.Element | string | Iterable<TextNode>;
export type TextNodeOptional = TextNode | boolean | null | Iterable<TextNodeOptional>;

export interface PropsLabel {
  ariaLabel?: string;
  ariaLabelledBy?: never;
  id?: string;
  label: TextNode;
  helpText?: TextNodeOptional;
}

export interface PropsAriaLabel {
  ariaLabel: string;
  ariaLabelledBy?: never;
  id?: string;
  label?: never;
  helpText?: never;
}

export interface PropsAriaLabelledBy {
  ariaLabel?: never;
  ariaLabelledBy: string;
  id?: string;
  label?: never;
  helpText?: never;
}

export interface PropsAriaLabelViaId {
  ariaLabel?: never;
  ariaLabelledBy?: never;
  id: string;
  label?: never;
  helpText?: never;
}

export type PropsWithLabels<T> = T &
  (PropsLabel | PropsAriaLabel | PropsAriaLabelledBy | PropsAriaLabelViaId);

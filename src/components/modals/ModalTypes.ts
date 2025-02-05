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

import { ReactNode } from 'react';
import { TextNodeOptional } from '~types/utils';

export enum ModalSize {
  Default = 'default',
  Wide = 'wide',
}

interface CommonProps {
  /**
   * Interactive element that triggers the display of the Dialog.
   * It should forward it's ref and props to the DOM.
   */
  children?: ReactNode;
  /**
   * Main content of the dialog, won't be automatically announced.
   * Optional since a dialog could have only the title and description.
   */
  content?: ReactNode;
  isDefaultOpen?: boolean;
  /** An accessible title to be announced when the dialog is opened. */
  title?: TextNodeOptional;
}

interface UncontrolledProps extends CommonProps {
  isOpen?: never;
  onOpenChange?: never;
}

interface ControlledProps extends CommonProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export type ModalCommonProps = UncontrolledProps | ControlledProps;

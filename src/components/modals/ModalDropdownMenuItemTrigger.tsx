/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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

import { ReactNode, useContext, useEffect } from 'react';
import { isDefined } from '~common/helpers/types';
import { DropdownMenuContext } from '../dropdown-menu/DropdownMenuContext';
import { isDropdownMenuItemComponent } from '../dropdown-menu/DropdownMenuItemBase';

/**
 * When a Modal is triggered by a DropdownMenu item, the Modal is rendered inside the menu content.
 * Selecting the item must close the menu, but its content has to stay mounted for as long as the
 * Modal is open, otherwise the Modal would be unmounted along with it.
 *
 * Returns the props to add to the Modal trigger so that the menu keeps its content mounted.
 *
 * @internal
 */
export function useModalDropdownMenuItemTriggerProps(trigger: ReactNode) {
  const dropdownMenuContext = useContext(DropdownMenuContext);

  if (!isDefined(dropdownMenuContext) || !isDropdownMenuItemComponent(trigger)) {
    return {};
  }

  return { onSelect: dropdownMenuContext.keepContentMounted };
}

/**
 * Rendered inside the content of a Modal: keeps the DropdownMenu content mounted while the Modal
 * content is mounted, and lets the closed menu unmount its content once the Modal content is gone.
 *
 * @internal
 */
export function ModalDropdownMenuItemRelease() {
  const dropdownMenuContext = useContext(DropdownMenuContext);

  useEffect(() => dropdownMenuContext?.retainContent(), [dropdownMenuContext]);

  return null;
}
ModalDropdownMenuItemRelease.displayName = 'ModalDropdownMenuItemRelease';

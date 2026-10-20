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

import { createContext, useContext } from 'react';
import { isDefined } from '~common/helpers/types';

// Elements marked with this attribute belong to the undocked sidebar interaction zone.
// Moving pointer or focus between them must not close the sidebar.
export const SIDEBAR_INTERACTION_ZONE_ATTRIBUTE = 'data-sidebar-interaction-zone';

// Portaled overlays (e.g. dropdown menus) leave the zone's DOM subtree, so they read this
// context to mark themselves as part of the zone they were opened from.
export const SidebarInteractionZoneContext = createContext(false);

export function useSidebarInteractionZoneAttributes() {
  const isInSidebarInteractionZone = useContext(SidebarInteractionZoneContext);

  return isInSidebarInteractionZone ? { [SIDEBAR_INTERACTION_ZONE_ATTRIBUTE]: 'true' } : {};
}

export function isWithinSidebarInteractionZone(target: EventTarget | null) {
  return (
    target instanceof Element &&
    isDefined(target.closest(`[${SIDEBAR_INTERACTION_ZONE_ATTRIBUTE}='true']`))
  );
}

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

import { useContext, useLayoutEffect, useRef } from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';
import { isDefined } from '~common/helpers/types';

import { SidebarNavigationBaseItem } from './SidebarNavigationBaseItem';

import {
  SidebarNavigationAccordionContext,
  type SidebarNavigationAccordionChildActiveHandler,
} from './SidebarNavigationAccordionContext';

import {
  SidebarNavigationIconComponent,
  SidebarNavigationItemBaseProps,
} from './SidebarNavigationTypes';

export interface SidebarNavigationAccordionChildItemProps extends SidebarNavigationItemBaseProps {
  /**
   * The icon component to display at the start of the SidebarNavigationAccordionChildItem.
   * Must be an Echoes Icon component. Omit it for icon-less accordion child rows.
   */
  Icon?: SidebarNavigationIconComponent;
}

export function SidebarNavigationAccordionChildItem(
  props: Readonly<SidebarNavigationAccordionChildItemProps>,
) {
  const handleChildActive = useContext(SidebarNavigationAccordionContext);

  if (!isDefined(handleChildActive)) {
    return <SidebarNavigationBaseItem {...props} />;
  }

  return (
    <SidebarNavigationAccordionChildItemWithAutoOpen
      handleChildActive={handleChildActive}
      {...props}
    />
  );
}

SidebarNavigationAccordionChildItem.displayName = 'SidebarNavigationAccordionChildItem';

type SidebarNavigationAccordionChildItemWithAutoOpenProps =
  SidebarNavigationAccordionChildItemProps & {
    handleChildActive: SidebarNavigationAccordionChildActiveHandler;
  };

function SidebarNavigationAccordionChildItemWithAutoOpen(
  props: Readonly<SidebarNavigationAccordionChildItemWithAutoOpenProps>,
) {
  const { handleChildActive, isActive, isMatchingFullPath = false, to, ...restProps } = props;

  const resolvedPath = useResolvedPath(to);
  const routeMatch = useMatch({ end: isMatchingFullPath, path: resolvedPath.pathname });
  const resolvedIsActive = isDefined(isActive) ? isActive : isDefined(routeMatch);
  const wasActiveRef = useRef(false);

  useLayoutEffect(() => {
    if (resolvedIsActive && !wasActiveRef.current) {
      handleChildActive();
    }

    wasActiveRef.current = resolvedIsActive;
  }, [handleChildActive, resolvedIsActive]);

  return (
    <SidebarNavigationBaseItem
      {...restProps}
      isActive={isActive}
      isMatchingFullPath={isMatchingFullPath}
      to={to}
    />
  );
}

SidebarNavigationAccordionChildItemWithAutoOpen.displayName =
  'SidebarNavigationAccordionChildItemWithAutoOpen';

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
import { forwardRef, PropsWithChildren, useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { LayoutContext } from '../LayoutContext';
import { GlobalGridArea } from '../LayoutTypes';

export interface SidebarNavigationProps {
  /**
   * Sidebar navigation Aria-label, defaults to "Secondary navigation"
   */
  ariaLabel?: string;
}

export const SidebarNavigation = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SidebarNavigationProps>
>((props, ref) => {
  const { ariaLabel, children } = props;
  const intl = useIntl();
  const { setHasSidebar } = useContext(LayoutContext);

  useEffect(() => {
    setHasSidebar(true);
    return () => {
      setHasSidebar(false);
    };
  }, [setHasSidebar]);

  const defaultAriaLabel = intl.formatMessage({
    id: 'sidebar_navigation.label',
    defaultMessage: 'Secondary navigation',
    description: 'ARIA-label for the sidebar navigation',
  });

  return (
    <SidebarNavigationContainer>
      <SidebarNavigationWrapper aria-label={ariaLabel ?? defaultAriaLabel} ref={ref}>
        {children}
      </SidebarNavigationWrapper>
    </SidebarNavigationContainer>
  );
});

SidebarNavigation.displayName = 'SidebarNavigation';

const SidebarNavigationContainer = styled.div`
  grid-area: ${GlobalGridArea.sidebar};
  position: relative;

  width: calc(var(--sidebar-navigation-container-width) + ${cssVar('border-width-default')});

  z-index: 1; // Ensure the sidebar is showing over the content

  --sidebar-navigation-container-width: ${cssVar('layout-sidebar-navigation-sizes-width-closed')};

  [data-sidebar-docked='true'] & {
    --sidebar-navigation-container-width: ${cssVar('layout-sidebar-navigation-sizes-width-open')};
  }
`;
SidebarNavigationContainer.displayName = 'SidebarNavigationContainer';

const SidebarNavigationWrapper = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  overflow: hidden;

  padding-top: ${cssVar('dimension-space-250')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  background-color: ${cssVar('sidebar-navigation-colors-background-default')};

  transition: width 0.1s;

  width: var(--sidebar-navigation-width);

  --sidebar-navigation-width: ${cssVar('layout-sidebar-navigation-sizes-width-open')};

  // hover and focus-within pilotes the open state of the sidebar
  [data-sidebar-docked='false'] &:not(:hover, :focus-within) {
    --sidebar-navigation-width: ${cssVar('layout-sidebar-navigation-sizes-width-closed')};
  }

  [data-sidebar-docked='false'] &:is(:hover, :focus-within) {
    box-shadow: ${cssVar('box-shadow-x-large')};
  }
`;
SidebarNavigationWrapper.displayName = 'SidebarNavigationWrapper';

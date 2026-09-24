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

import styled from '@emotion/styled';

import { type PropsWithChildren, type Ref, useContext, useLayoutEffect } from 'react';

import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { LayoutSidebarContext } from '../LayoutSidebarContext';

import { SIDEBAR_INTERACTION_ZONE_ATTRIBUTE } from '../LayoutSidebarInteraction';

import { GlobalGridArea } from '../LayoutTypes';

const SIDEBAR_NAVIGATION_ATTRIBUTE = 'data-sidebar-navigation';

export interface SidebarNavigationProps {
  /**
   * Sidebar navigation Aria-label, defaults to "Secondary navigation"
   */
  ariaLabel?: string;
  /** Optional CSS class name applied to the root container */
  className?: string;
  /** React ref forwarded to the root navigation element */
  ref?: Ref<HTMLElement>;
}

export function SidebarNavigation(props: Readonly<PropsWithChildren<SidebarNavigationProps>>) {
  const { ariaLabel, children, className, ref, ...rest } = props;
  const intl = useIntl();
  const sidebar = useContext(LayoutSidebarContext);
  const { setIsInLayout } = sidebar;

  // Mark the sidebar as in-layout before paint to avoid a docked/closed mount flicker
  useLayoutEffect(() => {
    setIsInLayout(true);

    return () => {
      setIsInLayout(false);
    };
  }, [setIsInLayout]);

  const defaultAriaLabel = intl.formatMessage({
    id: 'sidebar_navigation.label',
    defaultMessage: 'Secondary navigation',
    description: 'ARIA-label for the sidebar navigation',
  });

  function handleOpenSidebarOnInteraction() {
    if (!sidebar.isDocked || !sidebar.isDockable) {
      sidebar.open();
    }
  }

  return (
    <SidebarNavigationContainer
      {...rest}
      {...{
        [SIDEBAR_INTERACTION_ZONE_ATTRIBUTE]: 'true',
        [SIDEBAR_NAVIGATION_ATTRIBUTE]: 'true',
      }}
      className={className}
      data-testid="sidebar-navigation-container"
      onMouseEnter={handleOpenSidebarOnInteraction}
      onMouseLeave={(event) => {
        sidebar.handleInteractionZoneMouseLeave(event.relatedTarget);
      }}>
      <SidebarNavigationWrapper
        aria-hidden={!sidebar.isOpen}
        aria-label={ariaLabel ?? defaultAriaLabel}
        data-testid="sidebar-navigation-wrapper"
        onBlur={(event) => {
          sidebar.handleInteractionZoneBlur(event.relatedTarget);
        }}
        onFocus={handleOpenSidebarOnInteraction}
        ref={ref}>
        {children}
      </SidebarNavigationWrapper>
    </SidebarNavigationContainer>
  );
}

SidebarNavigation.displayName = 'SidebarNavigation';

const SidebarNavigationContainer = styled.div`
  grid-area: ${GlobalGridArea.sidebar};
  position: relative;

  width: ${cssVar('dimension-width-0')};

  z-index: 1; // Ensure the sidebar is showing over the content

  [data-sidebar-docked='true'] & {
    width: calc(
      ${cssVar('layout-sidebar-navigation-sizes-width-open')} + ${cssVar('border-width-default')}
    );
  }

  transition: width 0.1s;

  [data-sidebar-docked='false'] & {
    transition: none;
  }
`;

SidebarNavigationContainer.displayName = 'SidebarNavigationContainer';

const SidebarNavigationWrapper = styled.nav`
  background-color: ${cssVar('color-surface-default')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  bottom: 0;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  left: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translateX(-100%);
  visibility: hidden;
  width: ${cssVar('layout-sidebar-navigation-sizes-width-open')};

  transition:
    opacity 0.1s,
    transform 0.1s,
    visibility 0s linear 0.1s;

  [data-sidebar-open='true'] & {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    transition-delay: 0s;
    visibility: visible;
  }

  [data-sidebar-docked='false'][data-sidebar-open='true'] & {
    box-shadow: ${cssVar('box-shadow-x-large')};
  }
`;

SidebarNavigationWrapper.displayName = 'SidebarNavigationWrapper';

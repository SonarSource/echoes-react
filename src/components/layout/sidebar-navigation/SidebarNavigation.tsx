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
import { type PropsWithChildren, type Ref, useCallback, useContext, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';
import { LayoutContext } from '../LayoutContext';
import { SIDEBAR_INTERACTION_BOUNDARY_ATTRIBUTE } from '../LayoutSidebarInteraction';
import { GlobalGridArea } from '../LayoutTypes';

export interface SidebarNavigationProps {
  /**
   * Sidebar navigation Aria-label, defaults to "Secondary navigation"
   */
  ariaLabel?: string;
  /** Optional CSS class name applied to the root container. */
  className?: string;
  /** React ref forwarded to the root navigation element. */
  ref?: Ref<HTMLElement>;
}

export function SidebarNavigation(props: Readonly<PropsWithChildren<SidebarNavigationProps>>) {
  const { ariaLabel, children, className, ref, ...htmlProps } = props;
  const intl = useIntl();

  const {
    enterSidebarInteractionBoundary,
    handleSidebarInteractionBoundaryBlur,
    handleSidebarInteractionBoundaryExit,
    isSidebarOpen,
    openSidebar,
    setHasSidebar,
    setSidebarInteractionSafeAreaElement,
  } = useContext(LayoutContext);

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

  const handleSidebarNavigationRef = useCallback(
    (element: HTMLElement | null) => {
      setSidebarInteractionSafeAreaElement(element);

      if (typeof ref === 'function') {
        ref(element);
      } else if (isDefined(ref)) {
        ref.current = element;
      }
    },
    [ref, setSidebarInteractionSafeAreaElement],
  );

  return (
    <SidebarNavigationContainer className={className} {...htmlProps}>
      <SidebarNavigationWrapper
        {...{ [SIDEBAR_INTERACTION_BOUNDARY_ATTRIBUTE]: 'true' }}
        aria-hidden={!isSidebarOpen}
        aria-label={ariaLabel ?? defaultAriaLabel}
        onBlur={(event) => {
          handleSidebarInteractionBoundaryBlur(event.relatedTarget);
        }}
        onFocus={openSidebar}
        onMouseEnter={enterSidebarInteractionBoundary}
        onMouseLeave={(event) => {
          handleSidebarInteractionBoundaryExit(event.clientX, event.relatedTarget);
        }}
        ref={handleSidebarNavigationRef}>
        {children}
      </SidebarNavigationWrapper>
    </SidebarNavigationContainer>
  );
}

SidebarNavigation.displayName = 'SidebarNavigation';

const SidebarNavigationContainer = styled.div`
  grid-area: ${GlobalGridArea.sidebar};
  position: relative;

  width: var(--sidebar-navigation-container-width);

  z-index: 1; // Ensure the sidebar is showing over the content

  --sidebar-navigation-container-width: ${cssVar('dimension-width-0')};

  [data-sidebar-docked='true'] & {
    --sidebar-navigation-container-width: calc(
      ${cssVar('layout-sidebar-navigation-sizes-width-open')} + ${cssVar('border-width-default')}
    );
  }

  transition: width 0.1s;
`;

SidebarNavigationContainer.displayName = 'SidebarNavigationContainer';

const SidebarNavigationWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-100%);
  visibility: hidden;

  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  background-color: ${cssVar('color-surface-default')};
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

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
import { type MouseEvent, type PropsWithChildren, type Ref, useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { ButtonIcon } from '../../buttons';
import { IconDockToRight } from '../../icons';
import { LayoutContext } from '../LayoutContext';
import { SIDEBAR_INTERACTION_BOUNDARY_ATTRIBUTE } from '../LayoutSidebarInteraction';

export interface GlobalNavigationPrimaryProps extends PropsWithChildren {
  /** Optional CSS class name applied to the root element. */
  className?: string;
  /** React ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

export function GlobalNavigationPrimary(props: Readonly<GlobalNavigationPrimaryProps>) {
  const { children, className, ref, ...htmlProps } = props;

  const {
    closeSidebar,
    enterSidebarInteractionBoundary,
    handleSidebarInteractionBoundaryBlur,
    handleSidebarInteractionBoundaryExit,
    hasSidebar,
    isSidebarDockable,
    isSidebarDocked,
    openSidebar,
    setIsSidebarDocked,
  } = useContext(LayoutContext);

  const intl = useIntl();

  const handleSidebarInteractionBoundaryFocus = useCallback(() => {
    if (!isSidebarDocked || !isSidebarDockable) {
      openSidebar();
    }
  }, [isSidebarDockable, isSidebarDocked, openSidebar]);

  const handleSidebarInteractionBoundaryPointerEnter = useCallback(() => {
    if (!isSidebarDocked || !isSidebarDockable) {
      enterSidebarInteractionBoundary();
    }
  }, [enterSidebarInteractionBoundary, isSidebarDockable, isSidebarDocked]);

  const handleSidebarButtonClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (isSidebarDockable) {
        if (isSidebarDocked) {
          if (event.detail === 0) {
            openSidebar();
          } else {
            closeSidebar();
            event.currentTarget.blur();
          }
        }

        setIsSidebarDocked((isSidebarDocked) => !isSidebarDocked);

        return;
      }

      openSidebar();
    },
    [closeSidebar, isSidebarDockable, isSidebarDocked, openSidebar, setIsSidebarDocked],
  );

  let sidebarButtonAriaLabel;

  if (isSidebarDockable) {
    if (isSidebarDocked) {
      sidebarButtonAriaLabel = intl.formatMessage({
        id: 'global_navigation.sidebar.undock',
        defaultMessage: 'Undock sidebar',
      });
    } else {
      sidebarButtonAriaLabel = intl.formatMessage({
        id: 'global_navigation.sidebar.dock',
        defaultMessage: 'Dock sidebar',
      });
    }
  } else {
    sidebarButtonAriaLabel = intl.formatMessage({
      id: 'global_navigation.sidebar.open',
      defaultMessage: 'Open sidebar',
    });
  }

  return (
    <GlobalNavigationPrimaryContainer className={className} ref={ref} {...htmlProps}>
      {hasSidebar && (
        <GlobalNavigationSidebarTriggerArea
          {...{ [SIDEBAR_INTERACTION_BOUNDARY_ATTRIBUTE]: 'true' }}
          onBlur={(event) => {
            handleSidebarInteractionBoundaryBlur(event.relatedTarget);
          }}
          onFocus={handleSidebarInteractionBoundaryFocus}
          onMouseEnter={handleSidebarInteractionBoundaryPointerEnter}
          onMouseLeave={(event) => {
            handleSidebarInteractionBoundaryExit(event.clientX, event.relatedTarget);
          }}>
          <GlobalNavigationSidebarDockButton
            Icon={IconDockToRight}
            ariaLabel={sidebarButtonAriaLabel}
            onClick={handleSidebarButtonClick}
            variety="default-ghost"
          />
        </GlobalNavigationSidebarTriggerArea>
      )}

      {children}
    </GlobalNavigationPrimaryContainer>
  );
}

GlobalNavigationPrimary.displayName = 'GlobalNavigationPrimary';

const GlobalNavigationPrimaryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: ${cssVar('dimension-space-150')};
`;

GlobalNavigationPrimaryContainer.displayName = 'GlobalNavigationPrimaryContainer';

const GlobalNavigationSidebarTriggerArea = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

GlobalNavigationSidebarTriggerArea.displayName = 'GlobalNavigationSidebarTriggerArea';

const GlobalNavigationSidebarDockButton = styled(ButtonIcon)`
  color: ${cssVar('color-icon-subtle')};
`;

GlobalNavigationSidebarDockButton.displayName = 'GlobalNavigationSidebarDockButton';

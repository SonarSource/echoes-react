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

import {
  Children,
  type MouseEvent,
  type PropsWithChildren,
  type Ref,
  useCallback,
  useContext,
} from 'react';

import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { ButtonIcon } from '../../buttons';
import { IconDockToRight } from '../../icons';
import { LayoutSidebarContext } from '../LayoutSidebarContext';

import { SIDEBAR_INTERACTION_ZONE_ATTRIBUTE } from '../LayoutSidebarInteraction';

const GLOBAL_NAVIGATION_PRIMARY_GAP_TOKEN = 'dimension-space-150';

export interface GlobalNavigationPrimaryProps extends PropsWithChildren {
  /** Optional CSS class name applied to the root element */
  className?: string;
  /** React ref forwarded to the root element */
  ref?: Ref<HTMLDivElement>;
}

/**
 * Browsers dispatch keyboard activation through `click` with `detail === 0`, while
 * pointer clicks report a positive `detail`.
 */
function isKeyboardTriggeredClickEvent(event: MouseEvent<HTMLElement>) {
  return event.detail === 0;
}

function isPointerClickEvent(event: MouseEvent<HTMLElement>) {
  return event.detail > 0;
}

/**
 * Pointer clicks can leave the trigger focused, so blur it after opening the
 * floating sidebar to avoid an immediate re-close race with the blur handler.
 */
function shouldBlurSidebarTriggerAfterPointerClick(event: MouseEvent<HTMLElement>) {
  return isPointerClickEvent(event) && globalThis.document.activeElement === event.currentTarget;
}

export function GlobalNavigationPrimary(props: Readonly<GlobalNavigationPrimaryProps>) {
  const { children, className, ref, ...htmlProps } = props;
  const [leadingContent, ...trailingContent] = Children.toArray(children);
  const sidebar = useContext(LayoutSidebarContext);

  const intl = useIntl();

  const handleOpenSidebarOnInteraction = useCallback(() => {
    if (!sidebar.isDocked || !sidebar.isDockable) {
      sidebar.open();
    }
  }, [sidebar]);

  const handleSidebarButtonClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (sidebar.isDockable) {
        if (sidebar.isDocked) {
          if (isKeyboardTriggeredClickEvent(event)) {
            sidebar.open();
          } else {
            sidebar.close();
            event.currentTarget.blur();
          }
        }

        sidebar.setIsDocked((isDocked) => !isDocked);

        return;
      }

      sidebar.open();

      if (shouldBlurSidebarTriggerAfterPointerClick(event)) {
        // Pointer clicks blur the trigger before focus can move into the floating sidebar.
        // Ignore that blur once so the sidebar stays open for the current interaction.
        sidebar.ignoreNextInteractionZoneBlur();
        event.currentTarget.blur();
      }
    },
    [sidebar],
  );

  let sidebarButtonAriaLabel;
  let sidebarButtonTooltipContent;

  if (sidebar.isDockable) {
    if (sidebar.isDocked) {
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

    sidebarButtonTooltipContent = '';
  }

  return (
    <GlobalNavigationPrimaryContainer className={className} ref={ref} {...htmlProps}>
      {sidebar.isInLayout && (
        <GlobalNavigationSidebarTriggerArea
          {...{ [SIDEBAR_INTERACTION_ZONE_ATTRIBUTE]: 'true' }}
          data-testid="global-navigation-sidebar-trigger-area"
          onBlur={(event) => {
            sidebar.handleInteractionZoneBlur(event.relatedTarget);
          }}
          onFocus={handleOpenSidebarOnInteraction}
          onMouseLeave={(event) => {
            sidebar.handleInteractionZoneMouseLeave(event.relatedTarget);
          }}>
          <GlobalNavigationSidebarTriggerHoverArea onMouseEnter={handleOpenSidebarOnInteraction}>
            <GlobalNavigationSidebarDockButton
              Icon={IconDockToRight}
              ariaLabel={sidebarButtonAriaLabel}
              onClick={handleSidebarButtonClick}
              tooltipContent={sidebarButtonTooltipContent}
              variety="default-ghost"
            />
          </GlobalNavigationSidebarTriggerHoverArea>
        </GlobalNavigationSidebarTriggerArea>
      )}

      {sidebar.isInLayout && leadingContent && (
        <GlobalNavigationSidebarLeadingZone
          {...{ [SIDEBAR_INTERACTION_ZONE_ATTRIBUTE]: 'true' }}
          onBlur={(event) => {
            sidebar.handleInteractionZoneBlur(event.relatedTarget);
          }}
          onMouseLeave={(event) => {
            sidebar.handleInteractionZoneMouseLeave(event.relatedTarget);
          }}>
          {leadingContent}
        </GlobalNavigationSidebarLeadingZone>
      )}

      <GlobalNavigationPrimaryContent>
        {sidebar.isInLayout ? trailingContent : children}
      </GlobalNavigationPrimaryContent>
    </GlobalNavigationPrimaryContainer>
  );
}

GlobalNavigationPrimary.displayName = 'GlobalNavigationPrimary';

const GlobalNavigationPrimaryContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;

  gap: ${cssVar(GLOBAL_NAVIGATION_PRIMARY_GAP_TOKEN)};
  pointer-events: none;
`;

GlobalNavigationPrimaryContainer.displayName = 'GlobalNavigationPrimaryContainer';

const GlobalNavigationPrimaryContent = styled.div`
  display: flex;
  align-items: center;

  gap: ${cssVar(GLOBAL_NAVIGATION_PRIMARY_GAP_TOKEN)};
  position: relative;
  pointer-events: none;
  z-index: 1;

  & > * {
    pointer-events: auto;
  }
`;

GlobalNavigationPrimaryContent.displayName = 'GlobalNavigationPrimaryContent';

const GlobalNavigationSidebarTriggerArea = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  pointer-events: auto;
  position: relative;
  z-index: 1;
`;

GlobalNavigationSidebarTriggerArea.displayName = 'GlobalNavigationSidebarTriggerArea';

const GlobalNavigationSidebarTriggerHoverArea = styled.div`
  display: flex;
`;

GlobalNavigationSidebarTriggerHoverArea.displayName = 'GlobalNavigationSidebarTriggerHoverArea';

const GlobalNavigationSidebarLeadingZone = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  pointer-events: auto;
  position: relative;
  z-index: 2;
`;

GlobalNavigationSidebarLeadingZone.displayName = 'GlobalNavigationSidebarLeadingZone';

const GlobalNavigationSidebarDockButton = styled(ButtonIcon)`
  flex-shrink: 0;
`;

GlobalNavigationSidebarDockButton.displayName = 'GlobalNavigationSidebarDockButton';

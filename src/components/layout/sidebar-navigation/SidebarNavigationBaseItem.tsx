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

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MouseEvent, useCallback } from 'react';

import { NavLinkBase } from '~common/components/NavLinkBase';
import { isDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';
import { Tooltip } from '../../tooltip';

import {
  sidebarNavigationBaseItemStyles,
  sidebarNavigationItemIconStyles,
  SidebarNavigationItemLabel,
  UnstyledListItem,
} from './SidebarNavigationItemStyles';

import {
  SidebarNavigationIconComponent,
  SidebarNavigationItemBaseProps,
} from './SidebarNavigationTypes';

import { TOOLTIP_DELAY_IN_MS } from './utils';

interface SidebarNavigationBaseItemInternalProps extends SidebarNavigationItemBaseProps {
  Icon?: SidebarNavigationIconComponent;
}

export function SidebarNavigationBaseItem(props: Readonly<SidebarNavigationBaseItemInternalProps>) {
  const {
    ariaLabel,
    children,
    disableIconWhenSidebarOpen = false,
    disableTooltip = false,
    Icon,
    onClick,
    ref,
    suffix,
    ...htmlProps
  } = props;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.currentTarget.blur();
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <UnstyledListItem>
      <Tooltip
        content={disableTooltip ? undefined : children}
        delayDuration={TOOLTIP_DELAY_IN_MS}
        side="right">
        <SidebarNavigationBaseItemLink
          {...htmlProps}
          aria-label={ariaLabel}
          onClick={handleClick}
          ref={ref}>
          {isDefined(Icon) && (
            <Icon
              css={[
                sidebarNavigationBaseItemIconStyles,
                disableIconWhenSidebarOpen
                  ? sidebarNavigationBaseItemHideWhenSidebarOpenStyles
                  : undefined,
              ]}
              isFilled={false}
            />
          )}

          <SidebarNavigationItemLabel>{children}</SidebarNavigationItemLabel>

          {suffix}
        </SidebarNavigationBaseItemLink>
      </Tooltip>
    </UnstyledListItem>
  );
}

SidebarNavigationBaseItem.displayName = 'SidebarNavigationBaseItem';

const SidebarNavigationBaseItemLink = styled(NavLinkBase)`
  ${sidebarNavigationBaseItemStyles}

  // When the item is inside an accordion, the display value changes based on the accordion state.
  // Outside of accordions, it falls back to flex.
  display: var(--sidebar-navigation-accordion-children-display, flex);

  &:active,
  &.active {
    // Active items stay visible even when the parent accordion is closed.
    display: flex;
    visibility: visible;

    background-color: ${cssVar('sidebar-navigation-item-colors-background-active')};
    color: ${cssVar('color-text-accent')};
    font: ${cssVar('typography-text-default-semi-bold')};

    &:hover {
      background-color: ${cssVar('sidebar-navigation-item-colors-background-hover')};
    }
  }
`;

SidebarNavigationBaseItemLink.displayName = 'SidebarNavigationBaseItemLink';

const sidebarNavigationBaseItemIconStyles = css`
  ${sidebarNavigationItemIconStyles}

  ${SidebarNavigationBaseItemLink}.active > &,
  ${SidebarNavigationBaseItemLink}:active > & {
    color: ${cssVar('color-icon-accent')};
  }
`;

const sidebarNavigationBaseItemHideWhenSidebarOpenStyles = css`
  [data-sidebar-open='true'] & {
    display: none;
  }
`;

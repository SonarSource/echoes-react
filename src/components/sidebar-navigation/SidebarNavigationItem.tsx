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
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { forwardRef, ForwardRefExoticComponent, MouseEventHandler } from 'react';
import { NavLinkBase, NavLinkBaseProps } from '~common/components/NavLinkBase';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconProps } from '../icons';
import { Tooltip } from '../tooltip';
import {
  itemIconStyles,
  sidebarNavigationBaseItemStyles,
  SidebarNavigationItemLabel,
} from './SidebarNavigationItemStyles';

export interface SidebarNavigationItemProps
  extends Pick<NavLinkBaseProps, 'isMatchingFullPath' | 'enableOpenInNewTab' | 'to'> {
  ariaLabel?: string;
  /**
   * The label of the SidebarNavigationItem.
   * It can be a string or a JSX.Element, in the case of a JSX.Element it should not be wrapped in
   * a `<Text>` component, the SidebarNavigationItem already handles the typography styling for you.
   */
  children: TextNode;
  className?: string;
  /**
   * Whether to display the tooltip on the item or not.
   * By default the tooltip is disabled, it should only be enabled if you expect the content to be ellipsed.
   */
  enableTooltip?: boolean;
  /**
   * Control whether the SidebarNavigationItem is active or not.
   * If true, the item will have a different style to indicate it is active.
   *
   * By default this behavior is handled by the underlying react-router's NavLink component,
   * overriding this is only needed for complex scenarios.
   */
  isActive?: boolean;
  /**
   * The onClick handler for the SidebarNavigationItem.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /**
   * The icon component to display at the start of the SidebarNavigationItem.
   * Must be an Echoes Icon component.
   */
  Icon?: ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
}

export const SidebarNavigationItem = forwardRef<HTMLAnchorElement, SidebarNavigationItemProps>(
  (props, ref) => {
    const { children, className, enableTooltip, Icon, isActive = false, ...htmlProps } = props;

    return (
      <Tooltip content={enableTooltip ? children : undefined} side="right">
        <NavigationItem
          {...htmlProps}
          className={classNames({ active: isActive }, className)}
          ref={ref}>
          {Icon ? <Icon css={navigationItemIconStyles} /> : undefined}

          <SidebarNavigationItemLabel>{children}</SidebarNavigationItemLabel>
        </NavigationItem>
      </Tooltip>
    );
  },
);

SidebarNavigationItem.displayName = 'SidebarNavigationItem';

const NavigationItem = styled(NavLinkBase)`
  ${sidebarNavigationBaseItemStyles}

  // When the item is inside an accordion, the display value change based on the state of the accordion, hidding the items when collapsed
  // This css property is set by the SidebarNavigationAccordionItem component
  // Fallback to flex if not inside an accordion
  display: var(--sidebar-navigation-accordion-children-display, flex);

  &:active,
  &.active {
    // Always display the item when active even if behind a collapsed accordion, this override the previously set display value from the css property
    display: flex;

    background-color: ${cssVar('color-background-selected-weak-default')};
    color: ${cssVar('color-text-accent')};
    font: ${cssVar('typography-text-default-semi-bold')};

    &:hover {
      background-color: ${cssVar('color-background-selected-weak-hover')};
    }
  }
`;
NavigationItem.displayName = 'NavigationItem';

const navigationItemIconStyles = css`
  ${itemIconStyles}

  ${NavigationItem}.active > &,
  ${NavigationItem}:active > & {
    color: ${cssVar('color-icon-accent')};
  }
`;

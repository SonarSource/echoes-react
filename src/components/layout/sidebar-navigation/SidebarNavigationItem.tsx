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
import {
  forwardRef,
  ForwardRefExoticComponent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
} from 'react';
import { NavLinkBase, NavLinkBaseProps } from '~common/components/NavLinkBase';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconFilledProps } from '../../icons';
import { Tooltip } from '../../tooltip';
import {
  sidebarNavigationBaseItemStyles,
  sidebarNavigationItemIconStyles,
  SidebarNavigationItemLabel,
  UnstyledListItem,
} from './SidebarNavigationItemStyles';

const TOOLTIP_DELAY_IN_MS = 1000;

export interface SidebarNavigationItemProps extends Pick<
  NavLinkBaseProps,
  'isMatchingFullPath' | 'enableOpenInNewTab' | 'to'
> {
  ariaLabel?: string;
  /**
   * The label of the SidebarNavigationItem.
   * It can be a string or a JSX.Element, in the case of a JSX.Element it should not be wrapped in
   * a `<Text>` component, the SidebarNavigationItem already handles the typography styling for you.
   */
  children: TextNode;
  className?: string;
  /**
   * Whether to hide the Icon when the sidebar is open.
   * The purpose is to have the icon appear only when the sidebar is not open, and for accordion child items only.
   */
  disableIconWhenSidebarOpen?: boolean;
  /**
   * Whether to disable the tooltip on the item or not.
   * By default the tooltip is enabled, it should only be disabled if you don't expect the content to be ellipsed.
   */
  disableTooltip?: boolean;
  /**
   * Control whether the SidebarNavigationItem is active or not.
   * If true, the item will have a different style to indicate it is active.
   * If false it will override any default behavior and not indicate it is active.
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
   * Optional content to display on the right. Typically badges and similar metadata.
   */
  suffix?: ReactNode;
  /**
   * The icon component to display at the start of the SidebarNavigationItem.
   * Must be an Echoes Icon component.
   */
  Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
}

export const SidebarNavigationItem = forwardRef<HTMLAnchorElement, SidebarNavigationItemProps>(
  (props, ref) => {
    const {
      children,
      disableIconWhenSidebarOpen = false,
      disableTooltip = false,
      Icon,
      onClick,
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
          <NavigationItem {...htmlProps} onClick={handleClick} ref={ref}>
            <Icon
              css={[
                navigationItemIconStyles,
                disableIconWhenSidebarOpen ? hideWhenSidebarOpenStyles : undefined,
              ]}
              isFilled={false}
            />
            <SidebarNavigationItemLabel>{children}</SidebarNavigationItemLabel>
            {suffix}
          </NavigationItem>
        </Tooltip>
      </UnstyledListItem>
    );
  },
);

SidebarNavigationItem.displayName = 'SidebarNavigationItem';

const NavigationItem = styled(NavLinkBase)`
  ${sidebarNavigationBaseItemStyles}

  // When the item is inside an accordion, the display/visibility value changes based on the state
  // of the accordion, hiding the items when the sidebar is closed.
  // These css properties are set by the SidebarNavigationAccordionItem component
  // Fallback to flex/visible if not inside an accordion
  display: var(--sidebar-navigation-accordion-children-display, flex);
  visibility: var(--sidebar-navigation-accordion-children-visibility, visible);

  // Outline provided by the accordion item when the sidebar is collapsed, it's only visible for the
  // active element, but we don't put it inside the active rule to make sure it doesn't have higher
  // specificity than the outline provided by the sidebarNavigationBaseItemStyles on focus.
  // Also it doesn't matter if it's present when not active since non active items are not visible anyway.
  outline: var(--sidebar-navigation-accordion-children-outline);

  &:active,
  &.active {
    // Always display the item when active even if behind a closed accordion, this overrides the previously set display value from the css property
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
NavigationItem.displayName = 'NavigationItem';

const navigationItemIconStyles = css`
  ${sidebarNavigationItemIconStyles}

  ${NavigationItem}.active > &,
  ${NavigationItem}:active > & {
    color: ${cssVar('color-icon-accent')};
  }
`;

const hideWhenSidebarOpenStyles = css`
  [data-sidebar-docked='true'] &,
  [data-sidebar-docked='false'] nav:is(:hover, :focus-within) & {
    display: none;
  }
`;

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

import { ForwardRefExoticComponent, MouseEventHandler, ReactNode, Ref, RefAttributes } from 'react';
import { NavLinkBaseProps } from '~common/components/NavLinkBase';
import { TextNode } from '~types/utils';
import { IconFilledProps } from '../../icons';

export type SidebarNavigationIconComponent = ForwardRefExoticComponent<
  IconFilledProps & RefAttributes<HTMLSpanElement>
>;

export interface SidebarNavigationItemBaseProps extends Pick<
  NavLinkBaseProps,
  'enableOpenInNewTab' | 'isMatchingFullPath' | 'to'
> {
  /**
   * ARIA label for the sidebar navigation item.
   */
  ariaLabel?: string;
  /**
   * The label of the sidebar navigation item.
   * It can be a string or a JSX.Element. In the case of a JSX.Element it should not be wrapped in
   * a `<Text>` component, the sidebar navigation item already handles the typography styling for
   * you.
   */
  children: TextNode;
  /**
   * Optional CSS class name applied to the root link element.
   */
  className?: string;
  /**
   * Whether to disable the tooltip on the item or not.
   * By default the tooltip is enabled, it should only be disabled if you don't expect the content
   * to be ellipsed.
   * @defaultValue false
   */
  disableTooltip?: boolean;
  /**
   * Control whether the sidebar navigation item is active or not.
   * If true, the item will have a different style to indicate it is active.
   * If false it will override any default behavior and not indicate it is active.
   *
   * By default this behavior is handled by the underlying react-router's NavLink component,
   * overriding this is only needed for complex scenarios.
   */
  isActive?: boolean;
  /**
   * The onClick handler for the sidebar navigation item.
   */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /**
   * React ref forwarded to the root link element.
   */
  ref?: Ref<HTMLAnchorElement>;
  /**
   * Optional content to display on the right. Typically badges and similar metadata.
   */
  suffix?: ReactNode;
}

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
import { forwardRef, ForwardRefExoticComponent, MouseEventHandler, useRef } from 'react';
import { NavLinkBase, NavLinkBaseProps } from '~common/components/NavLinkBase';
import { truncate } from '~common/helpers/styles';
import { useIsOverflow } from '~common/helpers/useIsOverflow';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconProps } from '../icons';
import { Tooltip } from '../tooltip';

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
    const { children, className, Icon, isActive = false, ...htmlProps } = props;

    const labelRef = useRef<HTMLSpanElement>(null);
    const [isOverflow] = useIsOverflow(labelRef, [children]);

    return (
      <Tooltip content={isOverflow ? children : undefined} side="right">
        <SidebarNavigationItemStyled
          {...htmlProps}
          className={classNames({ active: isActive }, className)}
          ref={ref}>
          {Icon ? <Icon css={sidebarNavigationItemIconStyles} /> : undefined}
          <SidebarNavigationItemLabel ref={labelRef}>{children}</SidebarNavigationItemLabel>
        </SidebarNavigationItemStyled>
      </Tooltip>
    );
  },
);

SidebarNavigationItem.displayName = 'SidebarNavigationItem';

const SidebarNavigationItemStyled = styled(NavLinkBase)`
  all: unset;

  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  flex-grow: 1;
  flex-shrink: 0;

  box-sizing: border-box;
  height: ${cssVar('dimension-height-800')};
  padding: ${cssVar('dimension-space-100')};
  border-radius: ${cssVar('border-radius-400')};

  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};

  cursor: pointer;

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
    border-radius: ${cssVar('border-radius-400')};
  }

  &:active,
  &.active {
    background-color: ${cssVar('color-background-selected-weak-default')};
    color: ${cssVar('color-text-accent')};
    font: ${cssVar('typography-text-default-semi-bold')};

    &:hover {
      background-color: ${cssVar('color-background-selected-weak-hover')};
    }
  }
`;
SidebarNavigationItemStyled.displayName = 'SidebarNavigationItemStyled';

const SidebarNavigationItemLabel = styled.span`
  ${truncate}
`;

SidebarNavigationItemLabel.displayName = 'SidebarNavigationItemLabel';

const sidebarNavigationItemIconStyles = css`
  color: ${cssVar('color-icon-subtle')};

  ${SidebarNavigationItemStyled}.active > &,
  ${SidebarNavigationItemStyled}:active > & {
    color: ${cssVar('color-icon-accent')};
  }
`;

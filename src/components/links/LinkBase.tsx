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

import { ForwardedRef, forwardRef, MouseEvent, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';
import { LinkOpenInNewTabSuffix } from './LinkOpenInNewTabSuffix';
import { isLinkAsButton, LinkProps } from './LinkTypes';

export const LinkBase = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (props, ref) => {
    const {
      children,
      shouldBlurAfterClick = false,
      onClick,
      enablePreventDefault = false,
      shouldStopPropagation = false,
      enableOpenInNewTab = false,
      type = 'button',
      ...restProps
    } = props;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (shouldBlurAfterClick) {
          event.currentTarget.blur();
        }

        if (enablePreventDefault) {
          event.preventDefault();
        }

        if (shouldStopPropagation) {
          event.stopPropagation();
        }

        if (onClick) {
          onClick(event);
        }
      },
      [onClick, shouldBlurAfterClick, enablePreventDefault, shouldStopPropagation],
    );

    if (isLinkAsButton(props)) {
      return (
        <button
          {...restProps}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          // eslint-disable-next-line react/button-has-type
          type={type}>
          {children}
        </button>
      );
    }

    const { to } = props;

    return (
      <RouterLink
        {...getShouldOpenInNewTabProps({ enableOpenInNewTab, to })}
        {...restProps}
        onClick={handleClick}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        to={to}>
        {children}
        <LinkOpenInNewTabSuffix enableOpenInNewTab={enableOpenInNewTab} hasUnbreakableSpace />
      </RouterLink>
    );
  },
);

LinkBase.displayName = 'LinkBase';

export function getShouldOpenInNewTabProps({
  enableOpenInNewTab,
  to,
}: Pick<LinkProps, 'enableOpenInNewTab' | 'to'>) {
  return enableOpenInNewTab
    ? {
        rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
        /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
        target: '_blank',
      }
    : {};
}

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

import { ForwardedRef, forwardRef, MouseEvent, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { isDefined } from '~common/helpers/types';
import { isSonarLink } from '~common/helpers/url';
import { LinkOpenInNewTabSuffix } from './LinkOpenInNewTabSuffix';
import { isLinkAsButton, LinkProps } from './LinkTypes';

export const LinkBase = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (props, ref) => {
    const {
      children,
      enableBlurAfterClick = false,
      onClick,
      enablePreventDefault = false,
      enableStopPropagation = false,
      enableOpenInNewTab = false,
      type = 'button',
      ...restProps
    } = props;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (enableBlurAfterClick) {
          event.currentTarget.blur();
        }

        if (enablePreventDefault) {
          event.preventDefault();
        }

        if (enableStopPropagation) {
          event.stopPropagation();
        }

        if (onClick) {
          onClick(event);
        }
      },
      [onClick, enableBlurAfterClick, enablePreventDefault, enableStopPropagation],
    );

    if (isLinkAsButton(props)) {
      return (
        <button
          // Everything above this line can be overridden by the `restProps` object
          {...restProps}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          // eslint-disable-next-line react/button-has-type
          type={type}>
          {children}
        </button>
      );
    }

    const { download, to } = props;

    return (
      <RouterLink
        {...(isDefined(download) ? { download, reloadDocument: true } : {})}
        // Everything above this line can be overridden by the `restProps` object
        {...restProps}
        {...getShouldOpenInNewTabProps({ download, enableOpenInNewTab, to })}
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
  download,
  enableOpenInNewTab,
  to,
}: Pick<LinkProps, 'download' | 'enableOpenInNewTab' | 'to'>) {
  return !download && enableOpenInNewTab
    ? {
        rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
        /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
        target: '_blank',
      }
    : {};
}

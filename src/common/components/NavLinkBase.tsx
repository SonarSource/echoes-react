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
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';

type RouterNavLinkPropsAllowed = 'download' | 'to';

export interface NavLinkBaseProps extends Pick<RouterNavLinkProps, RouterNavLinkPropsAllowed> {
  children: React.ReactNode;
  isMatchingFullPath?: boolean;
  shouldOpenInNewTab?: boolean;
}

export const NavLinkBase = forwardRef<HTMLAnchorElement, NavLinkBaseProps>((props, ref) => {
  const {
    children,
    isMatchingFullPath = false,
    shouldOpenInNewTab = false,
    to,
    ...restAndRadixProps
  } = props;

  const intl = useIntl();

  const shouldOpenInNewTabProps = shouldOpenInNewTab
    ? {
        rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
        /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
        target: '_blank',
      }
    : {};

  return (
    <RouterNavLink
      {...(isMatchingFullPath ? { end: true } : {})}
      {...shouldOpenInNewTabProps}
      {...restAndRadixProps}
      ref={ref}
      to={to}>
      {children}

      {shouldOpenInNewTab && (
        <VisuallyHidden.Root>
          {intl.formatMessage({
            id: 'open_in_new_tab',
            defaultMessage: '(opens in new tab)',
            description: 'Screen reader-only text to indicate that the link will open in a new tab',
          })}
        </VisuallyHidden.Root>
      )}
    </RouterNavLink>
  );
});

NavLinkBase.displayName = 'NavLinkBase';

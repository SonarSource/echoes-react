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
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import classNames from 'classnames';
import { type Ref } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { isSonarLink } from '~common/helpers/url';
import { RouterLink, useIsPathActive } from '../../components/router/RouterContext';
import { EchoesRouterLinkProps } from '../../components/router/RouterTypes';

type RouterLinkPropsAllowed = 'download' | 'to' | 'onClick';

export interface NavLinkBaseProps extends Pick<EchoesRouterLinkProps, RouterLinkPropsAllowed> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
  isMatchingFullPath?: boolean;
  enableOpenInNewTab?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export function NavLinkBase(props: Readonly<NavLinkBaseProps>) {
  const {
    className,
    children,
    download,
    isActive = undefined,
    isMatchingFullPath = false,
    enableOpenInNewTab = false,
    ref,
    to,
    ...restAndRadixProps
  } = props;

  const intl = useIntl();
  const isRouteActive = useIsPathActive(to, { end: isMatchingFullPath });
  const active = isActive ?? isRouteActive;

  const enableOpenInNewTabProps =
    !download && enableOpenInNewTab
      ? {
          rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
          /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
          target: '_blank',
        }
      : {};

  return (
    <RouterLink
      className={classNames({ active }, className)}
      {...(active ? { 'aria-current': 'page' as const } : {})}
      {...enableOpenInNewTabProps}
      {...(isDefined(download) ? { download, reloadDocument: true } : {})}
      {...restAndRadixProps}
      ref={ref}
      to={to}>
      {children}

      {!download && enableOpenInNewTab && (
        <VisuallyHidden.Root>
          {intl.formatMessage({
            id: 'open_in_new_tab',
            defaultMessage: '(opens in new tab)',
            description: 'Screen reader-only text to indicate that the link will open in a new tab',
          })}
        </VisuallyHidden.Root>
      )}
    </RouterLink>
  );
}

NavLinkBase.displayName = 'NavLinkBase';

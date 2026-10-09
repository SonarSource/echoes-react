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

import { createContext, useContext } from 'react';
import { EchoesRouter, EchoesRouterLinkProps, LinkTo } from './RouterTypes';
import { isPathActive, PathActiveOptions, toHref } from './RouterUtils';

/** @internal */
export const RouterContext = createContext<EchoesRouter | null>(null);

RouterContext.displayName = 'RouterContext';

function NativeLink(props: Readonly<EchoesRouterLinkProps>) {
  const { reloadDocument: _reloadDocument, state: _state, to, ...restProps } = props;

  return <a href={toHref(to)} {...restProps} />;
}

NativeLink.displayName = 'NativeLink';

// Without a client-side router every navigation is a full page load, so reading the location on
// render is always up to date.
const nativeRouter: EchoesRouter = {
  Link: NativeLink,
  usePathname: () => globalThis.location?.pathname ?? '/',
};

function useRouter() {
  return useContext(RouterContext) ?? nativeRouter;
}

/** @internal */
export function usePathname() {
  return useRouter().usePathname();
}

/** @internal */
export function useIsPathActive(to: LinkTo, options?: PathActiveOptions) {
  return isPathActive(usePathname(), to, options);
}

/**
 * Renders the link of the router configured in `EchoesProvider`, or a plain anchor when there is none.
 * @internal
 */
export function RouterLink(props: Readonly<EchoesRouterLinkProps>) {
  const { Link } = useRouter();

  return <Link {...props} />;
}

RouterLink.displayName = 'RouterLink';
